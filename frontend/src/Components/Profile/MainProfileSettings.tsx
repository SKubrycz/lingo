import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

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
      <DialogTitle sx={{ textAlign: "center" }}>Ustawienia</DialogTitle>
      <DialogContent>
        <Button variant="contained" color="error">
          Usuń konto
        </Button>
      </DialogContent>
    </Dialog>
  );
}
