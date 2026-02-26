const supabaseUrl = "https://djhfewzjkwdxotvrqeby.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqaGZld3pqa3dkeG90dnJxZWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NjMyNjIsImV4cCI6MjA4NzUzOTI2Mn0.LF02af08wrJDh414Y6HqZPQHMCCtRYVts0xc-HFwrq0";

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
