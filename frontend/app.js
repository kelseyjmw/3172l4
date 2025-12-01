const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");

const isNetlify = window.location.hostname.includes("netlify.app");
const API_BASE = isNetlify ? "/api" : "http://localhost:4000/api";

let currentImage = new Image();

// Fetch random image from the server
document.getElementById("randomBtn").addEventListener("click", async () => {
    try {
        const res = await fetch(`${API_BASE}/meme/random`);
        const data = await res.json();
        currentImage = new Image();
        currentImage.crossOrigin = "anonymous";
        currentImage.src = data.imageUrl;

        currentImage.onload = () => drawMeme();
    } catch (err) {
        console.error(err);
    }
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

    ctx.font = `300px Impact`;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.textAlign = "center";

    ctx.fillText(topText, canvas.width / 2, 260);
    ctx.strokeText(topText, canvas.width / 2, 260);

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