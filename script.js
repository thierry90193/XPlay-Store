import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔑 SUAS INFOS
const supabaseUrl = 'https://djhfewzjkwdxotvrqeby.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqaGZld3pqa3dkeG90dnJxZWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NjMyNjIsImV4cCI6MjA4NzUzOTI2Mn0.LF02af08wrJDh414Y6HqZPQHMCCtRYVts0xc-HFwrq0'

const supabase = createClient(supabaseUrl, supabaseKey)

// MOSTRAR FORM
window.mostrarFormulario = function () {
  const form = document.getElementById('formulario')
  form.style.display = form.style.display === 'block' ? 'none' : 'block'
}

// CRIAR JOGO
window.criarJogo = async function () {
  const nome = document.getElementById('nome').value
  const link = document.getElementById('link').value
  const preco = document.getElementById('preco').value

  if (!nome || !link || !preco) {
    alert('Preenche tudo!')
    return
  }

  await supabase.from('games').insert([
    { nome, link, preco }
  ])

  carregarJogos()
}

// CARREGAR JOGOS
async function carregarJogos() {
  const { data } = await supabase.from('games').select('*')

  const loja = document.getElementById('loja')
  loja.innerHTML = ''

  data.forEach(jogo => {
    const card = document.createElement('div')
    card.className = 'card'

    card.innerHTML = `
      <h3>${jogo.nome}</h3>
      <p>R$ ${jogo.preco}</p>
      <button onclick="comprar('${jogo.link}', this)">Comprar</button>
    `

    loja.appendChild(card)
  })
}

// BOTÃO COMPRAR
window.comprar = function (link, botao) {
  botao.innerText = 'Acessar'
  botao.onclick = () => {
    window.open(link)
  }
}

// INICIAR
carregarJogos()
