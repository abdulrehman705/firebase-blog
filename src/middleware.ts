import { type NextRequest, NextResponse } from "next/server";

const hasAuthToken = (request: NextRequest) => {
  const cookie = request.cookies;
  const token = cookie.get("access_token");
  return token ? false : true;
};

export default function middleware(request: NextRequest) {
  if (hasAuthToken(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
