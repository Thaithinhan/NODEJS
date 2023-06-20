const textAreaElement = document.querySelector(".main-form .question-content");
const formElement = document.querySelector(".main-form");
const spanLetter = document.querySelector("span.letter");

//Tạo sự kiện input cho textArea
let value = "";

textAreaElement.addEventListener("input", (e) => {
  value = e.target.value;
  const lengthLetter = value.length;
  //   console.log(lengthLetter);
  if (lengthLetter <= 200) {
    spanLetter.innerHTML = 200 - lengthLetter;
  } else {
    spanLetter.innerHTML = "Max length reached";
    textAreaElement.setAttribute("maxlength", "200");
  }
});

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  //Xử lý sự kiện post question
  try {
    const newQuestion = {
      content: value,
      like: 0,
      dislike: 0,
      id: Number(generateID()),
    };

    //   console.log(newQuestion);
    await postQuestion(newQuestion);
    window.location = "/";
  } catch (error) {
    console.log(error);
  }
});

// Xử lý post dữ liệu lên server

async function postQuestion(question) {
  try {
    const response = await fetch("http://localhost:3000/api/v1/questions", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(question),
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

//Xử lý ID tự động
const generateID = () => {
  const timestamp = new Date().getTime(); // Lấy thời gian Unix
  const random = Math.floor(Math.random()); // Số ngẫu nhiên từ 0 đến 99999
  const id = `${timestamp}${random}`; // Kết hợp timestamp và số ngẫu nhiên
  return id;
};
