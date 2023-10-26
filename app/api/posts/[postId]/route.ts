'use client';
import { NextResponse } from 'next/server';
 import prismadb from '@/libs/prismadb'

interface contextProps {
    params: {
        postId: string
    }
}

export async function DELETE(req: Request, context: contextProps) {
    try {
        const { params } = context;
        await prismadb.post.delete({
            where: {
                id: params.postId
            }
        })
        return new Response(null, {status: 204})
    } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: 'could not delete post' }, { status: 500 });
    }
}

export async function PATCH(req: Request, context: contextProps) {
    try {
        const { params } = context;
        const body = await req.json()
        await prismadb.post.update({
            where: {
                id: params.postId
            },
            data:{
                title: body.title,
                content: body.content,
                tagId: body.tagId,
            }
        })
        return NextResponse.json({ message: 'Update success' }, { status: 200 });
    } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: 'could not update post' }, { status: 500 });
    }
}

export async function GET(req: Request, context: contextProps) {
    try {
        const { params } = context;
        const post = await prismadb.post.findFirst({
            where: {
                id: params.postId
            },
            include: {
                Tag: true
            }
        });
        return NextResponse.json(post, {status: 200})
    } catch (error) {
        return NextResponse.json({ message: 'could not fetch tags'}, {status: 500});
    }
}