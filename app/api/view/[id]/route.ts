// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;

//   const content = await prisma.contents.findUnique({
//     where: { id },
//     select: { data: true },
//   });

//   if (!content) {
//     return NextResponse.json({ error: "File not found" }, { status: 404 });
//   }

//   const url = content.data;
//   const response = await fetch(url);

//   if (!response.ok) {
//     return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 });
//   }

//   const buffer = await response.arrayBuffer();
//   const contentType =
//     response.headers.get("content-type") || "image/png";

//   return new NextResponse(buffer, {
//     headers: {
//       "Content-Type": contentType,
//       "Content-Disposition": "inline", 
//     },
//   });
// }
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } =await  params;

  //console.log("shortId:", shortId); // should print the last 6 chars
  // ...}

  // Find matching record by last 6 chars of data

  const content = await prisma.contents.findFirst({
    where: {data: {endsWith: id,},  platform: {in:["WEB","BOTH"]}, type: { in: ["image", "link"] }     },
    select: { data: true },
  });

    console.log(id);
    console.log({content});
  if (!content) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const url = content.data;
  const response = await fetch(url);

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 });
  }

  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type") || "image/png";

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": "inline",
    },
  });
}
