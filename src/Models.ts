const enum Category {
  Fiction,
  NonFiction,
  Science,
}

interface Book {
  title: string;
  author: string;
  isbn: number;
  isAvailable: boolean;
  pages?: number;
  category: Category;
}

interface Library {
  addBook(book: Book): void;
  removeBook(isbn: number): void;
  findBookByISBN(isbn: number): Book | undefined;
  listAvailabeBooks(): Book[];
}

interface User {
  name: string;
  userId: number;
}

type BookPreview = Pick<Book, "title" | "author">;

interface SearchableItem {
  id: number;
  name: string;
}
