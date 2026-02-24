import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔥 SUPABASE
const supabaseUrl = 'https://djhfewzjkwdxotvrqeby.supabase.co'
const supabaseKey = 'SUA_PUBLISHABLE_KEY_AQUI'

const supabase = createClient(supabaseUrl, supabaseKey)

// 👤 usuário fake
const userId = "user123"

// 🎮 JOGOS (ATUALIZADO PREÇO)
const games = [
  {
    id: 1,
    name: "The Box of Fear",
    price: 36.21,
    link: "https://escapebox.itch.io/the-box-of-fear"
  }
]

// 🚀 CARREGAR TUDO
async function carregarTudo() {
  const { data: purchases } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', userId)

  const store = document.getElementById("store")
  const library = document.getElementById("library")

  store.innerHTML = ""
  library.innerHTML = ""

  games.forEach(game => {
    const comprado = purchases?.find(p => p.game_id == game.id)

    const card = document.createElement("div")
    card.className = "game-card"

    card.innerHTML = `
      <h3>${game.name}</h3>
      <p>Preço: R$${game.price}</p>
      <button>
        ${comprado ? "Acessar" : "Comprar"}
      </button>
    `

    const button = card.querySelector("button")

    if (comprado) {
      button.onclick = () => acessarJogo(game.link)
      library.appendChild(card)
    } else {
      button.onclick = () => comprarJogo(game.id)
      store.appendChild(card)
    }
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
    alert("Erro!")
    console.log(error)
    return
  }

  alert("Compra feita! 💰🔥")
  carregarTudo()
}

// 🎮 ACESSAR
function acessarJogo(link) {
  window.open(link, "_blank")
}

// 🚀 START
carregarTudo()
