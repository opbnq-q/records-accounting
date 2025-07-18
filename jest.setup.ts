
class MockIDBOpenDBRequest {
  onupgradeneeded: ((this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any) | null = null;
  onsuccess: ((this: IDBRequest<any>, ev: Event) => any) | null = null;
  onerror: ((this: IDBRequest<any>, ev: Event) => any) | null = null;
  onblocked: ((this: IDBOpenDBRequest, ev: Event) => any) | null = null;
  addEventListener = jest.fn();
  removeEventListener = jest.fn();
  dispatchEvent = jest.fn();
  result: any = {};
  error: DOMException | null = null;
  readyState: 'pending' | 'done' = 'done';
  source: IDBObjectStore | IDBIndex | IDBCursor = undefined as any;
  transaction: null = null;
  constructor() {}
}

globalThis.indexedDB = {
  open: jest.fn(() => new MockIDBOpenDBRequest()),
  cmp: jest.fn(),
  databases: jest.fn(() => Promise.resolve([])),
  deleteDatabase: jest.fn(),
};