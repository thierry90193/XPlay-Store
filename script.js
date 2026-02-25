import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔗 SUA CONFIG
const supabaseUrl = 'https://djhfewzjkwdxotvrqeby.supabase.co'
const supabaseKey = 'COLE_SUA_CHAVE_ANON_AQUI'

const supabase = createClient(supabaseUrl, supabaseKey)

// 👤 LOGIN SIMPLES
async function login(email) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email
  })

  if (error) {
    alert('Erro no login 😢')
  } else {
    alert('Verifique seu email 📩')
  }
}

// 📥 PEGAR USUÁRIO
async function getUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}

// 🛒 COMPRAR JOGO
async function comprarJogo(nome, link) {
  const user = await getUser()

  if (!user) {
    alert('Faça login primeiro!')
    return
  }

  const { error } = await supabase
    .from('biblioteca')
    .insert([
      {
        user_id: user.id,
        nome: nome,
        link: link
      }
    ])

  if (error) {
    alert('Erro ao comprar 😢')
  } else {
    alert('Comprado com sucesso 🎉')
    carregarBiblioteca()
  }
}

// 📚 CARREGAR BIBLIOTECA
async function carregarBiblioteca() {
  const user = await getUser()

  if (!user) return

  const { data, error } = await supabase
    .from('biblioteca')
    .select('*')
    .eq('user_id', user.id)

  const div = document.getElementById('biblioteca')
  div.innerHTML = ''

  data.forEach(jogo => {
    const item = document.createElement('div')

    item.innerHTML = `
      <h3>${jogo.nome}</h3>
      <a href="${jogo.link}" target="_blank">
        <button>Acessar</button>
      </a>
    `

    div.appendChild(item)
  })
}

// 🔘 BOTÃO COMPRAR
function setupBotoes() {
  const botoes = document.querySelectorAll('.btn-comprar')

  botoes.forEach(btn => {
    btn.addEventListener('click', () => {
      const nome = btn.dataset.nome
      const link = btn.dataset.link

      comprarJogo(nome, link)
    })
  })
}

// 🚀 INICIAR
window.onload = () => {
  setupBotoes()
  carregarBiblioteca()
}

// 🌍 deixa global (pra usar no HTML)
window.login = login
