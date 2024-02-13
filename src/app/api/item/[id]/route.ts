import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const changeItemStatus = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  const item = await prisma.item.findFirst({
    where: { id },
  });

  if (item) {
    const update = await prisma.item.update({
      where: { id: item.id },
      data: {
        status: !item.status,
      },
    });

    if (update) {
      return NextResponse.json("changed", { status: 200 });
    } else {
      return NextResponse.json("error", { status: 500 });
    }
  }
};

const deleteItem = async (req: Request, { params }: { params: { id: string } }) => {
  const session = await getServerSession({ req, ...authOptions });

  if (session) {
    const { id } = params;

    const select = await prisma.item.findUnique({
      where: { id },
    });

    if (select) {
      const deleted = await prisma.item.delete({
        // @ts-ignore
        where: { id, user: { email: session.user?.email } },
      });

      return NextResponse.json(deleted, { status: 200 });
    } else {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
};

export { changeItemStatus as PATCH, deleteItem as DELETE };
