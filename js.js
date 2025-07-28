const boardSize = 10;
const tileSize = 50;

const players = [
  { el: document.getElementById('player1'), pos: 1 },
  { el: document.getElementById('player2'), pos: 1 }
];

let currentPlayer = 0;

const ladders = {
  2: 38, 4: 14, 9: 31, 21: 42, 28: 84,
  37: 43, 51: 67, 72: 91,79: 100
};

const snakes = {
  16: 6, 47: 26, 49: 11, 56:53, 62:19, 64: 60,
  87: 24, 93: 73, 95: 75, 98: 78
};

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  document.getElementById('status').innerText = `Player ${currentPlayer + 1} rolled a ${roll}`;
  document.getElementById('diceSound').play();
  movePlayer(roll);
}

function movePlayer(roll) {
  let player = players[currentPlayer];
  player.pos += roll;
  if (player.pos > 100) player.pos = 100;

  if (ladders[player.pos]) {
    player.pos = ladders[player.pos];
  } else if (snakes[player.pos]) {
    player.pos = snakes[player.pos];
  }

  updatePosition(player);

  if (player.pos === 100) {
    document.getElementById('status').innerText = `🎉 Player ${currentPlayer + 1} wins!`;
    return;
  }

  currentPlayer = (currentPlayer + 1) % 2;
  setTimeout(() => {
    document.getElementById('status').innerText = `Player ${currentPlayer + 1}'s turn`;
  }, 1000);
}


function updatePosition(player) {
  const pos = player.pos;
  const row = Math.floor((pos - 1) / boardSize);
  const col = (pos - 1) % boardSize;

  // Calculate X and Y
  const x = (row % 2 === 0 ? col : 9 - col) * tileSize;
  const y = (9 - row) * tileSize;

  // Center the token inside the tile
  player.el.style.left = `${x + tileSize / 2 - 17.5}px`; // 17.5 is half player width
  player.el.style.top = `${y + tileSize / 2 - 17.5}px`;
}


// Initial positioning
updatePosition(players[0]);
updatePosition(players[1]);
