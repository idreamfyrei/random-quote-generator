const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const quoteContainer = document.getElementById("quote-container");

const images = [
  "assets/image1.jpg",
  "assets/image2.jpg",
  "assets/image3.jpg",
  "assets/image4.jpg",
  "assets/image5.jpg",
  "assets/image6.jpg",
  "assets/image7.jpg",
  "assets/image8.jpg",
  "assets/image9.jpg",
  "assets/image10.jpg",
  "assets/image11.jpg",
  "assets/image12.jpg",
  "assets/image13.jpg",
];

//get random image, preloading image as it created delay when deployed
function getRandomImage() {
  const img = new Image();
  img.src = images[Math.floor(Math.random() * images.length)];
  return img.src;
}

//get random quote
async function getQuote() {
  try {
    const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
    const data = await response.json();

    quoteText.textContent = `"${data.data.content}"`;
    authorText.textContent = `- ${data.data.author}`;
    // Apply random image to the quote box
    quoteContainer.style.backgroundImage = `url(${getRandomImage()})`;
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteText.textContent = "Failed to load quote.";
    authorText.textContent = "";
  }
}

//copy the quote to clipboard
function copyToClipboard() {
  navigator.clipboard
    .writeText(quoteText.textContent + " " + authorText.textContent)
    .then(() => alert("Quote copied!"))
    .catch((err) => console.error("Error copying quote:", err));
}

//share the quote on twitter
function shareOnTwitter() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quoteText.textContent + " " + authorText.textContent
  )}`;
  window.open(tweetUrl, "_blank");
}

//export the quote as an image by using lib html2canvas
function exportQuote() {
    html2canvas(document.getElementById("quote-container")).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "quote.png"; 
        link.click();
    });
}

getQuote();
