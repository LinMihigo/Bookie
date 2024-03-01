import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setPageIndex } from '../store/slices/bookieSlice'
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export function Paginate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, limit, pageIndex, selectedValue, isLoaded } = useSelector((state: RootState) => {
        return {
            data: state.bookie.data,
            limit: state.bookie.limit,
            pageIndex: state.bookie.pageIndex,
            selectedValue: state.bookie.selectedValue,
            isLoaded: state.bookie.isLoaded
        }
    }, shallowEqual)

    useEffect(() => {
        navigate(`/Search?${selectedValue}&page=${pageIndex}`)
    }, [navigate, pageIndex, selectedValue])

    const content =
        <Pagination className='mb-4'>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={`/${pageIndex}`} onClick={e => {
                        e.preventDefault()
                        pageIndex > 1 && dispatch(setPageIndex(pageIndex - 1))
                    }
                    } />
                </PaginationItem>

                {Array.from({ length: data.numFound / limit < 10 ? data.numFound / limit : 10 }, (_, i) => i + 1).map((i) => {
                    return (
                        <PaginationItem key={i}>
                            <PaginationLink href={`/${pageIndex}`} onClick={e => {
                                e.preventDefault()
                                console.log(e)
                                dispatch(setPageIndex(i))
                            }
                            }
                                isActive={i === pageIndex}
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href={`/${pageIndex}`} onClick={(e) => {
                        e.preventDefault()
                        data.numFound && pageIndex < data.numFound / limit ? dispatch(setPageIndex(pageIndex + 1)) : dispatch(setPageIndex(pageIndex))
                    }} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    return (
        <div>
            {isLoaded === true && data !== null && content}
        </div>
    )
}