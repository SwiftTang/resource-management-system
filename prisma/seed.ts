import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    // Create Users
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'ADMIN',
        },
    })

    const author = await prisma.user.upsert({
        where: { email: 'author@example.com' },
        update: {},
        create: {
            email: 'author@example.com',
            name: 'Author User',
            role: 'AUTHOR',
        },
    })

    console.log({ admin, author })

    // Resource Data
    const resources = [
        {
            name: '张三',
            description: '高级软件工程师',
            type: 'PEOPLE',
            data: JSON.stringify({ role: 'Senior Engineer' }),
        },
        {
            name: '李四',
            description: '产品经理',
            type: 'PEOPLE',
            data: JSON.stringify({ role: 'Product Manager' }),
        },
        {
            name: '资源管理系统',
            description: '企业级资源管理平台开发项目',
            type: 'PROJECTS',
            data: JSON.stringify({ budget: '500000' }),
        },
        {
            name: 'AI 辅助编程研究',
            description: '探索 LLM 在编程领域的应用',
            type: 'PROJECTS',
            data: JSON.stringify({ budget: '200000' }),
        },
        {
            name: '研发专项基金',
            description: '用于支持创新研发项目的专项资金',
            type: 'FUNDS',
            data: JSON.stringify({ amount: '1000000' }),
        },
        {
            name: 'React 最佳实践',
            description: '前端开发团队 React 技术栈最佳实践指南',
            type: 'KNOWLEDGE',
            data: JSON.stringify({ tags: 'React, Frontend, Best Practices' }),
        },
        {
            name: '系统架构设计',
            description: '完成资源管理系统的整体架构设计',
            type: 'TASKS',
            data: JSON.stringify({ status: 'DONE', due_date: '2023-12-31' }),
        },
        {
            name: 'API 接口开发',
            description: '完成核心业务 API 接口的开发与测试',
            type: 'TASKS',
            data: JSON.stringify({ status: 'IN_PROGRESS', due_date: '2024-01-15' }),
        },
        {
            name: '技术白皮书',
            description: '发布 2024 年度技术趋势白皮书',
            type: 'OUTCOMES',
            data: JSON.stringify({ link: 'https://example.com/whitepaper-2024' }),
        },
        {
            name: '推荐算法 v1.0',
            description: '基于协同过滤的内容推荐算法',
            type: 'ALGORITHMS',
            data: JSON.stringify({ complexity: 'O(n^2)', language: 'Python' }),
        },
        {
            name: '某知名科技公司',
            description: '国内领先的互联网科技企业',
            type: 'CUSTOMERS',
            data: JSON.stringify({ industry: 'Technology', contact_info: 'contact@tech-corp.com' }),
        },
        {
            name: '移动端适配需求',
            description: '系统需全面支持移动端访问，响应式布局',
            type: 'REQUIREMENTS',
            data: JSON.stringify({ priority: 'P0', status: 'OPEN' }),
        },
        {
            name: '智能助手集成',
            description: '在系统中集成 AI 智能助手，提供问答服务',
            type: 'IDEAS',
            data: JSON.stringify({ category: '技术', source: '头脑风暴' }),
        },
    ]

    for (const r of resources) {
        const resource = await prisma.resource.create({
            data: r,
        })
        console.log(`Created resource with id: ${resource.id}`)
    }

    console.log('Seeding finished.')
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
