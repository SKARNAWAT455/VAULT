import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.password) return null;

                // Check account lockout
                if (user.lockedUntil && user.lockedUntil > new Date()) {
                    const minutesLeft = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
                    throw new Error(`Account locked. Try again in ${minutesLeft} minute(s).`);
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    const newAttempts = (user.loginAttempts ?? 0) + 1;
                    const shouldLock = newAttempts >= MAX_LOGIN_ATTEMPTS;

                    await prisma.user.update({
                        where: { id: user.id },
                        data: {
                            loginAttempts: newAttempts,
                            lockedUntil: shouldLock ? new Date(Date.now() + LOCK_DURATION_MS) : null,
                        },
                    });

                    if (shouldLock) {
                        throw new Error(`Too many failed attempts. Account locked for 15 minutes.`);
                    }

                    return null;
                }

                // Successful login — reset attempt counter
                if (user.loginAttempts > 0) {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { loginAttempts: 0, lockedUntil: null },
                    });
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: (user as any).role,
                };
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = (token as any).id;
                (session.user as any).role = (token as any).role;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    }
};
