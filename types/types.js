let allTypesPokemon = []
let typeDamage = []

let typeDescriptionText = ''
let normal = 'The Normal type is the most basic type of Pokémon. They are very common and appear from the very first route you visit. Most Normal Pokémon are single type, but there is a large contingent having a second type of Flying.'
let fighting = 'Fighting Pokémon are strong and muscle-bound, often based on martial artists. Fighting moves are super-effective against five other types (as is Ground), making them very good offensively. Most Fighting type moves are in the Physical category, for obvious reasons.'
let flying = 'Most Flying type Pokémon are based on birds or insects, along with some mythical creatures like dragons. On average they are faster than any other type. Nearly every Flying type has Flying as the secondary type, usually with Normal. There are only three pure Flying type Pokémon (Tornadus, Rookidee, Corvisquire), and four Pokémon with Flying as a primary type (Noibat, Noivern, Corviknight, Cramorant). As of Generation 6, the type has also been paired with every other type.'
let poison = 'The Poison type is regarded as one of the weakest offensively. Prior to Pokémon X/Y it was super-effective only against Grass (many of which are dual Poison so neutralizes the effect). It now has an extra advantage against the new Fairy type. In the first generation it was also super-effective against Bug but this was changed. It fares a little better defensively but its best advantage is through status moves like Toxic.'
let ground = 'Ground is one of the strongest types offensively: it is super-effective against five other types (as is Fighting) and Earthquake is one of the strongest moves in the game with power and accuracy both 100. Unfortunately, many Ground type Pokémon are dual Rock types, lumbering them with 4x Grass and Water disadvantages.'
let rock = 'Rock is a solid type as one might expect. Like Steel, Rock Pokémon usually have high defense - however, since many Rock Pokémon are part Ground they have a 4x weakness to both Grass and Water whose moves often come as Special type.'
let bug = 'Most Bug Pokémon grow quickly and evolve sooner than other types. As a result, they are often very weak. In Generation I, bugs were almost useless since the few Bug type moves available were very weak. The situation improved in later games with better moves and an advantage against the Dark type.'
let ghost = 'Ghosts are rare Pokémon, and the only type to have two immunities. In total there are just 34 Ghost type Pokémon (not including Megas/Formes), slightly above Ice. In the first generation, Ghost moves has no effect on Psychic Pokémon, however, it was later changed to be super-effective. When paired with the Dark type it was the only type combination to have no weaknesses prior to Gen 6.'
let steel = 'The Steel type was introduced in the second generation of Pokémon games. It is the strongest type defensively, with 10 types being not very effective against it and the Poison type having no effect. From Pokémon X/Y onwards, it lost its Ghost and Dark resistance, those types now dealing neutral damage. The Steel type also has the highest average Defense stat in the games.'
let fire = 'Fire is one of the three basic elemental types along with Water and Grass, which constitute the three starter Pokémon. This creates a simple triangle to explain the type concept easily to new players. Fire types are notoriously rare in the early stages of the games so choosing the Fire variation starter is often a plus.'
let water = 'Water is one of the three basic elemental types along with Fire and Grass, which constitute the three starter Pokémon. This creates a simple triangle to explain the type concept easily to new players. Water is the most common type with over 100 Pokémon, which are based on a wide variety of fish and other sea-dwelling creatures.'
let grass = 'Grass is one of the three basic elemental types along with Fire and Water, which constitute the three starter Pokémon. This creates a simple triangle to explain the type concept easily to new players. Grass is one of the weakest types statistically, with 5 defensive weaknesses and 7 types that are resistant to Grass moves. Furthermore, three type combos paired with Grass have 7 weaknesses: Grass/Psychic, Grass/Ice, and Grass/Dark.'
let electric = 'There are relatively few Electric Pokémon; in fact only four were added in the third generation. Most are based on rodents or inanimate objects. Electric Pokémon are very good defensively, being weak only to Ground moves. Eelektross is the only Pokémon to have no type disadvantages due to its ability, Levitate.'
let psychic = 'The Psychic type has few outright strengths, however, it also has few weaknesses. In the first generation it ended up being massively overpowered, mainly due to a complete lack of powerful Bug moves, its only weakness. Furthermore, a mistake in the game meant that Ghost-type moves had no effect on Psychic (although this only affected the low-powered Lick). Generation 2 rectified the situation with the addition of the Dark type along with better Pokémon and moves of all types.'
let ice = 'Ice type Pokémon are now the rarest of all types: there are only around 60 in total (depending on how you count alternate forms or mega evolutions). They are ranked quite well defensively in terms of stats, although multiple type weaknesses let them down. Some are based on typical Arctic creatures like seals or yaks, while others are more mythical.'
let dragon = 'Dragons are among the most elusive and powerful of all Pokémon. Nine legendary Pokémon are part Dragon type and four have legendary-like stats. They are notoriously difficult to train due to requiring more EXP points per level than most non-legendary Pokémon, and the fact they evolve much later and thus are in their weaker forms for longer. Interestingly, many final-evolution Dragon types have a 4x weakness to the Ice type.'
let dark = 'The Dark type was introduced in the second generation of Pokémon games as a measure to balance the types. In particular, its resistance to Psychic cut down that type\'s advantage by a long way. When paired with the Ghost type it was the only type combination to have no weaknesses prior to Gen 6.'
let fairy = 'The Fairy type was introduced in Generation 6 - the first new type for more than 12 years! Its main intention was to balance the type chart by reducing the power of dragons, while also giving an offensive boost to the Poison and Steel types. Several old Pokémon were retyped and new Pokémon introduced. There are only around 60 Fairy type Pokémon (depending on how you count alternate forms or mega evolutions), in total slightly above Ice.'

