import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://SEU-PROJETO.supabase.co'
const supabaseKey = 'SUA_CHAVE_AQUI'

const supabase = createClient(supabaseUrl, supabaseKey)

// LOGIN
window.login = async function () {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: senha
  })

  if (error) {
    alert('Erro no login')
  } else {
    alert('Logado com sucesso!')
    carregarJogos()
  }
}

// SALVAR JOGO
window.salvarJogo = async function () {
  const nome = document.getElementById('nome').value
  const link = document.getElementById('link').value

  const user = await supabase.auth.getUser()

  const { error } = await supabase.from('games').insert([
    {
      nome: nome,
      link: link,
      user_id: user.data.user.id
    }
  ])

  if (error) {
    alert('Erro ao salvar')
    console.log(error)
  } else {
    alert('Jogo salvo!')
    carregarJogos()
  }
}

// LISTAR JOGOS
async function carregarJogos() {
  const { data, error } = await supabase.from('games').select('*')

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

// AUTO CARREGAR
carregarJogos()
