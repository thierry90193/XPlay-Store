import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔑 COLOCA AQUI OS SEUS DADOS
const supabaseUrl = 'https://SEU-PROJETO.supabase.co'
const supabaseKey = 'SUA_CHAVE_AQUI'

const supabase = createClient(supabaseUrl, supabaseKey)

console.log("SITE RODANDO 🔥")

// 🔐 LOGIN
window.login = async function () {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: senha
  })

  if (error) {
    alert('Erro no login ❌')
    console.log(error)
  } else {
    alert('Logado com sucesso ✅')
    carregarJogos()
  }
}

// 💾 SALVAR JOGO
window.salvarJogo = async function () {
  const nome = document.getElementById('nome').value
  const link = document.getElementById('link').value

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    alert('Você precisa logar primeiro ❌')
    return
  }

  const { error } = await supabase.from('games').insert([
    {
      nome: nome,
      link: link,
      user_id: user.id
    }
  ])

  if (error) {
    alert('Erro ao salvar ❌')
    console.log(error)
  } else {
    alert('Jogo salvo! 🎮')
    carregarJogos()
  }
}

// 📦 LISTAR JOGOS
async function carregarJogos() {
  const { data, error } = await supabase
    .from('games')
    .select('*')

  if (error) {
    console.log(error)
    return
  }

  const lista = document.getElementById('lista')
  lista.innerHTML = ''

  data.forEach(jogo => {
    lista.innerHTML += `
      <div>
        <h3>${jogo.nome}</h3>
        <a href="${jogo.link}" target="_blank">Jogar</a>
      </div>
    `
  })
}

// 🚀 CARREGA AUTOMÁTICO
carregarJogos()
