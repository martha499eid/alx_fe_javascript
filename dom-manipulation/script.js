// مصفوفة مبدئية من الاقتباسات
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Success is not in what you have, but who you are.", category: "Inspiration" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
  { text: "Do what you can, with what you have, where you are.", category: "Action" },
  { text: "The harder you work for something, the greater you’ll feel when you achieve it.", category: "Motivation" }
];

// دالة لعرض جميع الاقتباسات على الصفحة
function displayQuotes(filteredQuotes = quotes) {
  const quoteList = document.getElementById("quoteList");
  quoteList.innerHTML = "";

  filteredQuotes.forEach((quote, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${quote.text} (${quote.category})`;
    quoteList.appendChild(li);
  });
}

// دالة لعرض اقتباس عشوائي
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("randomQuote");
  quoteDisplay.innerHTML = `"${randomQuote.text}" - [${randomQuote.category}]`;
}

// دالة لإضافة اقتباس جديد
function addQuote() {
  const newQuoteText = document.getElementById("newQuote").value.trim();
  const newCategory = document.getElementById("newCategory").value.trim();

  if (newQuoteText !== "" && newCategory !== "") {
    quotes.push({ text: newQuoteText, category: newCategory });
    document.getElementById("newQuote").value = "";
    document.getElementById("newCategory").value = "";

    // تحديث القائمة بعد الإضافة
    displayQuotes();

    // إعادة تعبئة الفئات
    populateCategories();
  }
}

// دالة لاستخراج الفئات وإضافتها للقائمة المنسدلة
function populateCategories() {
  const categories = quotes.map(quote => quote.category);
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

// دالة لتصفية الاقتباسات حسب الفئة المختارة
function filterQuote() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter.value;

  // حفظ الفئة المختارة في localStorage
  localStorage.setItem("selectedCategory", selectedCategory);

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(quote => quote.category === selectedCategory);

  displayQuotes(filteredQuotes);
}

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  // عرض كل الاقتباسات عند التشغيل
  displayQuotes();

  // تعبئة الفئات
  populateCategories();

  // استرجاع آخر فئة محفوظة
  const savedCategory = localStorage.getItem("selectedCategory");
  const categoryFilter = document.getElementById("categoryFilter");

  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuote();
  }

  // تطبيق التصفية عند التغيير
  categoryFilter.addEventListener("change", filterQuote);

  // زر عرض اقتباس عشوائي
document.getElementById("showRandomBtn").addEventListener("click", displayRandomQuote);

  // زر إضافة اقتباس جديد
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
});