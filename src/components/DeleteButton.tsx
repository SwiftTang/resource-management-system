'use client'

import { useFormStatus } from 'react-dom'

export default function DeleteButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            className="btn"
            style={{ background: 'var(--error)', color: 'white', opacity: pending ? 0.7 : 1 }}
            disabled={pending}
            onClick={(e) => {
                if (!confirm('确定要删除这个资源吗？此操作无法撤销。')) {
                    e.preventDefault()
                }
            }}
        >
            {pending ? '删除中...' : '删除'}
        </button>
    )
}
