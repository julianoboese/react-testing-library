const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const fetchPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const jsonResponse = await response.json();
  const result = jsonResponse.results;

  const allPokemonsData = await Promise.all(result.map(async (pokemon) => {
    const pokemonResponse = await fetch(pokemon.url);
    const jsonPokemonResponse = await pokemonResponse.json();
    return jsonPokemonResponse; 
  }));

  const allPokemons = allPokemonsData.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    type: pokemon.types[0].type.name,
    averageWeight: {
      value: pokemon.weight,
      measurementUnit: 'kg',
    },
    image: pokemon.sprites.front_default,
  }))

  console.log(allPokemons);
}

fetchPokemons();