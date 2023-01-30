import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
//
import { companyStore, userStore } from './data/services';
import { issueToken, decodeToken, extractTokenFromHeader } from './utils/jwt';
import { getNumberValueFromURLSearchParams } from './utils/query-string';
//
import type { LoginPayload, SignupPayload } from './types/user';

export const handlers = () => {
  return [...userHandlers, ...companyHandlers];
};

const userHandlers = [
  rest.post<{ tel: string }>('/api/check-tel', async (req, res, ctx) => {
    const body: { tel: string } = await req.json();
    const users = await userStore.getUsers();

    for (const user of users) {
      if (user.tel === body.tel) {
        return res(ctx.status(400), ctx.json({ message: '이미 등록된 휴대폰 번호입니다' }));
      }
    }
    return res(ctx.status(204));
  }),
  rest.post<SignupPayload>('/api/signup', async (req, res, ctx) => {
    const body: SignupPayload = await req.json();
    const userFromStore = await userStore.getUser(body.email);
    if (!!userFromStore) {
      return res(ctx.status(400), ctx.json({ message: '중복된 계정이 존재합니다' }));
    }
    const user = Object.assign(body, { id: uuidv4(), bookmarkedCompanies: [] });
    await userStore.setUser(body.email, user);
    return res(ctx.status(201));
  }),
  rest.post<LoginPayload>('/api/login', async (req, res, ctx) => {
    const body: LoginPayload = await req.json();
    const user = await userStore.getUser(body.email);
    if (!user) {
      return res(ctx.status(400), ctx.json({ message: '등록된 계정이 없습니다' }));
    }
    if (user.password !== body.password) {
      return res(ctx.status(400), ctx.json({ message: '비밀번호가 일치하지 않습니다' }));
    }
    const token = await issueToken(user.email);
    return res(ctx.status(200), ctx.cookie('auth', token), ctx.json({ token }));
  }),
  rest.get('/api/userinfo', async (req, res, ctx) => {
    try {
      const authTokenFromHeader = req.headers.get('Authorization');
      const token = extractTokenFromHeader(authTokenFromHeader) || '';
      const { email = '' } = await decodeToken(token);
      const user = await userStore.getUser(email);

      return res(ctx.status(200), ctx.json({user}));
    } catch {
      return res(ctx.status(400), ctx.json({ message: '로그인 정보가 일치하지 않습니다' }));
    }
  }),
];

const companyHandlers = [
  rest.get('/api/startups', async (req, res, ctx) => {
    let bookmarkedCompanyIds: string[] | undefined;

    try {
      const authTokenFromHeader = req.headers.get('Authorization');
      const token = extractTokenFromHeader(authTokenFromHeader) || '';
      const { email = '' } = await decodeToken(token);
      const user = await userStore.getUser(email);
      if (user) {
        bookmarkedCompanyIds = user.bookmarkedCompanies;
      }
    } catch {
      // noop
    }

    const offset = getNumberValueFromURLSearchParams({
      searchParams: req.url.searchParams,
      key: 'offset',
      defaultValue: 0,
    });
    const limit = getNumberValueFromURLSearchParams({
      searchParams: req.url.searchParams,
      key: 'limit',
      defaultValue: 12,
    });

    const { data, total } = await companyStore.getCompanies(offset, limit, bookmarkedCompanyIds);

    return res(
      ctx.status(200),
      ctx.json({
        startups: data,
        paging: {
          next: offset + limit,
          total,
        },
      }),
    );
  }),
  rest.get('/api/startups/bookmark', async (req, res, ctx) => {
    const authTokenFromHeader = req.headers.get('Authorization');
    const token = extractTokenFromHeader(authTokenFromHeader);
    if (!token) {
      return res(ctx.status(401));
    }

    try {
      const { email } = await decodeToken(token);
      if (!email) {
        return res(ctx.status(401));
      }
      const user = await userStore.getUser(email);
      if (!user) {
        return res(ctx.status(401));
      }

      const companies = await companyStore.getBookmarkedCompanies(user.bookmarkedCompanies);
      return res(ctx.status(200), ctx.json({ companies }));
    } catch (e) {
      return res(ctx.status(400));
    }
  }),
  rest.post<{ id: string }>('/api/startups/bookmark', async (req, res, ctx) => {
    const body = await req.json();
    if (!body.id) {
      return res(ctx.status(400), ctx.json({ message: 'Not passed an id' }));
    }

    const authTokenFromHeader = req.headers.get('Authorization');
    const token = extractTokenFromHeader(authTokenFromHeader);
    if (!token) {
      return res(ctx.status(401));
    }

    try {
      const { email } = await decodeToken(token);
      if (!email) {
        return res(ctx.status(401));
      }
      const user = await userStore.getUser(email);
      if (!user) {
        return res(ctx.status(401));
      }
      await userStore.updateBookmark(user, body.id);
      return res(ctx.status(204));
    } catch (e) {
      return res(ctx.status(400));
    }
  }),
];
