interface User {
  id?: number;
  username: string;
  name: string;
  lastname: string;
  mothername?: string;
  password: string;
  email: string;
  code: string;
  phone: string;
  degree: string;
  roles?: string[];
}

export default User;
