import React from 'react';
import { cn } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from './ui/button';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Sort } from './Sort';

export default function AuthorCard() {
    const { data, isLoaded, isLoading } = useSelector((state: RootState) => {
        return {
            data: state.bookie.data,
            isLoaded: state.bookie.isLoaded,
            isLoading: state.bookie.isLoading
        }
    }, shallowEqual)

    let content;
    if (isLoaded === true && isLoading === false && data) {
        const bookData = data.docs
        console.log("Data about to be rendered: ", bookData)
        content = bookData && bookData.map((res) => {

            return (

                // * res stands for response...
                <Card key={res.key} className={cn("flex max-w-[380px] min-h-[190px] bg-stone-50 p-2")}>
                    <div className='w-[140px] h-[164px] my-auto ml-3'>
                        <a href={`https://openlibrary.org/authors/${res.key}/works?limit=100`} target="_blank">
                            <img className='w-full h-full object-cover rounded'
                                src={`https://covers.openlibrary.org/a/olid/${res.key}-L.jpg`}
                                alt={`Cover of ${res.name}`}
                                onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                    const img = e.target as HTMLImageElement
                                    if (img.naturalHeight < 5) {
                                        img.src = 'https://placehold.jp/50/3d4070/ffffff/1030x1640.png?text=No%20img%20found'
                                    }
                                }}
                            />
                        </a>
                    </div>
                    <div className='min-w-[160px] my-auto ml-4'>
                        <CardHeader className='p-0 pb-2'>
                            {/* TODO: Need to fix author redirect link */}
                            <a href={`https://openlibrary.org/authors/${res.key}/works?limit=100}`} target="_blank">
                                <CardTitle>{res.name.length > 40 ? `${res.name.substring(0, 35)}...` : res.name}</CardTitle>
                            </a>
                        </CardHeader>
                        <CardContent className="text-sm text-stone-900 dark:text-stone-100 p-0 ml-0">
                            <p>Born: {res.birth_date ? res.birth_date : "-"}</p>
                            <p>
                                {res.work_count === 1 ? `Works: ${res.work_count}` : `Works: ${res.work_count}`}
                            </p>
                            <p className='text-stone-900 dark:text-stone-100'>Best work: {res.top_work.length > 40 ? `${res.top_work.substring(0, 35)}...` : res.top_work}</p>
                        </CardContent>
                        <CardFooter className='p-0 pt-2'>
                            <Button
                                variant='outline'
                                className="w-40"
                                onClick={() => {
                                    res.key ?
                                        window.open(`https://openlibrary.org/authors/${res.key}/works?limit=100`, '_blank')
                                        : alert("No profile available for this author")
                                }
                                }
                            >
                                More
                            </Button>
                        </CardFooter>
                    </div>

                </Card>
            );
        });
    }

    return (
        <div className=''>
            {isLoaded === true && isLoading === false && <Sort />}
            <div className='flex flex-wrap gap-2 p-auto justify-center max-w-200'>

                {content}

            </div>
        </div>
    )
}