// Get types description

const getTypes = async (type) =>{

    let typeDescription = ''

    let response = await fetch(`https://pokeapi.co/api/v2/type/${type}/`)
    let data = await response.json()
    typeDescription = data

    return typeDescription
}

// Get type's pokemon

const getTypesPokemon = async (name) => {

    allTypesPokemon = []

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let data = await response.json()

    if (data.id < 898){
        allTypesPokemon = [...allTypesPokemon, {name: data.name, id: data.id, sprite: data.sprites.front_default}]
    }

    return allTypesPokemon

}

// Change theme color

const changeThemeColorType = (type) =>{

    switch (type){
        // Normal
        case 1 :  changeColor(
            '#FEEBD6',
            '#F5B1A5',
            '#AA819D',
            '',
            '',
            '')
            break
        // Fighting
        case 2 :  changeColor(
            '#EDE9D0',
            '#eb6651',
            '#54BAC3',
            '',
            '',
            '')
            break
        // Flying
        case 3 :  changeColor(
            '#E6F4F1',
            '#64BFCC',
            '#D978A6',
            '',
            '',
            '')
            break
        // Poison
        case 4 :  changeColor(
            '#FEFEDF',
            '#865F99',
            '#00C9B5',
            '',
            '',
            '')
            break
        // Ground
        case 5 :  changeColor(
            '#FFF7EF',
            '#96643C',
            '#00838B',
            '',
            '',
            '')
            break
        // Rock
        case 6 :  changeColor(
            '#FFF6F5',
            '#4E3B3A',
            '#487E91',
            '',
            '',
            '')
            break
        // Bug
        case 7 :  changeColor(
            '#F3EADA',
            '#16a085',
            '#007D83',
            '',
            '',
            '')
            break
        // Ghost
        case 8 :  changeColor(
            '#DDD7C6',
            '#C07BA7',
            '#00A3C4',
            '',
            '',
            '')
            break
        // Steel
        case 9 :  changeColor(
            '#E0F5EF',
            '#30aabc',
            '#418272',
            '',
            '',
            '')
            break
        // Fire
        case 10 :  changeColor(
            '#F9EBEA',
            '#e74c3c',
            '#00818E',
            '',
            '',
            '')
            break
        // Water
        case 11 :  changeColor(
            '#D6EDE9',
            '#3498db',
            '#328980',
            '',
            '',
            '')
            break
        // Grass
        case 12 :  changeColor(
            '#D9EDDF',
            '#2ecc71',
            '#0093E5',
            '',
            '',
            '')
            break
        // Electric
        case 13 :  changeColor(
            '#FFEFCA',
            '#f1c40f',
            '#006E62',
            '',
            '',
            '')
            break
        // Psychic
        case 14 :  changeColor(
            '#F7F5DD',
            '#eb4962',
            '#009FA0',
            '',
            '',
            '')
            break
        // Ice
        case 15 :  changeColor(
            '#EEFCFE',
            '#B2DEE3',
            '#00A9C2',
            '',
            '',
            '')
            break
        // Dragon
        case 16 :  changeColor(
            '#FFE8D1',
            '#92CCD5',
            '#B27FA8',
            '',
            '',
            '')
            break
        // Dark
        case 17 :  changeColor(
            '#DEF2EF',
            '#34495e',
            '#3C8E85',
            '',
            '',
            '')
            break
        // Fairy
        case 18 :  changeColor(
            '#F4DDE3',
            '#FF6978',
            '#00B5B8',
            '',
            '',
            '')
            break
    }
}

