'use client';
import { NextResponse } from 'next/server';
 import prismadb from '@/libs/prismadb'

export async function GET() {
    try {
        const tags = await prismadb.tag.findMany();
        return NextResponse.json(tags, {status: 200})
    } catch (error) {
        return NextResponse.json({ message: 'could not fetch tags'}, {status: 500});
    }
}