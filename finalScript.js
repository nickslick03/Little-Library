class Book {
    #container
    #title
    #author
    #pages
    #genre
    #rating
    #buttons
    #index
    static bookList = []

    constructor(title, author, pages, genre, rating) {
        this.#container = setBookContainer();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.genre = genre;
        this.rating = rating;
        this.#buttons = this.#setButtons();
        this.#index = Book.bookList.length;
        Book.bookList.push(this);
    }

    get container() {
        return this.#container;
    }

    #propertyInjector(index, value, propteryName) {
        if(this.#container.children[index].childElementCount === 0) {
            this.#container.children[index].innerText = value;
            return this.#container.children[index];
        } else {
            this.#container.children[index].children[0].innerText = propteryName + " - ";
            this.#container.children[index].children[1].innerText = value;
            return this.#container.children[index].children[1];
        }
    }

    set title(value) {
        this.#title = this.#propertyInjector(0, value);
    }
    get title() {
        return this.#title.innerText;
    }

    set author(value) {
        this.#author = this.#propertyInjector(1, value, "author"); 
    }
    get author() {
        return this.#author.innerText;
    }

    set pages(value) {
        this.#pages = this.#propertyInjector(2, value, "pages");
    }
    get pages() {
        return parseInt(this.#pages.innerText);
    }

    set genre(value) {
        this.#genre = this.#propertyInjector(3, value, "genre");
    }
    get genre() {
        return this.#genre.innerText;
    }

    set rating(value) {
        let rating = "";
        if(!(value)) {
            this.#rating = this.#propertyInjector(4, "Not Read Yet");
        } else {
            let num = parseInt(value);
            for(let i = 0; i < 5; i++) {
                if(num > 0) {
                    rating += "★ ";
                    num--;
                } else {
                    rating += "☆ ";
                }
            }
            this.#rating = this.#propertyInjector(4, rating);
        }
        this.#rating.setAttribute("data-rating-number", value);
    }
    get rating() {
        return parseInt(this.#rating.getAttribute("data-rating-number"));
    }
    
    #setButtons() {
        const buttonContainer = document.createElement("div");
        for(let i = 0; i <= 1; i++) {
            const button = document.createElement("div");
            button.className = "button";
            i === 0 ? button.innerText = "✎" : button.innerText = "⊗";
            buttonContainer.appendChild(button);
        }
        buttonContainer.children[0].addEventListener("click", () => {
            popup.openPopup(this);
        });
        buttonContainer.children[1].addEventListener("click", () => {
            document.getElementById("bookContainer").removeChild(this.container);
            for(book of Book.bookList) {
                if(book.#index > this.#index) {
                    book.#index--;
                }
            }
            Book.bookList.splice(Book.bookList.indexOf(this), 1);
        });
        this.#container.appendChild(buttonContainer);
    }

    get index() {
        return this.#index;
    }
}

function setBookContainer() {
    const containerDiv = document.createElement("div");
    containerDiv.className = "book";
    for(let i = 0; i <= 4; i++) {
        const div = document.createElement("div");
        if(i !== 0 && i !== 4) {
            const spanOne = document.createElement("span");
            const spanTwo = document.createElement("span");
            div.appendChild(spanOne);
            div.appendChild(spanTwo);
        }
        containerDiv.appendChild(div);
    }
    return containerDiv;
}

