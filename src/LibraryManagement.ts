import type {
  IBook,
  ILibrary,
  ILibraryImplementation,
  ISearchableItem,
  IUser,
} from "./Models.js";
import { Category } from "./Models.js";
import StoreManagement from "./store.js";
import { userExistsInLibrary } from "./UserManagement.js";

class Library implements ILibraryImplementation {
  libraryId: number;
  name: string;
  address: string;
  books: IBook[] = [];

  constructor(library: ILibrary) {
    const { id, name, address } = library;
    this.libraryId = id;
    this.name = name;
    this.address = address;
  }

  addBook(book: IBook): void {
    this.books = [...this.books, book];
  }

  removeBook(isbn: number): void {
    this.books = this.books.filter((book) => book.isbn !== isbn);
  }

  findBookByISBN(isbn: number): IBook | undefined {
    return this.books.find((value) => value.isbn === isbn);
  }

  listAccessibleBooks(): IBook[] {
    return this.books.filter((book) => book.isAvailable);
  }

  updateBook(isbn: number, bookDetails: Partial<IBook>): void {
    this.books = this.books.map((book) =>
      book.isbn === isbn ? { ...book, ...bookDetails } : book
    );
  }

  borrowBook(isbn: number, user: IUser): void {
    if (!userExistsInLibrary(this.libraryId, user.userId)) {
      console.log("You are not a member of this Library");
      return;
    }
    console.log("Congrats! You are a member of this Library");

    const isAvailable = this.findBookByISBN(isbn);
    if (!isAvailable) {
      console.log("Your requested book is not available in this Library");
      return;
    }

    const isAccessible = this.listAccessibleBooks().some(
      (item) => item.isbn === isbn
    );

    if (!isAccessible) {
      console.log("Your requested book is borrowed to someone else!");
      return;
    }

    console.log("You can get this book");
    this.updateBook(isbn, { isAvailable: false });
  }

  borrowedBooks(): void {
    const unAccessibleBooks = this.books.filter(
      (book) => book.isAvailable === false
    );

    if (unAccessibleBooks.length === 0) {
      console.log("All books are accessible");
    } else {
      console.log(unAccessibleBooks);
    }
  }

  libraryUsers() {
    const libUsers = StoreManagement.Instance.libraryUsers[this.libraryId];
    console.log(libUsers);
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

// const MyLibraryInstace = new Library(librariesId.A, "A", "20111");

// MyLibraryInstace.addBook({
//   title: "1984",
//   author: "Orwell",
//   isbn: 10,
//   isAvailable: true,
//   pages: 100,
//   category: Category.Fiction,
// });
// MyLibraryInstace.addBook({
//   title: "The Lord of the Rings",
//   author: "Ronald",
//   isbn: 11,
//   isAvailable: true,
//   pages: 120,
//   category: Category.Fiction,
// });
// MyLibraryInstace.addBook({
//   title: "War and Peace",
//   author: "Leo Tolstoy",
//   isbn: 12,
//   isAvailable: true,
//   pages: 160,
//   category: Category.NonFiction,
// });
// MyLibraryInstace.addBook({
//   title: "Hamlet",
//   author: "Shakespeare",
//   isbn: 13,
//   isAvailable: true,
//   pages: 220,
//   category: Category.Science,
// });

// console.log(MyLibraryInstace.listAvailabeBooks());

// MyLibraryInstace.borrowedBooks();

// MyLibraryInstace.borrowBook(10, { name: "mahdi", userId: 1 });

// MyLibraryInstace.borrowedBooks();

// MyLibraryInstace.borrowBook(10, { name: "reza", userId: 2 });

// MyLibraryInstace.libraryUsers();

export default Library;
