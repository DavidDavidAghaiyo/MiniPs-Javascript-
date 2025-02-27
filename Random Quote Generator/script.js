const quoteText = document.querySelector(".quote"),
  authorName = document.querySelector(".author .name"),
  copyBtn = document.querySelector(".copy"),
  soundBtn = document.querySelector(".sound"),
  quoteBtn = document.querySelector("button");

// Random quote function
function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  //Fetching data from random quotes from API
  fetch("http://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.innerText = "New Quote";
      quoteBtn.classList.remove("loading");
    });
}

// Code for the sound button
soundBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(
    `${quoteText.innerText} by ${authorName.innerText}`
  );
  speechSynthesis.speak(utterance);
});

//Code for the copy button
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

//Code for the copy button
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

quoteBtn.addEventListener("click", randomQuote);
