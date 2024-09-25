import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const handleToggleSoldOut = (id) => {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
      )
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      <PlantList plants={filteredPlants} onToggleSoldOut={handleToggleSoldOut} />
    </main>
  );
}

export default PlantPage;
