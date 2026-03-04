const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
    // Create test regular user
    const hashed = await bcrypt.hash('User@1234', 12);
    const existing = await prisma.user.findUnique({ where: { email: 'user@vault.com' } });
    if (!existing) {
        await prisma.user.create({
            data: { name: 'Test User', email: 'user@vault.com', password: hashed, role: 'USER' }
        });
        console.log('✅ Test user created: user@vault.com');
    } else {
        console.log('ℹ️  Test user already exists');
    }

    // Show all current users with lockout status
    const users = await prisma.user.findMany({
        select: { email: true, role: true, loginAttempts: true, lockedUntil: true }
    });
    console.log('\n📋 All users in database:');
    users.forEach(u => {
        const locked = u.lockedUntil && u.lockedUntil > new Date();
        console.log(`  ${u.role === 'ADMIN' ? '👑' : '👤'} ${u.email} | role: ${u.role} | attempts: ${u.loginAttempts} | locked: ${locked ? 'YES ⚠️' : 'No'}`);
    });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
