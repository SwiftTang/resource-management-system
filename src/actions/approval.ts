'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function approveRequest(requestId: string) {
    const user = await getCurrentUser()
    if (user.role !== 'ADMIN') {
        throw new Error('Unauthorized')
    }

    const request = await prisma.modificationRequest.findUnique({
        where: { id: requestId },
        include: { resource: true }
    })

    if (!request) throw new Error('Request not found')

    const data = JSON.parse(request.data)

    if (request.type === 'CREATE') {
        await prisma.resource.create({
            data: {
                name: data.name,
                description: data.description,
                type: data.type,
                data: data.data,
            }
        })
    } else if (request.type === 'UPDATE' && request.resourceId) {
        // Logic for update would go here
        // For now we only implemented CREATE in the UI, but let's support UPDATE structure
        await prisma.resource.update({
            where: { id: request.resourceId },
            data: {
                name: data.name,
                description: data.description,
                data: data.data,
            }
        })
    } else if (request.type === 'DELETE' && request.resourceId) {
        await prisma.resource.delete({
            where: { id: request.resourceId }
        })
    }

    await prisma.modificationRequest.update({
        where: { id: requestId },
        data: { status: 'APPROVED' }
    })

    revalidatePath('/approval')
    revalidatePath(`/resources/${data.type.toLowerCase()}s`) // simplistic pluralization
}

export async function rejectRequest(requestId: string) {
    const user = await getCurrentUser()
    if (user.role !== 'ADMIN') {
        throw new Error('Unauthorized')
    }

    await prisma.modificationRequest.update({
        where: { id: requestId },
        data: { status: 'REJECTED' }
    })

    revalidatePath('/approval')
}
