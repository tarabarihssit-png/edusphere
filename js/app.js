// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDhYNM9z2QL1pbemij00fTpPQWL4k98ql0",
  authDomain: "edusphere-fce87.firebaseapp.com",
  projectId: "edusphere-fce87"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


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
// 🔹 LOAD CHAPTERS (Firebase)
// ==========================
if(location.pathname.endsWith("chapter.html")){

    let cls = localStorage.getItem("class");
    let cat = localStorage.getItem("category");

    let container = document.getElementById("chapters");
    let breadcrumb = document.getElementById("breadcrumb");

    if(breadcrumb){
        breadcrumb.innerText = `Class ${cls} > ${cat}`;
    }

    db.collection("notes")
    .where("class","==",cls)
    .where("category","==",cat)
    .get()
    .then(snapshot => {

        let chapters = new Set();

        snapshot.forEach(doc=>{
            chapters.add(doc.data().chapter);
        });

        let html = "";

        chapters.forEach(ch=>{
            html += `<div class="card" onclick="openChapter('${ch}')">${ch}</div>`;
        });

        container.innerHTML = html || "No chapters found";
    });
}


// ==========================
// 🔹 LOAD CONTENT (Firebase)
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

    db.collection("notes")
    .where("class","==",cls)
    .where("category","==",cat)
    .where("chapter","==",ch)
    .onSnapshot(snapshot => {

        let html = "";

        snapshot.forEach(doc=>{
            let item = doc.data();

            const isAssamese = /[\u0980-\u09FF]/.test(item.content);

            html += `
            <div class="content-box">
                <h3 class="question">${item.title}</h3>
                <p class="answer ${isAssamese ? 'assamese' : ''}">
                    ${item.content.replace(/\n/g,"<br>")}
                </p>
            </div>`;
        });

        box.innerHTML = html || "No content available";
    });
}
