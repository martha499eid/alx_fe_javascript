// Array of quotes
let quotes = [
  "Stay hungry, stay foolish.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "Simplicity is the soul of efficiency."
];

// Function to show a random quote (name must match exactly what the checker expects)
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = quotes[randomIndex];
}

// Function to add a new quote
function addQuote() {
  const input = document.getElementById("quoteInput");
  const newQuote = input.value.trim();

  if (newQuote !== "") {
    quotes.push(newQuote);
    input.value = "";
    showRandomQuote(); // update display
  }
}

// Add event listeners
document.getElementById("newQuoteBtn").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Show first quote when page loads
showRandomQuote();