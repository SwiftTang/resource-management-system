'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createResource(type: string, formData: FormData) {
    const user = await getCurrentUser()
    const name = formData.get('name') as string
    const description = formData.get('description') as string

    // Extract other fields based on type
    const data: Record<string, any> = {}
    formData.forEach((value, key) => {
        if (key !== 'name' && key !== 'description') {
            data[key] = value
        }
    })

    const resourceData = JSON.stringify(data)

    if (user.role === 'ADMIN') {
        await prisma.resource.create({
            data: {
                name,
                description,
                type: type.toUpperCase(), // PEOPLE, PROJECT, FUND
                data: resourceData,
            }
        })
    } else {
        await prisma.modificationRequest.create({
            data: {
                type: 'CREATE',
                data: JSON.stringify({ name, description, type: type.toUpperCase(), data: resourceData }),
                requesterId: user.id, // In a real app, we'd have a real user ID. For now we might need to create a dummy user or just use a string if the schema allows (it expects a User relation, so we need a user).
                // Wait, our schema has User model. We need to ensure the user exists.
            }
        })
    }

    revalidatePath(`/resources/${type}`)
    redirect(`/resources/${type}`)
}

export async function updateResource(id: string, type: string, formData: FormData) {
    const user = await getCurrentUser()
    const name = formData.get('name') as string
    const description = formData.get('description') as string

    const data: Record<string, any> = {}
    formData.forEach((value, key) => {
        if (key !== 'name' && key !== 'description') {
            data[key] = value
        }
    })

    const resourceData = JSON.stringify(data)

    if (user.role === 'ADMIN') {
        await prisma.resource.update({
            where: { id },
            data: {
                name,
                description,
                data: resourceData,
            }
        })
    } else {
        await prisma.modificationRequest.create({
            data: {
                resourceId: id,
                type: 'UPDATE',
                data: JSON.stringify({ name, description, type: type.toUpperCase(), data: resourceData }),
                requesterId: user.id,
            }
        })
    }

    revalidatePath(`/resources/${type}`)
    redirect(`/resources/${type}`)
}

export async function deleteResource(id: string, type: string) {
    const user = await getCurrentUser()

    if (user.role === 'ADMIN') {
        await prisma.resource.delete({
            where: { id }
        })
    } else {
        await prisma.modificationRequest.create({
            data: {
                resourceId: id,
                type: 'DELETE',
                data: JSON.stringify({ type: type.toUpperCase() }), // Minimal data needed
                requesterId: user.id,
            }
        })
    }

    revalidatePath(`/resources/${type}`)
    redirect(`/resources/${type}`)
}
