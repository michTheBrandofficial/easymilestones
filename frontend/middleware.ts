import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // Get the response
  const response = NextResponse.next();

  // Add CORS headers to the response
  response.headers.set('Access-Control-Allow-Origin', '*'); // Or specify allowed origins
  response.headers.set('Access-Control-Allow-Methods', 'GET');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}

// Configure the middleware to only run for manifest.json and icon files
export const config = {
  matcher: ['/manifest.json', '/android-chrome-192x192.png', '/android-chrome-512x512.png', '/apple-touch-icon.png'],
};
