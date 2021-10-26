const input = document.querySelector('.inputName')
const description = document.querySelector('.description')
const search = document.querySelector('.button')
const random = document.querySelector('.pokeball')

// Database

let payload = {
    pokemon: '',
    pokemonSpecies: '',
    weaknesses: '',
    evoPokemon: '',
}
let allTypes = types

// Listeners

input.addEventListener('focus', () => { search.style.display = 'block'})
input.addEventListener('blur', () => { search.style.display = 'none'})
input.addEventListener('change', (e) => {fillPokemon(e.target.value)})
search.addEventListener('click', (e) => {fillPokemon(e.target.value)})
random.addEventListener('click', () => fillPokemon(Math.round(Math.random()*898)))

// Get pokemon description

const getPokemon = async (name) => {

    let pokemon = {}
    let pokemonSpecies = {}
    let weaknesses = {}

    let responses = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
    ])
    pokemon = await responses[0].json()
    pokemonSpecies = await responses[1].json()
    weaknesses = await getMultipliers(pokemon.types)

    return payload = {
        pokemon: pokemon,
        pokemonSpecies: pokemonSpecies,
        weaknesses: weaknesses
    }

}

// Get evolution

const getEvolution = async (url) => {

    let evoPokemon = []
    let evoPokemonName = []

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

    return payload = {...payload, evoPokemon: evoPokemon}
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

const weaknessesMap = () => {

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

    let attack = multipliers(payload.weaknesses.attack)
    let defense = multipliers(payload.weaknesses.defense)

    return [attack, defense]
}

const weaknessesTemplate = (arrItem,amountX) =>{
    let typeSpan = (type, typesNum) => `<span class="cxxx ${type} weaknesses_type" onclick="fillTypes(${typesNum})">${type}</span>`
    let type = arrItem.map(el =>{
        switch (el instanceof Object ? el.name : el){
            case 'normal': return typeSpan('normal', 1)
            case 'fighting': return typeSpan('fighting', 2)
            case 'flying': return typeSpan('flying', 3)
            case 'poison': return typeSpan('poison', 4)
            case 'ground': return typeSpan('ground', 5)
            case 'rock': return typeSpan('rock', 6)
            case 'bug': return typeSpan('bug', 7)
            case 'ghost': return typeSpan('ghost', 8)
            case 'steel': return typeSpan('steel', 9)
            case 'fire': return typeSpan('fire', 10)
            case 'water': return typeSpan('water', 11)
            case 'grass': return typeSpan('grass', 12)
            case 'electric': return typeSpan('electric', 13)
            case 'psychic': return typeSpan('psychic', 14)
            case 'ice': return typeSpan('ice', 15)
            case 'dragon': return typeSpan('dragon', 16)
            case 'dark': return typeSpan('dark', 17)
            case 'fairy': return typeSpan('fairy', 18)
        }
    })
    return arrItem.length > 0 ? `<p class="weaknesses_type_multiplier">x${amountX} : ${type.join(' ')}</p> ` : ''
}

// Change theme color

const changeColor = (color1,color2,color3, color4,color5,color6) =>{
    document.querySelector("body").style.setProperty('--color1', color1)
    document.querySelector("body").style.setProperty('--color2', color2)
    document.querySelector("body").style.setProperty('--color3', color3)
    document.querySelector("body").style.setProperty('--color4', color4)
    document.querySelector("body").style.setProperty('--color5', color5)
    document.querySelector("body").style.setProperty('--color6', color6)

}

const changeThemeColor = () => {

    switch (payload.pokemonSpecies.color.name) {
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
            '#635341',
            '#2E6E70',
            '',
            '',
            '')
            break
        case 'gray' :   changeColor(
            '',
            '#B3B3B3',
            '#4789A1',
            '',
            '',
            '')
            break
        case 'green' :  changeColor(
            '',
            '#339E9E',
            '#C76374',
            '',
            '',
            '')
            break
        case 'pink' :   changeColor(
            '',
            '#EDA5B3',
            '#63AEBF',
            '',
            '',
            '')
            break
        case 'purple' : changeColor(
            '',
            '#B38CB8',
            '#349E9E',
            '',
            '',
            '')
            break
        case 'red' : changeColor(
            '',
            '#C76374',
            '#339E9E',
            '',
            '',
            '')
            break
        case 'white' :  changeColor(
            '',
            '#ECEDED',
            '#F8DCA4',
            '',
            '',
            '')
            break
        case 'yellow' : changeColor(
            '',
            '#F8DCA4',
            '#729BB2',
            '',
            '',
            '')
            break
    }

    if(payload.pokemonSpecies.is_legendary === true) {
        changeColor(
            'linear-gradient(-45deg, rgb(247, 213, 133) 40%, rgb(252, 233, 204) 60%)',
            '#E8756D',
            '#5DB7A8',
            '',
            '#50335E',
            '')
    }
    if(payload.pokemonSpecies.is_mythical === true) {
        changeColor(
            'linear-gradient(-45deg, rgb(199, 196, 181) 40%, rgb(224, 221, 204) 60%)',
            '#64638F',
            '#6097A0',
            '',
            '#9E84B0',
            '')
    }
}

