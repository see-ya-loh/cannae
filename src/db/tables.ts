import { createUsersTable } from "./schema/users";
import { createUserCharactersTable } from "./schema/user_characters";

export function initDb(): void {
    createUsersTable();
    createUserCharactersTable();
    console.log("[db] schema initialized");
}
