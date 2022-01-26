function Book(title, author, pages, genre, rating, index) {
	this.container = getContainer();
    this.title = getTitleNode(this.container, title);
	this.author = getPropteryNode(this.container, "author", author);
	this.pages = getPropteryNode(this.container, "pages", pages);
	this.genre = getPropteryNode(this.container, "genre", genre);
	this.rating = parseInt(rating);
    this.ratingNode = getRatingNode(this.container, rating);
    this.index = index;
    this.buttons = getButtons(this.container, this);
}

function getContainer() {
    const containerNode = document.createElement("div");
    containerNode.classList.add("book");
    return containerNode;
}

function getTitleNode(container, title) {
    const titleNode = document.createElement("div");
    titleNode.classList.add("center");
    titleNode.innerText = title;
    container.appendChild(titleNode);
    return titleNode;
}

function getPropteryNode(container, proptery, propteryValue) {
    const PropteryNode = document.createElement("div");
    PropteryNode.innerText = proptery + " - " + propteryValue;
    container.appendChild(PropteryNode);
    return PropteryNode;
}

function getRatingNode(container, rating) {
    const ratingNode = document.createElement("div");
    const footer = document.createElement("div");
    footer.classList.add("bookFooter");
    if(rating === false) {
        ratingNode.innerText = "Not read Yet";
        footer.appendChild(ratingNode);
        container.appendChild(footer);
        return rating;
    }
    for(let i = 0; i < 5; i++) {
        if(rating > 0) {
            ratingNode.innerText += "★ ";
        } else {
            ratingNode.innerText += "☆ ";
        }
        rating--;
    }
    footer.appendChild(ratingNode);
    container.appendChild(footer);
    return ratingNode;
}

function getButtons(container, book) {
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
    container.querySelector(".bookFooter").appendChild(buttons);
    editButton.addEventListener("click", () => {
       startEdit(book.index);
    });
    deleteButton.addEventListener("click", () => {
        deleteBook(book.index);
    });
    return buttons;
}

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
});
document.getElementById("confirm").addEventListener("click", () => {
	closePopup(true);
});

let isEdit = false;
let editIndex = 0;
function startEdit(index) {
    popup.style.visibility = "visible";
	popupTitle.innerText = "Add Book";
    popup.style.visibility = "visible";
    popupTitle.innerText = "Edit Book";
    inputTitle.value = library[index].title.innerText;
    inputAuthor.value = library[index].author.innerText.substring(9);
    inputPages.value = library[index].pages.innerText.substring(8);
    inputGenre.value = library[index].genre.innerText.substring(8);
    if(typeof library[index].rating === "number") {
        inputReadYet.checked = true;
        inputRating.value = library[index].rating;
        inputRating.style.visibility = "visible";
    }
    isEdit = true;
    editIndex = index;
}

function closePopup(isConfrim) {
    let rating;
    inputRating.style.visibility = "hidden";
	popup.style.visibility = "hidden";
    if(isConfrim) {
		if(inputReadYet.checked == false) {
			rating = false;
		} else {
			rating = parseInt(inputRating.value);
		}
        if(isEdit) {
            editBook(editIndex);
        } else {
            library[library.length] = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputGenre.value, rating, library.length);
            bookContainer.appendChild(library[library.length - 1].container);
        }
    }
    inputTitle.value = "";
	inputAuthor.value = "";
	inputPages.value = 0;
	inputGenre.value = "";
	inputRating.value = 0;
	inputReadYet.checked = false;
    isEdit = false;
}

function editBook(index) {
    library[index].title.innerText = inputTitle.value;
    library[index].author.innerText = "Author - " + inputAuthor.value;
    library[index].pages.innerText = "Pages - " + inputPages.value;
    library[index].genre.innerText = "Genre - " + inputGenre.value;
    if(inputReadYet.checked === true) {
        library[index].rating = parseInt(inputRating.value);
        let stars = "";
        for(let i = 0; i < 5; i++) {
            if(inputRating.value > 0) {
                stars += "★ ";
            } else {
                stars += "☆ ";
            }
            inputRating.value--;
        }
        library[index].ratingNode.innerText = stars;
    } else {
        library[index].ratingNode.innerText = "Not Read Yet";
        library[index].rating = false;
    }
}

function deleteBook(index) {
    library[index].container.remove();
    library.splice(index, 1);
    let count = 0;
    library.forEach((book) => {
        library[count].index = count;
        count++;
    });
}
const library = [];

library[0] = new Book("Atomic Habits", "James Clear", 400, "Self-help", 5, 0);
library[1] = new Book("Deep Work", "Cal Newport", 300, "Self-help", 4, 1);
const bookContainer = document.getElementById("book-container");
bookContainer.appendChild(library[0].container);
bookContainer.appendChild(library[1].container);