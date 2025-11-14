import React, { useState, useEffect } from "react";
import "../styles/Appointments.css";

export default function AppointmentsView({ pet }) {
  const [appointments, setAppointments] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [photo, setPhoto] = useState(null);

  // Завантаження з localStorage
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem(`appointments_${pet.id}`) || "[]"
    );
    setAppointments(saved);
  }, [pet.id]);

  // Збереження в localStorage
  const saveAppointments = (data) => {
    setAppointments(data);
    localStorage.setItem(`appointments_${pet.id}`, JSON.stringify(data));
  };

  // Обробка фото
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  // Додавання запису
  const addAppointment = () => {
    if (!newDate || !photo) {
      alert("Будь ласка, виберіть дату та фото!");
      return;
    }

    const newItem = {
      id: Date.now(),
      date: newDate,
      photo: photo,
    };

    const updated = [...appointments, newItem];
    saveAppointments(updated);

    // очищення
    setNewDate("");
    setPhoto(null);
  };

  // Видалення
  const deleteAppointment = (id) => {
    if (!confirm("Видалити фото прийому?")) return;
    const updated = appointments.filter((a) => a.id !== id);
    saveAppointments(updated);
  };

  return (
    <div className="appointments-container">
      {/* Форма додавання */}
      <div className="appointment-form">
        <h3>Додати фото прийому</h3>

        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />

        <label className="photo-picker">
          📷 Обрати фото
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        </label>

        {photo && <img src={photo} className="preview-photo" alt="preview" />}

        <button className="btn-add" onClick={addAppointment}>
          ➕ Додати
        </button>
      </div>

      {/* Список */}
      <ul className="appointment-list">
        {appointments
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((item) => (
            <li key={item.id} className="appointment-item">
              <div className="appointment-header">
                <strong>{item.date}</strong>
                <button
                  className="delete-btn"
                  onClick={() => deleteAppointment(item.id)}
                >
                  🗑
                </button>
              </div>

              <img src={item.photo} alt="visit" className="appointment-photo" />
            </li>
          ))}
      </ul>
    </div>
  );
}
