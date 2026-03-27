import { NextRequest, NextResponse } from "next/server";
import { appendFileSync } from "fs";
import { join } from "path";

const FILE = join(process.cwd(), "data", "emails.txt");

export async function POST(req: NextRequest) {
  const { email, project } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const line = `${new Date().toISOString()} | ${email.trim()} | ${project ?? ""}\n`;

  try {
    const { mkdirSync } = await import("fs");
    mkdirSync(join(process.cwd(), "data"), { recursive: true });
    appendFileSync(FILE, line, "utf8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
