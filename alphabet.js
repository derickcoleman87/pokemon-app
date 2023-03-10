fetch("https://pokeapi.co/api/v2/pokemon?limit=1281")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    let letters = document.querySelectorAll("li");

    for (let i = 0; i < letters.length; i++) {
      let currentLetterDomNode = letters[i];
      let currentLetter = currentLetterDomNode.textContent;
      // console.log(currentLetter);
      currentLetterDomNode.addEventListener("click", () => {
        clearAllPokemonContainer();
        // show pokemon that start with that letter
        for (let j = 0; j < data.results.length; j++) {
          let pokemon = data.results[j];
          // console.log(pokemon);
          if (pokemon.name.toUpperCase().startsWith(currentLetter)) {
            addPokemonToUi(pokemon);
          }
        }
      });
    }
  });

function addPokemonToUi(pokemon) {
  fetch(pokemon.url)
    .then(function (response) {
      return response.json();
    })
    .then(function (pokemonData) {
      let pokemonDiv = document.createElement("div");
      pokemonDiv.className = "single-pokemon-container";

      let nameH1 = document.createElement("h1");
      nameH1.innerText = pokemon.name;
      pokemonDiv.append(nameH1);

      let img = document.createElement("img");
      img.src = pokemonData.sprites.front_default;
      img.alt = pokemonData.name;
      pokemonDiv.append(img);

      document.querySelector(".all-pokemon-container").append(pokemonDiv);
    });
}

function clearAllPokemonContainer() {
  document.querySelector(".all-pokemon-container").innerHTML = "";
}

// trying to add search function
// function searchPokemon() {
fetch("https://pokeapi.co/api/v2/pokemon?limit=1281")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    let search = document.querySelector(".search-btn");

    for (let i = 0; i < data.results.length; i++) {
      let pokemon = data.results[i];
      let pokemonName = pokemon.name.toUpperCase();

      // on click of search button
      search.addEventListener("click", () => {
        let searchInput = document
          .querySelector("#search-input")
          .value.toUpperCase();

        console.log("click");
        console.log(pokemonName);
        console.log(searchInput);

        clearAllPokemonContainer();
        if (pokemonName.indexOf(searchInput) > -1) {
          if (pokemonName === searchInput) {
            addPokemonToUi(pokemon);
          }
        }
      });
    }
  });
// }
