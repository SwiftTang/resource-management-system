import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            id: 'admin-id',
            email: 'admin@example.com',
            name: '管理员',
            role: 'ADMIN',
        },
    })

    const author = await prisma.user.upsert({
        where: { email: 'author@example.com' },
        update: {},
        create: {
            id: 'author-id',
            email: 'author@example.com',
            name: '作者',
            role: 'AUTHOR',
        },
    })

    console.log({ admin, author })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
