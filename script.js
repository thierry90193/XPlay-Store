// 🔗 CONFIG SUPABASE
const SUPABASE_URL = "https://djhfewzjkwdxotvrqeby.supabase.co";
const SUPABASE_KEY = "SUA_ANON_KEY_AQUI";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 👤 LOGIN ANÔNIMO
async function loginAnonimo() {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.error("Erro no login:", error);
  } else {
    console.log("Logado:", data);
  }
}

// 🚀 CHAMA LOGIN AUTOMÁTICO
loginAnonimo();

// 🎮 SALVAR JOGO
async function salvarJogo() {
  const nome = document.getElementById("nome").value;
  const link = document.getElementById("link").value;

  const user = (await supabase.auth.getUser()).data.user;

  const { error } = await supabase.from("games").insert([
    {
      user_id: user.id,
      nome: nome,
      link: link
    }
  ]);

  if (error) {
    console.error("Erro ao salvar:", error);
    alert("Erro ao salvar jogo!");
  } else {
    alert("Jogo salvo!");
    carregarJogos();
  }
}

// 📦 CARREGAR JOGOS
async function carregarJogos() {
  const lista = document.getElementById("lista");

  const { data, error } = await supabase
    .from("games")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  lista.innerHTML = "";

  data.forEach(jogo => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${jogo.nome}</h3>
      <button onclick="window.open('${jogo.link}', '_blank')">Jogar</button>
    `;

    lista.appendChild(div);
  });
}

// 🔄 CARREGA AO ABRIR
window.onload = carregarJogos;
