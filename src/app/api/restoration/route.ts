import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const requests = await prisma.restorationRequest.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch restoration requests' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { itemName, description, damage, ownerName, ownerEmail, ownerPhone } = body;

        if (!itemName || !description || !damage || !ownerName || !ownerEmail || !ownerPhone) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const request = await prisma.restorationRequest.create({
            data: {
                itemName,
                description,
                damage,
                ownerName,
                ownerEmail,
                ownerPhone,
                status: 'PENDING',
            },
        });

        return NextResponse.json(request, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit restoration request' }, { status: 500 });
    }
}
