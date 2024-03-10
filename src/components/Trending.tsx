import { useState, useRef, MouseEvent } from "react"
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useSWR from "swr";

interface Res {
    cover_i: number,
    key: string
}
export default function TrendingCarousel() {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    const isLoaded = useSelector((state: RootState) => state.bookie.isLoaded)

    const { data, isLoading } = useSWR("https://openlibrary.org/trending/monthly.json")
    console.log(data)

    const handleMouseEnter = (event: MouseEvent<HTMLDivElement>, i: number) => {
        console.log(event)
        setHoveredIndex(i)
    }

    const handleMouseLeave = () => {
        setHoveredIndex(null)
    }

    return (
        <div className={`flex justify-center items-center ${isLoaded === false && "max-h-50"}`}>
            <Carousel
                plugins={[plugin.current]}
                className="w-auto max-w-2xl"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {!isLoading && data.works.slice(0, 20).map((res: Res, i: number) => (
                        <CarouselItem
                            key={i}
                            className='flex justify-center items-center basis-auto'
                            onMouseEnter={(event) => handleMouseEnter(event, i)}
                            onMouseLeave={() => handleMouseLeave()}
                        >

                            <CardContent className={`p-0 ${hoveredIndex === i && 'opacity-70'}`}>
                                <Card className="max-h-48">
                                    <div className="relative p-0">
                                        <img
                                            src={`https://covers.openlibrary.org/b/id/${res.cover_i}-L.jpg`}
                                            className="w-full h-48 object-cover rounded"
                                        />
                                    </div>
                                </Card>
                            </CardContent>
                            {hoveredIndex === i && <a className="flex justify-center items-center h-48 w-full absolute p-0" href={`https://openlibrary.org${res.key}`} target="_blank">
                                <FaEye size={20} />
                            </a>}

                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}