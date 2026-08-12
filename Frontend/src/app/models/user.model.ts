export interface User {
  _id?: string;
  name: string;
  email?: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  msg: string;
  token: string;
  user?: User;
  newuser?: User;
}
