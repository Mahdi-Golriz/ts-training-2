const users: User[] = [
  { name: "mahdi", userId: 1 },
  { name: "reza", userId: 2 },
  { name: "maryam", userId: 5 },
  { name: "ahmad", userId: 3 },
  { name: "sahar", userId: 6 },
  { name: "hadi", userId: 4 },
];

export const enum librariesId {
  A,
  B,
  C,
  D,
}

export const LibraryUsers: Record<librariesId, User[]> = {
  [librariesId.A]: [users[0], users[1]],
  [librariesId.B]: [users[2], users[3]],
  [librariesId.C]: [users[4], users[5]],
  [librariesId.D]: [],
};

// type LibrariesId = keyof typeof LibraryUsers;

function userManagement(libraryId: keyof typeof LibraryUsers, newUser: User) {
  const userExists = LibraryUsers[libraryId].some(
    (user) => user.userId === newUser.userId
  );

  if (!userExists) {
    LibraryUsers[libraryId].push(newUser);
  }
}

userManagement(librariesId.A, { name: "ali", userId: 8 });
userManagement(librariesId.B, { name: "ali", userId: 9 });
