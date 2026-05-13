// ==========================
// 🔥 GLOBAL DATA
// ==========================
let DATA = {};


// ==========================
// 🔥 LOAD JSON
// ==========================
fetch("data/content.json")
.then(res => res.json())
.then(data => {
    DATA = data;
    loadPage();
})
.catch(err => {
    console.error("JSON load error:", err);
});


// ==========================
// 🔹 NAVIGATION (GLOBAL)
// ==========================
window.goClass = function(c){
    localStorage.setItem("class", c);
    location.href = "subject.html";
}

window.goSubject = function(sub){
    localStorage.setItem("subject", sub);
    location.href = "category.html";
}

window.goCategory = function(cat){
    localStorage.setItem("category", cat);
    location.href = "chapter.html";
}

window.openChapter = function(ch){
    localStorage.setItem("chapter", ch);
    location.href = "content.html";
}


// ==========================
// 🔹 LOAD PAGE DATA
// ==========================
function loadPage(){

// ==========================
// 📚 CHAPTER PAGE
// ==========================
if(location.pathname.includes("chapter.html")){

    let cls = localStorage.getItem("class");
    let sub = localStorage.getItem("subject");
    let cat = localStorage.getItem("category");

    let container = document.getElementById("chapters");

    console.log("DEBUG:", cls, sub, cat, DATA);

    if(container && DATA[cls] && DATA[cls][sub] && DATA[cls][sub][cat]){

        container.innerHTML = "";

        for(let ch in DATA[cls][sub][cat]){
            container.innerHTML += `
            <div class="card" onclick="openChapter('${ch}')">
                ${ch}
            </div>`;
        }

    } else {
        container.innerHTML = "No chapters found";
    }
}


// ==========================
// 🔹 LOAD CONTENT
// ==========================
if(location.pathname.endsWith("content.html")){

    let cls = localStorage.getItem("class");
    let sub = localStorage.getItem("subject");
    let cat = localStorage.getItem("category");
    let ch = localStorage.getItem("chapter");

    let box = document.getElementById("content");

    if(box && DATA[cls] && DATA[cls][sub] && DATA[cls][sub][cat] && DATA[cls][sub][cat][ch]){

        box.innerHTML = "";

        DATA[cls][sub][cat][ch].forEach(item => {
            box.innerHTML += `
            <div class="content-box">
                <h3 class="question">${item.title}</h3>
                <p class="answer">${item.content.replace(/\n/g,"<br>")}</p>
            </div>`;
        });

    } else {
        box.innerHTML = "No content available";
    }
}

}
