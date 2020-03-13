const username = document.getElementById("username");
const playBtn = document.getElementById("playBtn");

username.addEventListener("keyup", () => {
    console.log(username.value);
    playBtn.disabled = !username.value;
});
