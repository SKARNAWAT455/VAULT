import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const offers = await prisma.tradeOffer.findMany({
            where: { status: 'OPEN' },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(offers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch trade offers' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { offererName, offererEmail, offeredItem, offeredDesc, wantedItem, wantedDesc } = body;

        if (!offererName || !offererEmail || !offeredItem || !offeredDesc || !wantedItem || !wantedDesc) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const offer = await prisma.tradeOffer.create({
            data: {
                offererName,
                offererEmail,
                offeredItem,
                offeredDesc,
                wantedItem,
                wantedDesc,
                status: 'OPEN',
            },
        });

        return NextResponse.json(offer, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create trade offer' }, { status: 500 });
    }
}
