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

// Fonction pour valider les mouvements
function isValidMove(piece, startRow, startCol, endRow, endCol) {
  const rowDiff = Math.abs(endRow - startRow);
  const colDiff = Math.abs(endCol - startCol);

  switch (piece) {
    case "♟": // Pion noir
      return startRow < endRow && rowDiff === 1 && colDiff === 0;
    case "♙": // Pion blanc
      return startRow > endRow && rowDiff === 1 && colDiff === 0;
    case "♜": case "♖": // Tour
      return startRow === endRow || startCol === endCol;
    case "♞": case "♘": // Cavalier
      return rowDiff * colDiff === 2;
    case "♝": case "♗": // Fou
      return rowDiff === colDiff;
    case "♛": case "♕": // Reine
      return rowDiff === colDiff || startRow === endRow || startCol === endCol;
    case "♚": case "♔": // Roi
      return rowDiff <= 1 && colDiff <= 1;
    default:
      return false;
  }
}

// Gestion des clics sur l'échiquier
function handleCellClick(event) {
  const cell = event.target.closest(".cell");
  if (!cell) return;

  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if (selectedPiece) {
    const [prevRow, prevCol] = selectedPiece;
    const piece = initialBoard[prevRow][prevCol];

    if (initialBoard[row][col]) {
      // Crée une pièce empilée
      initialBoard[row][col] += piece; // Exemple simple
      initialBoard[prevRow][prevCol] = "";
      alert(`Pièces empilées : ${initialBoard[row][col]}`);
    } else if (isValidMove(piece, prevRow, prevCol, row, col)) {
      initialBoard[row][col] = piece;
      initialBoard[prevRow][prevCol] = "";
    } else {
      alert("Déplacement invalide !");
    }
    selectedPiece = null;
    renderBoard();
  } else if (initialBoard[row][col]) {
    selectedPiece = [row, col];
    alert(`Pièce sélectionnée : ${initialBoard[row][col]} en [${row}, ${col}]`);
  }
}

// Initialisation
renderBoard();
board.addEventListener("click", handleCellClick);
