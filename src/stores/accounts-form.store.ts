import type { AccountRecord } from "@/entities/account-record.entity";
import { defineStore } from "pinia";

export interface AccountsFormStoreState {
    records: AccountRecord[]
}

export const useAccountsFormStore = defineStore('accounts-form', {
    state: (): AccountsFormStoreState => ({
        records: []
    })
})