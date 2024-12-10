import { useState, useEffect } from "react";
import generateUniqueRandomNumbers from '../auxiliar.js'
import '../styles/displayCard.css'

//Array de numeros de aleatorio por ejemplo entre 0 a 200
const randomNumbers = generateUniqueRandomNumbers(12,0,200)
const arryURLs = randomNumbers.map(item => `https://pokeapi.co/api/v2/pokemon/${item}/`) 

function PokeRender({params, endScore}) {
    const [pokeList, setPokemonList] = useState(null);
    const [select, setSelect] = useState(null)  
    
    const selectValue = (value)=>{
      if(value===select){
        endScore();
        setSelect(null);
        return
      }
      setSelect(value);
      const shuffle = [...pokeList].sort(()=> Math.random()-0.5 );
      setPokemonList(shuffle)
      params()
    }

    useEffect(()=>{
    
        const fetchPokemonData = async () => {
          try {
            // Obtener los datos de cada URL
            const responses = await Promise.all(arryURLs.map(url => fetch(url)));
            const pokemonData = await Promise.all(responses.map(res => res.json()));
       
            setPokemonList(pokemonData);
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
                      className="mx-auto w-32 h-32 object-contain"
                    />
                    <h2 className="capitalize mt-2 font-semibold">{pokemon.name}</h2>
                    <p className="text-gray-600">#{pokemon.id}</p>
                  </div>
                ))}
              </div>
            </>
          );
        }

export default PokeRender