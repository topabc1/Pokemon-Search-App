const searchBtn = document.querySelector("#search-button");
const pokemonNameEl = document.querySelector("#pokemon-name");
const pokemonIDEl = document.querySelector("#pokemon-id");
const weightEl = document.querySelector("#weight");
const heightEl = document.querySelector("#height");
const imageEl = document.querySelector("#image");
const typesEl = document.querySelector("#types");
const hpEl = document.querySelector("#hp");
const attackEl = document.querySelector("#attack");
const defenseEl = document.querySelector("#defense");
const spAttackEl = document.querySelector("#special-attack");
const spDefenseEl = document.querySelector("#special-defense");
const speedEl = document.querySelector("#speed");
let input;
let class1;
let res;
let data;
let res2;
let data2;

let count = 0;
let findPokemonInterval;

// start ************************************
let result = {
  url: "",
  name: "",
  id: "",
  height: "",
  weight: "",
  hp: "",
  attack: "",
  image: "",
  defense: "",
  spAttack: "",
  spDefense: "",
  speed: "",
  types: []
}

async function fetch1() {
  res = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
  data = await res.json();
}

async function fetch2() {
  res2 = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${result.id}/`);
  data2 = await res2.json();
}

// update **************************************
searchBtn.addEventListener("click", () => {
  input = document.querySelector("#search-input").value;
  result = {
    url: "",
    name: "",
    id: "",
    height: "",
    weight: "",
    hp: "",
    attack: "",
    image: "",
    defense: "",
    spAttack: "",
    spDefense: "",
    speed: "",
    types: []
  }
  count = 0;
  clearInterval(findPokemonInterval);
  findPokemonInterval = setInterval(findPokemon, 100);
})

function keyDown(e) {
  switch(e.key) {
    case "Enter":
      input = document.querySelector("#search-input").value;
      result = {
        url: "",
        name: "",
        id: "",
        height: "",
        weight: "",
        hp: "",
        attack: "",
        image: "",
        defense: "",
        spAttack: "",
        spDefense: "",
        speed: "",
        types: []
      }
      count = 0;
      clearInterval(findPokemonInterval);
      findPokemonInterval = setInterval(findPokemon, 100);
      break;
  }
}
document.addEventListener("keydown", keyDown);

function findPokemon() {
  count++;
  if(count >= 5) {
    clearInterval(findPokemonInterval);
  }
  input = input.toLowerCase();
  input = input.replace(/\s/g, "");

  fetch1();
  f1();
  fetch2();
  f2();
  displayData();
}

function displayData() {
  pokemonNameEl.innerHTML = `${result.name} `;
  pokemonIDEl.innerHTML = `#${result.id}`;
  heightEl.innerHTML = `Height: ${result.height}`;
  weightEl.innerHTML = `Weight: ${result.weight} `;
  imageEl.innerHTML = `<img id="sprite" src=${result.image} />`;
  typesEl.innerHTML = "";
  for(let i = 0; i < result.types.length; i++) {
    if(result.types[i] === "normal") {
      class1 = "normal";
    } else if(result.types[i] === "fire") {
      class1 = "fire";
    } else if(result.types[i] === "water") {
      class1 = "water";
    } else if(result.types[i] === "electric") {
      class1 = "electric";
    } else if(result.types[i] === "grass") {
      class1 = "grass";
    } else if(result.types[i] === "ice") {
      class1 = "ice";
    } else if(result.types[i] === "fighting") {
      class1 = "fighting";
    } else if(result.types[i] === "poison") {
      class1 = "poison";
    } else if(result.types[i] === "ground") {
      class1 = "ground";
    } else if(result.types[i] === "flying") {
      class1 = "flying";
    } else if(result.types[i] === "psychic") {
      class1 = "psychic";
    } else if(result.types[i] === "bug") {
      class1 = "bug";
    } else if(result.types[i] === "rock") {
      class1 = "rock";
    } else if(result.types[i] === "ghost") {
     class1 = "ghost";
    } else if(result.types[i] === "dragon") {
     class1 = "dragon";
    } else if(result.types[i] === "dark") {
      class1 = "dark";
    } else if(result.types[i] === "steel") {
      class1 = "steel";
    } else if(result.types[i] === "fairy") {
      class1 = "fairy";
    } else if(result.types[i] === "stellar") {
      class1 = "stellar";
    }
    typesEl.innerHTML += `<div id=${class1}>${result.types[i]}</div>`;
  }
  hpEl.innerHTML = result.hp;
  attackEl.innerHTML = result.attack;
  defenseEl.innerHTML = result.defense;
  spAttackEl.innerHTML = result.spAttack;
  spDefenseEl.innerHTML = result.spDefense;
  speedEl.innerHTML = result.speed;
}

function f1() {
  let t = 0;
  for(let i = 0; i < data.results.length; i++) {
    if(Number(input) == data.results[i].id || input === data.results[i].name) {
      result.id = data.results[i].id;
      result.name = data.results[i].name.toUpperCase();
      result.url = data.results[i].url;
      t = 1;
      break;
    }
  }
  if(t === 0) {
    alert("Pokémon not found");
  }
}

function f2() {
  result.height = data2.height;
  result.weight = data2.weight;
  result.hp = data2.stats[0].base_stat;
  result.attack = data2.stats[1].base_stat;
  result.defense = data2.stats[2].base_stat;
  result.spAttack = data2.stats[3].base_stat;
  result.spDefense = data2.stats[4].base_stat;
  result.speed = data2.stats[5].base_stat;
  result.image = data2.sprites.front_default;
  result.types = [];
  for(let i = 0; i < data2.types.length; i++) {
    result.types.push(data2.types[i].type.name);
  }
}