'use client'

import { switchRole } from '@/actions/auth'
import { useTransition } from 'react'

export function RoleSwitcher({ currentRole }: { currentRole: string }) {
    const [isPending, startTransition] = useTransition()

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>当前身份: <strong>{currentRole === 'ADMIN' ? '管理员' : '作者'}</strong></span>
            <button
                className="btn"
                style={{ border: '1px solid var(--border)', fontSize: '0.8rem' }}
                onClick={() => startTransition(() => switchRole(currentRole === 'ADMIN' ? 'AUTHOR' : 'ADMIN'))}
                disabled={isPending}
            >
                {isPending ? '切换中...' : '切换身份'}
            </button>
        </div>
    )
}
