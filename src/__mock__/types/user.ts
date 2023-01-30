export type SignupPayload = {
  email: string;
  password: string;
  name: string;
  tel: string;
  interestStartups: string[];
  marketingAgreed: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type User = SignupPayload & { id: string; bookmarkedCompanies: any[] };
