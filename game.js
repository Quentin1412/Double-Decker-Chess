const board = document.getElementById("board");
const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

let selectedPiece = null;

// Fonction pour afficher l'échiquier
function renderBoard() {
  board.innerHTML = ""; // Vide le contenu existant
  initialBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellDiv = document.createElement("div");
      cellDiv.className = "cell";
      cellDiv.dataset.row = rowIndex;
      cellDiv.dataset.col = colIndex;

      if (cell) {
        const pieceDiv = document.createElement("div");
        pieceDiv.className = "piece";
        pieceDiv.textContent = cell; // Affiche la pièce
        cellDiv.appendChild(pieceDiv);
      }

      board.appendChild(cellDiv); // Ajoute la case à l'échiquier
    });
  });
}

// Gestion des clics sur l'échiquier
function handleCellClick(event) {
  const cell = event.target.closest(".cell");
  if (!cell) return;

  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if (selectedPiece) {
    // Déplacement de la pièce sélectionnée
    const [prevRow, prevCol] = selectedPiece;
    initialBoard[row][col] = initialBoard[prevRow][prevCol];
    initialBoard[prevRow][prevCol] = "";
    selectedPiece = null;
    renderBoard();
  } else if (initialBoard[row][col]) {
    // Sélection d'une pièce
    selectedPiece = [row, col];
    alert(`Pièce sélectionnée : ${initialBoard[row][col]} en [${row}, ${col}]`);
  }
}

// Initialisation
renderBoard();
board.addEventListener("click", handleCellClick);
