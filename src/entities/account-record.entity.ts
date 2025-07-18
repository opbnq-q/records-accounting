import type { Tag } from "./tag.entity";

export interface IAccountRecord {
    id: number;
    tags: Tag[]
    type: "local" | "LDAP"
    login: string
    password: null | string
}