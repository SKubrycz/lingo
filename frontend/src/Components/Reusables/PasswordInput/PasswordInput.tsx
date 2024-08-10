import React, { useRef, useState } from "react";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

enum ActionType {
  Email = "email",
  Login = "login",
  Password = "password",
  PasswordAgain = "passwordAgain",
}

interface Actions {
  type: ActionType;
  payload?: string;
}

interface PasswordInputProps {
  label: string;
  name: string;
  inputLength?: number;
  autoComplete?: string;
  inputDispatch: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function PasswordInput({
  label,
  name,
  inputLength,
  autoComplete,
  inputDispatch,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <TextField
      label={label}
      variant="standard"
      inputRef={passwordRef}
      type={showPassword ? "text" : "password"}
      name={name}
      onChange={(e) => inputDispatch(e)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff></VisibilityOff>
              ) : (
                <Visibility></Visibility>
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      inputProps={{
        maxLength: inputLength,
      }}
      autoComplete={autoComplete}
    />
  );
}
