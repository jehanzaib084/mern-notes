import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { ArrowLeftIcon } from "lucide-react"
import toast from "react-hot-toast"

import api from "../lib/axios"

function CreatePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error("all fields are required")
      return
    }

    setLoading(true)
    try {
      await api.post("/notes", { title, content })
      toast.success("note created")
      navigate("/")
    } catch (error) {
      console.error("create note failed", error)
      if (error.response?.status === 429) {
        toast.error("slow down, too many notes", { duration: 4000 })
      } else {
        toast.error("failed to create note")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link to="/" className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>

        <div className="card bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <h2 className="card-title text-2xl mb-4">Create New Note</h2>

            <label className="label">Title</label>
            <input
              type="text"
              placeholder="Note title"
              className="input w-full mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="label">Content</label>
            <textarea
              placeholder="Write your note here..."
              className="textarea w-full h-32 mb-4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
