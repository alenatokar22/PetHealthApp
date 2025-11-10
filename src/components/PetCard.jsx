// одна картка тварини

import React from "react";

function calcAge(birth) {
  const birthDate = new Date(birth);
  const today = new Date();
  const years = today.getFullYear() - birthDate.getFullYear();
  const months = today.getMonth() - birthDate.getMonth();
  return months < 0 ? years - 1 : years;
}

export default function PetCard({ pet, onDelete }) {
  return (
    <li className="pet-card">
      <div>
        <strong>{pet.name}</strong> <br />
        <span className="muted">{pet.species || "—"}</span>
      </div>
      <div className="pet-age">
        {new Date(pet.birth).toLocaleDateString()} <br />
        <small>({calcAge(pet.birth)} р.)</small>
      </div>
      <button className="btn-del" onClick={() => onDelete(pet.id)}>
        ❌
      </button>
    </li>
  );
}
