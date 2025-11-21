import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { approveRequest, rejectRequest } from '@/actions/approval'

export default async function ApprovalPage() {
    const user = await getCurrentUser()
    if (user.role !== 'ADMIN') {
        redirect('/')
    }

    const requests = await prisma.modificationRequest.findMany({
        where: { status: 'PENDING' },
        include: { requester: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>待审批请求</h1>

            {requests.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', color: '#666' }}>
                    暂无待审批请求
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {requests.map((request: { id: string; data: string; type: string; requester: { name: string }; createdAt: Date }) => {
                        const data = JSON.parse(request.data)
                        return (
                            <div key={request.id} className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            background: '#eee',
                                            fontSize: '0.8rem',
                                            marginRight: '0.5rem'
                                        }}>
                                            {request.type}
                                        </span>
                                        <span style={{ fontWeight: 'bold' }}>{data.name}</span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: '#999' }}>
                                        申请人: {request.requester.name} | {request.createdAt.toLocaleDateString()}
                                    </span>
                                </div>

                                <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                    <p><strong>描述:</strong> {data.description}</p>
                                    <p><strong>类型:</strong> {data.type}</p>
                                    {/* Display other data fields */}
                                    <pre style={{ marginTop: '0.5rem', color: '#666' }}>{JSON.stringify(JSON.parse(data.data), null, 2)}</pre>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <form action={approveRequest.bind(null, request.id)}>
                                        <button type="submit" className="btn" style={{ background: '#28a745', color: 'white' }}>通过</button>
                                    </form>
                                    <form action={rejectRequest.bind(null, request.id)}>
                                        <button type="submit" className="btn" style={{ background: '#dc3545', color: 'white' }}>拒绝</button>
                                    </form>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
