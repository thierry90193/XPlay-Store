let jogos = JSON.parse(localStorage.getItem("jogos")) || [];

function mostrarFormulario() {
  let form = document.getElementById("formulario");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function criarJogo() {
  let nome = document.getElementById("nome").value;
  let imagem = document.getElementById("imagem").value;
  let preco = document.getElementById("preco").value;

  let jogo = { nome, imagem, preco };

  jogos.push(jogo);
  localStorage.setItem("jogos", JSON.stringify(jogos));

  mostrarJogos();
}

function mostrarJogos() {
  let loja = document.getElementById("loja");
  loja.innerHTML = "";

  jogos.forEach(jogo => {
    loja.innerHTML += `
      <div class="jogo">
        <img src="${jogo.imagem}">
        <h3>${jogo.nome}</h3>
        <p>${jogo.preco}</p>
        <button>Ver jogo</button>
      </div>
    `;
  });
}

mostrarJogos();
