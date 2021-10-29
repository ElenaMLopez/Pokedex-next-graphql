import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import Link from "next/link";
import styles from '../styles/Home.module.css'

const Home = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() =>{
    const getData = async() =>{
      const data = await getPokemonInfo();
      console.log({data})
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
    return getPokemonImage(pokemon);
  }
  const getPokemonImage = async (pokemonList) => {
    const pokemonWithImage = await pokemonList.map(poke =>({
      ...poke,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`
    }))
    return pokemonWithImage
  }

  return(
    <main className={styles['home-container']}>
    <h1>Pokemon</h1>
      <ul className={styles['home-list']}>
        {
          pokemon.map((pokemon ) =>{
            return (
              <li className={styles['home-list__element']} key={pokemon.id}>
                <Link href={`/pokemon/${pokemon.id}`}>
                  <a>
                    {pokemon.name}
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles['home-list__image']} src={pokemon.imageUrl} alt={pokemon.name} />
                  </a>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </main>
  )
}

export default Home;