// Template types page

const typesPokemonTemplate = (pokemon, damage, type) => {

    changeThemeColorType(type)

    return `<div class="type_description">
                <div class="type_pokemon">
                    ${pokemon.map(el => `<div class="type_pokemon_block" id="${el.id}">
                                                <img class="type_pokemon_sprite" src='${el.sprite}' alt="">
                                                <p class="type_pokemon_name" id="name_${el.id}">${el.name}</p>
                                                <p class="type_pokemon_id">${el.id}</p>
                                        </div>`).join('')}
                </div>
                <div class="right_block">
                    <div class="types_damage">
                        ${weaknessesTemplate(damage.double_damage_from, '2 Damage from')}
                        ${weaknessesTemplate(damage.double_damage_to, '2 Damage to')}
                        ${weaknessesTemplate(damage.half_damage_from, '0.5 Damage from')}
                        ${weaknessesTemplate(damage.half_damage_to, '0.5 Damage to')}
                        ${weaknessesTemplate(damage.no_damage_from, '0 Damage From')}
                        ${weaknessesTemplate(damage.no_damage_to, '0 Damage to')}
                    </div>
                </div>
                <div class="types_bottom_line">
                    <img class="type_icon" src="typesImg/normal.png" alt="" onclick="fillTypes(1)">
                    <img class="type_icon" src="typesImg/fighting.png" alt="" onclick="fillTypes(2)">
                    <img class="type_icon" src="typesImg/flying.png" alt="" onclick="fillTypes(3)">
                    <img class="type_icon" src="typesImg/poison.png" alt="" onclick="fillTypes(4)">
                    <img class="type_icon" src="typesImg/ground.png" alt="" onclick="fillTypes(5)">
                    <img class="type_icon" src="typesImg/rock.png" alt="" onclick="fillTypes(6)">
                    <img class="type_icon" src="typesImg/bug.png" alt="" onclick="fillTypes(7)">
                    <img class="type_icon" src="typesImg/ghost.png" alt="" onclick="fillTypes(8)">
                    <img class="type_icon" src="typesImg/steel.png" alt="" onclick="fillTypes(9)">
                    <img class="type_icon" src="typesImg/fire.png" alt="" onclick="fillTypes(10)">
                    <img class="type_icon" src="typesImg/water.png" alt="" onclick="fillTypes(11)"> 
                    <img class="type_icon" src="typesImg/grass.png" alt="" onclick="fillTypes(12)">
                    <img class="type_icon" src="typesImg/electric.png" alt="" onclick="fillTypes(13)">
                    <img class="type_icon" src="typesImg/psychic.png" alt="" onclick="fillTypes(14)">
                    <img class="type_icon" src="typesImg/ice.png" alt="" onclick="fillTypes(15)">
                    <img class="type_icon" src="typesImg/dragon.png" alt="" onclick="fillTypes(16)">
                    <img class="type_icon" src="typesImg/dark.png" alt="" onclick="fillTypes(17)">
                    <img class="type_icon" src="typesImg/fairy.png" alt="" onclick="fillTypes(18)">
                </div>
            </div>`
}

