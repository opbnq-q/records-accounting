<script setup lang="ts">
import Input from './ui/input/Input.vue';
import Label from './ui/label/Label.vue';
import Select from './ui/select/Select.vue';
import SelectContent from './ui/select/SelectContent.vue';
import SelectGroup from './ui/select/SelectGroup.vue';
import SelectItem from './ui/select/SelectItem.vue';
import SelectLabel from './ui/select/SelectLabel.vue';
import SelectTrigger from './ui/select/SelectTrigger.vue';
import SelectValue from './ui/select/SelectValue.vue';


</script>

<template>
    <form class="flex gap-4">
        <Input placeholder="XXX; YYYYYY; A" />
        <Select>
            <SelectTrigger class="w-32">
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
        <Input placeholder="Логин" />
        <Input placeholder="Пароль" type="password" />
    </form>
</template>