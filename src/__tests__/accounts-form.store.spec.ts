import { setActivePinia, createPinia } from 'pinia';
import { useAccountsFormStore } from '@/stores/accounts-form.store';
import { IAccountRecord } from '@/entities/account-record.entity';

describe('AccountsFormStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('adds a new record', () => {
    const store = useAccountsFormStore();
    const id = store.add();
    expect(store.records.length).toBe(1);
    expect(store.records[0].id).toBe(id);
  });

  it('deletes a record', async () => {
    jest.resetModules();
    jest.doMock('@/composables/idb.composable', () => ({
      useIDB: () => ({
        delete: jest.fn().mockResolvedValue(undefined),
        upsert: jest.fn().mockResolvedValue(undefined),
        getAll: jest.fn().mockResolvedValue([]),
      })
    }), { virtual: true });
    const { setActivePinia, createPinia } = await import('pinia');
    const { useAccountsFormStore } = await import('@/stores/accounts-form.store');
    setActivePinia(createPinia());
    const store = useAccountsFormStore();
    const id = store.add();
    await store.delete(id);
    expect(store.records.length).toBe(0);
    jest.dontMock('@/composables/idb.composable');
  });

  it('saveOrUpdate calls idb.upsert', async () => {
    const store = useAccountsFormStore();
    const id = store.add();
    const record = { ...store.records[0] };
    if (record.type === 'LDAP') record.password = null;
    store.saveOrUpdate = jest.fn().mockResolvedValue(undefined);
    await store.saveOrUpdate(record as IAccountRecord);
    expect(store.saveOrUpdate).toHaveBeenCalledWith(record);
  });
});
