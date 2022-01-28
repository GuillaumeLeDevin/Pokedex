let allPokemon = [];
let finalTable = [];

const searchInput = document.querySelector('.pokeSearch input');
const pokeList = document.querySelector('.pokeList');
const loading = document.querySelector('.loader');

const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};

function fetchPokemonBase() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')

    .then( response => response.json())
    .then( allPoke => {
        // console.log(allPoke);
        allPoke.results.forEach( pokemon => {
            fetchPokemonFull(pokemon);
        })
    })
}
fetchPokemonBase();

function fetchPokemonFull(pokemon) {
    let objPokemonFull = {};
    let url = pokemon.url;
    let namePoke = pokemon.name;

    fetch(url)
    .then( response => response.json())
    .then( pokeData => {
        // console.log(pokeData);
        objPokemonFull.pic = pokeData.sprites.front_default;
        objPokemonFull.type = pokeData.types[0].type.name;
        objPokemonFull.id = pokeData.id;
    })

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${namePoke}`)
    .then(response => response.json())
    .then(pokeData => {
        // console.log(pokeData);

        objPokemonFull.name = pokeData.names[4].name;
        allPokemon.push(objPokemonFull)

        if(allPokemon.length === 151) {
            // console.log(allPokemon);

            finalTable = allPokemon.sort((a, b) => {
                return a.id - b.id;
            }).slice(0, 21);
            // console.log(finalTable);

            createCard(finalTable);
            loading.style.display = "none";
        }

    })
}

// Card Creation

function createCard(arr) {

    for(let i = 0; i < arr.length; i++) {

        const card = document.createElement('li');
        let colorCard = types[arr[i].type];
        card.style.background = colorCard;
        // console.log(colorCard);
        const txtCard = document.createElement('h5');
        txtCard.innerText = arr[i].name;
        // console.log(txtCard);
        const idCard = document.createElement('p');
        idCard.innerText = `ID# ${arr[i].id}`;
        // console.log(idCard);
        const imgCard = document.createElement('img');
        imgCard.src = arr[i].pic;
        // console.log(imgCard);

        card.appendChild(imgCard);
        card.appendChild(txtCard);
        card.appendChild(idCard);

        pokeList.appendChild(card);
    }

}

// Infinite Scroll
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
    // console.log(scrollTop, scrollHeight, clientHeight);
    if(clientHeight + scrollTop >= scrollHeight - 20) {
        addPoke(6);
    }
})

let index = 21;

function addPoke(nb) {
    if(index > 151) {
        return;
    }
    const arrToAdd = allPokemon.slice(index, index + nb);
    createCard(arrToAdd);
    index += nb;
}

// Search

// const searchForm = document.querySelector('form');
// searchForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     searching();
    // })

searchInput.addEventListener('keyup', searching);

function searching() {

    if( index < 151) {
        addPoke(130);
    }

    let filter, allLi, titleValue, allTitles;
    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll('li');
    allTitles = document.querySelectorAll('li > h5');
    // console.log(filter, allLi, titleValue, allTitles);

    console.log(allLi.length)
    for( i = 0; i < allLi.length; i++) {

        titleValue = allTitles[i].innerText;

        if(titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";
        } else {
            allLi[i].style.display = "none";
        }
    }
}




// Animation input

searchInput.addEventListener('input', (e) => {
    if(e.target.value !== ""){
        e.target.parentNode.classList.add('active-input');
    } else {
        e.target.parentNode.classList.remove('active-input')
    }
})
