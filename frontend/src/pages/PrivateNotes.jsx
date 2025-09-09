import React, { useEffect, useState } from "react";
import { getNotes, addNote, updateNote, deleteNote } from "../controllers/privateNoteController";
import "../styles/PrivateNotes.css";

function PrivateNotes() {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

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
    <div className="notes-container">
      <div className="notes-form-container">
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
      </div>

      <div className="notes-display">
        <h3>Saved Notes</h3>
        <ul>
          {notes.map((note) => (
            <li key={note._id}>
              <div className="note-card">
                <h4>{note.title}</h4>
                <p>{note.content}</p>
                <div className="note-actions">
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
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PrivateNotes;