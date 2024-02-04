import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { NextResponse } from "next/server";
import { z } from "zod";

const getItems = async (req: Request) => {
  const session = await getServerSession({ req, ...authOptions });

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        email: session?.user?.email,
      },
    });

    const select = await prisma.item.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: user?.id,
      },
    });

    return NextResponse.json(select, { status: 200 });
  } else {
    return NextResponse.json("Unauthenticated", { status: 401 });
  }
};

const createItemSchema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  description: z.string().optional(),
  url: z.string().optional(),
  price: z.coerce.number(),
});

const createItem = async (req: Request) => {
  const session = await getServerSession({ req, ...authOptions });

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        email: session?.user?.email,
      },
    });

    const { name, description, url, price } = createItemSchema.parse(
      await req.json()
    );

    const create = await prisma.item.create({
      data: {
        name,
        description,
        url,
        price,
        // @ts-ignore
        userId: user.id,
      },
    });

    if (create) {
      return NextResponse.json(create, { status: 201 });
    } else {
      return NextResponse.json("Error creating item", { status: 500 });
    }
  } else {
    return NextResponse.json("Unauthenticated", { status: 401 });
  }
};

export { getItems as GET, createItem as POST };
