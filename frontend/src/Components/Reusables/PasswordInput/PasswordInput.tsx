import React, { useRef, useState } from "react";

import { TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordInputProps {
  label: string;
  name: string;
  tooltipTitle?: string;
  openTooltip: boolean;
  inputLength?: number;
  autoComplete?: string;
  inputDispatch: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function PasswordInput({
  label,
  name,
  tooltipTitle,
  openTooltip,
  inputLength,
  autoComplete,
  inputDispatch,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const passwordRef = useRef<HTMLInputElement>(null);

  const handleTooltipOpen = () => {
    if (openTooltip) {
      setOpen(!open);
    }
  };

  return (
    <Tooltip
      title={tooltipTitle}
      arrow={true}
      onOpen={handleTooltipOpen}
      onClose={handleTooltipOpen}
      open={open}
    >
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
    </Tooltip>
  );
}
