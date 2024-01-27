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

interface cardProp {
    data: {
        docs: {
            key: string;
            title: string;
            author_name: string[];
            first_publish_year: number;
            cover_i: string;
            ebook_count_i: number;
            edition_count: string[]
            language: string;

        }[]
    }[];
    isLoaded: boolean
}

export default function BookCard({ data, isLoaded }: { data: cardProp["data"], isLoaded: cardProp["isLoaded"] }) {


    let content;

    if (isLoaded) {
        content = data && data.docs.map((res: cardProp["data"][0]["docs"][0]) => {
            return (

                <Card key={res.key} className={cn("flex w-[800px] min-h-[190px] bg-slate-50 mb-2 mx-auto")}>
                    <div className='w-[103px] h-[164px] my-auto ml-4'>
                        <img className='w-full h-full object-fit' src={`https://covers.openlibrary.org/b/id/${res.cover_i}-L.jpg`} />
                    </div>
                    <div className='min-w-[465px] my-auto ml-4 mr-4'>
                        <CardHeader className='p-0 pb-2'>
                            <CardTitle>{res.title}</CardTitle>
                            <CardDescription className='text-md text-slate-700 dark:text-slate-300'>By {res.author_name ? res.author_name.map((name: string, i: number) => {
                                while (i < 3) {
                                    if (i === res.author_name.length - 1 && res.author_name.length > 1) {
                                        return "and " + name;
                                    } else if (res.author_name.length === 1) {
                                        return name
                                    } else {
                                        return name + ", "
                                    }
                                }
                            }) : "-"}</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-slate-500 dark:text-slate-400 p-0 ml-0">
                            <p>First published in {res.first_publish_year}</p>
                            <p>{res.edition_count} editions, {res.ebook_count_i} ebooks, — <i>in</i> {res.language ? res.language.length : "-"} languages</p>

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

