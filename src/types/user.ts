export type RegisterForm = {
  username: string;
  password: string;
  fullName: string;
  role: string;
  gender: string;
  isExpert: boolean;
  listCategoryId: string[];
  experience: string;
};

export type LoginForm = {
  username: string;
  password: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  dateCreated: Date;
  dateUpdated: Date;
};

export type User = {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: string;
  refreshToken: string;
  accessToken?: string;
  status?: string;
  [key: string]: any;
};

export type Expert = {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  bio: string;
  gender: string;
  dateCreate: Date;
  dateUpdated: Date;
  status: string;
  expertId: string;
  experience: string;
  totalReview: number;
  rate: number;
};