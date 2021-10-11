const input = document.querySelector('.inputName')
const description = document.querySelector('.description')
const search = document.querySelector('.button')
const random = document.querySelector('.pokeball')

// Database

let payload = []
let pokemon = []
let pokemonSpecies = []
let weaknesses = []
let allTypes = types
let evoPokemonName = []

// Listeners

input.addEventListener('focus', () => { search.style.display = 'block'})
input.addEventListener('blur', () => { search.style.display = 'none'})
input.addEventListener('change', (e) => {fillPokemon(e.target.value)})
search.addEventListener('click', (e) => {fillPokemon(e.target.value)})
random.addEventListener('click', () => fillPokemon(Math.round(Math.random()*898)))

// Pokemon description

const getPokemon = async (name) => {

    let responses = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
    ])
    pokemon = await responses[0].json()
    pokemonSpecies = await responses[1].json()
    weaknesses = await getMultipliers(pokemon.types)
    return payload = [pokemon, pokemonSpecies, weaknesses]

}

// evolution

const getEvolution = async (url) => {

    let response = await fetch(url)
    let data = await response.json()

    let evolutionName1 = await data.chain.species.name
    let evolutionName2 = await data.chain.evolves_to.map(el => (el.species.name)).join(',')
    let evolutionName3 = await data.chain.evolves_to.map(el => (el.evolves_to.map(el => el.species.name))).join(',')

    evolutionName1 && evoPokemonName.push(evolutionName1.split(','))
    evolutionName2 && evoPokemonName.push(evolutionName2.split(','))
    evolutionName3 && evoPokemonName.push(evolutionName3.split(','))

    let fetchingEvoPokemon = async (name) => {

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        let data = await response.json()

        evoPokemon.push({
            id: data.id,
            name: data.name,
            sprite: data.sprites.front_default
        })
    }

    evoPokemonName.map(el => {
        fetchingEvoPokemon(el)
        if(el.length > 1){
            el.map( innerEl =>{ fetchingEvoPokemon(innerEl)})
        }

    })

    return evoPokemon
}

// Weaknesses multiplier

const getMultipliers = (types) => {
    let multipliers = {
        defense: {},
        attack: {}
    }
    types.forEach( (type) => {
        let damage_relations = allTypes[type.type.name]
        let no_damage_to = damage_relations.attack.zero
        let no_damage_from = damage_relations.defense.zero
        let half_damage_to = damage_relations.attack.half
        let half_damage_from = damage_relations.defense.half
        let double_damage_to = damage_relations.attack.double
        let double_damage_from = damage_relations.defense.double
        no_damage_to.forEach((type) => {
            if(multipliers.attack.hasOwnProperty(type)){multipliers.attack[type] = multipliers.attack[type] * 0}
            else{multipliers.attack[type] = 0}
        })
        no_damage_from.forEach((type) => {
            if(multipliers.defense.hasOwnProperty(type)){multipliers.defense[type] = multipliers.defense[type] * 0}
            else{multipliers.defense[type] = 0}
        })
        half_damage_to.forEach((type) => {
            if(multipliers.attack.hasOwnProperty(type)){multipliers.attack[type] = multipliers.attack[type] * 0.5}
            else{multipliers.attack[type] = 0.5}
        })
        half_damage_from.forEach((type) => {
            if(multipliers.defense.hasOwnProperty(type)){multipliers.defense[type] = multipliers.defense[type] * 0.5}
            else{multipliers.defense[type] = 0.5}
        })
        double_damage_to.forEach((type) => {
            if(multipliers.attack.hasOwnProperty(type)){multipliers.attack[type] = multipliers.attack[type] * 2}
            else{multipliers.attack[type] = 2}
        })
        double_damage_from.forEach((type) => {
            if(multipliers.defense.hasOwnProperty(type)){multipliers.defense[type] = multipliers.defense[type] * 2}
            else{multipliers.defense[type] = 2}
        })
    })
    return multipliers
}

// Template pokemon page

