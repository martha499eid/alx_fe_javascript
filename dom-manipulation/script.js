let quotes = [];

// 🧠 تحميل البيانات من localStorage عند فتح الصفحة
window.onload = function () {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      { text: "Stay hungry, stay foolish.", category: "Motivation" },
      { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
      { text: "Simplicity is the soul of efficiency.", category: "Design" }
    ];
    saveQuotes();
  }

  populateCategories();
  displayRandomQuote();
};

// 🧾 عرض اقتباس عشوائي
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>- ${randomQuote.category}</small>
  `;
}

// 🔹 إضافة اقتباس جديد
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories();
    alert("Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both quote text and category.");
  }
}

// 🔹 حفظ البيانات في localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// 🔹 تعبئة قائمة التصنيفات (categories)
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  const select = document.getElementById("categoryFilter");
  select.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

// 🔹 فلترة الاقتباسات حسب التصنيف
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = filtered
    .map(q => `<p>"${q.text}"</p><small>- ${q.category}</small>`)
    .join("<hr>");
}

// 🔹 زر عرض اقتباس جديد
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// 🔹 مزامنة البيانات مع السيرفر
document.getElementById("syncData").addEventListener("click", async () => {
  alert("Syncing with server...");

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverData = await response.json();

    // نحاكي وجود اقتباسات جديدة من السيرفر
    const serverQuotes = [
      { text: "Push yourself, because no one else is going to do it for you.", category: "Motivation" },
      { text: "Make it work, make it right, make it fast.", category: "Programming" }
    ];

    // دمج البيانات (server data takes priority)
    quotes = [...quotes, ...serverQuotes];
    saveQuotes();
    populateCategories();
    alert("Sync completed! Server data merged.");
  } catch (error) {
    alert("Failed to sync data. Check your internet connection.");
  }
});

// 🔹 محاكاة تعارض (Conflict)
document.getElementById("simulateConflict").addEventListener("click", () => {
  alert("Simulating conflict...");

  // نحاكي تعارض بين بيانات المستخدم والسيرفر
  const localQuote = { text: "This is a local-only quote.", category: "Local" };
  const serverQuote = { text: "This is a server-updated quote.", category: "Server" };

  // الحل: بيانات السيرفر لها الأولوية
  quotes.push(serverQuote);
  saveQuotes();
  alert("Conflict resolved. Server version kept.");
});