// Pokemon parameters

const abilities = () => (payload.pokemon.abilities.map(el => (`<span class="abilities_text">${el.ability.name}</span>`)).join(' '))

const stats = () => (payload.pokemon.stats.map(el => (`<div class="statItem">
            <p class="stat_text">
                <span class="stat_name">${el.stat.name}</span> : <span class="state_value">${el.base_stat}</span>
            </p>
            <div class="scale">
                <div class="scale_line" 
                    style="width: ${window.innerHeight <= 900 ? el.base_stat / 1.45 : el.base_stat }px; 
                    height: 100%"></div>
            </div>     
        </div>`)).join(''))

const type = () => (payload.pokemon.types.map(el => {

    const typeImg = (type, typeNumber) =>`<img class="typeImg" src="typesImg/${type}.png" alt="" onclick="fillTypes(${typeNumber})"/>`

    switch (el.type.name){
        case 'normal': return typeImg('normal', 1)
        case 'fighting': return typeImg('fighting', 2)
        case 'flying': return typeImg('flying', 3)
        case 'poison': return typeImg('poison', 4)
        case 'ground': return typeImg('ground', 5)
        case 'rock': return typeImg('rock', 6)
        case 'bug': return typeImg('bug', 7)
        case 'ghost': return typeImg('ghost', 8)
        case 'steel': return typeImg('steel', 9)
        case 'fire': return typeImg('fire', 10)
        case 'water': return typeImg('water', 11)
        case 'grass': return typeImg('grass', 12)
        case 'electric': return typeImg('electric', 13)
        case 'psychic': return typeImg('psychic', 14)
        case 'ice': return typeImg('ice', 15)
        case 'dragon': return typeImg('dragon', 16)
        case 'dark': return typeImg('dark', 17)
        case 'fairy': return typeImg('fairy', 18)
    }
}).join(''))

const sprites = (src) => {
    if (src) {
        return `<img class="sprite" src=${src} alt="">`
    }
    else return ''
}

// Evolution

const evolutions = () => (payload.evoPokemon.map(el => `<div class="evo_description">
                                                        <img class="sprite evo_sprite" 
                                                        onclick="payload.pokemon.id === ${el.id} 
                                                                ? alert('Selected') 
                                                                : fillPokemon(${el.id})" 
                                                        src="${el.sprite}">
                                                        <p class="evo_name">${el.name}</p>
                                                        <p class="evo_id">${el.id}</p>
                                                      </div>`).join( ' '))

// Template pokemon page

