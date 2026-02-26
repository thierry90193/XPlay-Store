const supabaseUrl = 'https://djhfewzjkwdxotvrqeby.supabase.co'
const supabaseKey = 'const supabaseKey = 'eyJhbGciOiJIUzI1NiI...''

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

async function criarJogo() {
  const nome = prompt("Nome do jogo:")
  const link = prompt("Link do jogo:")

  if (!nome || !link) return

  const { error } = await supabase
    .from('biblioteca')
    .insert([{ nome, link }])

  if (error) {
    alert("Erro ao salvar")
    console.log(error)
  } else {
    alert("Jogo criado!")
    carregarJogos()
  }
}

async function carregarJogos() {
  const { data, error } = await supabase
    .from('biblioteca')
    .select('*')

  if (error) {
    console.log(error)
    return
  }

  const div = document.getElementById("jogos")
  div.innerHTML = ""

  data.forEach(jogo => {
    div.innerHTML += `
      <div>
        <h3>${jogo.nome}</h3>
        <a href="${jogo.link}" target="_blank">Acessar</a>
      </div>
    `
  })
}

carregarJogos()
