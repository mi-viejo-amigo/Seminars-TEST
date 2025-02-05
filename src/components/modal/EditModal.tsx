import { useState } from "react";
import { Seminar } from "../../types";
import { TextField, Button, Typography, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props {
  seminar: Seminar;
  onSave: (updatedSeminar: Seminar) => void;
  onClose: () => void;
}

const EditModal = ({ seminar, onSave, onClose }: Props) => {
  const [form, setForm] = useState<Seminar>(seminar);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Редактирование семинара
      </Typography>

      <TextField
        fullWidth
        label="Название"
        name="title"
        value={form.title}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Описание"
        name="description"
        multiline
        rows={3}
        value={form.description}
        onChange={handleChange}
        margin="normal"
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Дата"
          value={dayjs(form.date, "DD.MM.YYYY")}
          onChange={(newDate) => {
            if (newDate) {
              setForm({ ...form, date: newDate.format("DD.MM.YYYY") });
            }
          }}
          format="DD.MM.YYYY"
          slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
        />
      </LocalizationProvider>
      <TextField
        fullWidth
        label="Время"
        name="time"
        type="time"
        value={form.time}
        onChange={handleChange}
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={() => onSave(form)}>
          Сохранить
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Закрыть
        </Button>
      </Box>
    </>
  );
};

export default EditModal;