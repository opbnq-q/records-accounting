import { useIDB } from "@/composables/idb.composable";
import type { IAccountRecord } from "@/entities/account-record.entity";
import { defineStore } from "pinia";

export interface AccountsFormStoreState {
    records: IAccountRecord[],
    maxId: number
}

const idb = useIDB()

export type ValidationState = "fulfilled" | "none" | "rejected"

export const useAccountsFormStore = defineStore('accounts-form', {
    state(): AccountsFormStoreState {
        return ({
            records: [],
            maxId: 0
        })
    },
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
        },
        async saveOrUpdate(record: IAccountRecord) {
            return await idb.upsert(record.id, record)
        },
        async delete(recordId: number) {
            this.records = this.records.filter(el => el.id != recordId)
            return await idb.delete(recordId)
        },
        async load() {
            const records = await idb.getAll()
            this.records = records
        }
    }
})