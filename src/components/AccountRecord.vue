<script setup lang="ts">
import { computed, ref } from 'vue';
import Input from './ui/input/Input.vue';
import Select from './ui/select/Select.vue';
import SelectContent from './ui/select/SelectContent.vue';
import SelectGroup from './ui/select/SelectGroup.vue';
import SelectItem from './ui/select/SelectItem.vue';
import SelectLabel from './ui/select/SelectLabel.vue';
import SelectTrigger from './ui/select/SelectTrigger.vue';
import SelectValue from './ui/select/SelectValue.vue';
import type { IAccountRecord } from '@/entities/account-record.entity';

const model = defineModel<IAccountRecord>({ required: true })
const emits = defineEmits<{
    (e: 'validate-tags', tags: string): boolean
    (e: 'validate-login', login: string): boolean
    (e: 'validate-password', password: string): boolean
}>()

const tagsValue = ref(model.value.tags.map(el => el.text).join('; '))
</script>

<template>
    <form class="flex gap-4 w-full">
        <div class="flex gap-4 w-full">
            <Input placeholder="XXX; YYYYYY; A" v-model="tagsValue" @blur="(e: Event) => {
                const target = e.target as HTMLInputElement
                model.tags = target.value.split(';').map(el => ({ text: el }))
                console.log(model)
            }" />
            <Select :default-value="'local'" v-model="model.type">
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
                <Input key="login" placeholder="Логин" class="w-full" />
            </transition>
            <transition name="fade-input" mode="out-in">
                <Input v-show="model.type == 'local'" key="password" placeholder="Пароль" type="password" />
            </transition>
        </div>
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