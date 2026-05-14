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
// 🔹 LOAD CONTENT WITH PAGINATION
// ==========================
if(location.pathname.endsWith("content.html")){

    let cls = localStorage.getItem("class");
    let sub = localStorage.getItem("subject");
    let cat = localStorage.getItem("category");
    let ch = localStorage.getItem("chapter");

    let box = document.getElementById("content");
    const QUESTIONS_PER_PAGE = 3;
    let currentPage = 1;

    if(box && DATA[cls] && DATA[cls][sub] && DATA[cls][sub][cat] && DATA[cls][sub][cat][ch]){

        let allQuestions = DATA[cls][sub][cat][ch];

        function renderPage(page){
            currentPage = page;
            box.innerHTML = "";

            box.scrollIntoView({ behavior: "smooth" });

            let start = (page - 1) * QUESTIONS_PER_PAGE;
            let end = start + QUESTIONS_PER_PAGE;
            let questions = allQuestions.slice(start, end);

            questions.forEach(item => {
                box.innerHTML += `
                <div class="content-box">
                    <h3 class="question">${item.title}</h3>
                    <p class="answer">${item.content.replace(/\n/g,"<br>")}</p>
                </div>`;
            });

            let totalPages = Math.ceil(allQuestions.length / QUESTIONS_PER_PAGE);

            if(totalPages > 1){
                box.innerHTML += `
                <div style="text-align:center;margin-top:25px;">

                    ${currentPage > 1
                        ? `<button onclick="renderPage(${currentPage - 1})"
                            style="margin:5px;padding:10px 15px;border:none;border-radius:8px;background:#2563eb;color:white;cursor:pointer;">
                            Previous
                           </button>`
                        : ''
                    }
                `;

                for(let i=1;i<=totalPages;i++){
                    box.innerHTML += `
                    <button onclick="renderPage(${i})"
                    style="
                        margin:5px;
                        padding:10px 15px;
                        border:none;
                        border-radius:8px;
                        cursor:pointer;
                        ${i === currentPage
                            ? 'background:#16a34a;color:white;font-weight:bold;'
                            : 'background:#e5e7eb;color:black;'}
                    ">
                    ${i}
                    </button>`;
                }

                if(currentPage < totalPages){
                    box.innerHTML += `
                    <button onclick="renderPage(${currentPage + 1})"
                    style="margin:5px;padding:10px 15px;border:none;border-radius:8px;background:#2563eb;color:white;cursor:pointer;">
                    Next
                    </button>`;
                }

                box.innerHTML += `</div>`;
            }
        }

        window.renderPage = renderPage;
        renderPage(1);

    } else {
        box.innerHTML = "No content available";
    }
}
}
