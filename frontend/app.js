const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");

let currentImage = new Image();

// Fetch random image from the server
document.getElementById("randomBtn").addEventListener("click", async () => {
    const res = await fetch("/api/memes/random");
    const data = await res.json();

    currentImage = new Image();
    currentImage.crossOrigin = "anonymous";
    currentImage.src = data.imageUrl;

    currentImage.onload = () => drawMeme();
});

// Upload Image
document.getElementById("upload").addEventListener("change", (e) => {
    const file = e.target.files[0];
    currentImage = new Image();
    currentImage.src = URL.createObjectURL(file);
    currentImage.onload = () => drawMeme();
});

// Render meme with text
document.getElementById("renderBtn").addEventListener("click", drawMeme);

function drawMeme() {
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;

    ctx.drawImage(currentImage, 0, 0);

    const topText = document.getElementById("topText").value;
    const bottomText = document.getElementById("bottomText").value;

    ctx.font = "50px Impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.textAlign = "center";

    ctx.fillText(topText, canvas.width / 2, 60);
    ctx.strokeText(topText, canvas.width / 2, 60);

    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
}

// Download
document.getElementById("downloadBtn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
});