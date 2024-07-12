import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const getItem = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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
    const item = await prisma.item.findUnique({
      where: {
        // Filtrando itens pelo id do usuário
        id: params.id,
        userId: user.id,
      },
    });

    if (!item) {
      // Retornando uma resposta de erro
      return NextResponse.json(
        { message: "Item não encontrados" },
        { status: 404 }
      );
    }

    // Retornando itens
    return NextResponse.json(item, { status: 200 });
  } catch (err) {
    // Retornando uma resposta de erro
    return NextResponse.json(
      { message: "Erro ao buscar item" },
      { status: 500 }
    );
  }
};

const updateItemSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
  value: z.number().positive().optional(),
  status: z.boolean().optional(),
});

const updateItem = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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

    // Recuperando e validando dados de entrada
    const { name, description, url, value, status } = updateItemSchema.parse(
      await req.json()
    );

    // Atualizando todos os itens do usuário
    const item = await prisma.item.update({
      where: {
        // Filtrando itens pelo id do usuário
        id: params.id,
        userId: user.id,
      },
      data: {
        name,
        description,
        url,
        value,
        status,
      },
    });

    if (!item) {
      // Retornando uma resposta de erro
      return NextResponse.json(
        { message: "Item não encontrado" },
        { status: 404 }
      );
    }

    // Retornando itens
    return NextResponse.json(item, { status: 200 });
  } catch (err) {
    // Retornando uma resposta de erro
    return NextResponse.json(
      { message: "Erro ao atualizar item" },
      { status: 500 }
    );
  }
};

const deleteItem = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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
    const item = await prisma.item.delete({
      where: {
        // Filtrando itens pelo id do usuário
        id: params.id,
        userId: user.id,
      },
    });

    if (!item) {
      // Retornando uma resposta de erro
      return NextResponse.json(
        { message: "Item não encontrado" },
        { status: 404 }
      );
    }

    // Retornando itens
    return NextResponse.json(item, { status: 200 });
  } catch (err) {
    // Retornando uma resposta de erro
    return NextResponse.json(
      { message: "Erro ao deletar item" },
      { status: 500 }
    );
  }
};

export { getItem as GET, updateItem as PATCH, deleteItem as DELETE };
