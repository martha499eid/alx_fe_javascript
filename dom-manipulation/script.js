// مصفوفة محلية للاقتباسات
let quotes = [];

// رابط الـ Mock API
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// جلب البيانات من السيرفر
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    quotes = data.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server"
    }));

    localStorage.setItem("quotes", JSON.stringify(quotes));
    displayQuotes();
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

// إرسال اقتباس جديد للسيرفر
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote)
    });
    const data = await response.json();
    console.log("Quote posted:", data);
  } catch (error) {
    console.error("Error posting quote:", error);
  }
}

// عرض كل الاقتباسات
function displayQuotes(filteredQuotes = quotes) {
  const quoteList = document.getElementById("quoteList");
  quoteList.innerHTML = "";

  filteredQuotes.forEach((quote, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${quote.text} (${quote.category})`;
    quoteList.appendChild(li);
  });
}

// عرض اقتباس عشوائي
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("randomQuote");
  quoteDisplay.innerHTML = `"${randomQuote.text}" - [${randomQuote.category}]`;
}

// إضافة اقتباس جديد
function addQuote() {
  const newQuoteText = document.getElementById("newQuote").value.trim();
  const newCategory = document.getElementById("newCategory").value.trim();

  if (newQuoteText !== "" && newCategory !== "") {
    const newQuote = { text: newQuoteText, category: newCategory };
    quotes.push(newQuote);
    document.getElementById("newQuote").value = "";
    document.getElementById("newCategory").value = "";

    displayQuotes();
    localStorage.setItem("quotes", JSON.stringify(quotes));
    populateCategories();

    postQuoteToServer(newQuote);
  }
}

// تعبئة القوائم بالفئات
function populateCategories() {
  const categories = quotes.map(q => q.category);
  const uniqueCategories = [...new Set(categories)];
  const categoryFilter = document.getElementById("categoryFilter");

  categoryFilter.innerHTML = '<option value="all">All</option>';
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// تصفية حسب الفئة
function filterQuote() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  displayQuotes(filteredQuotes);
}

// مزامنة البيانات بين السيرفر والمحلي
async function syncQuotes() {
  try {
    const response = await fetch(API_URL);
    const serverData = await response.json();

    const serverQuotes = serverData.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server"
    }));

    const combinedQuotes = [...quotes, ...serverQuotes].reduce((acc, curr) => {
      if (!acc.find(q => q.text === curr.text)) acc.push(curr);
      return acc;
    }, []);

    quotes = combinedQuotes;
    localStorage.setItem("quotes", JSON.stringify(quotes));
    displayQuotes();
    console.log("Quotes synced successfully");
  } catch (error) {
    console.error("Error syncing quotes:", error);
  }
}

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
    displayQuotes();
    populateCategories();
  } else {
    fetchQuotesFromServer();
  }

  const savedCategory = localStorage.getItem("selectedCategory");
  const categoryFilter = document.getElementById("categoryFilter");

  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuote();
  }

  document.getElementById("showRandomBtn").addEventListener("click", displayRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  categoryFilter.addEventListener("change", filterQuote);

  setInterval(syncQuotes, 60000);
});