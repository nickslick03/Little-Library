function Book(title, author, pages, genre, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.rating = rating;

}

const libraryContainer = document.getElementById("book-container");
let libraryObjects = []; // Array of book objects
let libraryNodes = []; // Array of book objects turned to nodes

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const inputTitle = document.getElementById("inputTitle");
const inputAuthor = document.getElementById("inputAuthor");
const inputPages = document.getElementById("inputPages");
const inputGenre = document.getElementById("inputGenre");
const inputReadYet = document.getElementById("inputReadYet");
const inputRating = document.getElementById("inputRating");
inputPages.value = 0;
inputRating.value = 0;
inputRating.style.visibility = "hidden";

inputReadYet.addEventListener("click", () => {
    if(inputReadYet.checked) {
        inputRating.style.visibility = "visible";
    } else {
        inputRating.style.visibility = "hidden";
    }
})
document.getElementById("plusButton").addEventListener("click", () => {
    popup.style.visibility = "visible";
    popupTitle.innerText = "Add Book";
});
document.getElementById("cancel").addEventListener("click", () => {
    closePopup(false);
    isEdit = false;
});
document.getElementById("confirm").addEventListener("click", () => {
    closePopup(true);
});

function closePopup(isConfirmed) {
    let rating;
    inputRating.style.visibility = "hidden";
    popup.style.visibility = "hidden";
    if(isConfirmed) {
        if(inputReadYet.checked == false) {
            rating = false;
        } else {
            rating = parseInt(inputRating.value);
        }
        if(isEdit) {
            libraryObjects[editIndex] = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputGenre.value, rating);
            editBook(editIndex);    
        } else {
            libraryObjects[libraryObjects.length] = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputGenre.value, rating);
            addBook(libraryObjects[libraryObjects.length-1]);
        }
    }
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = 0;
    inputGenre.value = "";
    inputRating.value = 0;
    inputReadYet.checked = false;
}

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

const editButtons = Array.from(document.getElementsByClassName("editButton"));
editButtons.forEach(element => {
    element.addEventListener("click", () =>{
        console.log(element);
    });
});

function addBook(bookObject) {
    let index = libraryObjects.length-1;
    console.log(index + " - " + bookObject.toString);
    libraryNodes[index] = { container:document.createElement("div"), }
    libraryNodes[index].container.classList.add("book");
    libraryNodes[index].container.id = bookObject.title;
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
                default:
                    libraryNodes[index][key].innerText = "Not read yet";
                break;
            }
            libraryNodes[index].footer.appendChild(libraryNodes[index][key]);
            libraryNodes[index].container.appendChild(libraryNodes[index].footer);
        } else {
            libraryNodes[index][key].innerText = key + " - " + bookObject[key];
            libraryNodes[index].container.appendChild(libraryNodes[index][key]);
        }
        console.log(key + " : " + bookObject[key]);
    }
    libraryNodes[index].buttons = buttons.cloneNode(true);    
    libraryNodes[index].footer.appendChild(libraryNodes[index].buttons);
    libraryContainer.appendChild(libraryNodes[index].container);
    console.log(index);
    libraryNodes[index].buttons.childNodes[0].addEventListener("click", () => {
        startEdit(index);
    });
    libraryNodes[index].buttons.childNodes[1].addEventListener("click", () => {
        document.getElementById(bookObject.title).remove();
        libraryObjects.splice(index, 1);
        libraryNodes.splice(index, 1);
    });
}
let isEdit = false;
let editIndex = 0;
function startEdit(index) {
    popup.style.visibility = "visible";
    popupTitle.innerText = "Edit Book";
    inputTitle.value = libraryObjects[index].title;
    inputAuthor.value = libraryObjects[index].author;
    inputPages.value = libraryObjects[index].pages;
    inputGenre.value = libraryObjects[index].genre;
    if(typeof libraryObjects[index].rating === "number") {
        inputReadYet.checked = true;
        inputRating.value = libraryObjects[index].rating;
        inputRating.style.visibility = "visible";
    }
    isEdit = true;
    editIndex = index;
} 
function editBook(editIndex) {
    libraryNodes[editIndex].title.innerText = libraryObjects[editIndex].title;
    libraryNodes[editIndex].author.innerText = "author - " + libraryObjects[editIndex].author;
    libraryNodes[editIndex].pages.innerText = "pages - " + libraryObjects[editIndex].pages;
    libraryNodes[editIndex].genre.innerText = "genre - " + libraryObjects[editIndex].genre;
    switch (libraryObjects[editIndex].rating) {
        case 0:
            libraryNodes[editIndex].rating.innerText = "☆ ☆ ☆ ☆ ☆";
        break;
        case 1:
            libraryNodes[editIndex].rating.innerText = "★ ☆ ☆ ☆ ☆";
        break;
        case 2:
            libraryNodes[editIndex].rating.innerText = "★ ★ ☆ ☆ ☆";
        break;
        case 3:
            libraryNodes[editIndex].rating.innerText = "★ ★ ★ ☆ ☆";
        break;
        case 4:
            libraryNodes[editIndex].rating.innerText = "★ ★ ★ ★ ☆";
        break;
        case 5:
            libraryNodes[editIndex].rating.innerText = "★ ★ ★ ★ ★";
        break;
        default:
            libraryNodes[editIndex].rating.innerText = "Not read yet";
        break;
    }
    isEdit = false;
}

libraryObjects[0] = new Book("Atomic Habits", "James Clear", 400, "Self-help", 5);
addBook(libraryObjects[0]);
libraryObjects[1] = new Book("Deep Work", "Cal Newport", 300, "Self-help", 4);
addBook(libraryObjects[1]);