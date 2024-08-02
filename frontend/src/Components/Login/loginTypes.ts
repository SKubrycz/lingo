export type LoginState = {
    login: string;
    password: string;
  };
  
export enum ActionType {
    Login = "login",
    Password = "password",
  }
  
export interface LoginActions {
    type: ActionType;
    payload?: string;
  }