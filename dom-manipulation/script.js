// 1️⃣ مصفوفة الاقتباسات
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" }
];

// 2️⃣ دالة لعرض اقتباس عشوائي
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quote").innerHTML = `"${quote.text}" — ${quote.author}`;
}

// 3️⃣ دالة لإضافة اقتباس جديد
function addQuote() {
  const textInput = document.getElementById("new-quote-text").value.trim();
  const authorInput = document.getElementById("new-quote-author").value.trim();

  if (textInput && authorInput) {
    const newQuote = { text: textInput, author: authorInput };
    quotes.push(newQuote);

    // تحديث العرض
    document.getElementById("quote").innerHTML = `"${newQuote.text}" — ${newQuote.author}`;

    // تفريغ الحقول
    document.getElementById("new-quote-text").value = "";
    document.getElementById("new-quote-author").value = "";
  } else {
    alert("Please enter both quote text and author name.");
  }
}

// 4️⃣ ربط الأزرار بالأحداث
document.getElementById("new-quote").addEventListener("click", displayRandomQuote);
document.getElementById("add-quote").addEventListener("click", addQuote);

// عرض أول اقتباس عند تحميل الصفحة
displayRandomQuote();