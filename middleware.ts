import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
	// Example middleware logic
	
	return NextResponse.next();
}


