function Book(title, author, pages, genre, rating, index) {
	this.container = getContainer();
    this.title = getTitleNode(this.container, title);
	this.author = getPropteryNode(this.container, "author", author);
	this.pages = getPropteryNode(this.container, "pages", pages);
	this.genre = getPropteryNode(this.container, "genre", genre);
	this.rating = parseInt(rating);
    this.ratingNode = getRatingNode(this.container, rating);
    this.sortingIndex = index;
    this.recentIndex = library.length;
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
    if(rating === -1) {
        ratingNode.innerText = "Not read Yet";
        footer.appendChild(ratingNode);
        container.appendChild(footer);
        return ratingNode;
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
       startEdit(book.sortingIndex);
    });
    deleteButton.addEventListener("click", () => {
        deleteBook(book.sortingIndex, book.recentIndex);
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
inputPages.value = null;
inputRating.value = 5;

inputRating.style.visibility = "hidden";
inputReadYet.addEventListener("click", () => {
	if(inputReadYet.checked) {
		inputRating.style.visibility = "visible";
	} else {
		inputRating.style.visibility = "hidden";
	}
})

function openPopup() {
    popup.style.visibility = "visible";
    inputTitle.style.visibility = "visible";
    inputAuthor.style.visibility = "visible";
    inputPages.style.visibility = "visible";
    inputGenre.style.visibility = "visible";
}

document.getElementById("plusButton").addEventListener("click", () => {
	openPopup();
	popupTitle.innerText = "Add Book";
});
document.getElementById("cancel").addEventListener("click", () => {
	closePopup(false);
});
document.getElementById("confirm").addEventListener("click", () => {
	if(inputChecker()) {
        return;
    }
    closePopup(true);
});

let isEdit = false;
let editIndex = 0;
function startEdit(sortingIndex) {
    openPopup();
    popupTitle.innerText = "Edit Book";
    inputTitle.value = library[sortingIndex].title.innerText;
    inputAuthor.value = library[sortingIndex].author.innerText.substring(9);
    inputPages.value = library[sortingIndex].pages.innerText.substring(8);
    inputGenre.value = library[sortingIndex].genre.innerText.substring(8);
    if(library[sortingIndex].rating > -1) {
        inputReadYet.checked = true;
        inputRating.value = library[sortingIndex].rating;
        inputRating.style.visibility = "visible";
    }
    isEdit = true;
    editIndex = sortingIndex;
}

function inputChecker() {
    let isEmpty = false;
    if(inputTitle.value === "") {
        document.getElementById("titleField").style.visibility = "visible";
        isEmpty = true;
    } else {
        document.getElementById("titleField").style.visibility = "hidden";
    }
    if(inputAuthor.value === "") {
        document.getElementById("authorField").style.visibility = "visible";
        isEmpty = true;
    } else {
        document.getElementById("authorField").style.visibility = "hidden";
    }
    if(inputPages.value === "") {
        document.getElementById("pagesField").style.visibility = "visible";
        isEmpty = true;
    } else {
        document.getElementById("pagesField").style.visibility = "hidden";
    }
    if(inputGenre.value === "") {
        document.getElementById("genreField").style.visibility = "visible";
        isEmpty = true;
    } else {
        document.getElementById("genreField").style.visibility = "hidden";
    }
    return isEmpty;
}

function closePopup(isConfrim) {
    let rating;
    inputRating.style.visibility = "hidden";
	popup.style.visibility = "hidden";
    if(isConfrim) {
		if(inputReadYet.checked == false) {
			rating = -1;
		} else {
			rating = parseInt(inputRating.value);
		}
        if(isEdit) {
            editBook(editIndex);
        } else {
            library[library.length] = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputGenre.value, rating, library.length);
            libraryContainer.appendChild(library[library.length - 1].container);
            sort(currentSort);
        }
    }
    inputTitle.value = "";
	inputAuthor.value = "";
	inputPages.value = null;
	inputGenre.value = "";
	inputRating.value = 5;
	inputReadYet.checked = false;
    isEdit = false;
    popup.style.visibility = "hidden";
    inputTitle.style.visibility = "hidden";
    inputAuthor.style.visibility = "hidden";
    inputPages.style.visibility = "hidden";
    inputGenre.style.visibility = "hidden";
}

function editBook(sortingIndex) {
    library[sortingIndex].title.innerText = inputTitle.value;
    library[sortingIndex].author.innerText = "Author - " + inputAuthor.value;
    library[sortingIndex].pages.innerText = "Pages - " + inputPages.value;
    library[sortingIndex].genre.innerText = "Genre - " + inputGenre.value;
    if(inputReadYet.checked === true) {
        library[sortingIndex].rating = parseInt(inputRating.value);
        let stars = "";
        for(let i = 0; i < 5; i++) {
            if(inputRating.value > 0) {
                stars += "★ ";
            } else {
                stars += "☆ ";
            }
            inputRating.value--;
        }
        library[sortingIndex].ratingNode.innerText = stars;
    } else {
        library[sortingIndex].ratingNode.innerText = "Not Read Yet";
        library[sortingIndex].rating = -1;
    }
}

function deleteBook(sortingIndex, recentIndex) {
    library[sortingIndex].container.remove();
    library.splice(sortingIndex, 1);
    library.forEach((book, sortInd) => {
        book.sortingIndex = sortInd;
        if(book.recentIndex > recentIndex) {
            book.recentIndex --;
        }
        console.log(recentIndex);
    });
}

const sortBy = document.getElementById("sortDropdown").cloneNode(true);
document.getElementById("sortDropdown").remove();
let sortVisible = false;
document.getElementById("sortButton").addEventListener("click", () => {
    if(sortVisible) {
        sortBy.remove();
        sortVisible = false;
    } else {
        document.getElementById("menu").appendChild(sortBy);
        sortVisible = true;
    }
})
sortBy.addEventListener("click", (e) => {
    if(Array.from(sortBy.childNodes).indexOf(e.target) > 1) {
        sort(e.target.id);
    }
});

let currentSort = "sortRecent";
function sort(sortMethod) {
    library.forEach((book) => {
        book.container.remove();
    });
    switch (sortMethod) {
        case "sortTitle":
            library.sort((a, b) => {
                if(a.title.innerText < b.title.innerText) {
                    return -1;
                } else {
                    return 1;
                }
            });
        break;
        case "sortAuthor":
            library.sort((a, b) => {
                if(a.author.innerText.substring(a.author.innerText.lastIndexOf(" ") + 1) < 
                b.author.innerText.substring(b.author.innerText.lastIndexOf(" ") + 1)) {
                    return -1;
                } else {
                    return 1;
                }
            });
        break;
        case "sortPages":
            library.sort((a, b) => {
                if(parseInt(a.pages.innerText.substring(a.pages.innerText.lastIndexOf(" ") + 1)) < 
                parseInt(b.pages.innerText.substring(b.pages.innerText.lastIndexOf(" ") + 1))) {
                    return 1;
                } else {
                    return -1;
                }
            });
        break;
        case "sortGenre":
            library.sort((a, b) => {
                if(a.genre.innerText.substring(a.genre.innerText.lastIndexOf(" ") + 1) < 
                b.genre.innerText.substring(b.genre.innerText.lastIndexOf(" ") + 1)) {
                    return -1;
                } else {
                    return 1;
                }
            });
        break;
        case "sortRating":
            library.sort((a, b) => {
                if(a.rating < b.rating) {
                    return 1;
                } else {
                    return -1;
                }
            });
        break;
        case "sortRecent":
            library.sort((a, b) => {
                if(a.recentIndex < b.recentIndex) {
                    return -1;
                } else {
                    return 1;
                }
            });
        break;
        case "sortReverse":
            library.reverse();
        break;
    }
    currentSort = sortMethod;
    library.forEach((book, sortInd) => {
        libraryContainer.appendChild(book.container);
        book.sortingIndex = sortInd;
    });
}

let library = [];

library[0] = new Book("The Bible", "God", 5000, "Self-help", 5, 0);
library[1] = new Book("Atomic Habits", "James Clear", 400, "Self-help", 4, 1);
library[2] = new Book("1984", "George Orwell", 299, "Non-fiction", 3, 2);
library[3] = new Book("Deep Work", "Cal Newport", 300, "Self-help", 4, 3);


const libraryContainer = document.getElementById("book-container");
libraryContainer.appendChild(library[0].container);
libraryContainer.appendChild(library[1].container);
libraryContainer.appendChild(library[2].container);
libraryContainer.appendChild(library[3].container);