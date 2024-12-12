import { useState, useEffect } from "react";
import EndGameModal from "../components/EndGameModal.jsx";
import { generateUniqueRandomNumbers, getRandomElements } from "../auxiliar.js";
import "../styles/displayCard.css";
import "../styles/modal.css";

//Array de numeros de aleatorio por ejemplo entre 0 a 200
const randomNumbers = generateUniqueRandomNumbers(32, 1, 200);
const arryURLs = randomNumbers.map(
  (item) => `https://pokeapi.co/api/v2/pokemon/${item}/`
);
let score = 0;

function PokeRender({ params, endScore }) {
  const [listBase, setListBase] = useState(null);
  const [pokeList, setPokemonList] = useState(null);
  const [select, setSelect] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const selectValue = (value) => {
    //Fin del Juego
    if (value === select) {
      endScore();
      handleGameOver();
      setSelect(null);
      score = 0
      return;
    }
    //Reordenar cartas
    setSelect(value);
    const shuffle = [...pokeList].sort(() => Math.random() - 0.5);
    setPokemonList(shuffle);
    params(); //sumar score para el otro componente
    score++;
    
    //Verificar length del pokeList con el valor del score
    if (pokeList.length == score) {
      const setCardNew = getRandomElements(listBase, 2 * pokeList.length);
      setPokemonList(setCardNew);
    }
  };

  const handleGameOver = () => {
    console.log("funciona");
    setIsGameOver(true);
  };

  const handleCloseModal = () => {
    setIsGameOver(false);
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Obtener los datos de cada URL
        const responses = await Promise.all(arryURLs.map((url) => fetch(url)));
        const pokemonData = await Promise.all(
          responses.map((res) => res.json())
        );
        const [a, b, c, d] = pokemonData;

        //Set los 32 pokemon de base
        setListBase(pokemonData);

        //Set de los primero 4 pokemon
        setPokemonList([a, b, c, d]);
      } catch (error) {
        console.error("Error al recuperar los datos:", error);
      }
    };
    fetchPokemonData();
  }, []);

  return (
    <>
      <div className="cardConteiner">
        {pokeList &&
          pokeList.map((pokemon) => (
            <div
              className="cardPoke"
              key={pokemon.id}
              onClick={() => selectValue(pokemon.name)}
            >
              <img
                key={pokemon.id}
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="card-img"
              />
              <h2 className="card-title">{pokemon.name}</h2>
              <p className="card-id">#{pokemon.id}</p>
            </div>
          ))}
      </div>
      <EndGameModal
        isVisible={isGameOver}
        onClose={handleCloseModal}
        message="¡Has alcanzado el nivel máximo!"
      />
    </>
  );
}

export default PokeRender;
