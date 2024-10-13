import type { IUser } from "./Models";
import StoreManagement from "./store";

export function userExistsInLibrary(userId: number, libraryId: number) {
  return StoreManagement.Instance.libraryUsers[libraryId].some(
    (item) => item === userId
  );
}

// Memory Store

// export const LibraryUsers: Record<librariesId, IUser[]> = {
//   [librariesId.A]: [],
//   [librariesId.B]: [],
//   [librariesId.C]: [],
//   [librariesId.D]: [],
// };

// type LibrariesId = keyof typeof LibraryUsers;

// // function userManagement(libraryId: keyof typeof LibraryUsers, newUser: IUser) {
// //   const userExists = LibraryUsers[libraryId].some(
// //     (user) => user.userId === newUser.userId
// //   );

// //   if (!userExists) {
// //     LibraryUsers[libraryId].push(newUser);
// //   }
// // }

// // userManagement(librariesId.A, { name: "ali", userId: 8 });
// // userManagement(librariesId.B, { name: "ali", userId: 9 });

// class userManagement {}
