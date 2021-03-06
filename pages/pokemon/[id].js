import { gql } from '@apollo/client';
import client from '../../apollo-client';
import Head from 'next/head';
import styles from '../../styles/Id.module.css';

export default function Pokemon({ pokemon, sprite }) {
  return (
    <>
    <Head>
      <title>{pokemon.name}</title>
    </Head>
    <h1 className={styles['id-title']}>Hello this is {pokemon.name}</h1>
    <main className={styles['id-container']}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={sprite} alt={pokemon.name} />
      <article className={styles['id-features']}>
        <section className={styles['id-features_first']}>
          <h2>Types</h2>
          <ul>
            {
              pokemon.pokemon_v2_pokemontypes.map(element => {
                return <li key={element.pokemon_v2_type.name}>{element.pokemon_v2_type.name}</li>
              })
            }
          </ul>
        </section>
        <section className={styles['id-features_second']}>
            <h2>Stats</h2>
            <ul>
            {
              pokemon.pokemon_v2_pokemonstats.map(stat => {
                return <li key={stat.pokemon_v2_stat.name}><b>{stat.pokemon_v2_stat.name}</b>: {stat.base_stat}</li>
              })
            }
            </ul>
        </section>
      </article>
    </main>
    
    </>
  )
}

export async function getServerSideProps({params}) {
  const pokemonSprite = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${params.id}.png`);
  const sprite = pokemonSprite.url;
  const { data } = await client.query({
    query: gql`
      query GetPokemon {
        pokemon_v2_pokemon(where: {id: {_eq: ${params.id}}}) {
          id
          name
          pokemon_v2_pokemonstats {
            base_stat
            pokemon_v2_stat {
              name
            }  
          }
          pokemon_v2_pokemontypes{
            pokemon_v2_type {
              name
            }
          }
        }
      }
    `
  });
  return {
    props: {
      pokemon: data.pokemon_v2_pokemon[0],
      sprite
    }
  }
}