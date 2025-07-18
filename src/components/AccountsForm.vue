<script setup lang="ts">
import { useAccountsFormStore } from '@/stores/accounts-form.store';
import AccountRecord from './AccountRecord.vue';
import Button from './ui/button/Button.vue';
import { LucidePlus } from 'lucide-vue-next';
import Label from './ui/label/Label.vue';
import { onMounted } from 'vue';
import Alert from './ui/alert/Alert.vue';
import AlertTitle from './ui/alert/AlertTitle.vue';
import AlertDescription from './ui/alert/AlertDescription.vue';

const accountsFormStore = useAccountsFormStore()

onMounted(() => {
    accountsFormStore.load()
})
</script>

<template>
    <div class="flex flex-col items-center">
        <section class="w-full max-w-3xl">
            <Alert class="my-4">
            <AlertTitle>Подсказка</AlertTitle>
            <AlertDescription class="flex gap-1">
                Для указания нескольких меток для одной пары логин/пароль используйте разделитель <strong class="text-white">;</strong>
            </AlertDescription>
        </Alert>
            <h1 class="text-xl font-bold my-4 border-b pb-1.5 text-start opacity-90">Учётные записи</h1>
            <div class="flex flex-col gap-4 my-2">
                <div class="grid gap-4" style="grid-template-columns: 1fr 1fr 1fr 1fr 48px;">
                    <Label>Метки</Label>
                    <Label>Тип записи</Label>
                    <Label>Логин</Label>
                    <Label>Пароль</Label>
                    <div class="w-12"></div>
                </div>
                <AccountRecord @remove="() => {
                    accountsFormStore.delete(record.id)
                }" @success-validation="() => {
                    accountsFormStore.saveOrUpdate(record)
                }" @validate-login="(login, callback) => {
                    if (!login || login.length > 100) return callback(false);
                    return callback(true)
                }" @validate-tags="(tags, callback) => {
                    if (tags.length > 50) return callback(false);
                    return callback(true)
                }" @validate-password="(password, callback) => {
                    if (record.type == 'LDAP') {
                        accountsFormStore.records[index].password = null;
                        return callback(true);
                    }
                    if (!password || password.length > 100) return callback(false);
                    return callback(true);
                }" v-for="(record, index) in accountsFormStore.records" v-model="accountsFormStore.records[index]"
                    :key="record.id"></AccountRecord>
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