import useSWR from 'swr';
import { ModeToggle } from '@/components/mode-toggle'
import Search from '@/components/Search'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import BookCard from './components/BookCard';
import { Paginate } from './components/paginate'

import Skeleton from './components/Skeleton';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setData, setIsLoading } from './store/slices/bookieSlice'
import { RootState } from './store/store';

function App() {

  const dispatch = useDispatch();
  const { isLoaded, url } = useSelector((state: RootState) => {
    return {
      isLoaded: state.bookie.isLoaded,
      url: state.bookie.url
    }
  }, shallowEqual) // * shallowEqual is used here to prevent unnecessary rerenders

  const { data, isLoading } = useSWR(() => isLoaded === true ? url : null, {
    onLoading: (isLoading: boolean) => {
      dispatch(setIsLoading(isLoading))
    },
    onSuccess: (data) => {
      dispatch(setData(data))
    }
  })

  return (
    <div className='container min-h-screen min-w-screen overflow-scroll'>
      <div className="flex flex-col justify-between min-h-[600px] w-full justify-items-center">
        <div className='flex w-full h-[56px] mt-1 items-center justify-between'>
          <Avatar className='mx-8'>
            <AvatarImage src="/assets/Bookie-9TJ1YYXn.png" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <div className="mx-8"><ModeToggle /></div>
        </div>

        <div className='my-4'>
          <h1 className="text-3xl font-bold text-center mb-4">🍄</h1>

          <Search />

          <p className='text-sm text-center mt-2'>Search the I.A's index of full-text books.</p>
        </div>

        <div className=''>
          {
            isLoading === true ?
              <Skeleton times={3} /> :
              <BookCard />
          }
        </div>
        <>
          {
            isLoading === false && data && <Paginate />
          }
        </>
      </div>
    </div>
  )
}

export default App
