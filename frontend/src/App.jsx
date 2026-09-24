import { useEffect, useState } from "react"

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("notes fetch failed", error))
  }, [])

  return (
    <div>
      <h1>notes</h1>

      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  )
}

export default App
