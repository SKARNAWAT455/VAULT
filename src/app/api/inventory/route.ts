import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const items = await prisma.inventoryItem.findMany({
            where: { status: { not: 'RETURNED' } },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch inventory items' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, description, category, condition, ownerName, ownerEmail } = body;

        if (!title || !description || !category || !condition || !ownerName || !ownerEmail) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const item = await prisma.inventoryItem.create({
            data: {
                title,
                description,
                category,
                condition,
                ownerName,
                ownerEmail,
                status: 'PENDING',
            },
        });

        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit inventory item' }, { status: 500 });
    }
}
