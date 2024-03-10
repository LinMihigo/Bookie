import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoaded, setSearchTerm } from '../store/slices/bookieSlice'
import SelectSearchOption from "./SelectSearchOption"
import { useSearchParams } from "react-router-dom"
import { RootState } from '@/store/store'

export default function Search() {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedValue = useSelector((state: RootState) => state.bookie.selectedValue)
    const searchTerm = useSelector((state: RootState) => state.bookie.searchTerm)
    const pageIndex = useSelector((state: RootState) => state.bookie.pageIndex)
    const isLoaded = useSelector((state: RootState) => state.bookie.isLoaded)

    useEffect(() => {

        isLoaded === true && setSearchParams({ q: searchTerm, page: pageIndex.toString() })

        console.log("searchParams: ", searchParams)
    }, [isLoaded, searchParams, selectedValue, setSearchParams, pageIndex, searchTerm])

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
            <Input className="placeholder:italic lg:min-w-96" name='search' placeholder="Search ..." />
            <Button type="submit">Search</Button>
        </form>
    )
}