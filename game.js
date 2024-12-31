// Initialisation de l'échiquier
const board = document.getElementById("board");
const initialBoard = [
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "n", "b", "q", "k", "b", "n", "r"],
];

// Fonction pour générer l'échiquier
function renderBoard() {
  board.innerHTML = ""; // Vide l'échiquier existant
  initialBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellDiv = document.createElement("div");
      cellDiv.className = "cell";
      cellDiv.dataset.row = rowIndex;
      cellDiv.dataset.col = colIndex;

      // Ajoute une pièce si elle existe
      if (cell) {
        const pieceDiv = document.createElement("div");
        pieceDiv.className = "piece";
        pieceDiv.textContent = cell; // Affiche la pièce (ex: "R", "P")
        cellDiv.appendChild(pieceDiv);
      }

      board.appendChild(cellDiv); // Ajoute la cellule à l'échiquier
    });
  });
}

// Fonction pour gérer les clics sur les cases
function handleCellClick(event) {
  const cell = event.target.closest(".cell"); // Vérifie si une cellule est cliquée
  if (!cell) return;

  const row = cell.dataset.row;
  const col = cell.dataset.col;
  alert(`Vous avez cliqué sur la case : [${row}, ${col}]`);
}

// Initialisation du jeu
renderBoard();
board.addEventListener("click", handleCellClick);
