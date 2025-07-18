import { IDBService } from '@/composables/idb.composable';

describe('IDBService', () => {
  let idb: IDBService;
  beforeEach(() => {
    idb = IDBService.getInstance();
  });

  it('should be a singleton', () => {
    const idb2 = IDBService.getInstance();
    expect(idb).toBe(idb2);
  });

  it('should have upsert, delete, get, getAll methods', () => {
    expect(typeof idb.upsert).toBe('function');
    expect(typeof idb.delete).toBe('function');
    expect(typeof idb.get).toBe('function');
    expect(typeof idb.getAll).toBe('function');
  });
});
