const questionsContent = document.querySelector(".question-content");
const likeButton = document.querySelector("#like");
const dislikeButton = document.querySelector("#dislike");

// Function to make a GET request to fetch questions
let randomQuestion; // Lưu trữ câu hỏi ngẫu nhiên hiện tại

async function getQuestions() {
  try {
    const response = await fetch("http://localhost:3000/api/v1/questions");
    const questions = await response.json();
    randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    questionsContent.innerHTML = randomQuestion.content;
  } catch (error) {
    console.log(error);
  }
}

// Function to randomly select a question from the array

//Function onclick Like
likeButton.addEventListener("click", async () => {
  await increaseLike();
});

// Function increase Like
async function increaseLike() {
  try {
    //     console.log(11111111111, randomQuestion);
    randomQuestion.like += 1; // Tăng số lượng like của câu hỏi ngẫu nhiên
    await fetch(`http://localhost:3000/api/v1/questions/${randomQuestion.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(randomQuestion),
    });
    window.location.href = `/question-detail/${randomQuestion.id}`;
  } catch (error) {
    console.log(error);
  }
}

//FUnction Dislike
dislikeButton.addEventListener("click", async () => {
  await increaseDisLike();
});

// Function increase Like
async function increaseDisLike() {
  try {
    //     console.log(11111111111, randomQuestion);
    randomQuestion.dislike += 1; // Tăng số lượng like của câu hỏi ngẫu nhiên
    await fetch(`http://localhost:3000/api/v1/questions/${randomQuestion.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(randomQuestion),
    });
    window.location.href = `/question-detail/${randomQuestion.id}`;
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  getQuestions();
});
