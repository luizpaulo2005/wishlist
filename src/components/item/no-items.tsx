import { CreateItemDialog } from "./create-item-dialog"

const NoItems = () => {
    return (
        <div className="mx-auto mt-4 flex flex-col items-center justify-center gap-2">
            <p className="font-semibold text-xl">Nenhum item encontrado.</p>
            <CreateItemDialog />
        </div>
    )
}

export { NoItems }