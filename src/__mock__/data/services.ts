import localForage from 'localforage';
//
import MemoryStore from './memory-session';
import isJest from '../utils/env';
import initializeCompanies from '../utils/company';
//
import type { User } from '../types/user';
import type { Company } from '../types/company';

let _userStore: LocalForage | MemoryStore<User>;
let _companyStore: LocalForage | MemoryStore<Company>;

const createUserStore = () => {
  return {
    async init() {
      if (!_userStore) {
        _userStore = isJest()
          ? new MemoryStore<User>()
          : localForage.createInstance({
              driver: localForage.INDEXEDDB,
              name: 'nu_users',
            });
      }
    },
    async setUser(email: string, user: User) {
      await _userStore.setItem(email, user);
      return true;
    },
    async getUser(email: string) {
      return (await _userStore.getItem(email)) as User | null;
    },
    async getUsers() {
      const keys = await _userStore.keys();
      return (await Promise.all(keys.map((key) => _userStore.getItem(key)))) as User[];
    },
    async updateBookmark(user: User, companyId: string) {
      const { bookmarkedCompanies } = user;
      const newBookmarkedCompanies = bookmarkedCompanies.includes(companyId)
        ? bookmarkedCompanies.filter((v) => v !== companyId)
        : bookmarkedCompanies.concat(companyId);
      await this.setUser(
        user.email,
        Object.assign(user, { bookmarkedCompanies: newBookmarkedCompanies }),
      );
      return true;
    },
  };
};

const createCompanyStore = () => {
  return {
    async init() {
      if (!_companyStore) {
        _companyStore = isJest()
          ? new MemoryStore<Company>()
          : localForage.createInstance({
              driver: localForage.INDEXEDDB,
              name: 'nu_companys',
            });
      }
    },
    async dump(length: number) {
      const list = Object.values(initializeCompanies(length));
      await Promise.all(list.map((company) => _companyStore.setItem(company.id, company)));
      return list;
    },
    async getCompanies(offset: number, limit: number, bookmarkedCompanyIds?: string[]) {
      const allCompanyKeys = await _companyStore.keys();
      const hasElements = allCompanyKeys.length !== 0;

      const allCompanies: Company[] = hasElements
        ? ((await Promise.all(allCompanyKeys.map((key) => _companyStore.getItem(key)))).filter(
            (v) => v !== null,
          ) as Company[])
        : await this.dump(72);

      return {
        data: allCompanies.slice(offset, offset + limit).map((v) => {
          return Object.assign(v, {
            bookmarked: Array.isArray(bookmarkedCompanyIds)
              ? bookmarkedCompanyIds.includes(v.id)
              : false,
          });
        }),
        total: allCompanies.length,
      };
    },
    async getCompanyById(id: string) {
      return (await _companyStore.getItem(id)) as Company | null;
    },

    async getBookmarkedCompanies(bookmarkedCompanies: string[]) {
      const ret = await Promise.all(
        bookmarkedCompanies.map((id) => companyStore.getCompanyById(id)),
      );
      return (ret.filter((v) => v !== null) as Company[]).map((v) => ({ ...v, bookmarked: true }));
    },
  };
};

export const userStore = createUserStore();
export const companyStore = createCompanyStore();
