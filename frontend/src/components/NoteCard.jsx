import { PenSquareIcon } from "lucide-react"
import { Link } from "react-router"
import { formatDate } from "../lib/utils"

function NoteCard({ note }) {
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
          <PenSquareIcon className="size-4" />
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
