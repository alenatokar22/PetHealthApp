// деталі тварини

import React from "react";

export default function PetDetails({ pet, onBack }) {
  const age = pet.birth
    ? Math.floor(
        (Date.now() - new Date(pet.birth)) / (365 * 24 * 60 * 60 * 1000)
      )
    : null;

  return (
    <div className="pet-details">
      <button className="btn-back" onClick={onBack}>
        ← Назад
      </button>

      <div className="pet-icon-large">🦜</div>
      <h2 className="pet-name-title">{pet.name}</h2>

      <h3 className="info-title">Про улюбленця:</h3>
      <table className="pet-info-table">
        <tbody>
          <tr>
            <td>Порода:</td>
            <td>{pet.species || "—"}</td>
          </tr>
          <tr>
            <td>Колір:</td>
            <td>{pet.color || "—"}</td>
          </tr>
          <tr>
            <td>Стать:</td>
            <td>{pet.gender || "—"}</td>
          </tr>
          <tr>
            <td>Вага (кг):</td>
            <td>{pet.weight || "—"}</td>
          </tr>
          <tr>
            <td>Дата народження:</td>
            <td>{new Date(pet.birth).toLocaleDateString()}</td>
          </tr>
          {age !== null && (
            <tr>
              <td>Вік:</td>
              <td>{age} р.</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="btn-notes">📝 Нотатки</button>
    </div>
  );
}
