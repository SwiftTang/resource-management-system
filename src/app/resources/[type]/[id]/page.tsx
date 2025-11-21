import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { updateResource, deleteResource } from '@/actions/resources'
import Link from 'next/link'

export default async function ResourceDetailPage({ params }: { params: Promise<{ type: string, id: string }> }) {
    const { type, id } = await params

    const resource = await prisma.resource.findUnique({
        where: { id }
    })

    if (!resource) {
        notFound()
    }

    const resourceData = JSON.parse(resource.data)

    const typeNames: Record<string, string> = {
        people: '人员',
        projects: '项目',
        funds: '资金'
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem' }}>编辑{typeNames[type]}</h1>
                <form action={deleteResource.bind(null, id, type)}>
                    <button
                        type="submit"
                        className="btn"
                        style={{ background: 'var(--error)', color: 'white' }}
                        onClick={(e) => {
                            // Simple confirm would require client component, skipping for now or we can make this a client component
                        }}
                    >
                        删除
                    </button>
                </form>
            </div>

            <form action={updateResource.bind(null, id, type)} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>名称</label>
                    <input
                        name="name"
                        defaultValue={resource.name}
                        required
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>描述</label>
                    <textarea
                        name="description"
                        defaultValue={resource.description || ''}
                        rows={3}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                    />
                </div>

                {type === 'people' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>职位</label>
                        <input
                            name="role"
                            defaultValue={resourceData.role || ''}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                )}

                {type === 'projects' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>预算</label>
                        <input
                            name="budget"
                            type="number"
                            defaultValue={resourceData.budget || ''}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                )}

                {type === 'funds' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>金额</label>
                        <input
                            name="amount"
                            type="number"
                            defaultValue={resourceData.amount || ''}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>保存修改</button>
                    <Link href={`/resources/${type}`} className="btn" style={{ flex: 1, border: '1px solid var(--border)' }}>取消</Link>
                </div>
            </form>
        </div>
    )
}
