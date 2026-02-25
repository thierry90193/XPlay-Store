const supabaseUrl = 'https://djhfewzjkwdxotvrqeby.supabase.co'
const supabaseKey = 'COLE_SUA_ANON_KEY_AQUI'

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

// CADASTRAR
async function cadastrar() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    alert('Erro: ' + error.message)
  } else {
    alert('Conta criada!')
  }
}

// LOGIN
async function login() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert('Erro: ' + error.message)
  } else {
    alert('Logado!')
    verificarCompra()
  }
}

// LOGOUT
async function logout() {
  await supabase.auth.signOut()
  alert('Saiu da conta')
}

// COMPRAR JOGO
function comprarJogo() {
  localStorage.setItem('comprou_box', 'true')
  alert('Jogo comprado!')
  verificarCompra()
}

// VERIFICAR SE COMPROU
function verificarCompra() {
  const comprou = localStorage.getItem('comprou_box')
  const btn = document.getElementById('btn-game')

  if (comprou === 'true') {
    btn.innerText = 'Acessar'
  } else {
    btn.innerText = 'Comprar'
  }
}

// AO ABRIR O SITE
window.onload = verificarCompra
