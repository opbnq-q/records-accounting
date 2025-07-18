<script setup lang="ts">
import { useAccountsFormStore } from '@/stores/accounts-form.store';
import AccountRecord from './AccountRecord.vue';
import Button from './ui/button/Button.vue';
import { LucidePlus } from 'lucide-vue-next';
import Label from './ui/label/Label.vue';
import { ref } from 'vue';
import type { IAccountRecord } from '@/entities/account-record.entity';

const accountsFormStore = useAccountsFormStore()

const record = ref<IAccountRecord>({
    id: 1,
    login: '',
    password: '',
    tags: [],
    type: 'LDAP'
})

</script>

<template>
    <div class="flex flex-col items-center">
        <section class="w-full max-w-3xl">
            <h1 class="text-xl font-bold my-4 border-b pb-1.5 text-start opacity-90">Учётные записи</h1>
            <div class="flex flex-col gap-4 my-2">
                <div class="grid grid-cols-4 gap-4">
                    <Label>Метки</Label>
                    <Label>Тип записи</Label>
                    <Label>Логин</Label>
                    <Label>Пароль</Label>
                </div>
                <AccountRecord v-model="record"></AccountRecord>
                <AccountRecord v-model="record"></AccountRecord>
            </div>
        </section>
    </div>
    <Button class="fixed bottom-4 right-4">
        <LucidePlus></LucidePlus>
    </Button>
</template>