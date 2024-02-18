import React from 'react';
import { cn } from '../lib/utils';
import { Card, CardDescription, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from './ui/button';
import Editions from '@/components/Editions';
import { Sort } from './Sort';
import Preview from '@/components/Preview'
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function BookCard() {

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

                // * res stands for response
                <Card key={res.key} className={cn("flex w-[800px] min-h-[190px] bg-stone-50 mb-2 mx-auto")}>
                    <div className='min-w-[103px] min-h-[164px] w-[103px] h-[164px] my-auto ml-4'>
                        <a href={`https://openlibrary.org${res.key}?edition=key%3A/books/${res.cover_edition_key}`} target="_blank">
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
                        </a>
                    </div>
                    <div className='min-w-[465px] my-auto ml-4 mr-4'>
                        <CardHeader className='p-0 pb-2'>
                            <a href={`https://openlibrary.org${res.key}?edition=key%3A/books/${res.cover_edition_key}`} target="_blank">
                                <CardTitle>{res.title.length > 40 ? `${res.title.substring(0, 35)}...` : res.title}</CardTitle>
                            </a>

                            <CardDescription className='text-md text-stone-700 dark:text-stone-300'>By
                                {" "}
                                {res.author_name ?
                                    res.author_name.slice(0, 3).map((name: string, i: number) => {
                                        if (i < res.author_name.length - 1 && name.length < 50 && res.author_name.length > 1) {
                                            return <a key={i} href={`https://openlibrary.org/authors/${res.author_key[i]}`} target='_blank'>{name + ", "}</a>
                                        } else if (name.length > 50) {
                                            return <a key={i} href={`https://openlibrary.org/authors/${res.author_key[i]}`} target='_blank'>{`${name.substring(0, 50)}...`}</a>
                                        } else if (i === res.author_name.length - 1 && res.author_name.length !== 1) {
                                            return <a key={i} href={`https://openlibrary.org/authors/${res.author_key[i]}`} target='_blank'>{"and " + name}</a>
                                        } else {
                                            return <a key={i} href={`https://openlibrary.org/authors/${res.author_key[i]}`} target='_blank'>{name}</a>
                                        }
                                    }) :
                                    "Couldn't fetch author name(s)"
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-stone-500 dark:text-stone-400 p-0 ml-0">
                            <p>First published in {res.first_publish_year}</p>
                            <p className='text-stone-600'>
                                <a className='text-stone-900' href={`https://openlibrary.org${res.key}?edition=key%3A/books/${res.cover_edition_key}&mode=all#editions-list`} target="_blank">
                                    {res.edition_count === 1 ? `${res.edition_count} edition` : `${res.edition_count} editions`}
                                </a>,
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
                        <Preview {...res} />
                        <Button
                            variant='outline'
                            className="w-[150px]"
                            onClick={() => {
                                res.ia_loaded_id ?
                                    window.open(`https://archive.org/details/${res.ia_loaded_id[0]}/mode/2up?view=theater`, '_blank')
                                    : alert("No bookreader link available for this work!")
                            }
                            }
                        >
                            Read
                        </Button>
                    </CardFooter>
                </Card>
            );
        });
    }

    return (
        <div>
            <Sort />
            {content}
        </div>
    )
}

