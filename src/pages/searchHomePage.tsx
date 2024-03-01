import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import RootComponent from '@/components/RootComponent'
import SubjectCard from '@/components/SubjectsCard'
import AuthorCard from '@/components/AuthorCard'
import BookCard from '@/components/BookCard'

export default function Root() {

    const navigate = useNavigate()

    const selectedValue = useSelector((state: RootState) => {
        return state.bookie.selectedValue
    })

    useEffect(() => {
        navigate(`/Search?${selectedValue}`)
    }, [navigate, selectedValue])

    let content: JSX.Element
    if (selectedValue === "Author") {
        content = <AuthorCard />
    } else if (selectedValue === "Subject") {
        content = <SubjectCard />
    } else {
        content = <BookCard />
    }

    return <RootComponent Renderer={() => content} />
}
