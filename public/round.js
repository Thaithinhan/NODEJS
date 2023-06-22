const playerName1 = document.querySelector(".player-name1"); //lấy name người chơi
const playerName2 = document.querySelector(".player-name2"); //lấy name người chơi
const playerName3 = document.querySelector(".player-name3"); //lấy name người chơi
const playerName4 = document.querySelector(".player-name4"); //lấy name người chơi
const scorePlayer1TdElement = document.querySelector(".score-play-1"); //Điểm ở trên bảng
const scorePlayer2TdElement = document.querySelector(".score-play-2"); //Điểm ở trên bảng
const scorePlayer3TdElement = document.querySelector(".score-play-3"); //Điểm ở trên bảng
const scorePlayer4TdElement = document.querySelector(".score-play-4"); //Điểm ở trên bảng
const totalScoreElement = document.querySelector(".total-score");
const tbody = document.querySelector("tbody");
const btnAddRound = document.querySelector(".btn-add-round");

let games; //Lấy ữu liẹu game

const url = window.location.href;
const idGame = url.split("/").pop();

async function fetchGames() {
  const resonse = await fetch("http://localhost:5000/api/game");
  //   console.log(resonse);
  const data = await resonse.json();
  games = data;
  const choosegame = games.find((games) => games.id === +idGame);
  //   console.log(choosegame);
  playerName1.innerHTML = choosegame.players.player1.name;
  playerName2.innerHTML = choosegame.players.player2.name;
  playerName3.innerHTML = choosegame.players.player3.name;
  playerName4.innerHTML = choosegame.players.player4.name;
  totalScoreElement.innerHTML = ` (${
    choosegame.players.player1.total_score +
    choosegame.players.player2.total_score +
    choosegame.players.player3.total_score +
    choosegame.players.player4.total_score
  })`;
  //Render điểm từng người chơi trên bảng
  let rounds = choosegame.rounds;

  choosegame.players.player1.total_score = rounds.reduce(
    (prev, round) => prev + round.player_score.score1,
    0
  );
  choosegame.players.player2.total_score = rounds.reduce(
    (prev, round) => prev + round.player_score.score2,
    0
  );
  choosegame.players.player3.total_score = rounds.reduce(
    (prev, round) => prev + round.player_score.score3,
    0
  );
  choosegame.players.player4.total_score = rounds.reduce(
    (prev, round) => prev + round.player_score.score4,
    0
  );
  scorePlayer1TdElement.innerHTML = choosegame.players.player1.total_score;
  scorePlayer2TdElement.innerHTML = choosegame.players.player2.total_score;
  scorePlayer3TdElement.innerHTML = choosegame.players.player3.total_score;
  scorePlayer4TdElement.innerHTML = choosegame.players.player4.total_score;

  //Render điểm người chơi trong ô input
  //   console.log(choosegame);
  const content = rounds
    .map(
      (round) => ` <tr class="rounds">
            <td class="round-name">Round ${round.id}</td>
            <td class="">
              <input type="number" value="${round.player_score.score1}" onclick="handleChangeScore(this, ${round.id}, 'score1',)" />
            </td>
            <td class="">
              <input type="number"  value="${round.player_score.score2}" onclick="handleChangeScore(this, ${round.id}, 'score2')"/>
            </td>
            <td class="">
              <input type="number" value="${round.player_score.score3}" onclick="handleChangeScore(this, ${round.id},'score3')"/>
            </td>
            <td class="">
              <input type="number" value="${round.player_score.score4}" onclick="handleChangeScore(this, ${round.id},'score4')"/>
            </td> 
            </tr>`
    )
    .join(",");
  tbody.innerHTML = content;
}

//Tạo thêm lượt chơi mới
btnAddRound.addEventListener("click", async () => {
  let choosegame = games.find((games) => games.id === +idGame);
  let rounds = choosegame.rounds;
  const newRound = {
    id: rounds[rounds.length - 1].id + 1,
    player_score: { score1: 0, score2: 0, score3: 0, score4: 0 },
  };
  rounds.push(newRound);
  choosegame = { ...choosegame, rounds: rounds };
  await postNewRound(choosegame);
  await fetchGames();
});

//Handle change score
async function handleChangeScore(e, idround, score) {
  //   console.log(e.value);
  let choosegame = games.find((games) => games.id === +idGame);
  let rounds = choosegame.rounds;
  const editRound = rounds.find((round) => round.id === +idround);
  const editIndexRound = rounds.findIndex((round) => round.id === +idround);
  editRound.player_score[score] = Number(e.value);
  rounds[editIndexRound] = { ...rounds[editIndexRound], ...editIndexRound };

  choosegame = { ...choosegame, rounds };
  // console.log(choosegame);
  await postNewRound(choosegame);
  await fetchGames();
}

// Render
window.addEventListener("DOMContentLoaded", async () => {
  await fetchGames();
  //   console.log(games);
});

//Chỉnh sửa thêm lượt chơi mới

//Function tạo new Game
async function postNewRound(game) {
  await fetch(`http://localhost:5000/api/game/${idGame}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(game),
  });
}
