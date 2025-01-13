export interface Metadata {
  route: string;
  language: string;
}

export interface Alerts {
  [key: string]: string | string[];
}

export interface LogoutButtons {
  submit: string;
  cancel: string;
}

export interface LogoutDialog {
  title: string;
  subtitle: string;
  buttons: LogoutButtons;
}

export interface Logout {
  title: string;
  dialog: LogoutDialog;
}
