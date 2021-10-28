import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import Link from "next/link";

const Home = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() =>{
    const getData = async() =>{
      const data = await getPokemonInfo();
      setPokemon(data);
    };
    getData();
  },[])

  const getPokemonInfo = async () => {
    const { data: {pokemon_v2_pokemon: pokemon} } = await client.query({
      query: gql`
      query GetPokemon {
        pokemon_v2_pokemon(limit: 12) {
          id
          name
        }
      }
      `
    })
    return pokemon
  }

  return(
    <>
    <h1>Pokemon</h1>
      <ul>
        {
          pokemon.map((pokemon ) =>{
            return (
              <li key={pokemon.id}>
                <Link href={`/pokemon/${pokemon.id}`}>
                  <a>{pokemon.name}</a>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default Home;