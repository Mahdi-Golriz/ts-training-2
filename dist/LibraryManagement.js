import { LibraryUsers } from "./UserManagement.js";
class MyLibrary {
    constructor(id, name, address) {
        this.books = [];
        this.libraryId = id;
        this.name = name;
        this.address = address;
    }
    addBook(book) {
        this.books = [...this.books, book];
    }
    removeBook(isbn) {
        this.books = this.books.filter((book) => book.isbn !== isbn);
    }
    findBookByISBN(isbn) {
        return this.books.find((value) => value.isbn === isbn);
    }
    listAvailabeBooks() {
        return this.books.filter((book) => book.isAvailable);
    }
    updateBook(isbn, bookDetails) {
        this.books = this.books.map((book) => book.isbn === isbn ? Object.assign(Object.assign({}, book), bookDetails) : book);
    }
    borrowBook(isbn, user) {
        if (LibraryUsers[this.libraryId].some((item) => item.userId === user.userId)) {
            console.log("You are a member of this Library");
            const isAvailable = this.findBookByISBN(isbn);
            const isAccessible = this.listAvailabeBooks().some((item) => item.isbn === isbn);
            if (!isAvailable) {
                console.log("Your requested book is not available in our Library");
            }
            else if (!isAccessible) {
                console.log("Your requested book is borrowed to someone else!");
            }
            else {
                console.log("You can get this book");
                this.updateBook(isbn, { isAvailable: false });
            }
        }
        else {
            console.log("You are not a member of this Library");
        }
    }
    borrowedBooks() {
        const unAccessibleBooks = this.books.filter((book) => book.isAvailable === false);
        if (unAccessibleBooks.length === 0) {
            console.log("All books are accessible");
        }
        else {
            console.log(unAccessibleBooks);
        }
    }
    libraryUsers() {
        const libUsers = LibraryUsers[this.libraryId];
        console.log(libUsers);
    }
    logItem(item) {
        console.log(item);
    }
    searchItemById(items, id) {
        return items.find((item) => item.id === id);
    }
    sortCategory(book) {
        if (book.category === undefined) {
            return undefined;
        }
        return book.category;
    }
}
const MyLibraryInstace = new MyLibrary(0 /* librariesId.A */, "A", "20111");
MyLibraryInstace.addBook({
    title: "1984",
    author: "Orwell",
    isbn: 10,
    isAvailable: true,
    pages: 100,
    category: 0 /* Category.Fiction */,
});
MyLibraryInstace.addBook({
    title: "The Lord of the Rings",
    author: "Ronald",
    isbn: 11,
    isAvailable: true,
    pages: 120,
    category: 0 /* Category.Fiction */,
});
MyLibraryInstace.addBook({
    title: "War and Peace",
    author: "Leo Tolstoy",
    isbn: 12,
    isAvailable: true,
    pages: 160,
    category: 1 /* Category.NonFiction */,
});
MyLibraryInstace.addBook({
    title: "Hamlet",
    author: "Shakespeare",
    isbn: 13,
    isAvailable: true,
    pages: 220,
    category: 2 /* Category.Science */,
});
console.log(MyLibraryInstace.listAvailabeBooks());
MyLibraryInstace.borrowedBooks();
MyLibraryInstace.borrowBook(10, { name: "mahdi", userId: 1 });
MyLibraryInstace.borrowedBooks();
MyLibraryInstace.borrowBook(10, { name: "reza", userId: 2 });
MyLibraryInstace.libraryUsers();