// fill types page

const PokemonBlock = () =>{

    let pokemonBlock = document.querySelectorAll('.type_pokemon_block')

    // Pokemon block hover and click

    pokemonBlock.forEach(el =>{

        let pokemonName = el.querySelector('.type_pokemon_name')
        let pokemonId = el.querySelector('.type_pokemon_id')
        let pokemonSprite = el.querySelector('.type_pokemon_sprite')

        el.addEventListener('click',()=>{fillPokemon(el.id)})
        el.addEventListener('mouseover',(e)=>{
            pokemonId.style = 'font-size: 3.5vh; bottom: 5%; right: 5%; opacity: 1; z-index: 146'
            pokemonName.style = 'font-size: 3.5vh; bottom: 5%'
            pokemonSprite.style = 'transform: scale(1.5);'

        })
        el.addEventListener('mouseleave',(e)=>{
            pokemonId.style = ''
            pokemonName.style = ''
            pokemonSprite.style = ''
        })
    })
}

const fillTypes = async (type) => {

    // Loading

    preloader()

    // Get pokemon name

    let typeDescription = await getTypes(type)

    // Get pokemon description

    let pokemonType = type
    allTypesPokemon = []
    typeDamage = await typeDescription.damage_relations

    switch (type){
        case 1: typeDescriptionText = normal
            pokemonType = 'normal'
            break
        case 2: typeDescriptionText = fighting
            pokemonType = 'fighting'
            break
        case 3: typeDescriptionText = flying
            pokemonType = 'flying'
            break
        case 4: typeDescriptionText = poison
            pokemonType = 'poison'
            break
        case 5: typeDescriptionText = ground
            pokemonType = 'ground'
            break
        case 6: typeDescriptionText = rock
            pokemonType = 'rock'
            break
        case 7: typeDescriptionText = bug
            pokemonType = 'bug'
            break
        case 8: typeDescriptionText = ghost
            pokemonType = 'ghost'
            break
        case 9: typeDescriptionText = steel
            pokemonType = 'steel'
            break
        case 10: typeDescriptionText = fire
            pokemonType = 'fire'
            break
        case 11: typeDescriptionText = water
            pokemonType = 'water'
            break
        case 12: typeDescriptionText = grass
            pokemonType = 'grass'
            break
        case 13: typeDescriptionText = electric
            pokemonType = 'electric'
            break
        case 14: typeDescriptionText = psychic
            pokemonType = 'psychic'
            break
        case 15: typeDescriptionText = ice
            pokemonType = 'ice'
            break
        case 16: typeDescriptionText = dragon
            pokemonType = 'dragon'
            break
        case 17: typeDescriptionText = dark
            pokemonType = 'dark'
            break
        case 18: typeDescriptionText = fairy
            pokemonType = 'fairy'
            break
    }

    let getTypePok = async () =>{
        allTypesPokemon = await Promise.all(typeDescription.pokemon.map(async el => {
            return await getTypesPokemon(el.pokemon.name)
        }))

        let x = allTypesPokemon.length - 1

        return allTypesPokemon[x]
    }

    let getTypePokLocal = () =>{
        for (let el of JSON.parse(localStorage.pokemons)){
            if(el.type[0].type.name === pokemonType || el.type[1] && el.type[1].type.name === pokemonType){
                allTypesPokemon.push(el)   }
        }
        return allTypesPokemon
    }


    // Fill page

    !localStorage.pokemons || localStorage.pokemons.length < 898
        ? description.innerHTML = typesPokemonTemplate(await getTypePok(),typeDamage, type)
        : description.innerHTML = typesPokemonTemplate(await getTypePokLocal(),typeDamage, type)


        // Selectors

    let typesContent =  document.querySelector('.type_pokemon')
    let bottomLine =  document.querySelector('.types_bottom_line')
    let rightBlock = document.querySelector('.right_block')

    // Right block

    let DescriptionTypeVisible = false

    rightBlock.addEventListener('mouseover', ()=>{
        if(!DescriptionTypeVisible) {
            rightBlock.innerHTML = `<p class="types_description_text">${typeDescriptionText}</p>`
            DescriptionTypeVisible = true
        }
    })
    rightBlock.addEventListener('mouseleave', ()=>{
        if(DescriptionTypeVisible) {
            rightBlock.innerHTML = `<div class="types_damage">
                            ${weaknessesTemplate(typeDamage.double_damage_from, '2 Damage from')}
                            ${weaknessesTemplate(typeDamage.double_damage_to, '2 Damage to')}
                            ${weaknessesTemplate(typeDamage.half_damage_from, '0.5 Damage from')}
                            ${weaknessesTemplate(typeDamage.half_damage_to, '0.5 Damage to')}
                            ${weaknessesTemplate(typeDamage.no_damage_from, '0 Damage From')}
                            ${weaknessesTemplate(typeDamage.no_damage_to, '0 Damage to')}
                        </div>`
            DescriptionTypeVisible = false
        }
    })

    // Pokemon block hover and click

    PokemonBlock()

    // Bottom Line hide

    typesContent.addEventListener('scroll', ()=>{typesContent.scrollTop > 300
                                                                    ? bottomLine.classList = 'type_bottom_line_hide'
                                                                    : bottomLine.classList = 'types_bottom_line'
    })
}

