import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

const changeItemStatus = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params

    const item = await prisma.item.findFirst({
        where: { id }
    })

    if (item) {
        const update = await prisma.item.update({
            where: { id: item.id },
            data: {
                status: !item.status
            }
        })

        if (update) {
            return NextResponse.json("changed", { status: 200 })
        } else {
            return NextResponse.json("error", { status: 500 })
        }
    }
}

export { changeItemStatus as PATCH }