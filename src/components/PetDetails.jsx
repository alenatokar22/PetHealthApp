// деталі тварини

import React from "react";

export default function PetDetails({ pet, onBack }) {
  return (
    <div className="pet-details">
      <button className="btn-back" onClick={onBack}>
        ← Назад
      </button>

      <div className="pet-icon">🐾</div>
      <h2 className="pet-name">{pet.name}</h2>

      <table className="pet-info">
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
            <td>Вага:</td>
            <td>{pet.weight || "—"}</td>
          </tr>
          <tr>
            <td>Дата народження:</td>
            <td>{new Date(pet.birth).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