/*
const fillTypes = async (type) => {

    // Loading

    preloader()

    // Get pokemon name

    let typeDescription = await getTypes(type)

    // Get pokemon description

    allTypesPokemon = await Promise.all(typeDescription.pokemon.map(async el => {
        return await getTypesPokemon(el.pokemon.name)
    }))
    typeDamage = await typeDescription.damage_relations

    switch (type){
        case 1: typeDescriptionText = normal
            break
        case 2: typeDescriptionText = fighting
            break
        case 3: typeDescriptionText = flying
            break
        case 4: typeDescriptionText = poison
            break
        case 5: typeDescriptionText = ground
            break
        case 6: typeDescriptionText = rock
            break
        case 7: typeDescriptionText = bug
            break
        case 8: typeDescriptionText = ghost
            break
        case 9: typeDescriptionText = steel
            break
        case 10: typeDescriptionText = fire
            break
        case 11: typeDescriptionText = water
            break
        case 12: typeDescriptionText = grass
            break
        case 13: typeDescriptionText = electric
            break
        case 14: typeDescriptionText = psychic
            break
        case 15: typeDescriptionText = ice
            break
        case 16: typeDescriptionText = dragon
            break
        case 17: typeDescriptionText = dark
            break
        case 18: typeDescriptionText = fairy
            break
    }

    // Fill page

    let x = allTypesPokemon.length - 1
    description.innerHTML = typesPokemonTemplate(allTypesPokemon[x],typeDamage, type)

    // Selectors

    let typesContent =  document.querySelector('.type_pokemon')
    let bottomLine =  document.querySelector('.types_bottom_line')
    let rightBlock = document.querySelector('.right_block')

    // Right block

    let DescriptionTypeVisible = false

    rightBlock.addEventListener('mouseover', ()=>{
        if(!DescriptionTypeVisible) {
            rightBlock.innerHTML = `<p class="types_description_text">${typeDescriptionText}</p>`
            DescriptionTypeVisible = true
        }
    })
    rightBlock.addEventListener('mouseleave', ()=>{
        if(DescriptionTypeVisible) {
            rightBlock.innerHTML = `<div class="types_damage">
                            ${weaknessesTemplate(typeDamage.double_damage_from, '2 Damage from')}
                            ${weaknessesTemplate(typeDamage.double_damage_to, '2 Damage to')}
                            ${weaknessesTemplate(typeDamage.half_damage_from, '0.5 Damage from')}
                            ${weaknessesTemplate(typeDamage.half_damage_to, '0.5 Damage to')}
                            ${weaknessesTemplate(typeDamage.no_damage_from, '0 Damage From')}
                            ${weaknessesTemplate(typeDamage.no_damage_to, '0 Damage to')}
                        </div>`
            DescriptionTypeVisible = false
        }
    })

    // Pokemon block hover and click

    PokemonBlock()

    // Bottom Line hide

    typesContent.addEventListener('scroll', ()=>{typesContent.scrollTop > 300
        ? bottomLine.classList = 'type_bottom_line_hide'
        : bottomLine.classList = 'types_bottom_line'
    })
}
*/



