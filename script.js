const input = document.querySelector('.inputName')
const description = document.querySelector('.description')
const search = document.querySelector('.button')

let pokemon = []
let pokemonSpecies = []

input.addEventListener('change', (e) => {fillPokemon(e.target.value)} )
search.addEventListener('click', (e) => {fillPokemon(e.target.value)} )

const getPokemon = async (name) =>{
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let data = await response.json()
    return pokemon = data
}

const x = async (name) => {
    let c = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`)
    let d = await c.json()
    let f = await fetch(`${d.evolution_chain}`)
    return pokemonSpecies = f.json()
}
const c = (name) => {
    Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`),
    ]).then(allResponses =>{
        pokemon = allResponses[0].json()
        pokemonSpecies = allResponses[1].json()
    })
}

const pokemonTemplate = () => {

    let type = pokemon.types.map(el => {
        switch (el.type.name){
            case 'bug': return `<img class="typeImg" src="typesImg/bug.png" alt=""/>`
            case 'dark': return `<img class="typeImg" src="typesImg/dark.png" alt=""/>`
            case 'dragon': return `<img class="typeImg" src="typesImg/dragon.png" alt=""/>`
            case 'electric': return` <img class="typeImg" src="typesImg/electric.png" alt=""/>`
            case 'fairy': return `<img class="typeImg" src="typesImg/fairy.png" alt=""/>`
            case 'fighting': return `<img class="typeImg" src="typesImg/fighting.png" alt=""/>`
            case 'fire': return `<img class="typeImg" src="typesImg/fire.png" alt=""/>`
            case 'flying': return `<img class="typeImg" src="typesImg/flying.png" alt=""/>`
            case 'ghost': return `<img class="typeImg" src="typesImg/ghost.png" alt=""/>`
            case 'grass': return `<img class="typeImg" src="typesImg/grass.png" alt=""/>`
            case 'ground': return `<img class="typeImg" src="typesImg/ground.png" alt=""/>`
            case 'ice': return `<img class="typeImg" src="typesImg/ice.png" alt=""/>`
            case 'normal': return `<img class="typeImg" src="typesImg/normal.png" alt=""/>`
            case 'poison': return `<img class="typeImg" src="typesImg/poison.png" alt=""/>`
            case 'psychic': return `<img class="typeImg" src="typesImg/psychic.png" alt=""/>`
            case 'rock': return `<img class="typeImg" src="typesImg/rock.png" alt=""/>`
            case 'steel': return `<img class="typeImg" src="typesImg/steel.png" alt=""/>`
            case 'water': return `<img class="typeImg" src="typesImg/water.png" alt=""/>`
        }
    }).join('')

    let abilities = pokemon.abilities.map(el => (`<span class="abilities_text">${el.ability.name}</span>`)).join(' ')

    let stats = pokemon.stats.map(el => (
        `<div class="statItem">
            <p class="stat_text">
                <span class="stat_name">${el.stat.name}</span> : <span class="state_value">${el.base_stat}</span>
            </p>
            <div class="scale">
                <div class="scale_line" 
                    style="width: ${el.base_stat}px; 
                    height: 100%"></div>
            </div>     
        </div>`
    )).join('')

    let sprites = (src) => {
        if (src) {
            return `<img class="sprite" src=${src} alt="">`
        }
        else return ''
    }

    if (pokemon) {
        return `
        <div class="description">
            <div class="pokemon">
                <div class="info_block">
                    <p class="name">${pokemon.name}</p>
                    <div class="stat">${stats}
                        <p class="abilities">Abilities:  ${abilities}</p>
                    </div>
                    <p class="id">${pokemon.id}</p>
                </div>
                <div class="img_block">
                    <img class="img" src="https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg" alt="">
                    <p class="H_W">H: ${pokemon.height/10} W: ${pokemon.weight/10}</p>
                </div>
                <div class="sprites">
                    ${sprites(pokemon.sprites.front_default)}
                    ${sprites(pokemon.sprites.back_default)}
                    ${sprites(pokemon.sprites.front_shiny)}
                    ${sprites(pokemon.sprites.back_shiny)}
                    <div class="types">${type}</div> 
                </div>
            </div>
        </div> 
        `
    }
}



const fillPokemon = (name) => {
    c(name)
    getPokemon(name).then(() => {
        description.innerHTML = pokemonTemplate()})
    console.log(pokemon)
}
fillPokemon(Math.round(Math.random()*151))

