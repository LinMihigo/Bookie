import React from "react";

interface editionProps {
    res: {
        edition_key: string[]
        edition_count: number
    }
}
export default function Editions({ res }: { res: editionProps["res"] }) {

    const placeholder = 'https://placehold.co/40x60?text=*'
    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.target as HTMLImageElement
        if (img.naturalHeight < 5) {
            img.src = placeholder;
        }
    }

    const renderer = res.edition_key ? res.edition_key.slice(0, 10).map((ed: string) => {

        return (
            <div key={ed} className='mr-1 w-[38px] h-[58px]'>
                <img
                    className='w-full h-full object-fit'
                    src={`https://covers.openlibrary.org/b/olid/${ed}-L.jpg`}
                    alt={ed}
                    onLoad={handleImageLoad}
                />
            </div>
        )

    }) : null;

    return (
        <div className='flex mt-1'>{renderer}</div>
    )
}