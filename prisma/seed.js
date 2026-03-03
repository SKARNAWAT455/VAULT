const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const auctions = [
        {
            title: "Ancient Greek Vase",
            description: "A beautifully preserved terracotta vase from the 5th century BC, featuring detailed mythological scenes.",
            imageUrl: "https://images.unsplash.com/photo-1578320339911-750e02add19b?auto=format&fit=crop&q=80&w=800",
            startingPrice: 5000,
            currentPrice: 5000,
            endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
            status: "ACTIVE"
        },
        {
            title: "Vintage Rolex Submariner",
            description: "Rare 1960s Rolex Submariner with a tropical dial and original bracelet. A true collector's piece.",
            imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800",
            startingPrice: 15000,
            currentPrice: 15000,
            endTime: new Date(Date.now() + 1000 * 60 * 60 * 5), // 5 hours from now
            status: "ACTIVE"
        },
        {
            title: "18th Century French Writing Desk",
            description: "Exquisite mahogany writing desk with intricate marquetry and gilded bronze fittings.",
            imageUrl: "https://images.unsplash.com/photo-1594913217502-86926956627f?auto=format&fit=crop&q=80&w=800",
            startingPrice: 2000,
            currentPrice: 2000,
            endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
            status: "ACTIVE"
        }
    ]

    for (const auction of auctions) {
        await prisma.auction.create({
            data: auction
        })
    }

    console.log("Seeding finished.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
