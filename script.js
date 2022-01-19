function Book(title, author, pages, readBook) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBook = readBook;
    this.info = function() {
        let answer;
        if(this.readBook) {
            answer = "has been read";
        } else {
            answer = "not read yet";
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${answer}`;
    }
}

const atomic_habits = new Book("Atomic Habits", "James Clear", 400, true);
console.log(atomic_habits.info());

const bookContainer = document.getElementById("book-container");

const atomic_habitsDiv = document.createElement("div");
atomic_habitsDiv.classList.add("book");
atomic_habitsDiv.innerHTML = "atomic habits";
bookContainer.appendChild(atomic_habitsDiv);