import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const requests = await prisma.advisoryRequest.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch advisory requests' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, itemType, message, preferredDate } = body;

        if (!name || !email || !phone || !itemType || !message) {
            return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
        }

        const request = await prisma.advisoryRequest.create({
            data: {
                name,
                email,
                phone,
                itemType,
                message,
                preferredDate: preferredDate || null,
                status: 'PENDING',
            },
        });

        return NextResponse.json(request, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit advisory request' }, { status: 500 });
    }
}
