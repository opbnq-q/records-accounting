import { Validation } from '@/composables/validation.composable';
import type { ValidationState } from '@/stores/accounts-form.store';
import type { Ref } from 'vue';

type Emits = jest.Mock;
type ValidationOptions = {
  tags: ValidationState;
  login: ValidationState;
  password: ValidationState;
};

const RefSymbol = Symbol.for('v-rt-ref');
class MockRef<T> {
  public [RefSymbol] = true;
  constructor(public value: T) {}
}

describe('Validation', () => {
  let emits: Emits;

  let validationOptions: Ref<ValidationOptions>;
  let validation: Validation<ValidationOptions>;

  beforeEach((): void => {
    emits = jest.fn();
    validationOptions = new MockRef<ValidationOptions>({ tags: 'none', login: 'none', password: 'none' }) as unknown as Ref<ValidationOptions>;
    validation = new Validation<ValidationOptions>(emits, validationOptions);
  });


  it('validateTags sets state', (): void => {
    emits.mockImplementation((_e: string, _v: string, cb: (result: boolean) => void) => cb(true));
    validation.validateTags('tag');
    expect(validationOptions.value.tags).toBe('fulfilled');
  });

  it('validateLogin sets state', (): void => {
    emits.mockImplementation((_e: string, _v: string, cb: (result: boolean) => void) => cb(false));
    validation.validateLogin('login');
    expect(validationOptions.value.login).toBe('rejected');
  });

  it('validatePassword sets state', (): void => {
    emits.mockImplementation((_e: string, _v: string, cb: (result: boolean) => void) => cb(true));
    validation.validatePassword('pass');
    expect(validationOptions.value.password).toBe('fulfilled');
  });

  it('checkAllValidAndEmit emits success-validation', (): void => {
    validationOptions.value = { tags: 'fulfilled', login: 'fulfilled', password: 'fulfilled' };
    validation.checkAllValidAndEmit();
    expect(emits).toHaveBeenCalledWith('success-validation');
  });
});
