const input = document.querySelector('.inputName')
const description = document.querySelector('.description')
const search = document.querySelector('.button')

let pokemon = []
let pokemonSpecies = []
let evoChain = []
let evoPokemonName = []
let evoSprites = []
let payload = []
let evo = []

input.addEventListener('change', (e) => {fillPokemon(e.target.value)} )
search.addEventListener('click', (e) => {fillPokemon(e.target.value)} )


const getEvoChain = async (url) =>{
    let response = await fetch(url)
    return response.json()
}

const getEvoChainNames = (evo) =>{

    let evolution1 = evo.chain.species.name
    let evolution2 = evo.chain.evolves_to.map(el => el.species.name).join(' ')
    let evolution3 = evo.chain.evolves_to.map(el => (el.evolves_to.map(el => (el.species.name)))).join(' ')

    return [`${evolution1}`, `${evolution2}`, `${evolution3}`]
}

const getEvoPokemon = async (name)=>{
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let data = await response.json()
    evoSprites.push(await data.sprites.front_default)
}

const clearEvoSprites = () =>{
    evo = [...evoSprites]
    evoSprites.splice(0, 10)
    return evo
}

const getPokemon = async (name) => {
    let responses = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
    ])
    pokemon = await responses[0].json()
    pokemonSpecies = await responses[1].json()
    evoChain = await getEvoChain(pokemonSpecies.evolution_chain.url)
    evoPokemonName = await getEvoChainNames(evoChain)
    evoPokemonName.map(el => getEvoPokemon(el))
    await clearEvoSprites()
    console.log(evoSprites)
    console.log(evoPokemonName)
    console.log(evo)
    return payload = [pokemon, pokemonSpecies, evoChain]

}


const pokemonTemplate = () => {

    switch (pokemonSpecies.color.name){
            case 'black' : document.querySelector("body").style.setProperty('--color2','black')
                break
            case 'blue' : document.querySelector("body").style.setProperty('--color2','#0388A6')
                break
            case 'brown' : document.querySelector("body").style.setProperty('--color2','black')
                break
            case 'gray' : document.querySelector("body").style.setProperty('--color2','gray')
                break
            case 'green' : document.querySelector("body").style.setProperty('--color2','#06BDAD')
                break
            case 'pink' : document.querySelector("body").style.setProperty('--color2','pink')
                break
            case 'purple' : document.querySelector("body").style.setProperty('--color2','purple')
                break
            case 'red' : document.querySelector("body").style.setProperty('--color2','#f2431d')
                break
            case 'white' : document.querySelector("body").style.setProperty('--color2','white')
                break
            case 'yellow' : document.querySelector("body").style.setProperty('--color2','#F2B41D')
                break
        }

    let evolutions = evo.map(el => `<img src="${el}">`).join( ' ')

    let flavorText = pokemonSpecies.flavor_text_entries.find(el => el.language.name === 'en')

    let nameJP = pokemonSpecies.names.find(el => el.language.name === 'ja-Hrkt')

    let genera = pokemonSpecies.genera.find(el => el.language.name === 'en')

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

    let stats = pokemon.stats.map(el => (`<div class="statItem">
            <p class="stat_text">
                <span class="stat_name">${el.stat.name}</span> : <span class="state_value">${el.base_stat}</span>
            </p>
            <div class="scale">
                <div class="scale_line" 
                    style="width: ${el.base_stat}px; 
                    height: 100%"></div>
            </div>     
        </div>`)).join('')

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
                    <p class="name_jp">${nameJP.name}</p>
                    <div class="stat">${stats}
                        <p class="abilities">Abilities:  ${abilities}</p>
                        <div>${evolutions}</div>
                    </div>
                    <p class="flavor">
                        ${flavorText.flavor_text.replace('\f', '\n')
                                                .replace('\u00ad\\n', '') 
                                                .replace('\u00ad',   '') 
                                                .replace(' -\\n',     ' - ') 
                                                .replace('-\\n',      '-') 
                                                .replace('\\n',       ' ')
                                                .replace('é','É')}
                    </p>
                    <p class="id">${pokemon.id}</p>
                </div>
                <div class="img_block">
                    <img class="img" src="https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg" alt="">
                    <p class="H_W">H: ${pokemon.height/10} W: ${pokemon.weight/10}</p>
                    <p class="genus">${genera.genus}</p>
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
    getPokemon(name).then(() => {
        description.innerHTML = pokemonTemplate()})
}
fillPokemon(Math.round(Math.random()*151))

