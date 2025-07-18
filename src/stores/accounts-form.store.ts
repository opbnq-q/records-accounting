import type { IAccountRecord } from "@/entities/account-record.entity";
import { defineStore } from "pinia";

export interface AccountsFormStoreState {
    records: IAccountRecord[],
    maxId: number
}

export type ValidationState = "fulfilled" | "none" | "rejected"

export const useAccountsFormStore = defineStore('accounts-form', {
    state: (): AccountsFormStoreState => ({
        records: [],
        maxId: 0
    }),
    actions: {
        add(): number {
            const record: IAccountRecord = {
                id: ++this.maxId,
                login: '',
                password: '',
                tags: [],
                type: 'local'
            }
            this.records.push(record)
            return record.id
        }
    }
})