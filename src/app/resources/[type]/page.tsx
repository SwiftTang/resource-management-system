import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ResourceListPage({ params }: { params: Promise<{ type: string }> }) {
    const { type } = await params
    const validTypes = ['people', 'projects', 'funds', 'knowledge', 'tasks', 'outcomes', 'algorithms', 'customers', 'requirements', 'ideas']

    if (!validTypes.includes(type)) {
        notFound()
    }

    const resources = await prisma.resource.findMany({
        where: { type: type.toUpperCase() },
        orderBy: { createdAt: 'desc' }
    })

    const typeNames: Record<string, string> = {
        people: '人员',
        projects: '项目',
        funds: '资金',
        knowledge: '知识',
        tasks: '任务',
        outcomes: '成果',
        algorithms: '算法',
        customers: '客户',
        requirements: '需求',
        ideas: '创意'
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem' }}>{typeNames[type]}列表</h1>
                <Link href={`/resources/${type}/new`} className="btn btn-primary">
                    新建{typeNames[type]}
                </Link>
            </div>

            {resources.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', color: '#666' }}>
                    暂无数据
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {resources.map((resource: { id: string; name: string; createdAt: Date; description: string | null }) => (
                        <div key={resource.id} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3 style={{ fontSize: '1.2rem' }}>
                                    <Link href={`/resources/${type}/${resource.id}`} style={{ textDecoration: 'underline' }}>
                                        {resource.name}
                                    </Link>
                                </h3>
                                <span style={{ fontSize: '0.8rem', color: '#999' }}>{resource.createdAt.toLocaleDateString()}</span>
                            </div>
                            <p style={{ color: '#666', marginTop: '0.5rem' }}>{resource.description || '无描述'}</p>
                            {/* Display specific data if needed */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
