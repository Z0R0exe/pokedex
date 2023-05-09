const pokemonName = document.querySelector(".pokemon_name")
const pokemonNumber = document.querySelector(".pokemon_number")
const pokemonImage = document.querySelector(".pokemon_image")

const form = document.querySelector(".form")
const input = document.querySelector(".input_search")
const buttonPrev = document.querySelector(".btn-prev")
const buttonNext = document.querySelector(".btn-next")

let searchpokemon = 1

const fetchpokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIResponse.status == 200) {
    const data = await APIResponse.json()
    return data
  }
}
const renderpokemon = async (pokemon) => {
  pokemonName.innerHTML = "loading..."
  pokemonNumber.innerHTML = ""
  const data = await fetchpokemon(pokemon)
  if (data) {
    pokemonImage.style.display = "block"
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ]

    input.value = ""
    searchpokemon = data.id
  } else {
    pokemonImage.style.display = "none"
    pokemonName.innerHTML = "not found:c"
    pokemonNumber.innerHTML = ""
    input.value = ""
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  renderpokemon(input.value.toLowerCase())
})
renderpokemon(searchpokemon)

buttonPrev.addEventListener("click", () => {
  if (searchpokemon > 1) {
    searchpokemon -= 1
    renderpokemon(searchpokemon)
  }
})

buttonNext.addEventListener("click", () => {
  searchpokemon += 1
  renderpokemon(searchpokemon)
})
