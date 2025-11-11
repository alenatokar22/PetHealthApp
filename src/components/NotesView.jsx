import React, { useState, useEffect } from "react";

export default function NotesView({ pet }) {
  const storageKey = `notes_${pet.id}`;
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [newNote, setNewNote] = useState({
    date: "",
    weight: "",
    text: "",
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(notes));
  }, [notes]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newNote.date || !newNote.text) return;
    const note = { id: Date.now(), ...newNote };
    setNotes([...notes, note]);
    setNewNote({ date: "", weight: "", text: "" });
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="notes-view">
      <form onSubmit={handleAdd} className="note-form">
        <input
          type="date"
          value={newNote.date}
          onChange={(e) => setNewNote({ ...newNote, date: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Вага (г)"
          value={newNote.weight}
          onChange={(e) => setNewNote({ ...newNote, weight: e.target.value })}
        />
        <input
          type="text"
          placeholder="Нотатка"
          value={newNote.text}
          onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
          required
        />
        <button type="submit" className="btn-add">
          Додати
        </button>
      </form>

      {notes.length === 0 ? (
        <p>Немає нотаток 🪶</p>
      ) : (
        <ul className="notes-list">
          {notes.map((n) => (
            <li key={n.id} className="note-item">
              <div>
                <strong>{n.date}</strong> — {n.text}
                {n.weight && <span> • {n.weight} г</span>}
              </div>
              <button onClick={() => handleDelete(n.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
