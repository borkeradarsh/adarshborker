import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // This API route can be used to trigger ISR revalidation
  // Example: /api/revalidate?secret=your-secret&path=/
  
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: 'Missing path parameter' }, { status: 400 });
  }

  try {
    // This would trigger revalidation for ISR pages
    // For now, we'll just return success since we're using client-side rendering
    return NextResponse.json({ revalidated: true, path });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}