import type { ValidationState } from "@/stores/accounts-form.store";
import type { Ref } from "vue";

export interface ValidationEmits {
    (e: 'validate-tags', tags: string, callback: (result: boolean) => void): void
    (e: 'validate-login', login: string, callback: (result: boolean) => void): void
    (e: 'success-validation'): Promise<void>
    (e: 'validate-password', password: string, callback: (result: boolean) => void): void
}

export interface ValidationOptions {
    tags: ValidationState
    login: ValidationState
    password: ValidationState
}

export class Validation<T extends ValidationOptions> {
    constructor(
        private readonly emits: ValidationEmits,
        private readonly validationOptions: Ref<T>
    ) { }

    validateTags(value: string, omitRejected = false) {
        this.emits('validate-tags', value, result => {
            this.validationOptions.value.tags = result ? 'fulfilled' : (omitRejected ? 'none' : 'rejected');
        });
    }

    validateLogin(value: string, omitRejected = false) {
        this.emits('validate-login', value, result => {
            this.validationOptions.value.login = result ? 'fulfilled' : (omitRejected ? 'none' : 'rejected');
        });
    }

    validatePassword(value: string, omitRejected = false) {
        this.emits('validate-password', value, result => {
            this.validationOptions.value.password = result ? 'fulfilled' : (omitRejected ? 'none' : 'rejected');
        });
    }

    checkAllValidAndEmit() {
        for (const value of Object.values(this.validationOptions.value)) {
            if (value != 'fulfilled') return;
        }
        this.emits('success-validation');
    }
}