const popup = (() => {
    const bookContainer = document.getElementById("bookContainer");
    const popupContainer = document.getElementById("popupContainer");
    const popup = document.getElementById("popup");
    const popupTitle = popup.querySelector("h2");
    const inputList = Array.from(popup.querySelectorAll("input"));
    let currentBook;
    popupContainer.classList.toggle("hidden");
    popup.style.visibility = "hidden";

    const openPopup = book => {
        popup.style.visibility = "visible";
        popupContainer.classList.toggle("hidden");
        if(book instanceof Book) {
            currentBook = book;
            popupTitle.innerText = "Edit Book";
            inputList[0].value = currentBook.title;
            inputList[1].value = currentBook.author;
            inputList[2].value = currentBook.pages;
            inputList[3].value = currentBook.genre;
            if(!(Number.isNaN(book.rating))) {
                inputList[4].checked = true;
                inputList[5].disabled = false;
                inputList[5].value = currentBook.rating;
            } else {
                inputList[5].disabled = true;
            }
        } else {
            popupTitle.innerText = "Add Book";
            inputList[5].disabled = true;
        }
    };

    const validate = () => {
        for(let i = 0; i <= 3; i++) {
            if(inputList[i].value === "") {
                return false;
            }
        }
        return true;
    };

    const closePopup = (isConfrim) => {
        popup.style.visibility = "hidden";
        popupContainer.classList.toggle("hidden");
        if(isConfrim) {
            if(currentBook instanceof Book) {
                currentBook.title = inputList[0].value;
                currentBook.author = inputList[1].value;
                currentBook.pages = inputList[2].value;
                currentBook.genre = inputList[3].value;
                if(inputList[4].checked && inputList[5].value !== "") {
                    currentBook.rating = inputList[5].value;
                } else {
                    currentBook.rating = NaN;
                }
            } else {
                new Book(inputList[0].value, inputList[1].value, inputList[2].value, inputList[3].value, inputList[5].value);
                bookContainer.appendChild(Book.bookList[Book.bookList.length - 1].container);
                sortBooks.sort();
            }
        }
        for(input of inputList) {
            input.value = "";
        }
        inputList[4].checked = false;
        currentBook = null;
    };

    inputList[4].addEventListener("click", () => {
        if(inputList[4].checked) {
            inputList[5].disabled = false;
            inputList[5].value = 5;
        } else {
            inputList[5].disabled = true;
            inputList[5].value = "";
        }
    });
    popupContainer.addEventListener("click", event => {
        if(event.target === popupContainer) {
            closePopup(false);
        }
    });
    document.getElementById("addButton").addEventListener("click", openPopup);
    document.getElementById("cancel").addEventListener("click", () => {
        closePopup(false);
    });
    document.getElementById("confirm").addEventListener("click", event => {
        if(validate()) {
            event.preventDefault();
            closePopup(true);
        }     
    });
    return {
        openPopup,
        validate
        };
})();

const sortBooks = (() => {
    const sortButton = document.getElementById("sortButton");
    const sortDropdown = document.getElementById("sortDropdown");
    sortButton.addEventListener("click", () => {
        sortDropdown.classList.toggle("hidden");
    });
    let sortMethod = "recent";
    sortDropdown.addEventListener("click", event => {
        if(event.target.className === "button") {
            sortMethod = event.target.innerText;
            sort(sortMethod);
        }
    });
    const sort = () => {
        for(book of Book.bookList) {
            document.getElementById("bookContainer").removeChild(book.container);
        }
        console.log(sortMethod);
        let sortFunc;
        switch(sortMethod) {
            case "title":
            case "genre":
                sortFunc = (a, b) => {
                    if(a[sortMethod] < b[sortMethod]) {
                        return -1;
                    } else {
                        return 1;
                    }
                };
            break;
            case "author":
                sortFunc = (a, b) => {
                    if(a.author.substring(a.author.lastIndexOf(" ") + 1) <
                    b.author.substring(b.author.lastIndexOf(" ") + 1)) {
                        return -1;
                    } else {
                        return 1;
                    }
                };
            break;
            case "pages":
            case "rating":
                sortFunc = (a, b) => {
                    return b[sortMethod] - a[sortMethod];
                };
            break;
            case "recent":
                sortFunc = (a, b) => {
                    return b.index - a.index;
                };
            break;
        }
        sortMethod === "reverse" ? Book.bookList.reverse() : Book.bookList.sort(sortFunc);
        for(book of Book.bookList) {
            document.getElementById("bookContainer").appendChild(book.container);
        };
    }
    return {
        sort
    };
})();

new Book("Atomic Habits", "James Clear", 400, "Self-help", 4);
new Book("1984", "George Orwell", 299, "Non-fiction", 3);
new Book("Deep Work", "Cal Newport", 300, "Self-help", 4);
for(book of Book.bookList) {
    document.getElementById("bookContainer").appendChild(book.container);
}