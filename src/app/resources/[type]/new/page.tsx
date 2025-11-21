import { createResource } from '@/actions/resources'
import Link from 'next/link'

export default async function NewResourcePage({ params }: { params: Promise<{ type: string }> }) {
    const { type } = await params

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
            <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>新建{typeNames[type]}</h1>

            <form action={createResource.bind(null, type)} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>名称</label>
                    <input
                        name="name"
                        required
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        placeholder={`请输入${typeNames[type]}名称`}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>描述</label>
                    <textarea
                        name="description"
                        rows={3}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        placeholder="请输入描述"
                    />
                </div>

                {/* Dynamic fields based on type could go here */}
                {type === 'people' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>职位</label>
                        <input
                            name="role"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            placeholder="例如：工程师"
                        />
                    </div>
                )}

                {type === 'projects' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>预算</label>
                        <input
                            name="budget"
                            type="number"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            placeholder="0.00"
                        />
                    </div>
                )}

                {type === 'funds' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>金额</label>
                        <input
                            name="amount"
                            type="number"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            placeholder="0.00"
                        />
                    </div>
                )}

                {type === 'knowledge' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>标签</label>
                        <input
                            name="tags"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            placeholder="例如：React, Database (用逗号分隔)"
                        />
                    </div>
                )}

                {type === 'tasks' && (
                    <>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>状态</label>
                            <select
                                name="status"
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
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                            placeholder="https://..."
                        />
                    </div>
                )}

                {type === 'algorithms' && (
                    <>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>复杂度</label>
                            <input
                                name="complexity"
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                                placeholder="例如：O(n log n)"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>语言</label>
                            <input
                                name="language"
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                                placeholder="例如：Python, C++"
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
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                                placeholder="例如：金融, 科技"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>联系方式</label>
                            <input
                                name="contact_info"
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                                placeholder="电话或邮箱"
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
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                                placeholder="例如：头脑风暴、用户反馈"
                            />
                        </div>
                    </>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>提交</button>
                    <Link href={`/resources/${type}`} className="btn" style={{ flex: 1, border: '1px solid var(--border)' }}>取消</Link>
                </div>
            </form>
        </div>
    )
}
