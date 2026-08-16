import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const secret = request.headers.get('x-revalidate-secret')
  if (secret !== (process.env.REVALIDATE_SECRET || 'mojib-revalidate-2026')) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  // Revalidate all main pages
  revalidatePath('/')
  revalidatePath('/projects')
  revalidatePath('/projects/[slug]', 'page')

  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() })
}
