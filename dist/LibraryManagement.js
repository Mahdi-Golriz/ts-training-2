import StoreManagement from "./store.js";
class Library {
    constructor(libraryId) {
        this.libraryId = libraryId;
    }
    addBook(book) {
        const result = StoreManagement.Instance.addBookToLibrary(this.libraryId, book);
        if (!result) {
            console.log("Failed to add book to library");
        }
        else {
            console.log("Book added to lirary successfully");
        }
    }
    removeBook(isbn) {
        const result = StoreManagement.Instance.removeBookFromLibrary(this.libraryId, isbn);
        if (!result) {
            console.log("Failed to remove the book from the library.");
        }
        else {
            console.log("Book removed from lirary successfully");
        }
    }
    findBookByISBN(isbn) {
        const library = StoreManagement.Instance.getLibrary(this.libraryId);
        if (!library) {
            console.log(`Cannot find specified: ${this.libraryId}`);
            return;
        }
        return library.books.find((item) => item.isbn === isbn);
    }
    isBookAvailable() {
        const library = StoreManagement.Instance.getLibrary(this.libraryId);
        if (!library) {
            console.log(`Cannot find specified: ${this.libraryId}`);
            return [];
        }
        return library.books;
    }
    isBookBorrowed(libraryId, isbn) {
        const borrowedBooksFromLibrary = StoreManagement.Instance.getBorrowedBooksFromLibrary(libraryId);
        if (!borrowedBooksFromLibrary) {
            console.log("Failed to check! change the LibraryId!");
            return true;
        }
        const result = Object.values(borrowedBooksFromLibrary).some((item) => item.some((book) => book.isbn === isbn));
        if (result) {
            console.log("Your requested book was borrowed to someone!");
            return true;
        }
        return false;
    }
    userExistsInLibrary(userId, libraryId) {
        return StoreManagement.Instance.getLibraryUsers[libraryId].some((item) => item === userId);
    }
    borrowedMorethanThree(userId) {
        const allBorrowedBooks = StoreManagement.Instance.getLibraries.map((item) => item.borrowedBooks);
        if (!allBorrowedBooks.length)
            return false;
        const relatedBorrowedBooks = allBorrowedBooks.filter((i) => i[userId]
        // Object.keys(i).some((key) => +key === userId)
        );
        const totalBorrowed = relatedBorrowedBooks.reduce((acc, cur) => acc + cur[userId].length, 0) >=
            3;
        return totalBorrowed;
    }
    borrowBook(isbn, user) {
        if (!this.userExistsInLibrary(this.libraryId, user.userId)) {
            return;
        }
        console.log("Congrats! You are a member of this Library");
        const requestedBook = this.findBookByISBN(isbn);
        if (!requestedBook) {
            console.log("Your requested book is not registered in this Library");
            return;
        }
        console.log("Your requested book is registered in this Library");
        if (this.isBookBorrowed(this.libraryId, isbn)) {
            return;
        }
        console.log("Your requested book is now in the library!");
        if (this.borrowedMorethanThree(user.userId)) {
            console.log("Your have borrowed more than three books!");
            return;
        }
        console.log("You can get this book");
        StoreManagement.Instance.borrowBookToUser(this.libraryId, user.userId, requestedBook);
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
export default Library;
