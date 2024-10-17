import type { IBook, ILibrary, IUser } from "./Models.js";

// Encapsulation
class StoreManagement {
  private _users: IUser[] = [];
  private _libraries: ILibrary[] = [];
  private _libraryUsers: Record<number, number[]> = {};

  private static _instance: StoreManagement;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get getUsers() {
    return this._users;
  }

  public get getLibraries() {
    return this._libraries;
  }

  public get getLibraryUsers() {
    return this._libraryUsers;
  }

  addUser(user: IUser) {
    this._users.push(user);
  }

  addLibrary(library: ILibrary) {
    this._libraries.push(library);
    return library;
  }

  getLibrary(libraryId: number) {
    return this._libraries.find((item) => item.id === libraryId);
  }

  getBorrowedBooksFromLibrary(libraryId: number) {
    const libraryIndex = this._libraries.findIndex(
      (item) => item.id === libraryId
    );
    if (libraryIndex < 0) return false;

    return this._libraries[libraryIndex].borrowedBooks;
  }

  addUserToLibrary(libraryId: number, userId: number) {
    const libraryRow = this._libraryUsers[libraryId];

    if (!libraryRow) return (this._libraryUsers[libraryId] = [userId]);

    libraryRow.push(userId);
  }

  addBookToLibrary(libraryId: number, book: IBook) {
    const libraryIndex = this._libraries.findIndex(
      (item) => item.id === libraryId
    );
    if (libraryIndex < 0) return false;

    this._libraries[libraryIndex].books.push(book);
    return true;
  }

  removeBookFromLibrary(libraryId: number, isbn: number) {
    const libraryIndex = this._libraries.findIndex(
      (item) => item.id === libraryId
    );

    if (libraryIndex < 0) return false;

    this._libraries[libraryIndex].books.filter((item) => item.isbn !== isbn);
    return true;
  }

  borrowBookToUser(libraryId: number, userId: number, book: IBook) {
    const libraryIndex = this._libraries.findIndex(
      (item) => item.id === libraryId
    );
    if (libraryIndex < 0) return false;

    let borrowedBooksToUser =
      this._libraries[libraryIndex].borrowedBooks[userId];

    if (!borrowedBooksToUser)
      return (this._libraries[libraryIndex].borrowedBooks[userId] = [book]);

    return borrowedBooksToUser.push(book);
  }
}

StoreManagement.Instance;

export default StoreManagement;
