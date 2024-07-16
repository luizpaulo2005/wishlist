import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

const getItems = async (req: NextRequest) => {
  try {
    // Coletando a sessão do usuário
    const session = await getServerSession({ req, ...authOptions });

    if (!session) {
      // Retornando uma resposta de erro
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    // Buscando dados do usuário logado
    const user = await prisma.user.findUnique({
      where: {
        // Buscando usuário pelo email
        // @ts-ignore
        email: session.user.email,
      },
    });

    // Verificando se o usuário foi encontrado
    if (!user) {
      // Retornando uma resposta de erro
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Buscando todos os itens do usuário
    const items = await prisma.item.findMany({
      where: {
        // Filtrando itens pelo id do usuário
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    if (!items) {
      // Retornando uma resposta de erro
      return NextResponse.json(
        { message: "Itens não encontrados" },
        { status: 404 }
      );
    }

    if (items.length === 0) {
      // Retornando uma resposta de erro
      return NextResponse.json(
        { message: "Sem itens adicionados" },
        { status: 404 }
      );
    }

    // Retornando itens
    return NextResponse.json(items, { status: 200 });
  } catch (err) {
    // Retornando uma resposta de erro
    return NextResponse.json(
      { message: "Erro ao buscar itens", error: err },
      { status: 500 }
    );
  }
};

const createItemSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  url: z.string().optional().or(z.string().url("O link do item deve ser uma URL válida")),
  value: z.number().positive(),
});

const createItem = async (req: NextRequest) => {
  try {
    // Coletando a sessão do usuário
    const session = await getServerSession({ req, ...authOptions });

    if (!session) {
    // Retornando uma resposta de erro
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    // Buscando dados do usuário logado
    const user = await prisma.user.findUnique({
    where: {
        // Buscando usuário pelo email
        // @ts-ignore
        email: session.user.email,
    },
    });

    // Verificando se o usuário foi encontrado
    if (!user) {
    // Retornando uma resposta de erro
    return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
    );
    }

    // Coletando dados do item
    const { name, description, url, value } = createItemSchema.parse(
      await req.json()
    );

    // Criando um novo item
    const item = await prisma.item.create({
      data: {
        name,
        description,
        url,
        value,
        // Adicionando o id do usuário ao item
        userId: user.id,
      },
    });

    // Retornando o item criado
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    // Retornando uma resposta de erro
    return NextResponse.json(
      { message: "Erro ao criar item", error: err },
      { status: 500 }
    );
  }
};

export { getItems as GET, createItem as POST };