import type {
  IBook,
  ILibraryImplementation,
  ISearchableItem,
  IUser,
} from "./Models.js";
import { Category } from "./Models.js";
import StoreManagement from "./store.js";

class Library implements ILibraryImplementation {
  libraryId: number;

  constructor(libraryId: number) {
    this.libraryId = libraryId;
  }

  addBook(book: IBook): void {
    const result = StoreManagement.Instance.addBookToLibrary(
      this.libraryId,
      book
    );
    if (!result) {
      console.log("Failed to add book to library");
    } else {
      console.log("Book added to lirary successfully");
    }
  }

  removeBook(isbn: number): void {
    const result = StoreManagement.Instance.removeBookFromLibrary(
      this.libraryId,
      isbn
    );
    if (!result) {
      console.log("Failed to remove the book from the library.");
    } else {
      console.log("Book removed from lirary successfully");
    }
  }

  findBookByISBN(isbn: number): IBook | undefined {
    const library = StoreManagement.Instance.getLibrary(this.libraryId);
    if (!library) {
      console.log(`Cannot find specified: ${this.libraryId}`);
      return;
    }

    return library.books.find((item) => item.isbn === isbn);
  }

  isBookAvailable(): IBook[] {
    const library = StoreManagement.Instance.getLibrary(this.libraryId);

    if (!library) {
      console.log(`Cannot find specified: ${this.libraryId}`);
      return [];
    }

    return library.books;
  }

  isBookBorrowed(libraryId: number, isbn: number): boolean {
    const borrowedBooksFromLibrary =
      StoreManagement.Instance.getBorrowedBooksFromLibrary(libraryId);

    if (!borrowedBooksFromLibrary) {
      console.log("Failed to check! change the LibraryId!");
      return true;
    }

    const result = Object.values(borrowedBooksFromLibrary).some((item) =>
      item.some((book) => book.isbn === isbn)
    );

    if (result) {
      console.log("Your requested book was borrowed to someone!");
      return true;
    }

    return false;
  }

  userExistsInLibrary(userId: number, libraryId: number) {
    return StoreManagement.Instance.getLibraryUsers[libraryId].some(
      (item) => item === userId
    );
  }

  borrowedMorethanThree(userId: number): boolean {
    const allBorrowedBooks = StoreManagement.Instance.getLibraries.map(
      (item) => item.borrowedBooks
    );

    if (!allBorrowedBooks.length) return false;

    const relatedBorrowedBooks = allBorrowedBooks.filter(
      (i) => i[userId]
      // Object.keys(i).some((key) => +key === userId)
    );

    const totalBorrowed =
      relatedBorrowedBooks.reduce((acc, cur) => acc + cur[userId].length, 0) >=
      3;
    return totalBorrowed;
  }

  borrowBook(isbn: number, user: IUser): void {
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

    StoreManagement.Instance.borrowBookToUser(
      this.libraryId,
      user.userId,
      requestedBook
    );
  }

  logItem<T>(item: T): void {
    console.log(item);
  }

  searchItemById<T extends ISearchableItem>(
    items: T[],
    id: number
  ): T | undefined {
    return items.find((item) => item.id === id);
  }

  sortCategory(book: IBook): Category | undefined {
    if (book.category === undefined) {
      return undefined;
    }
    return book.category;
  }
}

export default Library;
