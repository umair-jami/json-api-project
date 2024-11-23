import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
    }

    const posts = await res.json();
    
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
