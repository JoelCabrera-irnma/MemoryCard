import { useState, useEffect } from "react";
import EndGameModal from "../components/EndGameModal.jsx";
import { generateUniqueRandomNumbers, getRandomElements } from "../auxiliar.js";
import "../styles/displayCard.css";
import "../styles/modal.css";

//Array de URLs obtenidas en forma aleatoria, por ejemplo entre 1 a 200
const generateURLs = () => {
  const randomNumbers = generateUniqueRandomNumbers(16, 1, 200); //N° de Pokes consumidos , ID min , ID max
  return randomNumbers.map(
    (item) => `https://pokeapi.co/api/v2/pokemon/${item}/`
  );
};
let score = 0;

function PokeRender({ addScore, endScore, lastScore, upLevel }) {
  const [listBase, setListBase] = useState(null);
  const [pokeList, setPokemonList] = useState(null);
  const [select, setSelect] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [maxScore, setMaxScore] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const arryURLs = generateURLs();
        // Obtener los datos de cada URL
        const responses = await Promise.all(arryURLs.map((url) => fetch(url)));
        const pokemonData = await Promise.all(
          responses.map((res) => res.json())
        );
        const [a, b, c, d] = pokemonData;

        //Set de los 32 pokemon de base
        setListBase(pokemonData);

        //Set de los primero 4 pokemons
        setPokemonList([a, b, c, d]);
      } catch (error) {
        console.error("Error al recuperar los datos:", error);
      }
    };
    fetchPokemonData();
  }, [reset]);

  const resetValues = () => {
    endScore();
    setSelect([]);
    score = 0;
  };

  const selectValue = (value) => {
    console.log(value, select);
    //Fin del Juego
    if (select.includes(value)) {
      handleGameOver();
      resetValues();
      return;
    }

    //Reordenar cartas
    setSelect((preValues) => [...preValues, value]); //Corregir. Colocar-push en un array y verificar si existe
    const shuffle = [...pokeList].sort(() => Math.random() - 0.5);
    setPokemonList(shuffle);
    addScore(); //sumar score para el componente padre
    score++;

    //Maximo Valor alcanzado
    if (score == listBase.length) {
      setMaxScore(true);
      handleGameOver();
      return console.log("MAXIMO PUNTAJE ALCANZADO");
    }

    //Duplicar Cards al terminar el nivel "X". Pasa el siguiente nivel
    if (pokeList.length == score) {
      score = 0;
      const setCardNew = getRandomElements(listBase, 2 * pokeList.length);
      setPokemonList(setCardNew);
      setSelect([]);
      upLevel();
    }
  };

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  const handleCloseModal = () => {
    setIsGameOver(false);
    setMaxScore(false);
    resetValues();
    setReset(!reset);
  };

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
        message={
          maxScore
            ? `Maximo puntaje alcanzado`
            : `Este es tu puntaje: ${lastScore}`
        }
      />
    </>
  );
}

export default PokeRender;
