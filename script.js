document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll("#tabela-vencimento tbody tr");
  const today = new Date().toISOString().split("T")[0];

  rows.forEach(row => {
    const date = row.children[2].textContent;
    if (date === today) {
      row.classList.add("destaque");
      row.querySelector(".alerta").textContent = "Vence Hoje!";
    }
  });
});
