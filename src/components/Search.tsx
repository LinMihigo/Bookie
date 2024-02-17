import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import SelectSearchOption from "./selectSearchOption"
import { useDispatch } from 'react-redux'
import { setIsLoaded, setSearchTerm } from '../store/slices/bookieSlice'

export default function Search() {

    const dispatch = useDispatch();

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
        const target = e.target as typeof e.target & { 2: { value: string } };
        dispatch(setSearchTerm(target[2].value))
        dispatch(setIsLoaded(true))
        console.log("Search term: ", target[2].value)
    };

    return (
        <form onSubmit={handleSearchSubmit} className="flex w-full max-w-lg mx-auto space-x-1">
            <SelectSearchOption />
            <Input name='search' placeholder="Search ..." />
            <Button type="submit">Search</Button>
        </form>
    )
}