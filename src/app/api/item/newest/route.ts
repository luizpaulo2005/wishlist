import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const getNewestItems = async (req: Request) => {
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
      // Ordenando itens por data de criação
      orderBy: {
        createdAt: "desc",
      },
      // Limitando a quantidade de itens retornados
      take: 5,
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

export { getNewestItems as GET };
