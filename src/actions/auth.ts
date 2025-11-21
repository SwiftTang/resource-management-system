'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { Role } from '@/lib/auth'

export async function switchRole(role: Role) {
    const cookieStore = await cookies()
    cookieStore.set('role', role)
    revalidatePath('/')
}
