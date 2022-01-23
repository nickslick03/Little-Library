function Book(title, author, pages, genre, rating) {
	this.container = getContainer();
    this.title = getTitleNode(this.container, title);
	this.author = getPropteryNode(this.container, "author", author);
	this.pages = getPropteryNode(this.container, "pages", pages);
	this.genre = getPropteryNode(this.container, "genre", genre);
	this.rating = getRatingNode(this.container, rating);
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
    return rating + 5;
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
        library[library.length] = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputGenre.value, rating);
        bookContainer.appendChild(library[library.length - 1].container);
    }
}

const library = [];

library[0] = new Book("Atomic Habits", "James Clear", 400, "Self-help", 5);
library[1] = new Book("Deep Work", "Cal Newport", 300, "Self-help", 4);
const bookContainer = document.getElementById("book-container");
bookContainer.appendChild(library[0].container);
bookContainer.appendChild(library[1].container);