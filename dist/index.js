import Library from "./LibraryManagement.js";
import StoreManagement from "./store.js";
import { UserManagement } from "./UserManagement.js";
// Libraries
const tehranLibrary = StoreManagement.Instance.addLibrary({
    id: 1,
    name: "Tehran Library",
    address: "Tehran, Vanakl",
    books: [],
    borrowedBooks: {
    // 1: [
    //   {
    //     isbn: 3,
    //     author: "Y",
    //     category: Category.Fiction,
    //     title: "My Title",
    //     pages: 10,
    //   },
    //   {
    //     isbn: 4,
    //     author: "Y",
    //     category: Category.Fiction,
    //     title: "My Title",
    //     pages: 10,
    //   },
    // ],
    },
});
const mashhadLibrary = StoreManagement.Instance.addLibrary({
    id: 2,
    name: "Mashhad Library",
    address: "Mashhad, Sajjad",
    books: [],
    borrowedBooks: {
    // 1: [
    //   {
    //     isbn: 1,
    //     author: "Y",
    //     category: Category.Fiction,
    //     title: "My Title",
    //     pages: 10,
    //   },
    // ],
    },
});
// create initial Users
const userManager = new UserManagement();
const user_1 = userManager.createUser({
    userId: 1,
    name: "Reza",
});
const user_2 = userManager.createUser({
    userId: 2,
    name: "Mehdi",
});
const user_3 = userManager.createUser({
    userId: 3,
    name: "Majid",
});
// Add users to Library
userManager.addToLibrary(tehranLibrary.id, user_1.userId);
userManager.addToLibrary(tehranLibrary.id, user_2.userId);
userManager.addToLibrary(mashhadLibrary.id, user_3.userId);
// Add book to Library
// StoreManagement.Instance.addBookToLibrary(tehranLibrary.id, {
//   isbn: 2,
//   author: "Y",
//   category: Category.NonFiction,
//   title: "My Title 2",
//   pages: 110,
// });
const library_1 = new Library(tehranLibrary.id);
const library_2 = new Library(mashhadLibrary.id);
library_1.addBook({
    isbn: 1,
    author: "Y",
    category: 0 /* Category.Fiction */,
    title: "My Title",
    pages: 10,
});
library_1.addBook({
    isbn: 3,
    author: "Y",
    category: 0 /* Category.Fiction */,
    title: "My Title",
    pages: 10,
});
library_1.addBook({
    isbn: 4,
    author: "Y",
    category: 0 /* Category.Fiction */,
    title: "My Title",
    pages: 10,
});
library_2.addBook({
    isbn: 2,
    author: "Z",
    category: 1 /* Category.NonFiction */,
    title: "My Title 2",
    pages: 110,
});
// Remove book from library
library_2.removeBook(2);
library_1.borrowBook(1, {
    userId: 1,
    name: "Reza",
});
console.log(StoreManagement.Instance.getBorrowedBooksFromLibrary(tehranLibrary.id));
library_1.borrowBook(3, {
    userId: 1,
    name: "Reza",
});
console.log(StoreManagement.Instance.getBorrowedBooksFromLibrary(tehranLibrary.id));
library_1.borrowBook(4, {
    userId: 1,
    name: "Reza",
});
console.log(StoreManagement.Instance.getBorrowedBooksFromLibrary(tehranLibrary.id));
userManager.addToLibrary(mashhadLibrary.id, user_1.userId);
library_2.borrowBook(2, {
    userId: 1,
    name: "Reza",
});
