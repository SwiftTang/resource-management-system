import { cookies } from 'next/headers'

export type Role = 'ADMIN' | 'AUTHOR'

export async function getCurrentRole(): Promise<Role> {
    const cookieStore = await cookies()
    const role = cookieStore.get('role')?.value
    return (role === 'ADMIN' || role === 'AUTHOR') ? role : 'AUTHOR'
}

export async function getCurrentUser() {
    const role = await getCurrentRole()
    return {
        id: role === 'ADMIN' ? 'admin-id' : 'author-id',
        name: role === 'ADMIN' ? '管理员' : '作者',
        role: role
    }
}
