import { useState, useEffect } from "react";
import {generateUniqueRandomNumbers,getRandomElements} from '../auxiliar.js'
import '../styles/displayCard.css'

//Array de numeros de aleatorio por ejemplo entre 0 a 200
const randomNumbers = generateUniqueRandomNumbers(32,1,200)
const arryURLs = randomNumbers.map(item => `https://pokeapi.co/api/v2/pokemon/${item}/`) 
let score = 0; 

function PokeRender({params, endScore}) {
    const [listBase, setListBase] = useState(null);
    const [pokeList, setPokemonList] = useState(null);
    const [select, setSelect] = useState(null)  
    
    const selectValue = (value)=>{
      //Fin del Juego
      if(value===select){
        endScore();
        setSelect(null);
        return
      }
      //Reordenar cartas
      setSelect(value);
      const shuffle = [...pokeList].sort(()=> Math.random()-0.5 );
      setPokemonList(shuffle)
      params() //sumar score para el otro componente
      score++
      //Verificar length del pokeList con el valor del score
      if(pokeList.length==score){
        const setCardNew = getRandomElements(listBase,2*pokeList.length)
        setPokemonList(setCardNew)
      }
    }

    useEffect(()=>{
    
        const fetchPokemonData = async () => {
          try {
            // Obtener los datos de cada URL
            const responses = await Promise.all(arryURLs.map(url => fetch(url)));
            const pokemonData = await Promise.all(responses.map(res => res.json()));
            const [a,b,c,d] = pokemonData

            //Set los 32 pokemon de base
            setListBase(pokemonData)

            //Set de los primero 4 pokemon
            setPokemonList([a,b,c,d]);
          } catch (error) {
            console.error('Error al recuperar los datos:', error);
          }
        };
        fetchPokemonData()
        },[])

        return (
            <>
              <div className='cardConteiner'>
                {pokeList && pokeList.map((pokemon) => (
                  <div className="cardPoke" key={pokemon.id} onClick={()=>selectValue(pokemon.name)} >
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
            </>
          );
        }

export default PokeRender