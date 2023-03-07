// let allPokemonData = [];

let nextPage = "https://pokeapi.co/api/v2/pokemon";

function getPokemon(url) {
  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      nextPage = data.next;
      for (let i = 0; i < data.results.length; i++) {
        let pokemon = data.results[i];
        addPokemonToUi(pokemon);
      }
    });
}

function addPokemonToUi(pokemon) {
  fetch(pokemon.url)
    .then(function (response) {
      return response.json();
    })
    .then(function (pokemonData) {
      let pokemonDiv = document.createElement("div");
      pokemonDiv.className = "pokemon-container";

      let nameH1 = document.createElement("h1");
      nameH1.innerText = pokemon.name;
      pokemonDiv.append(nameH1);

      let img = document.createElement("img");
      img.src = pokemonData.sprites.front_default;
      pokemonDiv.append(img);

      document.body.append(pokemonDiv);
    });
}

getPokemon(nextPage);

let gotToBottom = false;
window.onscroll = function () {
  if (
    !gotToBottom &&
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight
  ) {
    getPokemon(nextPage);
    gotToBottom = true;
    setTimeout(() => {
      gotToBottom = false;
    }, 1000);
  }
};
