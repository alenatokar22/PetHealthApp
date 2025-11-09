import React from "react";
import "../styles/pet.css";

/**
 * PetHealthApp — головний компонент програми.
 * На цьому етапі тільки каркас і заголовок.
 */

export default function PetHealthApp() {
  return (
    <div className="pet-app">
      <header className="pet-header">
        <h1 className="pet-title">🐾 Pet Health App</h1>
        <p className="pet-sub">Ввести облік своїх улюбленців</p>
      </header>

      <main className="pet-main">
        <p>Тут з’явиться список тварин і нотатки про них 🐕</p>
      </main>

      <footer className="pet-footer">
        Стилі в <code>pet.css</code> — змінювати під себе 🎨
      </footer>
    </div>
  );
}
