import { cn } from '../lib/utils';
import { Card, CardContent } from "@/components/ui/card"
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
                <Card key={res.count * Math.random()} className={cn("flex min-h-[40px] bg-stone-50 mb-2 mx-auto group-item hover:bg-stone-100 hover:dark:bg-stone-900")}>

                    <div className='my-auto ml-4 mr-4'>
                        <CardContent className="text-sm text-stone-900 dark:text-stone-100 p-0 ml-0">
                            ※ <a href={`https://openlibrary.org/subjects/`} target="_blank"><span className='text-indigo-500'>{res.name}</span></a><span> → Works: </span><span className='underline decoration-wavy decoration-indigo-500'>{res.work_count}</span>
                        </CardContent>
                    </div>
                </Card>
            );
        });
    }

    return (
        <div className='flex flex-row flex-wrap gap-2'>
            {content}
        </div>
    )
}

