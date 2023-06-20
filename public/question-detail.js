const questionContent = document.querySelector(".question-content");
const voteNumber = document.querySelector(".vote-number");
const dislike = document.querySelector(".rate-bar .dislike");
const like = document.querySelector(".rate-bar .like");
const btn = document.getElementById("btn");
const url = window.location.href;
const id = url.split("/").pop();
// console.log(id);
async function getQuestionById() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/questions/${id}`
    );
    const question = await response.json();
    questionContent.innerHTML = question.content;

    // TÍnh số lượng vote và % like và dislike
    const totalVote = question.like + question.dislike;
    voteNumber.innerHTML = totalVote;
    const percentageLike = Math.ceil((question.like / totalVote) * 100);

    const percentageDislike = 100 - percentageLike;
    dislike.style.flexBasis = `${percentageDislike}%`;
    dislike.innerHTML = percentageDislike + "%";
    like.innerHTML = percentageLike + "%";
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

//Click button to back home page
btn.onclick = () => {
  window.location = "/";
};

window.addEventListener("DOMContentLoaded", async () => {
  await getQuestionById();
});
