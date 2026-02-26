const supabaseUrl = "https://djhfewzjkwdxotvrqeby.supabase.co";
const supabaseKey = "SUA_CHAVE_ANON_AQUI";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function carregarJogos() {
  const { data, error } = await supabase
    .from("biblioteca")
    .select("*");

  if (error) {
    console.error("ERRO:", error);
    return;
  }

  const div = document.getElementById("games");
  div.innerHTML = "";

  data.forEach(jogo => {
    const el = document.createElement("div");
    el.className = "game";

    el.innerHTML = `
      <h3>${jogo.nome}</h3>
      <p>R$ ${jogo.preco}</p>
      <a href="${jogo.link}" target="_blank">
        <button>Acessar</button>
      </a>
    `;

    div.appendChild(el);
  });
}

carregarJogos();
