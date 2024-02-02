import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface PreviewProp {
    res: {
        key: string;
        title: string;
        author_name: string[];
        author_key: string
        first_publish_year: number;
        cover_i: string;
        ebook_count_i: number;
        edition_count: number
        language: string[];
        edition_key: string[];
        cover_edition_key: string;
        ia_loaded_id: string[];
        ratings_average: number;
        ratings_count: number;
        want_to_read_count: number;
        currently_reading_count: number;
        readinglog_count: number;
        person_key: string[];
        subject_key: string[];
        place_key: string[];
    }
}

export default function Preview(res: PreviewProp["res"]) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-[150px]">Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <a href={`https://openlibrary.org${res.key}?edition=key%3A/books/${res.cover_edition_key}`} target="_blank">
                        <DialogTitle>{res.title.length > 40 ? `${res.title.substring(0, 35)}...` : res.title}</DialogTitle>
                    </a>
                    <DialogDescription>
                        By
                        {" "}
                        {res.author_name ?
                            res.author_name.slice(0, 3).map((name: string, i: number) => {
                                if (i < res.author_name.length - 1 && name.length < 50 && res.author_name.length > 1) {
                                    return <a key={i} href={`https://openlibrary.org/authors/${res.author_key[i]}`} target='_blank'>{name + ", "}</a>
                                } else if (name.length > 50) {
                                    return <a key={i} href={`https://openlibrary.org/authors/${res.author_key[i]}`} target='_blank'>{`${name.substring(0, 50)}...`}</a>
                                } else if (i === res.author_name.length - 1 && res.author_name.length !== 1) {
                                    return <a key={i} href={`https://openlibrary.org/authors/${res.author_key[i]}`} target='_blank'>{"and " + name}</a>
                                } else {
                                    return <a key={i} href={`https://openlibrary.org/authors/${res.author_key[i]}`} target='_blank'>{name}</a>
                                }
                            }) :
                            "Couldn't fetch author name(s)"
                        }
                    </DialogDescription>

                </DialogHeader>
                <DialogHeader>
                    <DialogDescription>
                        <b>{`${res.want_to_read_count}`}</b> → Want to read <b>|</b> <b>{`${res.currently_reading_count}`}</b> → Currently reading <b>|</b> <b>{`${res.readinglog_count}`}</b> → Have read
                    </DialogDescription>
                    <DialogDescription>
                        {`• Rating: ${res.ratings_average ? parseFloat(res.ratings_average.toFixed(2)) : "-"}/5 — (${res.ratings_count} Ratings)`}
                    </DialogDescription>
                </DialogHeader>
                <DialogHeader>
                    <DialogDescription>
                        <b>People: </b><br />{res.person_key && res.person_key.slice(0, 25).map((person: string, i: number) => {
                            if (i === res.person_key.length - 1) {
                                return <a key={person} href={`https://openlibrary.org/subjects/person:${person}`} target='_blank'>{person}</a>
                            } else {
                                return <a key={person} href={`https://openlibrary.org/subjects/person:${person}`} target='_blank'>{person + " • "}</a>
                            }
                        })}
                    </DialogDescription>
                    <DialogDescription>
                        <b>Subjects: </b><br />{res.subject_key && res.subject_key.slice(0, 20).map((subject: string, i: number) => {
                            if (i === 19) {
                                return <a key={subject} href={`https://openlibrary.org/subjects/${subject}`} target='_blank'>{subject}</a>
                            } else {
                                return <a href={`https://openlibrary.org/subjects/${subject}`} target='_blank'>{subject + " ‣ "}</a>
                            }
                        })}
                    </DialogDescription>
                    <DialogDescription>
                        <b>Places: </b><br />{res.place_key && res.place_key.slice(0, 20).map((place: string, i: number) => {
                            if (i === 19) {
                                return <a key={place} href={`https://openlibrary.org/subjects/place:${place}`} target='_blank'>{place}</a>
                            } else {
                                return <a href={`https://openlibrary.org/subjects/place:${place}`} target='_blank'>{place + " ⏒ "}</a>
                            }
                        })}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" className="h-[30px] w-[100px]">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
