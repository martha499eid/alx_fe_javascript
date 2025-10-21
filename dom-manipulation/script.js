// مصفوفة فيها شوية اقتباسات جاهزة
const quotes = [
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
  { text: "Simplicity is the soul of efficiency.", category: "Motivation" },
  { text: "First, solve the problem. Then, write the code.", category: "Programming" },
];

// دالة لعرض اقتباس عشوائي
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerText = `"${quote.text}" — ${quote.category}`;
}

// لما المستخدم يضغط الزر "Show New Quote"
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// دالة لإضافة اقتباس جديد
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    alert("✅ Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("⚠️ Please fill in both fields before adding a quote.");
  }
}