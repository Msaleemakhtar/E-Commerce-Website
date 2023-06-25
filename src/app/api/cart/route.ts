import { db, cartTable } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";





export async function GET(request: NextRequest) {
  let url = request.nextUrl.searchParams;
  try {
    if (url.has("user_id")) {
      let cartData = await db
        .select()
        .from(cartTable)
        .where(eq(cartTable.user_id, url.get("user_id") as string));
      return NextResponse.json({ cartData });
    }
  } catch (error) {
    console.log("error : ", (error as { message: string }).message);
    return NextResponse.json({ error });
  }
}




export async function POST (request: NextRequest) {
  let res = await request.json();

  try {
    if (res.product_id && res.user_id && res.price && res.quantity) {
      let response = await db.insert(cartTable).values(res).returning();
      return NextResponse.json({ response });
    } else {
      throw new Error("put all data");
    }
  } catch (error) {
    console.log("error : ", (error as { message: string }).message);
    return NextResponse.json({ error });
  }
}






export async function PUT(request: NextRequest) {
  let res = await request.json();

  try {
    let response = await db
      .update(cartTable)
      .set(res)
      .where(
        and(
          eq(cartTable.product_id, res.product_id),
          eq(cartTable.user_id, res.user_id)
        )
      )
      .returning();
    return NextResponse.json({ response });
  } catch (error) {
    console.log("error : ", (error as { message: string }).message);
    return NextResponse.json({ error });
  }
}




export async function DELETE(request: NextRequest) {
  let url = request.nextUrl.searchParams;
  try {
    if(url.has("user_id") && url.has("product_id")) {
      let cartData = await db
        .delete(cartTable)
        .where(
          and(
            eq(cartTable.user_id, (url.get("user_id") as string)),
            eq(cartTable.product_id, (url.get("product_id") as string))
          )
        ).returning()

      return NextResponse.json({ cartData });
    }
  } catch (error) {
    console.log("error : ", (error as { message: string }).message);
    return NextResponse.json({ error });
  }
}
