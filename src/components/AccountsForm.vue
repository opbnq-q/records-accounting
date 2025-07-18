<script setup lang="ts">
import { useAccountsFormStore } from '@/stores/accounts-form.store';
import AccountRecord from './AccountRecord.vue';
import Button from './ui/button/Button.vue';
import { LucidePlus } from 'lucide-vue-next';
import Label from './ui/label/Label.vue';
import { onMounted } from 'vue';

const accountsFormStore = useAccountsFormStore()

onMounted(() => {
    accountsFormStore.load()
})

function handleRemove(record: any) {
    accountsFormStore.delete(record.id)
}

function handleSuccessValidation(record: any) {
    accountsFormStore.saveOrUpdate(record)
}

function handleValidateLogin(login: string, callback: (result: boolean) => void) {
    if (!login || login.length > 100) return callback(false)
    return callback(true)
}

function handleValidateTags(tags: string, callback: (result: boolean) => void) {
    if (tags.length > 50) return callback(false)
    return callback(true)
}

function handleValidatePassword(password: string, callback: (result: boolean) => void, record: any, index: number) {
    if (record.type == 'LDAP') {
        accountsFormStore.records[index].password = null
        return callback(true)
    }
    if (!password || password.length > 100) return callback(false)
    return callback(true)
}
</script>

<template>
    <div class="flex flex-col items-center">
        <section class="w-full max-w-3xl">
            <h1 class="text-xl font-bold my-4 border-b pb-1.5 text-start opacity-90">Учётные записи</h1>
            <div class="flex flex-col gap-4 my-2">
                <div class="grid gap-4" style="grid-template-columns: 1fr 1fr 1fr 1fr 48px;">
                    <Label>Метки</Label>
                    <Label>Тип записи</Label>
                    <Label>Логин</Label>
                    <Label>Пароль</Label>
                    <div class="w-12"></div>
                </div>
                <AccountRecord 
                    @remove="() => handleRemove(record)"
                    @success-validation="() => handleSuccessValidation(record)"
                    @validate-login="(login, callback) => handleValidateLogin(login, callback)"
                    @validate-tags="(tags, callback) => handleValidateTags(tags, callback)"
                    @validate-password="(password, callback) => handleValidatePassword(password, callback, record, index)"
                    v-for="(record, index) in accountsFormStore.records" 
                    v-model="accountsFormStore.records[index]"
                    :key="record.id"
                ></AccountRecord>
                <h1 class="text-center" v-if="!accountsFormStore.records.length">
                    Нет данных
                </h1>
            </div>
        </section>
    </div>
    <Button @click="accountsFormStore.add" class="fixed bottom-4 right-4">
        <LucidePlus></LucidePlus>
    </Button>
</template>