const pokemonTemplate = () => {

    let changeThemeColor = () => {

        let changeColor = (color1,color2,color3, color4,color5,color6) =>{
            document.querySelector("body").style.setProperty('--color1', color1)
            document.querySelector("body").style.setProperty('--color2', color2)
            document.querySelector("body").style.setProperty('--color3', color3)
            document.querySelector("body").style.setProperty('--color4', color4)
            document.querySelector("body").style.setProperty('--color5', color5)
            document.querySelector("body").style.setProperty('--color6', color6)

        }

        switch (pokemonSpecies.color.name) {
            case 'black' :  changeColor(
                                        '',
                                        '#155259',
                                        '#20818C',
                                        '',
                                        '',
                                        '')
                break
            case 'blue' :   changeColor(
                                        '',
                                        '#3897b0',
                                        '#B04A6E',
                                        '',
                                        '',
                                        '')
                break
            case 'brown' :  changeColor(
                                        '',
                                        '#734E0E',
                                        '#027373',
                                        '',
                                        '',
                                        '')
                break
            case 'gray' :   changeColor(
                                        '',
                                        '#969696',
                                        '#99CCCC',
                                        '',
                                        '',
                                        '')
                break
            case 'green' :  changeColor(
                                        '',
                                        '#03a6a6',
                                        '#f25c5c',
                                        '',
                                        '',
                                        '')
                break
            case 'pink' :   changeColor(
                                        '',
                                        '#f24b88',
                                        '#63AEBF',
                                        '',
                                        '',
                                        '')
                break
            case 'purple' : changeColor(
                                        '',
                                        '#A65D92',
                                        '#04BFAD',
                                        '',
                                        '',
                                        '')
                break
            case 'red' : changeColor(
                                        '',
                                        '#f24405',
                                        '#039999',
                                        '',
                                        '',
                                        '')
                break
            case 'white' :  changeColor(
                                        '',
                                        '#F2F2F2',
                                        '#F2D06B',
                                        '',
                                        '',
                                        '')
                break
            case 'yellow' : changeColor(
                                        '',
                                        '#F2C063',
                                        '#276573',
                                        '',
                                        '',
                                        '')
                break
        }
        if(pokemonSpecies.is_legendary === true) {
            changeColor(
                        'linear-gradient(-45deg, rgb(247, 213, 133) 40%, rgb(252, 233, 204) 60%)',
                        '#E8756D',
                        '#5DB7A8',
                        '',
                        '#50335E',
                        '')
        }
        if(pokemonSpecies.is_mythical === true) {
            changeColor(
                        'linear-gradient(-45deg, rgb(199, 196, 181) 40%, rgb(224, 221, 204) 60%)',
                        '#64638F',
                        '#6097A0',
                        '',
                        '#9E84B0',
                        '')
        }
    }
    changeThemeColor()

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

    let abilitiesx = pokemon.abilities.map(el => (`<span class="abilities_text">${el.ability.name}</span>`)).join(' ')

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
                    <p class="name" style="${pokemon.name.length > 15 && 'font-size: calc(40px + 25 * (100vw / 1920))'}">${pokemon.name}</p>
                    <p class="name_jp">${nameJP.name}</p>
                    <div class="stat">
                        <div class="stat_toggle">
                            ${stats}
                            <p class="abilities">Abilities:  ${abilitiesx}</p>
                        </div>
                    </div>
                    <p class="flavor">
                        ${flavorText.flavor_text.replace('\f', '\n')
                                                .replace('\u00ad\\n', '')
                                                .replace('\u00ad', '')
                                                .replace(' -\\n', ' - ')
                                                .replace('-\\n', '-')
                                                .replace('\\n', ' ')
                                                .replace('é', 'É')}
                    </p>
                    <p class="id">${pokemon.id}</p>
                </div>
                <div class="img_block">
                    <img class="img" src="https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg" alt="">
                    <p class="H_W">H: ${pokemon.height / 10} W: ${pokemon.weight / 10}</p>
                    <p class="genus">${genera.genus}</p>
                </div>
                <div class="lineBottom">
                    <div class="sprites">
                        ${sprites(pokemon.sprites.front_default)}
                        ${sprites(pokemon.sprites.back_default)}
                        ${sprites(pokemon.sprites.front_shiny)}
                        ${sprites(pokemon.sprites.back_shiny)}
                        <div class="types">${type}</div> 
                    </div>
                </div>
            </div>
        </div> 
        `
    }
}

// Fill pokemon page

const fillPokemon = (name) => {

    // Preloader

    description.innerHTML = `<div class="preloader">
                                <img class="load" src="./img/loadPok.png" alt="">      
                            </div>`

    // Getting pokemon description

    getPokemon(name)
        .then(async payload => {
                console.log(pokemon)
                console.log(pokemonSpecies)
            // Update evolution array

            evoPokemonName = []
            evoPokemon = []

            // Getting evolution sprites

            await getEvolution(payload[1].evolution_chain.url)

        })
        .then(() => {

        // Fill HTML template

        description.innerHTML = pokemonTemplate()

        const stat = document.querySelector('.stat')
        const stat_toggle =document.querySelector('.stat_toggle')
        const lineBottom = document.querySelector('.lineBottom')

        // Listeners
        let evoDisplay = false
        let weakDisplay = false

        stat.addEventListener('mouseover', ()=>{
            if (!weakDisplay) {
                stat_toggle.innerHTML = `<div class="weaknesses">
                                    <div class="attack">
                                        <p class="weak_header">Attack</p>
                                        ${weaknessesTemplate(attack[0], 0.25)}
                                        ${weaknessesTemplate(attack[1], 0.5)}
                                        ${weaknessesTemplate(attack[2], 1)}
                                        ${weaknessesTemplate(attack[3], 1.5)}
                                        ${weaknessesTemplate(attack[4], 2)}
                                        ${weaknessesTemplate(attack[5], 4)}
                                    </div>
                                    <div class="defense">
                                        <p class="weak_header">defense</p>
                                        ${weaknessesTemplate(defense[0], 0.25)}
                                        ${weaknessesTemplate(defense[1], 0.5)}
                                        ${weaknessesTemplate(defense[2], 1)}
                                        ${weaknessesTemplate(defense[3], 1.5)}
                                        ${weaknessesTemplate(defense[4], 2)}
                                        ${weaknessesTemplate(defense[5], 4)}
                                    </div>
                                </div>`

                weakDisplay = true
            }
        })
        stat.addEventListener('mouseleave', ()=>{
            if (weakDisplay) {
                stat_toggle.innerHTML = `${stats}<p class="abilities">Abilities:  ${abilities}</p>`

                weakDisplay = false
            }
        })
        lineBottom.addEventListener('mouseover', ()=>{
            if(!evoDisplay) {
                lineBottom.innerHTML = `<div class="evolution">
                                        ${evoPokemon.length > 0 ? evolutions() : `<img class="sprite" src=${pokemon.sprites.front_default}>`}
                                        ${pokemonSpecies.is_legendary ? `<p class="special">legendary</p>` : ''}
                                        ${pokemonSpecies.is_mythical ? `<p class="special">mythical</p>` : ''}
                                        <div class="types">${type}</div>
                                    </div>`
                evoDisplay = true
            }})
        lineBottom.addEventListener('mouseleave', ()=>{
            if(evoDisplay) {
                lineBottom.innerHTML = `<div class="sprites">
                                        <div>${sprites(pokemon.sprites.front_default)}</div>
                                        <div>${sprites(pokemon.sprites.back_default)}</div>
                                        <div>${sprites(pokemon.sprites.front_shiny)}</div>
                                        <div>${sprites(pokemon.sprites.back_shiny)}</div>
                                        <div class="types">${type}</div> 
                                    </div>`
                evoDisplay = false
            }
        })


        // weaknesses

        let weaknessesMap = () => {

            let multipliers = (type)=>{

                let x0x25 = []
                let x0x5 = []
                let x1 = []
                let x1x5 = []
                let x2 = []
                let x4 = []

                Object.entries(type).map(el =>{
                    switch (el[1]){
                        case 0.25 : x0x25.push(el[0])
                            break
                        case 0.5 : x0x5.push(el[0])
                            break
                        case 1 : x1.push(el[0])
                            break
                        case 1.5 : x1x5.push(el[0])
                            break
                        case 2 : x2.push(el[0])
                            break
                        case 4 : x4.push(el[0])
                            break
                    }
                })
                return [x0x25, x0x5, x1, x1x5, x2, x4]
            }

            let attack = multipliers(weaknesses.attack)
            let defense = multipliers(weaknesses.defense)

            return [attack, defense]
        }

        let [attack, defense] = weaknessesMap()

        let weaknessesTemplate = (arrItem,amountX) =>{
            let type = arrItem.map(el =>{
                switch (el){
                    case 'bug': return `<span class="bug weaknesses_type">BUG</span>`
                    case 'dark': return `<span class="dark weaknesses_type">DARK</span>`
                    case 'dragon': return `<span class="dragon weaknesses_type">DRAGON</span>`
                    case 'electric': return `<span class="electric weaknesses_type">ELECTRIC</span>`
                    case 'fairy': return `<span class="fairy weaknesses_type">FAIRY</span>`
                    case 'fighting': return `<span class="fighting weaknesses_type">FIGHTING</span>`
                    case 'fire': return `<span class="fire weaknesses_type">FIRE</span>`
                    case 'flying': return `<span class="flying weaknesses_type">FLYING</span>`
                    case 'ghost': return `<span class="ghost weaknesses_type">GHOST</span>`
                    case 'grass': return `<span class="grass weaknesses_type">GRASS</span>`
                    case 'ground': return `<span class="ground weaknesses_type">GROUND</span>`
                    case 'ice': return `<span class="ice weaknesses_type">ICE</span>`
                    case 'normal': return `<span class="normal weaknesses_type">NORMAL</span>`
                    case 'poison': return `<span class="poison weaknesses_type">POISON</span>`
                    case 'psychic': return `<span class="psychic weaknesses_type">PSYCHIC</span>`
                    case 'rock': return `<span class="rock weaknesses_type">ROCK</span>`
                    case 'steel': return `<span class="steel weaknesses_type">STEEL</span>`
                    case 'water': return `<span class="water weaknesses_type">WATER</span>`
                }
            })
            return arrItem.length > 0 ? `<p class="weaknesses_type_multiplier">x${amountX} : ${type.join(' ')}</p> ` : ''
        }


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

        // evolution

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

        let evolutions = () => (evoPokemon.map(el => `<div class="evo_description">
                                                        <img class="sprite evo_sprite" 
                                                        onclick="pokemon.id === ${el.id} 
                                                                ? alert('Selected') 
                                                                : fillPokemon(${el.id})" 
                                                        src="${el.sprite}">
                                                        <p class="evo_name">${el.name}</p>
                                                        <p class="evo_id">${el.id}</p>
                                                      </div>`).join( ' '))

        let sprites = (src) => {
            if (src) {
                return `<img class="sprite" src=${src} alt="">`
            }
            else return ''
        }


    })


}

fillPokemon(Math.round(Math.random()*151))



