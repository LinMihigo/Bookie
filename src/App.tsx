import { useState } from 'react'
import useSWR from "swr"
import { ModeToggle } from '@/components/mode-toggle'
import Search from '@/components/Search'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import BookCard from './components/BookCard';
import { Paginate } from './components/paginate';
import Skeleton from './components/Skeleton';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    const target = e.target as typeof e.target & { 0: { value: string } };
    setSearchTerm(target[0].value);
    setPageIndex(1);
    setIsLoaded(true);
  };

  const { data, isLoading } = useSWR(
    isLoaded && `https://openlibrary.org/search.json?q=${searchTerm}&fields=*,availability&limit=10&page=${pageIndex}`
  )

  isLoaded && console.log(data, isLoaded, isLoading, searchTerm, pageIndex);

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

          <Search onSubmit={handleSubmit} />

          <p className='text-sm text-center mt-2'>Search the I.A's index of full-text books.</p>
        </div>

        <div className=''>
          {isLoading ? <Skeleton times={3} className="h-[190px] w-[800px] rounded-lg border border-slate-200 bg-slate-50 text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50" /> : isLoaded && data && <BookCard bookData={data.docs} isLoaded={isLoaded} isLoading={isLoading} />}
        </div>
        {isLoaded && data && !isLoading && <Paginate numFound={data.numFound} pageIndex={pageIndex} setPageIndex={setPageIndex} />}
      </div>
    </div>
  )
}

export default App
