import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
export default function Search({ onSubmit }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
    return (
        <form onSubmit={onSubmit} className="flex w-full max-w-lg mx-auto items-center justify-between space-x-2">
            <Input name='search' placeholder="Search title..." />
            <Button type="submit">Search</Button>
        </form>
    )
}