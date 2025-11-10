// список тварин

import React from "react";
import PetCard from "./PetCard";

export default function PetList({ pets, onDelete }) {
  return (
    <ul className="pet-list">
      {pets.length === 0 && <p className="muted">Немає тварин 🐾</p>}
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} onDelete={onDelete} />
      ))}
    </ul>
  );
}
