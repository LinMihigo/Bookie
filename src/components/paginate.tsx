import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface paginateProp {
    numFound: number
}

export function Paginate({ numFound, pageIndex, setPageIndex }: { numFound: paginateProp["numFound"], pageIndex: number, setPageIndex: (pageIndex: number) => void }) {

    return (
        <Pagination className='mb-4'>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={`/${pageIndex}`} onClick={e => {
                        e.preventDefault()
                        pageIndex > 1 && setPageIndex(pageIndex - 1)
                    }
                    } />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href={`/${pageIndex}`} onClick={e => {
                        e.preventDefault()
                        setPageIndex(1)
                    }
                    }>
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href={`/${pageIndex}`} onClick={e => {
                        e.preventDefault()
                        setPageIndex(2)
                    }
                    }
                        isActive
                    >
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href={`/${pageIndex}`} onClick={e => {
                        e.preventDefault()
                        setPageIndex(3)
                    }
                    }>
                        3
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href={`/${pageIndex}`} onClick={(e) => {
                        e.preventDefault()
                        numFound && pageIndex < numFound / 10 ? setPageIndex(pageIndex + 1) : setPageIndex(pageIndex)
                    }} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
