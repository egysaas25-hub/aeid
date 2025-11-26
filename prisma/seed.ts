import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // Create categories
    console.log('Creating categories...')
    const dressesCategory = await prisma.category.upsert({
        where: { slug: 'dresses' },
        update: {},
        create: {
            name: 'Dresses',
            slug: 'dresses',
        },
    })

    const robesCategory = await prisma.category.upsert({
        where: { slug: 'robes' },
        update: {},
        create: {
            name: 'Robes',
            slug: 'robes',
        },
    })

    const shirtsCategory = await prisma.category.upsert({
        where: { slug: 'shirts' },
        update: {},
        create: {
            name: 'Shirts',
            slug: 'shirts',
        },
    })

    console.log('✅ Categories created')

    // Create products
    console.log('Creating products...')
    await prisma.product.upsert({
        where: { slug: 'tutankhamun-v-neck-dress' },
        update: {},
        create: {
            name: 'Tutankhamun V-Neck Dress',
            slug: 'tutankhamun-v-neck-dress',
            description: 'Long sleeves, teal fabric with golden mask print',
            fullDescription:
                'Long sleeves, teal fabric with golden mask print. Inspired by ancient Egyptian royalty. This stunning dress features the iconic golden mask of Tutankhamun, Egypt\'s most famous pharaoh. Printed on premium fabric with vibrant, long-lasting colors.',
            price: 700,
            images: ['https://via.placeholder.com/500x600?text=Tutankhamun+Dress'],
            categoryId: dressesCategory.id,
            colors: ['Teal', 'Black', 'Gold'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            stock: 50,
            isActive: true,
        },
    })

    await prisma.product.upsert({
        where: { slug: 'nefertiti-belted-robe' },
        update: {},
        create: {
            name: 'Nefertiti Belted Robe',
            slug: 'nefertiti-belted-robe',
            description: 'Beige fabric with blue accents, detailed back print of the iconic queen',
            fullDescription:
                'Beige fabric with blue accents, detailed back print of the iconic queen. Celebrate the legendary Queen Nefertiti, known for her timeless beauty. This elegant robe includes a matching belt to accentuate the waist. Made from flowing, comfortable fabric.',
            price: 700,
            images: ['https://via.placeholder.com/500x600?text=Nefertiti+Robe'],
            categoryId: robesCategory.id,
            colors: ['Beige', 'Blue', 'White'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            stock: 45,
            isActive: true,
        },
    })

    await prisma.product.upsert({
        where: { slug: 'horus-falcon-long-shirt' },
        update: {},
        create: {
            name: 'Horus Falcon Long Shirt',
            slug: 'horus-falcon-long-shirt',
            description: 'Orange-gold tones with pyramid backdrop, symbolizing protection and power',
            fullDescription:
                'Orange-gold tones with pyramid backdrop, symbolizing protection and power. A powerful design featuring Horus, the falcon-headed god of kingship and the sky, soaring above the Great Pyramids. This comfortable long-sleeve shirt combines ancient symbolism with modern style.',
            price: 700,
            images: ['https://via.placeholder.com/500x600?text=Horus+Shirt'],
            categoryId: shirtsCategory.id,
            colors: ['Orange', 'Gold', 'Black'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            stock: 60,
            isActive: true,
        },
    })

    console.log('✅ Products created')

    // Create admin user
    console.log('Creating admin user...')
    const hashedPassword = await bcrypt.hash('admin123', 10)

    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN',
            emailVerified: new Date(),
        },
    })

    console.log('✅ Admin user created (email: admin@example.com, password: admin123)')

    // Create test customer
    console.log('Creating test customer...')
    const customerPassword = await bcrypt.hash('customer123', 10)

    await prisma.user.upsert({
        where: { email: 'customer@example.com' },
        update: {},
        create: {
            email: 'customer@example.com',
            password: customerPassword,
            name: 'Test Customer',
            role: 'CUSTOMER',
            emailVerified: new Date(),
        },
    })

    console.log('✅ Test customer created (email: customer@example.com, password: customer123)')
    console.log('✨ Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
