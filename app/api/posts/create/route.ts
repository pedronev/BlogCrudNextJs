'use client';
import { NextResponse } from 'next/server';
import prismadb from '@/libs/prismadb'

export async function POST(req: Request) {
    try {
        // Check the total number of posts
        const totalPosts = await prismadb.post.count();

        if (totalPosts >= 10) {
            return NextResponse.json(
                { message: 'Maximum number of posts (10) reached.' },
                { status: 400 }
            );
        }

        const body = await req.json();
        const post = await prismadb.post.create({
            data: {
                title: body.title,
                content: body.content,
                tagId: body.tagId
            }
        });

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ message: error }, { status: 500 });
    }
}