const users = [
    { name: "mahdi", userId: 1 },
    { name: "reza", userId: 2 },
    { name: "maryam", userId: 5 },
    { name: "ahmad", userId: 3 },
    { name: "sahar", userId: 6 },
    { name: "hadi", userId: 4 },
];
export const LibraryUsers = {
    [0 /* librariesId.A */]: [users[0], users[1]],
    [1 /* librariesId.B */]: [users[2], users[3]],
    [2 /* librariesId.C */]: [users[4], users[5]],
    [3 /* librariesId.D */]: [],
};
// type LibrariesId = keyof typeof LibraryUsers;
function userManagement(libraryId, newUser) {
    const userExists = LibraryUsers[libraryId].some((user) => user.userId === newUser.userId);
    if (!userExists) {
        LibraryUsers[libraryId].push(newUser);
    }
}
userManagement(0 /* librariesId.A */, { name: "ali", userId: 8 });
userManagement(1 /* librariesId.B */, { name: "ali", userId: 9 });
