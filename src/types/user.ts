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
