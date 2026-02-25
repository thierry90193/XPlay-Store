const supabaseUrl = 'https://djhfewzjkwdxotvrqeby.supabase.co'
const supabaseKey = 'SUA_ANON_KEY_AQUI'

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

// MOSTRAR FORM
function mostrarFormulario() {
  document.getElementById("form").style.display = "block"
}

// CRIAR JOGO (simples local)
let jogos = []

function criarJogo() {
  const nome = document.getElementById("nome").value
  const link = document.getElementById("link").value
  const preco = document.getElementById("preco").value

  const jogo = { nome, link, preco }

  jogos.push(jogo)
  renderJogos()
}

// RENDER
function renderJogos() {
  const div = document.getElementById("biblioteca")
  div.innerHTML = ""

  jogos.forEach(jogo => {
    const card = document.createElement("div")
    card.className = "card"

    const botao = document.createElement("button")

    botao.innerText = "Comprar"

    botao.onclick = () => comprarJogo(jogo)

    card.innerHTML = `
      <h3>${jogo.nome}</h3>
      <p>Preço: R$ ${jogo.preco}</p>
    `

    card.appendChild(botao)
    div.appendChild(card)
  })
}

// COMPRAR JOGO
async function comprarJogo(jogo) {

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    alert("Faça login primeiro!")
    return
  }

  // salva no banco
  const { error } = await supabase
    .from("biblioteca")
    .insert([
      {
        user_id: user.id,
        nome: jogo.nome,
        link: jogo.link
      }
    ])

  if (error) {
    alert("Erro ao comprar")
    console.log(error)
    return
  }

  alert("Comprado!")

  carregarBiblioteca()
}

// CARREGAR BIBLIOTECA
async function carregarBiblioteca() {

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  const { data } = await supabase
    .from("biblioteca")
    .select("*")
    .eq("user_id", user.id)

  const div = document.getElementById("biblioteca")
  div.innerHTML = ""

  data.forEach(jogo => {
    const card = document.createElement("div")
    card.className = "card"

    card.innerHTML = `
      <h3>${jogo.nome}</h3>
      <a href="${jogo.link}" target="_blank">
        <button>Acessar</button>
      </a>
    `

    div.appendChild(card)
  })
}

// CARREGA AO ABRIR
carregarBiblioteca()
