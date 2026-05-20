import { createUsersTable } from "./schema/users";
import { createUserCharactersTable } from "./schema/user_characters";
import { createUserMissionsTable } from "./schema/user_missions";
import { createUserGearsTable } from "./schema/user_gears";
import { createUserItemsTable } from "./schema/user_items";
import { createUserStoryClearsTable } from "./schema/user_story_clears";
import { createUserCharacterSlotDataTable } from "./schema/user_character_slot_data";

export function initDb(): void {
    createUsersTable();
    createUserCharactersTable();
    createUserMissionsTable();
    createUserGearsTable();
    createUserItemsTable();
    createUserStoryClearsTable();
    createUserCharacterSlotDataTable();
    console.log("[db] schema initialized");
}
