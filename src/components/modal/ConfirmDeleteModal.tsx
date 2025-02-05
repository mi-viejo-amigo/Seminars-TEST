import { Typography, Button, Box } from "@mui/material";

interface Props {
    onConfirm: () => void;
    onClose: () => void;
  }
  
  const ConfirmDeleteModal = ({ onConfirm, onClose }: Props) => {

    return (
        <>
        <Typography sx={{ color: "#000" }} variant="h6" gutterBottom>
            Удалить семинар?
        </Typography>
        <Typography sx={{ color: "gray" }} variant="body2" gutterBottom>
            Это действие нельзя отменить.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="error" onClick={onConfirm}>
            Удалить
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
            Отмена
            </Button>
        </Box>
        </>
    );
};

export default ConfirmDeleteModal;
