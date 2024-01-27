
export default function Editions({ res }) {

    const placeholder = 'https://placehold.co/40x60?text=*'
    const handleImageLoad = (event) => {
        if (event.target.naturalHeight < 5) {
            event.target.src = placeholder;
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