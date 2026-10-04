import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import toast from "react-hot-toast"

import api from "../lib/axios"
import { formatDate } from "../lib/utils"

function NoteCard({ note, setNotes }) {
  async function handleDelete(e) {
    e.preventDefault()

    if (!window.confirm("delete this note?")) return

    try {
      await api.delete(`/notes/${note._id}`)
      setNotes((prev) => prev.filter((n) => n._id !== note._id))
      toast.success("note deleted")
    } catch (error) {
      console.error("delete note failed", error)
      toast.error("failed to delete note")
    }
  }

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={handleDelete}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
