import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ReactElement } from 'react';
export default function Skeleton() {
    const selectedValue = useSelector((state: RootState) => state.bookie.selectedValue);

    const times = (selectedValue: string) => {
        if (selectedValue === 'All' || selectedValue === "Title") {
            return 3
        } else if (selectedValue === "Author") {
            return 6
        } else if (selectedValue === "Subject") {
            return 18
        }
    }

    let renderer: ReactElement;
    if (selectedValue === 'All' || selectedValue === "Title") {
        renderer =
            <div className="flex h-[190px] w-[800px] mt-4 mb-2 mx-auto rounded-lg border border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950">
                <div className="flex animate-pulse my-auto ml-4">

                    <div className=" flex-1 min-w-[103px] min-h-[164px] w-[103px] h-[164px] rounded bg-stone-300 dark:bg-stone-900"></div>

                    <div className="flex flex-col gap-2 justify-center min-w-[465px] my-auto ml-4 mr-4">
                        <div className="p-3.5 w-[300px] bg-stone-300 dark:bg-stone-900 rounded"></div>
                        <div className="p-2.5 w-[150px] bg-stone-300 dark:bg-stone-900 rounded"></div>
                        <div className="p-2 w-[200px] bg-stone-300 dark:bg-stone-900 rounded"></div>
                        <div className="p-2 w-[250px] bg-stone-300 dark:bg-stone-900 rounded"></div>
                        <div className="p-5 h-6 bg-stone-300 dark:bg-stone-900 rounded"></div>
                    </div>

                    <div className="flex flex-col ml-7 gap-2 justify-center p-2 rounded min-h-[15px] min-w-[60px]">
                        <div className="pr-20 pl-10 pt-8 bg-stone-300 dark:bg-stone-900 rounded"></div>
                        <div className="pr-20 pl-10 pt-8 bg-stone-300 dark:bg-stone-900 rounded"></div>
                        <div></div>
                    </div>
                </div>
            </div>
    } else if (selectedValue === "Author") {
        renderer =
            <div className="flex h-[190px] w-[380px] mx-auto mt-4 mb-2 rounded-lg border border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950">
                <div className="flex animate-pulse max-w-[350px] my-auto ml-4">
                    <div className=" flex min-w-[103px] min-h-[164px] w-[103px] h-[164px] rounded bg-stone-300 dark:bg-stone-900"></div>

                    <div className="flex flex-col gap-2 justify-center min-w-[165px] ml-4">
                        <div className="p-3.5 w-[180px] bg-stone-300 dark:bg-stone-900 rounded"></div>
                        <div className="p-2.5 w-[150px] bg-stone-300 dark:bg-stone-900 rounded"></div>
                        <div className="p-2 w-[120px] bg-stone-300 dark:bg-stone-900 rounded"></div>
                        <div className="p-2 w-[170px] bg-stone-300 dark:bg-stone-900 rounded"></div>
                        <div className="p-2 w-[120px] bg-stone-300 dark:bg-stone-900 rounded"></div>
                    </div>
                </div>
            </div>
    } else if (selectedValue === "Subject") {
        renderer =
            <div className="flex flex-row gap-2 animate-pulse ml-3 pb-2">
                <div className="h-6 w-60 bg-stone-300 dark:bg-stone-900 rounded"></div>
                <div className="h-6 w-40 bg-stone-300 dark:bg-stone-900 rounded"></div>
                <div className="h-6 w-60 bg-stone-300 dark:bg-stone-900 rounded"></div>
                <div className="h-6 w-20 bg-stone-300 dark:bg-stone-900 rounded"></div>
            </div>
    }

    return (
        <div className={selectedValue === "Author" ? "grid grid-cols-2" : ""}>
            {
                Array(times(selectedValue)).fill(0).map((_, i) => {
                    return (
                        <div key={i} >
                            {renderer}
                        </div>
                    )
                }
                )
            }
        </div>
    );
}
