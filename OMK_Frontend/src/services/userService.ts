import axios from "axios";

class UserService {
  baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api';

  async getAllUsers() {
    const res = await axios.get(`${this.baseURL}/auth/all-user`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
        });

    if (res.status !== 200) {
      throw new Error('Failed to fetch users');
    }
    return res.data;

   
  }
}

export const userService = new UserService();
