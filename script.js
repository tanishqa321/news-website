const API_KEY = "5a30085f6548477ab903a9e79251360f";
const url = "https://newsapi.org/v2/everything?q=";
//suru me india ki news aaegi
window.addEventListener("load", () => fetchNews("India"));
//jb home button pr click krenge to home page pr chale jaaenge
function reload() {
    window.location.reload();
}
//for fetching news from query isme humne apinews.org ka basic syntax use kra hau aur url waisa hi pass kra jaisa usko chaiye in the form of string
//async function is used to define asynchronous functions, which return a Promise. This allows you to write asynchronous code in a
// more readable and synchronous-looking manner. The async keyword is used before a function definition, and within that function,
// the await keyword can be used to pause execution until a Promise is resolved.
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);//binding the data
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
//phle jb hum load kr rhe to empty kr de rhe kyu ki sagr nhi kiya to hum jb v chalaenge to next time jo articles hai wo phlw wale k neeche aate jaaega
    cardsContainer.innerHTML = "";
//we are making the clones of our card jb tk arcles milte jaaega tb tk cards bnte jaaenge
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
//cards me articles ko daala
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
//ye sb newsapi.org jo json format me data deta hai usse extract kra hai
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        // window.open(article.url, "_blank");
        window.location.href = article.url;
    });
}
//ye wala jo humne nav bar bnaya tha usk liye hai
//at start none will be active
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}
//for searching
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    //if query is null
    if (!query) return;
    fetchNews(query);
    //if we have searched and previoyuslt ant element was selected then we need to remove that
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});