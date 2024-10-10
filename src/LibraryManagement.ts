import { LibraryUsers, librariesId } from "./UserManagement.js";

class MyLibrary implements Library {
  libraryId: librariesId;
  name: string;
  address: string;
  books: Book[] = [];

  constructor(id: librariesId, name: string, address: string) {
    this.libraryId = id;
    this.name = name;
    this.address = address;
  }

  addBook(book: Book): void {
    this.books = [...this.books, book];
  }

  removeBook(isbn: number): void {
    this.books = this.books.filter((book) => book.isbn !== isbn);
  }

  findBookByISBN(isbn: number): Book | undefined {
    return this.books.find((value) => value.isbn === isbn);
  }

  listAvailabeBooks(): Book[] {
    return this.books.filter((book) => book.isAvailable);
  }

  updateBook(isbn: number, bookDetails: Partial<Book>): void {
    this.books = this.books.map((book) =>
      book.isbn === isbn ? { ...book, ...bookDetails } : book
    );
  }

  borrowBook(isbn: number, user: User): void {
    if (
      LibraryUsers[this.libraryId].some((item) => item.userId === user.userId)
    ) {
      console.log("You are a member of this Library");
      const isAvailable = this.findBookByISBN(isbn);
      const isAccessible = this.listAvailabeBooks().some(
        (item) => item.isbn === isbn
      );
      if (!isAvailable) {
        console.log("Your requested book is not available in our Library");
      } else if (!isAccessible) {
        console.log("Your requested book is borrowed to someone else!");
      } else {
        console.log("You can get this book");
        this.updateBook(isbn, { isAvailable: false });
      }
    } else {
      console.log("You are not a member of this Library");
    }
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
    const libUsers = LibraryUsers[this.libraryId];
    console.log(libUsers);
  }

  logItem<T>(item: T): void {
    console.log(item);
  }

  searchItemById<T extends SearchableItem>(
    items: T[],
    id: number
  ): T | undefined {
    return items.find((item) => item.id === id);
  }

  sortCategory(book: Book): Category | undefined {
    if (book.category === undefined) {
      return undefined;
    }
    return book.category;
  }
}

const MyLibraryInstace = new MyLibrary(librariesId.A, "A", "20111");

MyLibraryInstace.addBook({
  title: "1984",
  author: "Orwell",
  isbn: 10,
  isAvailable: true,
  pages: 100,
  category: Category.Fiction,
});
MyLibraryInstace.addBook({
  title: "The Lord of the Rings",
  author: "Ronald",
  isbn: 11,
  isAvailable: true,
  pages: 120,
  category: Category.Fiction,
});
MyLibraryInstace.addBook({
  title: "War and Peace",
  author: "Leo Tolstoy",
  isbn: 12,
  isAvailable: true,
  pages: 160,
  category: Category.NonFiction,
});
MyLibraryInstace.addBook({
  title: "Hamlet",
  author: "Shakespeare",
  isbn: 13,
  isAvailable: true,
  pages: 220,
  category: Category.Science,
});

console.log(MyLibraryInstace.listAvailabeBooks());

MyLibraryInstace.borrowedBooks();

MyLibraryInstace.borrowBook(10, { name: "mahdi", userId: 1 });

MyLibraryInstace.borrowedBooks();

MyLibraryInstace.borrowBook(10, { name: "reza", userId: 2 });

MyLibraryInstace.libraryUsers();
