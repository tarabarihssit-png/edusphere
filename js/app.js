
let DATA = JSON.parse(localStorage.getItem("DATA")) || {};

// 🔹 CLASS
function goClass(c){
    localStorage.setItem("class", c);
    location.href = "subject.html";
}

// 🔹 SUBJECT
function goSubject(sub){
    localStorage.setItem("subject", sub);
    location.href = "category.html";
}

// 🔹 CATEGORY
function goCategory(cat){
    localStorage.setItem("category", cat);
    location.href = "chapter.html";
}

// 🔹 OPEN CHAPTER
function openChapter(ch){
    localStorage.setItem("chapter", ch);
    location.href = "content.html";
}

// ==========================
// 🔹 LOAD CHAPTERS PAGE
// ==========================
if(location.pathname.endsWith("chapter.html")){

    let cls = localStorage.getItem("class");
    let cat = localStorage.getItem("category");

    let container = document.getElementById("chapters");
    let breadcrumb = document.getElementById("breadcrumb");

    if(breadcrumb){
        breadcrumb.innerText = `Class ${cls} > ${cat}`;
    }

    if(container && DATA[cls] && DATA[cls][cat]){

        container.innerHTML = "";

        for(let ch in DATA[cls][cat]){
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
// 🔹 LOAD CONTENT PAGE
// ==========================
if(location.pathname.endsWith("content.html")){

    let cls = localStorage.getItem("class");
    let cat = localStorage.getItem("category");
    let ch = localStorage.getItem("chapter");

    let box = document.getElementById("content");
    let breadcrumb = document.getElementById("breadcrumb");

    if(breadcrumb){
        breadcrumb.innerText = `Class ${cls} > ${cat} > ${ch}`;
    }

    if(box && DATA[cls] && DATA[cls][cat] && DATA[cls][cat][ch]){

        box.innerHTML = "";

        DATA[cls][cat][ch].forEach(item => {

            // 🔍 Assamese detect
            const isAssamese = /[\u0980-\u09FF]/.test(item.content);

            box.innerHTML += `
            <div class="content-box">
                <h3 class="question">${item.title}</h3>
                <p class="answer ${isAssamese ? 'assamese' : ''}">
                    ${item.content.replace(/\n/g, "<br>")}
                </p>
            </div>`;
        });

    } else {
        box.innerHTML = "No content available";
    }
}
