// список тварин

import React from "react";

export default function PetList({ pets, onDelete, onSelect }) {
  const calcAge = (birthDate) => {
    if (!birthDate) return "—";
    const birth = new Date(birthDate);
    const now = new Date();
    const months =
      (now.getFullYear() - birth.getFullYear()) * 12 +
      (now.getMonth() - birth.getMonth());
    if (months < 1) return "менше місяця";
    const years = Math.floor(months / 12);
    const restMonths = months % 12;
    if (years > 0) {
      return restMonths ? `${years} р. ${restMonths} міс.` : `${years} р.`;
    } else {
      return `${months} міс.`;
    }
  };

  if (!pets.length)
    return <p style={{ textAlign: "center" }}>Немає доданих улюбленців 🐦</p>;

  return (
    <ul className="pet-list">
      {pets.map((pet) => (
        <li key={pet.id} className="pet-card" onClick={() => onSelect(pet)}>
          <div className="pet-icon">🦜</div>
          <div className="pet-info">
            <div className="pet-name">{pet.name}</div>
            <div className="pet-birth">
              {calcAge(pet.birth)} • {new Date(pet.birth).toLocaleDateString()}
            </div>
          </div>
          <button
            className="btn-del"
            onClick={(e) => {
              e.stopPropagation();
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
