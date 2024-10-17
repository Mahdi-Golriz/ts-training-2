import type { IUser } from "./Models.js";
import StoreManagement from "./store.js";

export class UserManagement {
  createUser(user: IUser) {
    StoreManagement.Instance.addUser(user);
    return user;
  }

  getUser(userId: number) {
    return StoreManagement.Instance.getUsers.find(
      (item) => item.userId === userId
    );
  }

  addToLibrary(libraryId: number, userId: number) {
    StoreManagement.Instance.addUserToLibrary(libraryId, userId);
    console.log("new user added to library");
  }
}
