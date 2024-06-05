let ts = "1681802982683";
let publicKey = "324544931808d681a18e7c1b97cd884d";
let hashVal = "dd852d618830b6812a37305665e6dd97";

let input = document.getElementById("marvel-input");
let button = document.getElementById("marvel-button");
let showContainer = document.getElementById("show-container");

let date = new Date();
console.log(date.getTime());

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

const ws = new WebSocket('ws://localhost:3000');


ws.onopen = () => {
    console.log('Connected to WebSocket server');
};

ws.onmessage = (event) => {
    const message = event.data;
    alert('Received message: ' + message);
    

};

ws.onclose = () => {
    console.log('Connection to WebSocket server closed');
};

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}


button.addEventListener(
  "click",
  (getResult = async () => {
  
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    
    if (jsonData.data.results.length === 0) {
      alert("No results found.");
      return;
    }

    const element = jsonData.data.results[0]; 

    showContainer.innerHTML = `<div class="card-container">
      <div class="container-character-image">
        <img src="${element.thumbnail.path}.${element.thumbnail.extension}" />
      </div>
      <div class="character-name">${element.name}</div>
      <div class="character-description">${element.description}</div>
    </div>`;
  })
);
window.onload = () => {
  getResult();
};

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

async function fetchPokemonData() {
  try {
    const pokemonName = document.getElementById("pokemon-input").value.toLowerCase();
    const response = await fetch(`${pokeUrl}${pokemonName}`);

    if (!response.ok) {
      throw new Error("No results found.");
    }

    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const imgElement = document.getElementById("pokemonSprite");

    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";

    const themeColor = typeColor[data.types[0].type.name];
    const searchCard = document.getElementById("search-card");
    searchCard.style.background = themeColor;
    searchCard.style.display = "inline-block";
    searchCard.style.marginTop = "20px";

    const pokemonNameDetail = document.getElementById("pokemonNameDetail");
    pokemonNameDetail.textContent = data.name;

    const abilitiesList = document.getElementById("abilitiesList");
    abilitiesList.innerHTML = "<p>Abilities:</p>";
    data.abilities.forEach(ability => {
      const abilityElem = document.createElement("div");
      abilityElem.classList.add("ability");
      abilityElem.textContent = ability.ability.name;
      abilitiesList.appendChild(abilityElem);
    });

    const statsList = document.getElementById("statsList");
    statsList.innerHTML = "<p>Stats:</p>";
    data.stats.forEach(stat => {
      const statElem = document.createElement("div");
      statElem.classList.add("stat");
      statElem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
      statsList.appendChild(statElem);
    });
  } catch (error) {
    alert(error.message);
  }
}

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}
