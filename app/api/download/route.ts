import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const contents = await prisma.contents.findMany({
  where: { platform: "WEB", type: { in: ["image", "link"] } },
  select: { id: true, data: true },
});

    const urls = contents.map((c) => c.data);
    // console.log(urls);
   return NextResponse.json({ urls: contents });
  } catch (err) {
    console.error("Error fetching contents:", err);
    return NextResponse.json({ error: "Failed to fetch contents" }, { status: 500 });
  }
}
