import { User } from "./authSlice";

export abstract class AuthProvider {
  public static getRegisteredUsers = (): User[] => [
    {
      id: "5a7d9bc1-fb6b-431e-83fd-42a14e72e552",
      email: "admin@yopmail.com",
      password: "admin",
      name: "Administrador",
      role: "admin",
      token: "1234567890",
      isEnabled: true,
    },
  ];
}
