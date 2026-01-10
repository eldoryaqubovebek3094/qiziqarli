const container = document.getElementById("table-container");
const searchInput = document.getElementById("search");

function generateTable(filter = "") {
  container.innerHTML = "";

  for (let i = 2; i <= 100; i++) {
    if (filter && i != filter) continue;

    const block = document.createElement("div");
    block.className = "number-block";

    const title = document.createElement("div");
    title.className = "number-title";
    title.textContent = i + " sonining ko‘paytirish jadvali";

    const rows = document.createElement("div");
    rows.className = "rows";

    for (let j = 1; j <= 9; j++) {
      const row = document.createElement("div");
      row.className = "row";
      row.textContent = `${i} × ${j} = ${i * j}`;
      rows.appendChild(row);
    }

    block.appendChild(title);
    block.appendChild(rows);
    container.appendChild(block);
  }
}

searchInput.addEventListener("input", () => {
  generateTable(searchInput.value);
});

function printPage() {
  window.print();
}

// Sahifa ochilganda avtomatik ishga tushadi
generateTable();
