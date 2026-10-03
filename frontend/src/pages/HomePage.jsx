import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import api from "../lib/axios"
import Navbar from "../components/Navbar"
import NoteCard from "../components/NoteCard"
import NotesNotFound from "../components/NotesNotFound"
import RateLimitedUI from "../components/RateLimitedUI"

function HomePage() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [isRateLimited, setIsRateLimited] = useState(false)

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await api.get("/notes")
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.error("notes fetch failed", error)
        if (error.response?.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("failed to load notes")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
