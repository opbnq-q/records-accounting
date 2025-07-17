import type { Tag } from "./tag.entity";

export interface AccountRecord {
    id: number;
    tags: Tag[]
    type: "local" | "LDAP"
    login: string
    password: null | string
}