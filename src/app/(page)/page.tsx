import { CreateItemDialog } from "@/components/create-item-dialog"
import { ItemsTable } from "@/components/items-table"

const Page = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between gap-2">
                <CreateItemDialog />
            </div>

            <ItemsTable />
        </div>
    )
}

export default Page