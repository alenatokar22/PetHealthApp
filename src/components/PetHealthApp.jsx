// головний компонент (керує станом)

import React, { useState } from "react";
import PetForm from "./PetForm";
import PetList from "./PetList";
import "../styles/pet.css";

export default function PetHealthApp() {
  const [pets, setPets] = useState([]);

  const handleAddPet = (pet) => setPets([...pets, pet]);
  const handleDeletePet = (id) => setPets(pets.filter((p) => p.id !== id));

  return (
    <div className="pet-app">
      <header className="pet-header">
        <h1 className="pet-title">🐾 Мої тварини</h1>
      </header>

      <main className="pet-main">
        <PetList pets={pets} onDelete={handleDeletePet} />
        <PetForm onAdd={handleAddPet} />
      </main>
    </div>
  );
}
