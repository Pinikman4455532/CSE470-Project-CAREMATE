import React, { useEffect, useState } from "react";
import { getNotes, addNote, updateNote, deleteNote } from "../controllers/privateNoteController";

function PrivateNotes() {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      await addNote({ title: newTitle, content: newContent });
      setNewTitle("");
      setNewContent("");
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleUpdateNote = async (id, updatedTitle, updatedContent) => {
    try {
      await updateNote(id, { title: updatedTitle, content: updatedContent });
      fetchNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      <h2>Private Notes</h2>
      <form onSubmit={handleAddNote}>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your note..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          required
        />
        <button type="submit">Add Note</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button
              onClick={() => {
                const updatedTitle = prompt("Edit title", note.title);
                const updatedContent = prompt("Edit content", note.content);
                if (updatedTitle && updatedContent) {
                  handleUpdateNote(note._id, updatedTitle, updatedContent);
                }
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrivateNotes;
