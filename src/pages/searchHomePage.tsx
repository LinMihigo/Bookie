import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import RootComponent from '@/components/RootComponent'
import SubjectCard from '@/components/SubjectsCard'
import AuthorCard from '@/components/AuthorCard'
import BookCard from '@/components/BookCard'

export default function SearchHomePageWithResults() {

    const selectedValue = useSelector((state: RootState) => state.bookie.selectedValue)

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