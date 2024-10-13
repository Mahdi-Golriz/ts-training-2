import type { ILibrary, IUser } from "./Models";

// Encapsulation
class StoreManagement {
  private _users: IUser[] = [];
  private _libraries: ILibrary[] = [];
  private _libraryUsers: Record<number, number[]> = {};

  private static _instance: StoreManagement;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get users() {
    return this._users;
  }

  public get libraries() {
    return this._libraries;
  }

  public get libraryUsers() {
    return this._libraryUsers;
  }

  addUser(user: IUser) {
    this._users.push(user);
  }

  addLibrary(library: ILibrary) {
    this._libraries.push(library);
  }

  addUserToLibrary(libraryId: number, userId: number) {
    this._libraryUsers[libraryId].push(userId);
  }

  // implement remove from library
}

StoreManagement.Instance;

export default StoreManagement;
