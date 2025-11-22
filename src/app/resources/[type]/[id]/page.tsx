import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { updateResource, deleteResource } from '@/actions/resources'
import Link from 'next/link'
import DeleteButton from '@/components/DeleteButton'

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
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem' }}>编辑{typeNames[type]}</h1>
                <form action={deleteResource.bind(null, id, type)}>
                    <DeleteButton />
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

                {type === 'knowledge' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>标签</label>
                        <input
                            name="tags"
                            defaultValue={resourceData.tags || ''}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                )}

                {type === 'tasks' && (
                    <>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>状态</label>
                            <select
                                name="status"
                                defaultValue={resourceData.status || 'TODO'}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            >
                                <option value="TODO">待办</option>
                                <option value="IN_PROGRESS">进行中</option>
                                <option value="DONE">已完成</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>截止日期</label>
                            <input
                                name="due_date"
                                type="date"
                                defaultValue={resourceData.due_date || ''}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            />
                        </div>
                    </>
                )}

                {type === 'outcomes' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>链接</label>
                        <input
                            name="link"
                            type="url"
                            defaultValue={resourceData.link || ''}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                )}

                {type === 'algorithms' && (
                    <>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>复杂度</label>
                            <input
                                name="complexity"
                                defaultValue={resourceData.complexity || ''}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>语言</label>
                            <input
                                name="language"
                                defaultValue={resourceData.language || ''}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            />
                        </div>
                    </>
                )}

                {type === 'customers' && (
                    <>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>行业</label>
                            <input
                                name="industry"
                                defaultValue={resourceData.industry || ''}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>联系方式</label>
                            <input
                                name="contact_info"
                                defaultValue={resourceData.contact_info || ''}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            />
                        </div>
                    </>
                )}

                {type === 'requirements' && (
                    <>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>优先级</label>
                            <select
                                name="priority"
                                defaultValue={resourceData.priority || 'P1'}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            >
                                <option value="P0">P0 (最高)</option>
                                <option value="P1">P1 (高)</option>
                                <option value="P2">P2 (中)</option>
                                <option value="P3">P3 (低)</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>状态</label>
                            <select
                                name="status"
                                defaultValue={resourceData.status || 'OPEN'}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            >
                                <option value="OPEN">待处理</option>
                                <option value="IN_PROGRESS">处理中</option>
                                <option value="CLOSED">已关闭</option>
                            </select>
                        </div>
                    </>
                )}

                {type === 'ideas' && (
                    <>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>类别</label>
                            <select
                                name="category"
                                defaultValue={resourceData.category || '产品'}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            >
                                <option value="产品">产品</option>
                                <option value="技术">技术</option>
                                <option value="营销">营销</option>
                                <option value="运营">运营</option>
                                <option value="其他">其他</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>来源</label>
                            <input
                                name="source"
                                defaultValue={resourceData.source || ''}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                                placeholder="例如：头脑风暴、用户反馈"
                            />
                        </div>
                    </>
                )}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>保存修改</button>
                    <Link href={`/resources/${type}`} className="btn" style={{ flex: 1, border: '1px solid var(--border)' }}>取消</Link>
                </div>
            </form>
        </div>
    )
}
