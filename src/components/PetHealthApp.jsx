// головний компонент (керує станом)

import React, { useState, useEffect } from "react";
import PetForm from "./PetForm";
import PetList from "./PetList";
import PetDetails from "./PetDetails";
import "../styles/pet.css";

export default function PetHealthApp() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // --- стабільне зчитування LocalStorage ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pets");
      if (saved) setPets(JSON.parse(saved));
    } catch (e) {
      console.error("Помилка читання localStorage", e);
    }
  }, []);

  // --- стабільне збереження ---
  useEffect(() => {
    try {
      localStorage.setItem("pets", JSON.stringify(pets));
    } catch (e) {
      console.error("Помилка збереження localStorage", e);
    }
  }, [pets]);

  const handleAddPet = (pet) => setPets([...pets, pet]);
  const handleDeletePet = (id) => {
    setPets(pets.filter((p) => p.id !== id));
    setSelectedPet(null);
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    setIsEditing(false);
  };

  const handleBack = () => {
    setSelectedPet(null);
    setIsEditing(false);
  };

  const handleSaveEdit = (updatedPet) => {
    setPets(pets.map((p) => (p.id === updatedPet.id ? updatedPet : p)));
    setSelectedPet(updatedPet);
    setIsEditing(false);
  };

  return (
    <div className="pet-app">
      <header className="pet-header">
        <h1 className="pet-title">🐾 Мої улюбленці</h1>
      </header>

      <main className="pet-main">
        {!selectedPet ? (
          <>
            <PetList
              pets={pets}
              onDelete={handleDeletePet}
              onSelect={handleSelectPet}
            />
            <PetForm onAdd={handleAddPet} />
          </>
        ) : (
          <PetDetails
            pet={selectedPet}
            onBack={handleBack}
            onEdit={() => setIsEditing(true)}
            onSave={handleSaveEdit}
            editing={isEditing}
          />
        )}
      </main>
    </div>
  );
}
