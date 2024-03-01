import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { useDispatch } from 'react-redux'
import { setSelectedValue } from "@/store/store"

export default function SelectSearchOption() {

    // * Piece of state needed: selectedValue

    const dispatch = useDispatch();
    const handleValueChange = (value: string | null) => {
        console.log(value)
        dispatch(setSelectedValue(value))
    }

    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent >
                <SelectGroup>
                    <SelectItem value="All" >All</SelectItem>
                    <SelectItem value="Title" >Title</SelectItem>
                    <SelectItem value="Author">Author</SelectItem>
                    <SelectItem value="Subject">Subject</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}