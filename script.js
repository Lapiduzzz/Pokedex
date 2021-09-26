const input = document.querySelector('.inputName')
const description = document.querySelector('.description')
const b = document.querySelector('.button')

let pokemonInfo = []






input.addEventListener('change', (e) => {fillPokemon(e.target.value)} )
b.addEventListener('click', ()=> {})

const getPokemon = async (name = 1) =>{
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let data = await response.json()
    return pokemonInfo = data
}

const pokemonTemplate = () => {

    let type = pokemonInfo.types.map(el => {
        switch (el.type.name){
            case 'bug': return `<img class="typeImg" src="typesImg/bug.png"/>`
            case 'dark': return `<img class="typeImg" src="typesImg/dark.png"/>`
            case 'dragon': return `<img class="typeImg" src="typesImg/dragon.png"/>`
            case 'electric': return` <img class="typeImg" src="typesImg/electric.png"/>`
            case 'fairy': return `<img class="typeImg" src="typesImg/fairy.png"/>`
            case 'fighting': return `<img class="typeImg" src="typesImg/fighting.png"/>`
            case 'fire': return `<img class="typeImg" src="typesImg/fire.png"/>`
            case 'flying': return `<img class="typeImg" src="typesImg/flying.png"/>`
            case 'ghost': return `<img class="typeImg" src="typesImg/ghost.png"/>`
            case 'grass': return `<img class="typeImg" src="typesImg/grass.png"/>`
            case 'ground': return `<img class="typeImg" src="typesImg/ground.png"/>`
            case 'ice': return `<img class="typeImg" src="typesImg/ice.png"/>`
            case 'normal': return `<img class="typeImg" src="typesImg/normal.png"/>`
            case 'poison': return `<img class="typeImg" src="typesImg/poison.png"/>`
            case 'psychic': return `<img class="typeImg" src="typesImg/psychic.png"/>`
            case 'rock': return `<img class="typeImg" src="typesImg/rock.png"/>`
            case 'steel': return `<img class="typeImg" src="typesImg/steel.png"/>`
            case 'water': return `<img class="typeImg" src="typesImg/water.png"/>`
        }
    }).join('')

    let abilities = pokemonInfo.abilities.map(el => (`<span class="info">${el.ability.name}</span>`)).join(' ')

    let stats = pokemonInfo.stats.map(el => (
        `<div class="statItem">
            <p class="info">${el.stat.name} : ${el.base_stat}</p>
            <div class="hp">
                <div class="hpx" 
                    style="width: ${el.base_stat}px; 
                    height: 100%"></div>
            </div>     
        </div>`
    )).join('')





    if (pokemonInfo) {
        return `
        <div class="description">
            <div class="pokemon">
                <div class="info_block">
                    <p class="name">${pokemonInfo.name}</p>
                    <p class="info">ID:${pokemonInfo.id}</p>
                    <p class="info">Height: ${pokemonInfo.height}</p>        
                    <p class="info">Weight: ${pokemonInfo.weight}</p>  

                    <div class="stat">Stats: ${stats}</div>
                    Abilities:  ${abilities}
                    <hr>
                    <img class="sprite" src=${pokemonInfo.sprites.front_default} alt="">
                    <img class="sprite" src=${pokemonInfo.sprites.back_default} alt="">  
                    <img class="sprite" src=${pokemonInfo.sprites.front_shiny} alt="">  
                    <img class="sprite" src=${pokemonInfo.sprites.back_shiny} alt=""> 
                    <hr>
                    Types:  ${type}
                 
                </div>
                <div class="img_block">
                    <img class="img" src="https://img.pokemondb.net/artwork/large/${pokemonInfo.name}.jpg" alt="">
                </div>
            </div>
        </div> 
        `
    }
}


const fillPokemon = (x) => {
    console.log(pokemonInfo)
    getPokemon(x).then(() => {
        description.innerHTML = pokemonTemplate()})
}
fillPokemon()


