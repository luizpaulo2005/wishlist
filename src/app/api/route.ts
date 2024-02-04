import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { NextResponse } from "next/server"

const GET = async (req: Request) => {
    const session = await getServerSession({ req, ...authOptions })

    if (session) {
        return NextResponse.json("Hello World, you are authenticated")
    } else {
        return NextResponse.json("Hello World")
    }
}

export { GET }