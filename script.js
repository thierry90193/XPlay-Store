import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔥 CONFIG SUPABASE
const supabaseUrl = 'https://djhfewzjkwdxotvrqeby.supabase.co'
const supabaseKey = 'SUA_PUBLISHABLE_KEY_AQUI'

const supabase = createClient(supabaseUrl, supabaseKey)

// 👤 usuário fake (depois melhoramos isso)
const userId = "user123"

// 🎮 LISTA DE JOGOS (VOCÊ PODE ADICIONAR MAIS)
const games = [
  {
    id: 1,
    name: "The Box of Fear",
    price: 10,
    link: "https://escapebox.itch.io/the-box-of-fear"
  },
  {
    id: 2,
    name: "Jogo Teste",
    price: 5,
    link: "https://google.com"
  }
]

// 🚀 CARREGAR JOGOS
async function loadGames() {
  const { data: purchases } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', userId)

  const container = document.getElementById("games")
  container.innerHTML = ""

  games.forEach(game => {
    const comprado = purchases?.find(p => p.game_id == game.id)

    const card = document.createElement("div")
    card.className = "game-card"

    card.innerHTML = `
      <h3>${game.name}</h3>
      <p>Preço: R$${game.price}</p>
      <button id="btn-${game.id}">
        ${comprado ? "Acessar" : "Comprar"}
      </button>
    `

    const button = card.querySelector("button")

    if (comprado) {
      button.onclick = () => acessarJogo(game.link)
    } else {
      button.onclick = () => comprarJogo(game.id)
    }

    container.appendChild(card)
  })
}

// 💸 COMPRAR
async function comprarJogo(gameId) {
  const { error } = await supabase
    .from('purchases')
    .insert([
      {
        user_id: userId,
        game_id: gameId
      }
    ])

  if (error) {
    alert("Erro ao comprar!")
    console.log(error)
    return
  }

  alert("Compra realizada! 💰🔥")
  loadGames()
}

// 🎮 ACESSAR
function acessarJogo(link) {
  window.open(link, "_blank")
}

// 🚀 INICIAR
loadGames()
