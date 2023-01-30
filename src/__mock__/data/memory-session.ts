export default class MemoryStore<T extends any> {
  private _record: Record<string, T> = {};

  async keys() {
    return Object.keys(this._record);
  }

  async getItem(key: string) {
    return this._record[key] || null;
  }

  async setItem(key: string, value: T) {
    this._record[key] = value;
  }
}
