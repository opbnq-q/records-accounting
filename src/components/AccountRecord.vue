
<script setup lang="ts">
import { ref, watch } from 'vue';
import Input from './ui/input/Input.vue';
import Select from './ui/select/Select.vue';
import SelectContent from './ui/select/SelectContent.vue';
import SelectGroup from './ui/select/SelectGroup.vue';
import SelectItem from './ui/select/SelectItem.vue';
import SelectLabel from './ui/select/SelectLabel.vue';
import SelectTrigger from './ui/select/SelectTrigger.vue';
import SelectValue from './ui/select/SelectValue.vue';
import type { IAccountRecord } from '@/entities/account-record.entity';
import Button from './ui/button/Button.vue';
import { Trash } from 'lucide-vue-next';
import { Validation, type ValidationEmits, type ValidationOptions } from '@/composables/validation.composable';

const model = defineModel<IAccountRecord>({ required: true })
const emits = defineEmits<{
    (e: 'remove'): void
} & ValidationEmits>()

const tagsValue = model.value.tags.map(el => el.text).join(';')

const validationOptions = ref<ValidationOptions>({
    tags: 'none',
    login: 'none',
    password: 'none'
})

const validation = new Validation(emits, validationOptions)

validation.validateLogin(model.value.login, true)
validation.validatePassword(model.value.password ?? 'always valid', true)
validation.validateTags(model.value.tags.join(';'), true)

watch([model, validationOptions], () => {
    validation.checkAllValidAndEmit()
}, { deep: true })

function handleTagsBlur(e: Event) {
    const target = e.target as HTMLInputElement
    model.value.tags = target.value.split(';').map(el => ({ text: el }))
    emits('validate-tags', target.value, result => {
        validationOptions.value.tags = result ? 'fulfilled' : 'rejected'
    })
}

function handleTagsInput(e: Event) {
    const target = e.target as HTMLInputElement
    model.value.tags = target.value.split(';').map(el => ({ text: el }))
}

function handleTypeUpdate() {
    if (model.value.type == 'LDAP') {
        validationOptions.value.password = 'fulfilled'
        model.value.password = null
    } else {
        emits('validate-password', model.value.password, result => {
            validationOptions.value.password = result ? 'fulfilled' : 'none'
        })
    }
}

function handleLoginBlur() {
    emits('validate-login', model.value.login, result => {
        validationOptions.value.login = result ? 'fulfilled' : 'rejected'
    })
}

function handlePasswordBlur() {
    emits('validate-password', model.value.password as string, result => {
        validationOptions.value.password = result ? 'fulfilled' : 'rejected'
    })
}
</script>

<template>
    <form class="flex gap-4 w-full" @submit.prevent="emits('remove')">
        <div class="flex gap-4 w-full">
            <Input placeholder="XXX; YYYYYY; A"
                :class="{ 'border-red-400 border': validationOptions.tags == 'rejected' }" :default-value="tagsValue"
                @blur="handleTagsBlur" @input="handleTagsInput" />
            <Select :default-value="'local'" v-model="model.type" @update:modelValue="handleTypeUpdate">
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
                    placeholder="Логин" class="w-full" v-model="model.login" @blur="handleLoginBlur" />
            </transition>
            <transition name="fade-input" mode="out-in">
                <Input v-if="model.type == 'local'"
                    :class="{ 'border-red-400 border': validationOptions.password == 'rejected' }"
                    v-model="model.password" key="password" placeholder="Пароль" type="password" @blur="handlePasswordBlur" />
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