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
import { useEffect, useState } from "react"

export function Paginate() {

    const [count, setCount] = useState(10)

    const dispatch = useDispatch();

    const { data, limit, pageIndex, isLoaded } = useSelector((state: RootState) => {
        return {
            data: state.bookie.data,
            limit: state.bookie.limit,
            pageIndex: state.bookie.pageIndex,
            isLoaded: state.bookie.isLoaded
        }
    }, shallowEqual)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 400) {
                setCount(3);
            } else if (width <= 640) {
                setCount(5);
            } else {
                setCount(10);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial count on mount

        // Clean up the event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const content =
        <Pagination className='mb-4'>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className="hover:cursor-pointer" onClick={e => {
                        e.preventDefault()
                        pageIndex > 1 && dispatch(setPageIndex(pageIndex - 1))
                    }
                    } />
                </PaginationItem>

                {data && Array.from({ length: data.numFound / limit < 10 ? data.numFound / limit : count }, (_, i) => i + 1).map((i) => {
                    return (
                        <PaginationItem key={i}>
                            <PaginationLink className="hover:cursor-pointer" onClick={e => {
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
                    <PaginationNext className="hover:cursor-pointer" onClick={(e) => {
                        e.preventDefault()
                        data.numFound && pageIndex < data.numFound / limit ? dispatch(setPageIndex(pageIndex + 1)) : dispatch(setPageIndex(pageIndex))
                    }} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    return (
        <div className="mx-auto">
            {isLoaded === true && data !== null && content}
        </div>
    )
}