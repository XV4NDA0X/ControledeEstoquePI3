const API_BASE = "https://SEU_BACKEND.railway.app"; // Substitua aqui

async function carregarDados() {
  const [produtos, alertas] = await Promise.all([
    fetch(API_BASE + "/produtos").then(res => res.json()),
    fetch(API_BASE + "/alertas").then(res => res.json())
  ]);

  document.getElementById("total-produtos").textContent = produtos.length;
  document.getElementById("alert-count").textContent = alertas.length + " produto(s)";

  const corpo = document.getElementById("tabela-corpo");
  corpo.innerHTML = "";

  alertas.forEach(prod => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${prod.nome}</td>
      <td>${prod.categoria}</td>
      <td>${prod.validade}</td>
      <td>${prod.quantidade}</td>
    `;
    corpo.appendChild(tr);
  });
}

document.getElementById("form-produto").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const dados = {
    nome: form.nome.value,
    categoria: form.categoria.value,
    validade: form.validade.value,
    quantidade: parseInt(form.quantidade.value)
  };

  const res = await fetch(API_BASE + "/produtos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  if (res.ok) {
    alert("Produto adicionado com sucesso!");
    form.reset();
    carregarDados();
  } else {
    alert("Erro ao adicionar produto.");
  }
});

carregarDados();
