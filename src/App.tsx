import { useState } from 'react'
import fetch from './api';
import { ModeToggle } from '@/components/mode-toggle'
import Search from '@/components/Search'
import BookCard from '@/components/BookCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


function App() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch(e.target[0].value);
    setData(result)
    setIsLoaded(true);
    console.log(result)
  };

  return (
    <div className='container h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50'>
      <div className="flex flex-col justify-between min-h-[500px] w-full justify-items-center">
        <div className='flex w-full h-[56px] mt-2 items-center justify-between'>
          <Avatar className='mx-8'>
            <AvatarImage src="./src/assets/Bookie.png" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <div className="mx-8"><ModeToggle /></div>
        </div>

        <div className=''>
          <h1 className="text-3xl font-bold text-center mb-4">🍄</h1>

          <Search onSubmit={handleSubmit} />

          <p className='text-sm text-center mt-2'>Search the I.A's index of full-text books.</p>
        </div>

        <div className='mx-auto mt-4'>
          {isLoaded && <BookCard data={data} isLoaded={isLoaded} />}
        </div>
      </div>
    </div>
  )
}

export default App