// Generation Pokemon page


let allGenerationsPokemons = []

// Generation pokemon page template

const generationPokemonTemplate = (pokemon, colorTheme) => {

    let generation = (gen) =>{
        switch (gen){
            case 10: return `    <img class="generation_img" src="./img/generation1.png" alt="">
                                <p class="generation_num">I</p>
                                <p class="generation_text">GENERATION</p>`
            case 2: return `    <img class="generation_img" src="./img/generation2.png" alt="">
                                <p class="generation_num">II</p>
                                <p class="generation_text">GENERATION</p>`
            case 3: return `    <img class="generation_img" src="./img/generation3.png" alt="">
                                <p class="generation_num">III</p>
                                <p class="generation_text">GENERATION</p>`
            case 11: return `    <img class="generation_img" src="./img/generation4.png" alt="">
                                <p class="generation_num">IV</p>
                                <p class="generation_text">GENERATION</p>`
            case 5: return `    <img class="generation_img" src="./img/generation5.png" alt="">
                                <p class="generation_num">V</p>
                                <p class="generation_text">GENERATION</p>`
            case 15: return `    <img class="generation_img" src="./img/generation6.png" alt="">
                                <p class="generation_num">VI</p>
                                <p class="generation_text">GENERATION</p>`
            case 7: return `    <img class="generation_img" src="./img/generation7.png" alt="">
                                <p class="generation_num">VII</p>
                                <p class="generation_text">GENERATION</p>`
            case 16: return `    <img class="generation_img" src="./img/generation8.png" alt="">
                                <p class="generation_num">VIII</p>
                                <p class="generation_text">GENERATION</p>`
        }
    }

    changeThemeColorType(colorTheme)

    return `<div class="type_description">
                <div class="type_pokemon">
                    ${pokemon.map(el => `<div class="type_pokemon_block
                                                    ${el.type[0].type.name} 
                                                    ${el.type[1] ? `${el.type[1].type.name}_type_2` : ''}" 
                                                id="${el.id}">
                                                <img class="type_pokemon_sprite" src='${el.sprite}' alt="">
                                                <p class="type_pokemon_name" id="name_${el.id}">${el.name}</p>
                                                <p class="type_pokemon_id">${el.id}</p>
                                        </div>`).join('')}
                </div>
                ${window.innerWidth > 425
                    ? `<div class="types_bottom_line">
                            <div class="generation">
                                <img class="generation_img" src="./img/generation1.png" alt="" onclick="fillGenerationPokemons(1,151)">
                                <p class="generation_num">I</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation2.png" alt="" onclick="fillGenerationPokemons(152,251)">
                                <p class="generation_num">II</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation3.png" alt="" onclick="fillGenerationPokemons(252,386)">
                                <p class="generation_num">III</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation4.png" alt="" onclick="fillGenerationPokemons(387,493)">
                                <p class="generation_num">IV</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation5.png" alt="" onclick="fillGenerationPokemons(494,649)">
                                <p class="generation_num">V</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation6.png" alt="" onclick="fillGenerationPokemons(650,721)">
                                <p class="generation_num">VI</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation7.png" alt="" onclick="fillGenerationPokemons(722,809)">
                                <p class="generation_num">VII</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation8.png" alt="" onclick="fillGenerationPokemons(810,898)">
                                <p class="generation_num">VIII</p>
                            </div>  
                        </div>`
                    : `<div class="generation_mobile">
                            <div class="generation">
                                ${generation(colorTheme)}
                            </div>
                            <div class="generation">
                                <img class="generation_img" src="./img/generation1.png" alt="" onclick="fillGenerationPokemons(1,151)">
                                <p class="generation_num">I</p>
                                <p class="generation_text">GENERATION</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation2.png" alt="" onclick="fillGenerationPokemons(152,251)">
                                <p class="generation_num">II</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation3.png" alt="" onclick="fillGenerationPokemons(252,386)">
                                <p class="generation_num">III</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation4.png" alt="" onclick="fillGenerationPokemons(387,493)">
                                <p class="generation_num">IV</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation5.png" alt="" onclick="fillGenerationPokemons(494,649)">
                                <p class="generation_num">V</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation6.png" alt="" onclick="fillGenerationPokemons(650,721)">
                                <p class="generation_num">VI</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation7.png" alt="" onclick="fillGenerationPokemons(722,809)">
                                <p class="generation_num">VII</p>
                            </div>  
                            <div class="generation">
                                <img class="generation_img" src="./img/generation8.png" alt="" onclick="fillGenerationPokemons(810,898)">
                                <p class="generation_num">VIII</p>
                            </div>  
                        </div>`
                }
            </div>`
}

