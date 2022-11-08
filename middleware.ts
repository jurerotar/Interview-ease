import { NextRequest, NextResponse } from 'next/server';
import CookieNames from '@enums/cookie-names';

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
  const response = NextResponse.next();
  const { cookies } = req;
  const preferences = cookies.get(CookieNames.PREFERENCES);

  if (!preferences) {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    response.cookies.set(CookieNames.PREFERENCES, 'dark', {
      sameSite: 'lax',
      maxAge: 3600 * 24 * 12 * 1000
    });
  }

  return response;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|static|images).*)'
  ]
};
