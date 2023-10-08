const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            result.innerText = `${currentPlayer} wins!`;
            gameActive = false;
            break;
        }
    }

    if (!board.includes('') && gameActive) {
        result.innerText = "It's a draw!";
        gameActive = false;
    }

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        result.innerText = `${currentPlayer}'s Turn`;
    }
}

function makeMove(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        cells[index].classList.add(currentPlayer);
        checkWinner();
    }
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    });
    gameActive = true;
    currentPlayer = 'X';
    result.innerText = "X's Turn";
}

result.innerText = "X's Turn";

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        makeMove(index);
    });
});
