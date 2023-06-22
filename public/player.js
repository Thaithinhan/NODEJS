const formElement = document.querySelector(".add-player");
const player1 = document.querySelector(".input-player1");
const player2 = document.querySelector(".input-player2");
const player3 = document.querySelector(".input-player3");
const player4 = document.querySelector(".input-player4");
const errorMessage = document.querySelector(".error-player");
let games; //Tạo biến lưu trữ games khi fetch API

//Sự kiện submit
formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (
    player1.value.length == 0 ||
    player2.value.length == 0 ||
    player3.value.length == 0 ||
    player4.value.length == 0
  ) {
    errorMessage.style.display = "block";
    errorMessage.innerHTML = "Please input player name ";
  } else {
    const newGame = {
      id: games.length > 0 ? games[games.length - 1].id + 1 : 1,
      players: {
        player1: {
          name: player1.value,
          total_score: 0,
        },
        player2: {
          name: player2.value,
          total_score: 0,
        },
        player3: {
          name: player3.value,
          total_score: 0,
        },
        player4: {
          name: player4.value,
          total_score: 0,
        },
      },
      rounds: [
        {
          id: 1,
          player_score: {
            score1: 0,
            score2: 0,
            score3: 0,
            score4: 0,
          },
        },
      ],
    };

    postNewGame(newGame);
    player1.value = "";
    player2.value = "";
    player3.value = "";
    player4.value = "";
    errorMessage.style.display = "none";
    errorMessage.innerHTML = "Please input player name ";
    window.location = `/round/${newGame.id}`;
  }
});

//Function fetch API games
async function fetchGames() {
  const resonse = await fetch("http://localhost:5000/api/game");
  //   console.log(resonse);
  const data = await resonse.json();
  games = data;
}

//Function tạo new Game
function postNewGame(game) {
  fetch(`http://localhost:5000/api/game`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(game),
  }).then(() => {
    fetchGames();
  });
}

fetchGames();
