const enum Category {
  Fiction,
  NonFiction,
  Science,
}

interface IBook {
  title: string;
  author: string;
  isbn: number;
  pages?: number;
  category: Category;
}

interface ILibraryImplementation {
  addBook(book: IBook): void;
  removeBook(isbn: number): void;
  findBookByISBN(isbn: number): IBook | undefined;
  isBookAvailable(): IBook[];
}

interface ILibrary {
  id: number;
  name: string;
  address: string;
  books: IBook[];
  borrowedBooks: Record<number, IBook[]>;
}

interface IUser {
  name: string;
  userId: number;
}

type TBookPreview = Pick<IBook, "title" | "author">;

interface ISearchableItem {
  id: number;
  name: string;
}

export { Category };
export type {
  IBook,
  ISearchableItem,
  IUser,
  ILibraryImplementation,
  TBookPreview,
  ILibrary,
};
