import { cn } from '../lib/utils';
import {
    Card,
    CardDescription,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import { Button } from './ui/button';
import Editions from '@/components/editions';
import React from 'react';

interface bookCardProp {
    bookData: {
        key: string;
        title: string;
        author_name: string[];
        first_publish_year: number;
        cover_i: string;
        ebook_count_i: number;
        edition_count: number
        language: string[];
        edition_key: string[]
    }[];
    isLoaded: boolean;
    isLoading: boolean;
}

export default function BookCard({ bookData, isLoaded, isLoading }: bookCardProp) {

    let content;
    if (isLoaded && !isLoading) {
        content = bookData && bookData.map((res: bookCardProp["bookData"][0]) => {
            return (

                <Card key={res.key} className={cn("flex w-[800px] min-h-[190px] bg-stone-50 mb-2 mx-auto")}>
                    <div className='min-w-[103px] min-h-[164px] w-[103px] h-[164px] my-auto ml-4'>
                        <img className='w-full h-full object-fit rounded'
                            src={`https://covers.openlibrary.org/b/id/${res.cover_i}-L.jpg`}
                            alt={`Cover of ${res.title}`}
                            onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                const img = e.target as HTMLImageElement
                                if (img.naturalHeight < 5) {
                                    img.src = 'https://placehold.jp/50/3d4070/ffffff/1030x1640.png?text=No%20img%20found'
                                }
                            }}
                        />
                    </div>
                    <div className='min-w-[465px] my-auto ml-4 mr-4'>
                        <CardHeader className='p-0 pb-2'>
                            <CardTitle>{res.title.length > 40 ? `${res.title.substring(0, 35)}...` : res.title}</CardTitle>
                            <CardDescription className='text-md text-stone-700 dark:text-stone-300'>By
                                {" "}
                                {res.author_name ?
                                    res.author_name.slice(0, 3).map((name: string, i: number) => {
                                        if (i < res.author_name.length - 1 && name.length < 50 && res.author_name.length > 1) {
                                            return name + ", "
                                        } else if (name.length > 50) {
                                            return `${name.substring(0, 50)}...`
                                        } else if (i === res.author_name.length - 1 && res.author_name.length !== 1) {
                                            return "and " + name
                                        } else {
                                            return name
                                        }
                                    }) :
                                    "Couldn't fetch author name(s)"
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-stone-500 dark:text-stone-400 p-0 ml-0">
                            <p>First published in {res.first_publish_year}</p>
                            <p>
                                {res.edition_count === 1 ? `${res.edition_count} edition` : `${res.edition_count} editions`},
                                {" "}
                                {res.ebook_count_i === 1 ? `${res.ebook_count_i} e-book` : `${res.ebook_count_i} e-books`}
                                {
                                    res.language && <span>
                                        , — <i>in</i> {typeof res.language === 'undefined'
                                            ? '- languages'
                                            : typeof res.language !== 'undefined' && res.language.length <= 1
                                                ? res.language.length + ' language'
                                                : res.language.length + ' languages'
                                        }
                                    </span>
                                }

                            </p>

                            <Editions res={res} />
                        </CardContent>
                    </div>
                    <CardFooter className='flex flex-col gap-2 justify-center p-4'>
                        <Button className="w-[150px]">View Details</Button>
                        <Button variant='outline' className="w-[150px]">Read</Button>
                    </CardFooter>
                </Card>
            );
        });
    }

    return (
        <div>
            {content}
        </div>
    )
}

