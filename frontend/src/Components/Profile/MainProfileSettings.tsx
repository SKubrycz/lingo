import { useState } from "react";

import { Box, Dialog, DialogTitle, Typography } from "@mui/material";

interface MainProfileSettingsProps {
  open: boolean;
  onClose: () => void;
}

export default function MainProfileSettings({
  open,
  onClose,
}: MainProfileSettingsProps) {
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Ustawienia</DialogTitle>
    </Dialog>
  );
}
