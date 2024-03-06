import useSWR from 'swr';
import { Paginate } from '@/components/Paginate';
import Skeleton from '@/components/Skeleton';
import { ModeToggle } from '@/components/mode-toggle';
import Search from '@/components/Search';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import logo from '@/assets/Bookie.svg';
import { FaGithub } from "react-icons/fa";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setData, setIsLoaded, setIsLoading } from '@/store/slices/bookieSlice';
import { RootState } from '@/store/store';
import { Link } from 'react-router-dom';

export default function RootComponent({ Renderer }: { Renderer: () => JSX.Element }) {

    const dispatch = useDispatch();
    const { isLoaded, url } = useSelector((state: RootState) => {
        return {
            isLoaded: state.bookie.isLoaded,
            url: state.bookie.url,
            selectedValue: state.bookie.selectedValue
        }
    }, shallowEqual) // * shallowEqual is used here to prevent unnecessary rerenders

    // ? Better caching alternative? Maybe fetch and store data on a database?
    const { data, isLoading } = useSWR(() => isLoaded === true && url, {
        onLoading: (isLoading: boolean) => {
            dispatch(setIsLoading(isLoading))
        },
        onSuccess: (data) => {
            console.log("Data about to be sent to be disptached: ", data)
            dispatch(setData(data)) // * Here all that's needed is for the dispatch action to occur, the payload is ignored.
        }
    })

    const handleLinkClick = () => {
        dispatch(setIsLoaded(false))
        sessionStorage.removeItem("state");
    }

    return (
        <div className='container min-h-full min-w-xl'>
            <div className="flex flex-col justify-between min-h-screen w-full justify-items-center">
                <div className='flex w-full h-14 mt-1 items-center justify-between'>
                    <Link to='/'>
                        <span className='flex justify-center'>
                            <Avatar className='ml-8 mr-2'>
                                <AvatarImage src={logo} />
                                <AvatarFallback className='bg-stone-200 rounded-none'>B</AvatarFallback>
                            </Avatar>
                            <span className='m-auto'>
                                <p className="font-display font-bold text-md">Bookie ৹</p>
                            </span>
                        </span>
                    </Link>

                    <div className="flex m gap-2 mx-8">
                        <a className='m-auto' href="https://github.com/LinMihigo/Bookie" target="_blank">
                            <FaGithub size='1.8rem' />
                        </a>
                        <ModeToggle />
                    </div>
                </div>

                <div className='my-4' >
                    <div onClick={handleLinkClick}>
                        <Link to='/Search' >
                            <h1 className="text-3xl font-display font-bold text-center mb-4">Bookie</h1>
                        </Link>
                    </div>

                    <Search />

                    <p className='text-xs text-center mt-2'>Search the I.A's index of full-text books.</p>
                </div>

                <>
                    <div className={`mx-auto ${isLoaded === true && isLoading === false && `min-h-[560px]`}`}>
                        {isLoading === true ? <Skeleton /> : <Renderer />}
                    </div>
                    <>
                        {
                            isLoading === false && data && <Paginate />
                        }
                    </>
                </>

                <div className='w-full h-[2rem] text-center'>
                    <p className='inline mr-2 text-sm text-xs'>Powered by&nbsp;
                        <a className='hover:text-purple-500' href='https://openlibrary.org' target='_blank'>
                            OpenLibrary
                        </a>
                    </p>
                    <span>•</span>
                    <p className='inline ml-2 text-xs'>@2024&nbsp;
                        <a className='hover:text-indigo-500' href="https://linmihigo.github.io/about/" target="_blank">
                            {'<Threee />'}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}