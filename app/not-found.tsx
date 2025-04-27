import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex h-[70vh] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mb-6 mt-2 text-xl text-muted-foreground">Event not found</p>
      <Button asChild>
        <Link href="/events">Back to Events</Link>
      </Button>
    </div>
  )
}
