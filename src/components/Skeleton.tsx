export default function Skeleton({ times }: { times: number }) {
    // Alternative: A simple for loop.
    const renderedItems = Array(times).fill(0).map((_, i) => {
        return (
            <div key={i} className="flex h-[190px] w-[800px] mb-2 mx-auto rounded-lg border border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950">
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
                        <div className="pr-20 pl-10 pt-8 bg-stone-300 dark:bg-stone-900"></div>
                        <div className="pr-20 pl-10 pt-8 bg-stone-300 dark:bg-stone-900"></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    })

    return renderedItems;
}
