<script setup lang="ts">
import { useAccountsFormStore } from '@/stores/accounts-form.store';
import AccountRecord from './AccountRecord.vue';

const accountsFormStore = useAccountsFormStore()


</script>

<template>
    <div class="flex flex-col items-center w-full">
        <section class="w-full max-w-3xl">
            <h1 class="text-2xl my-4 text-start">Учётные записи</h1>
        </section>
    </div>
</template>