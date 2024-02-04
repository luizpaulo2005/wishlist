import { CreateItemDialog } from "@/components/create-item-dialog"

const Page = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between gap-2">
                <CreateItemDialog />
            </div>
        </div>
    )
}

export default Page