// Fill generation Pokemon page

let fillGenerationPokemons = async (start, end) => {

    // Preloader

    preloader()

    //Get and update pokemon data

    allGenerationsPokemons = []

    let getPokemonsData = async () => {
        for (let i = start; i <= end; i++) {
            let payload = await getPokemon(i)
            allGenerationsPokemons = [...allGenerationsPokemons, {
                id: payload.pokemon.id,
                name: payload.pokemon.name,
                type: payload.pokemon.types,
                sprite: payload.pokemon.sprites.front_default
            }]
        }
        return allGenerationsPokemons
    }

    //Fill all pokemon page

    let colorTheme = 1

    switch (start){
        case 1 : colorTheme = 10
            break
        case 152 : colorTheme = 2
            break
        case 252 : colorTheme = 3
            break
        case 387 : colorTheme = 11
            break
        case 494 : colorTheme = 5
            break
        case 650 : colorTheme = 15
            break
        case 722 : colorTheme = 7
            break
        case 810 : colorTheme = 16
            break
    }

    !localStorage.pokemons || localStorage.pokemons.length < 898
        ? description.innerHTML = generationPokemonTemplate(await getPokemonsData(),colorTheme)
        : description.innerHTML = generationPokemonTemplate(JSON.parse(localStorage.pokemons).slice(start - 1, end),colorTheme)

    // Selectors

    let bottomLine =  document.querySelector('.types_bottom_line')
    let typesContent =  document.querySelector('.type_pokemon')
    let generationLine = document.querySelectorAll('.generation')

    // Pokemon block hover and click

    PokemonBlock()

    // Bottom Line hide

    typesContent.addEventListener('scroll', ()=>{
        if (window.innerWidth > 425) {
            typesContent.scrollTop > 300
                ? bottomLine.classList = 'type_bottom_line_hide_generation'
                : bottomLine.classList = 'types_bottom_line'
        }
    })

    // Bottom generation line

    generationLine.forEach(el =>{
        let num = el.querySelector('.generation_num')
        let hover = false

        el.addEventListener('mouseover', ()=>{
            if(!hover) {
                num.style = 'font-size: 5vh'
                el.insertAdjacentHTML('beforeend', '<p class="generation_text">GENERATION</p>')
                hover = true
            }
        })
        el.addEventListener('mouseleave', ()=>{
            if (hover) {
                let gen = el.querySelector('.generation_text')
                num.style = 'font-size: 3vh'
                gen.remove()
                hover = false
            }
        })
    })
}
