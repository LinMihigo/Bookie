import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useDispatch, useSelector } from "react-redux"
import { RootState, setSort } from "@/store/store"
export function Sort() {
    const dispatch = useDispatch()
    const selectedValue = useSelector((state: RootState) => state.bookie.selectedValue)
    const data = useSelector((state: RootState) => state.bookie.data)
    let sort
    if (selectedValue === "All" || selectedValue === 'Title') {
        sort =
            <ToggleGroup className="w-fit inline ml-1" type="multiple" aria-label="Toggle sorting options for all and title pages" onValueChange={(value) => value && dispatch(setSort(value))}>
                <ToggleGroupItem value="editions" className="w-fit h-fit px-2 hover:text-stone-800 hover:bg-indigo-100" aria-label="Toggle editions">Editions</ToggleGroupItem>
                <ToggleGroupItem value="rating" className="w-fit h-fit px-2 hover:text-stone-800 hover:bg-indigo-100" aria-label="Toggle top rated">Top rated</ToggleGroupItem>
                <ToggleGroupItem value="old" className="w-fit h-fit px-2 hover:text-stone-800 hover:bg-indigo-100" aria-label="Toggle relevance">First published</ToggleGroupItem>
                <ToggleGroupItem value="new" className="w-fit h-fit px-2 hover:text-stone-800 hover:bg-indigo-100" aria-label="Toggle most recent">Most recent</ToggleGroupItem>
                <ToggleGroupItem value="random" className="w-fit h-fit px-2 hover:text-stone-800 hover:bg-indigo-100" aria-label="Toggle most recent">Random</ToggleGroupItem>
            </ToggleGroup>
    } else if (selectedValue === 'Author') {
        sort =
            <ToggleGroup className="w-fit inline ml-1" type="multiple" aria-label="Toggle sorting options for all and title pages" onValueChange={(value) => value && dispatch(setSort(value))}>
                <ToggleGroupItem value="work_count+desc" className="w-fit h-fit px-2 hover:text-stone-800 hover:bg-indigo-100" aria-label="Toggle editions">Work Count</ToggleGroupItem>
                <ToggleGroupItem value="random" className="w-fit h-fit px-2 hover:text-stone-800 hover:bg-indigo-100" aria-label="Toggle most recent">Random</ToggleGroupItem>
            </ToggleGroup>
    } else {
        sort = null
    }

    return (
        <div className="flex justify-between mx-2 mb-2 my-auto text-sm">
            <span>
                <span className="font-black text-indigo-500 dark:text-purple-500">※ </span>
                <span>Sorted by:</span>
                <span>{sort}</span>
            </span>
            <span className="px-2">
                <span>→ </span>
                <span className="underline decoration-wavy decoration-indigo-500">{data && `${data.numFound}`}</span>
                <span> hits</span>
            </span>
        </div>
    )
}