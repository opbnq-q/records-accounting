import type { Tag } from "./tag.entity";


type CommonRecordData = {
    id: number;
    tags: Tag[]
    login: string
}
export type IAccountRecord = ({
    type: 'local'
    password: string
} | {
    type: 'LDAP'
    password: null
}) & CommonRecordData