function Book(title, author, pages, genre, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.rating = rating;
}

const atomic_habits = new Book("Atomic Habits", "James Clear", 400, "Self-help", 5);
const deep_work = new Book("Deep Work", "Cal Newport", 300, "Self-help", 4);



const libraryContainer = document.getElementById("book-container");
let libraryObjects = []; // Array of book objects
let libraryNodes = []; // Array of book objects turned to nodes

let editButton = document.createElement("span");
let deleteButton = document.createElement("span");
let buttons = document.createElement("div");
buttons.id = "bookButtons";
editButton.classList.add("editButton");
editButton.classList.add("button");
deleteButton.classList.add("deleteButton");
deleteButton.classList.add("button");
editButton.innerText = "✎";
deleteButton.innerText = "⊗";
buttons.appendChild(editButton);
buttons.appendChild(deleteButton);

function addBook(bookObject) {
    let index;
    if(libraryObjects.length == 0) {
        index = 0;
        libraryObjects[0] = bookObject;
    } else {
        index = libraryObjects.length;
        libraryObjects[index] = bookObject;
    }
    libraryNodes[index] = { container:document.createElement("div"), }
    libraryNodes[index].container.classList.add("book");
    for(let key in bookObject) {
        libraryNodes[index][key] = document.createElement("div");
        if(key === "title") {
            libraryNodes[index][key].classList.add("center");
            libraryNodes[index][key].innerText = bookObject[key];
            libraryNodes[index].subContainer = document.createElement("div");
            libraryNodes[index].container.appendChild(libraryNodes[index][key]);
        } else if(key === "rating") {
            libraryNodes[index].footer = document.createElement("div");
            libraryNodes[index].footer.classList.add("bookFooter");
            libraryNodes[index][key].classList.add("center");
            switch (bookObject[key]) {
                case 0:
                    libraryNodes[index][key].innerText = "☆ ☆ ☆ ☆ ☆";
                break;
                case 1:
                    libraryNodes[index][key].innerText = "★ ☆ ☆ ☆ ☆";
                break;
                case 2:
                    libraryNodes[index][key].innerText = "★ ★ ☆ ☆ ☆";
                break;
                case 3:
                    libraryNodes[index][key].innerText = "★ ★ ★ ☆ ☆";
                break;
                case 4:
                    libraryNodes[index][key].innerText = "★ ★ ★ ★ ☆";
                break;
                case 5:
                    libraryNodes[index][key].innerText = "★ ★ ★ ★ ★";
                break;
            }
            libraryNodes[index].footer.appendChild(libraryNodes[index][key]);
            libraryNodes[index].container.appendChild(libraryNodes[index].footer);
        } else {
            libraryNodes[index][key].innerText = key + " - " + bookObject[key];
            libraryNodes[index].container.appendChild(libraryNodes[index][key]);
        }
    }
    libraryNodes[index].buttons = buttons.cloneNode(true);
    libraryNodes[index].footer.appendChild(libraryNodes[index].buttons);
    libraryContainer.appendChild(libraryNodes[index].container);
}

addBook(atomic_habits);
addBook(deep_work);


//const plus = document.getElementById("plus");

//plus.addEventListener("click", addBookMenu);

document.getElementById("bookTitle").value = "hi";