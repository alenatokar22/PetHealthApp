// список тварин

import React from "react";

export default function PetList({ pets, onDelete, onSelect }) {
  if (!pets.length)
    return <p style={{ textAlign: "center" }}>Немає доданих тварин 🐾</p>;

  return (
    <ul className="pet-list">
      {pets.map((pet) => (
        <li
          key={pet.id}
          className="pet-card"
          onClick={() => onSelect(pet)}
          style={{ cursor: "pointer" }}
        >
          <div>
            <div className="pet-icon">🐾</div>
            <div className="pet-name">{pet.name}</div>
            <div className="pet-birth">
              {new Date(pet.birth).toLocaleDateString()}
            </div>
          </div>

          <button
            className="btn-del"
            onClick={(e) => {
              e.stopPropagation(); // щоб не відкривалось при натисканні "Видалити"
              onDelete(pet.id);
            }}
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}