const pokemonTemplate = () => {

    changeThemeColor()

    let flavorText = payload.pokemonSpecies.flavor_text_entries.find(el => el.language.name === 'en')

    let nameJP = payload.pokemonSpecies.names.find(el => el.language.name === 'ja-Hrkt')

    let genera = payload.pokemonSpecies.genera.find(el => el.language.name === 'en')

    if (payload.pokemon) {
        return `
            <div class="pokemon">
                <div class="info_block">
                    <p  class="name" style="${payload.pokemon.name.length > 15 && 'font-size: calc(40px + 25 * (100vw / 1920))'}">
                        ${payload.pokemon.name}
                    </p>
                    <p class="name_jp">${nameJP.name}</p>
                    <div class="stat">
                        <div class="stat_toggle">
                            ${stats()}
                            <p class="abilities">Abilities:  ${abilities()}</p>
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
                    <p class="id">${payload.pokemon.id}</p>
                </div>
                <div class="img_block">
                    <img class="img" src="https://img.pokemondb.net/artwork/large/${payload.pokemon.name}.jpg" alt="">
                    <p class="H_W">H: ${payload.pokemon.height / 10} W: ${payload.pokemon.weight / 10}</p>
                    <p class="genus">${genera.genus}</p>
                </div>
                <div class="lineBottom">
                    ${window.innerWidth > 425 
                    ?
                    `<div class="sprites">
                        <div class="sprite_wrapper">                        
                            ${sprites(payload.pokemon.sprites.front_default)}
                        </div >
                        <div class="sprite_wrapper">                        
                            ${sprites(payload.pokemon.sprites.back_default)}
                        </div>
                        <div class="sprite_wrapper">                        
                            ${sprites(payload.pokemon.sprites.front_shiny)}
                        </div>
                        <div class="sprite_wrapper">                       
                            ${sprites(payload.pokemon.sprites.back_shiny)}
                        </div>
                        <div class="types">${type()}</div> 
                    </div>`
                    :
                    `<div class="sprites">
                        <div class="sprite_wrapper">                        
                            ${sprites(payload.pokemon.sprites.front_default)}
                        </div >
                       <div class="sprite_wrapper">                        
                       ${sprites(payload.pokemon.sprites.back_default)}
                        </div>
                         <div class="types">${type()}</div> 
                   </div>`
            }
                    </div>
                </div>
`
    }
}

// Preloader

const preloader = () => {
    description.innerHTML = `<div class="preloader">
                                <img class="load" src="./img/loadPok.png" alt="">      
                            </div>`
}

// Fill pokemon page

const fillPokemon = (name) => {

    // Loading

    preloader()

    // Getting pokemon description

    getPokemon(name)

        .then(async payload => {
                            // delete async to evo
            // Getting evolution sprites
            await getEvolution(payload.pokemonSpecies.evolution_chain.url)

        })
        .then(() => {

            // Fill HTML template

            description.innerHTML = pokemonTemplate()

            // Selectors

            const stat = document.querySelector('.stat')
            const stat_toggle = document.querySelector('.stat_toggle')
            const lineBottom = document.querySelector('.lineBottom')

            // Weaknesses

            let [attack, defense] = weaknessesMap()

            // Listeners

            let evoDisplay = false
            let weakDisplay = false

            stat.addEventListener('mouseover', () => {
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
            stat.addEventListener('mouseleave', () => {
                if (weakDisplay) {
                    stat_toggle.innerHTML = `${stats()}<p class="abilities">Abilities:  ${abilities()}</p>`

                    weakDisplay = false
                }
            })
            lineBottom.addEventListener('mouseover', () => {
                if (!evoDisplay) {
                    lineBottom.innerHTML = `<div class="evolution">
                                        ${payload.evoPokemon.length > 0
                                                                        ? evolutions()
                                                                        : `<img class="sprite" 
                                                                        src=${payload.pokemon.sprites.front_default}>`}
                                        ${payload.pokemonSpecies.is_legendary ? `<p class="special">legendary</p>` : ''}
                                        ${payload.pokemonSpecies.is_mythical ? `<p class="special">mythical</p>` : ''}
                                        <div class="types">${type()}</div>
                                    </div>`
                    evoDisplay = true
                }
            })
            lineBottom.addEventListener('mouseleave', () => {
                if (evoDisplay) {
                    lineBottom.innerHTML = `<div class="sprites">
                                        <div class="sprite_wrapper">${sprites(payload.pokemon.sprites.front_default)}</div>
                                        <div class="sprite_wrapper">${sprites(payload.pokemon.sprites.back_default)}</div>
                                        <div class="sprite_wrapper">${sprites(payload.pokemon.sprites.front_shiny)}</div>
                                        <div class="sprite_wrapper">${sprites(payload.pokemon.sprites.back_shiny)}</div>
                                        <div class="types">${type()}</div> 
                                    </div>`
                    evoDisplay = false
                }
            })
        })
}

fillPokemon(Math.round(Math.random()*151))







