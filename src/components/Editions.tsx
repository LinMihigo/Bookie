import React from "react";
import { useState, useEffect } from "react";

interface editionProps {
    res: {
        edition_key: string[]
        edition_count: number
        title: string
    }
}
export default function Editions({ res }: { res: editionProps["res"] }) {

    const [count, setCount] = useState(10)

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
    }, [])

    const placeholder = 'https://placehold.jp/50/3d4070/ffffff/400x600.png?text=No%20img%20found'
    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.target as HTMLImageElement
        if (img.naturalHeight < 5) {
            img.src = placeholder;
        }
    }

    const renderer = res.edition_key ? res.edition_key.slice(0, count).map((ed: string) => {

        return (
            <div key={ed} className='mr-1 w-[38px] h-[58px] transition-transform duration-500 ease-in-out transform hover:scale-110 opacity-80 hover:opacity-100'>
                <a href={`https://openlibrary.org/books/${ed}`} target="_blank">
                    <img
                        className='w-full h-full object-fit rounded'
                        src={`https://covers.openlibrary.org/b/olid/${ed}-L.jpg`}
                        alt={`Edition: ${ed}`}
                        onLoad={handleImageLoad}
                    />
                </a>
            </div>
        )

    }) : null;

    return (
        <div className='flex mt-1'>{renderer}</div>
    )
}