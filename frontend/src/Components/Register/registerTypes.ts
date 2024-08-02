export type RegisterState = {
    email: string;
    login: string;
    password: string;
    passwordAgain: string;
  };
  
export enum ActionType {
    Email = "email",
    Login = "login",
    Password = "password",
    PasswordAgain = "passwordAgain",
  }
  
export interface RegisterActions {
    type: ActionType;
    payload?: string;
  }