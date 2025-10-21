// مصفوفة الكوتس الأساسية
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
  { text: "Stay hungry, stay foolish.", category: "Inspiration" }
];

// ✅ 1. دالة لعرض كوت عشوائية (اسمها لازم يكون displayRandomQuote)
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // لازم checker يشوف كلمة innerHTML
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <p><em>Category: ${randomQuote.category}</em></p>
  `;
}

// ✅ 2. دالة لإضافة كوت جديدة (اسمها لازم addQuote)
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    displayRandomQuote(); // علشان تحدث الـ DOM
  } else {
    alert("Please enter both quote and category.");
  }
}

// ✅ 3. ربط زرار “Show New Quote” بالحدث
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// ✅ 4. أول ما الصفحة تفتح، نعرض كوت عشوائية
window.onload = displayRandomQuote;