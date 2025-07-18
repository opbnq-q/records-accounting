import type { IAccountRecord } from "@/entities/account-record.entity";
import { defineStore } from "pinia";

export interface AccountsFormStoreState {
    records: IAccountRecord[]
}

export const useAccountsFormStore = defineStore('accounts-form', {
    state: (): AccountsFormStoreState => ({
        records: []
    })
})