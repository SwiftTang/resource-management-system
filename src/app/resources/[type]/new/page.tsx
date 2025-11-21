import { createResource } from '@/actions/resources'
import Link from 'next/link'

export default async function NewResourcePage({ params }: { params: Promise<{ type: string }> }) {
    const { type } = await params

    const typeNames: Record<string, string> = {
        people: '人员',
        projects: '项目',
        funds: '资金'
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

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>提交</button>
                    <Link href={`/resources/${type}`} className="btn" style={{ flex: 1, border: '1px solid var(--border)' }}>取消</Link>
                </div>
            </form>
        </div>
    )
}
