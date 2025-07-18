export type User = {
  id: string;
  email: string;
  username?: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type ServerBoolResponse = {
  success: boolean;
};

export type CheckSessionRequest = {
  success: boolean;
};
