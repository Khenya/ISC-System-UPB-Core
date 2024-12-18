interface UserResponse {
  id: number;
  username: string;
  name: string;
  lastname: string;
  mothername?: string;
  password?: string;
  email: string;
  token: string;
}

export default UserResponse;
