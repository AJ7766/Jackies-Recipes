import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = (process.env.JWT_SECRET as string);

export function authenticate(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  
  if (!token) {
    return NextResponse.json({ message: "Access denied. No token provided." }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    (request as any).user = decoded; // Attach the user to the request
    return NextResponse.next();
  } catch (ex) {
    return NextResponse.json({ message: "Invalid token." }, { status: 401 });
  }
}