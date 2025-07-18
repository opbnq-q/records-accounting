<script setup lang="ts">
import { computed, effect, ref, watch } from 'vue';
import Input from './ui/input/Input.vue';
import Select from './ui/select/Select.vue';
import SelectContent from './ui/select/SelectContent.vue';
import SelectGroup from './ui/select/SelectGroup.vue';
import SelectItem from './ui/select/SelectItem.vue';
import SelectLabel from './ui/select/SelectLabel.vue';
import SelectTrigger from './ui/select/SelectTrigger.vue';
import SelectValue from './ui/select/SelectValue.vue';
import type { IAccountRecord } from '@/entities/account-record.entity';
import type { ValidationState } from '@/stores/accounts-form.store';
import Button from './ui/button/Button.vue';
import { Trash } from 'lucide-vue-next';

const model = defineModel<IAccountRecord>({ required: true })
const emits = defineEmits<{
    (e: 'validate-tags', tags: string, callback: (result: boolean) => void): void
    (e: 'validate-login', login: string, callback: (result: boolean) => void): void
    (e: 'validate-password', password: string, callback: (result: boolean) => void): void
    (e: 'success-validation'): Promise<void>
    (e: 'remove'): void
}>()

const tagsValue = model.value.tags.map(el => el.text).join('; ')

const validationOptions = ref<{
    tags: ValidationState
    login: ValidationState
    password: ValidationState
}>({
    tags: 'none',
    login: 'none',
    password: 'none'
})

watch(() => validationOptions.value, async (newVal) => {
    console.log(newVal)
    for (const value of Object.values(newVal)) if (value != 'fulfilled') return;
    await emits('success-validation')
}, { deep: true })
</script>

<template>
    <form class="flex gap-4 w-full" @submit.prevent="emits('remove')">
        <div class="flex gap-4 w-full">
            <Input placeholder="XXX; YYYYYY; A"
                :class="{ 'border-red-400 border': validationOptions.tags == 'rejected' }" :default-value="tagsValue"
                @blur="(e: Event) => {
                    const target = e.target as HTMLInputElement
                    model.tags = target.value.split(';').map(el => ({ text: el }))
                    emits('validate-tags', target.value, result => {
                        validationOptions.tags = result ? 'fulfilled' : 'rejected'
                    })
                }" />
            <Select :default-value="'local'" v-model="model.type" @update:modelValue="() => {
                if (model.type == 'LDAP') {
                    validationOptions.password = 'fulfilled'
                    model.password = null
                } else {
                    emits('validate-password', model.password, result => {
                        validationOptions.password = result ? 'fulfilled' : 'none'
                    })
                }
            }">
                <SelectTrigger class="w-full">
                    <SelectValue placeholder="Выберите тип записи" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Типы записи</SelectLabel>
                        <SelectItem value="local">Локальная</SelectItem>
                        <SelectItem value="LDAP">LDAP</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div class="flex gap-4 w-full">
            <transition name="fade-input" mode="out-in">
                <Input :class="{ 'border-red-400 border': validationOptions.login == 'rejected' }" key="login"
                    placeholder="Логин" class="w-full" v-model="model.login" @blur="() => {
                        emits('validate-login', model.login, result => {
                            validationOptions.login = result ? 'fulfilled' : 'rejected'
                        })
                    }" />
            </transition>
            <transition name="fade-input" mode="out-in">
                <Input v-if="model.type == 'local'"
                    :class="{ 'border-red-400 border': validationOptions.password == 'rejected' }"
                    v-model="model.password" key="password" placeholder="Пароль" type="password" @blur="() => {
                        emits('validate-password', model.password as string, result => {
                            validationOptions.password = result ? 'fulfilled' : 'rejected'
                        })
                    }" />
            </transition>
            
        </div>
        <Button class="w-12" variant="secondary">
            <Trash></Trash>
        </Button>
    </form>
</template>
<style scoped>
.fade-input-enter-active,
.fade-input-leave-active {
    transition: opacity 0.3s, transform 0.3s, width 0.3s;
}

.fade-input-enter-from,
.fade-input-leave-to {
    opacity: 0;
    transform: translateY(10px);
    width: 0;
}

.fade-input-enter-to,
.fade-input-leave-from {
    opacity: 1;
    transform: translateY(0);
    width: 100%;
}
</style>