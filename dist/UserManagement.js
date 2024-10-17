import StoreManagement from "./store.js";
export class UserManagement {
    createUser(user) {
        StoreManagement.Instance.addUser(user);
        return user;
    }
    getUser(userId) {
        return StoreManagement.Instance.getUsers.find((item) => item.userId === userId);
    }
    addToLibrary(libraryId, userId) {
        StoreManagement.Instance.addUserToLibrary(libraryId, userId);
        console.log("new user added to library");
    }
}
