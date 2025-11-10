// головний компонент (керує станом)

import React, { useState } from "react";
import PetForm from "./PetForm";
import PetList from "./PetList";
import PetDetails from "./PetDetails";
import "../styles/pet.css";

export default function PetHealthApp() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

  const handleAddPet = (pet) => setPets([...pets, pet]);
  const handleDeletePet = (id) => setPets(pets.filter((p) => p.id !== id));
  const handleSelectPet = (pet) => setSelectedPet(pet);
  const handleBack = () => setSelectedPet(null);

  return (
    <div className="pet-app">
      <header className="pet-header">
        <h1 className="pet-title">🐾 Мої тварини</h1>
      </header>

      <main className="pet-main">
        {!selectedPet ? (
          <>
            <PetList pets={pets} onDelete={handleDeletePet} onSelect={handleSelectPet} />
            <PetForm onAdd={handleAddPet} />
          </>
        ) : (
          <PetDetails pet={selectedPet} onBack={handleBack} />
        )}
      </main>
    </div>
  );
}
