// Encapsulation
class StoreManagement {
    constructor() {
        this._users = [];
        this._libraries = [];
        this._libraryUsers = {};
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    get getUsers() {
        return this._users;
    }
    get getLibraries() {
        return this._libraries;
    }
    get getLibraryUsers() {
        return this._libraryUsers;
    }
    addUser(user) {
        this._users.push(user);
    }
    addLibrary(library) {
        this._libraries.push(library);
        return library;
    }
    getLibrary(libraryId) {
        return this._libraries.find((item) => item.id === libraryId);
    }
    getBorrowedBooksFromLibrary(libraryId) {
        const libraryIndex = this._libraries.findIndex((item) => item.id === libraryId);
        if (libraryIndex < 0)
            return false;
        return this._libraries[libraryIndex].borrowedBooks;
    }
    addUserToLibrary(libraryId, userId) {
        const libraryRow = this._libraryUsers[libraryId];
        if (!libraryRow)
            return (this._libraryUsers[libraryId] = [userId]);
        libraryRow.push(userId);
    }
    addBookToLibrary(libraryId, book) {
        const libraryIndex = this._libraries.findIndex((item) => item.id === libraryId);
        if (libraryIndex < 0)
            return false;
        this._libraries[libraryIndex].books.push(book);
        return true;
    }
    removeBookFromLibrary(libraryId, isbn) {
        const libraryIndex = this._libraries.findIndex((item) => item.id === libraryId);
        if (libraryIndex < 0)
            return false;
        this._libraries[libraryIndex].books.filter((item) => item.isbn !== isbn);
        return true;
    }
    borrowBookToUser(libraryId, userId, book) {
        const libraryIndex = this._libraries.findIndex((item) => item.id === libraryId);
        if (libraryIndex < 0)
            return false;
        let borrowedBooksToUser = this._libraries[libraryIndex].borrowedBooks[userId];
        if (!borrowedBooksToUser)
            return (this._libraries[libraryIndex].borrowedBooks[userId] = [book]);
        return borrowedBooksToUser.push(book);
    }
}
StoreManagement.Instance;
export default StoreManagement;
