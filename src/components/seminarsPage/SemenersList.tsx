import { useEffect, useState } from "react";
import { fetchSeminars, deleteSeminar, updateSeminar } from "../../api";
import ModalWrapper from "../modal/ModalWrapper";
import EditModal from "../modal/EditModal";
import ConfirmDeleteModal from "../modal/ConfirmDeleteModal";
import { Seminar } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SeminarsList = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // Обработаем ошибку загрузки
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);
  const [deleteSeminarId, setDeleteSeminarId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // Показываем `loading` на кнопке удаления

  useEffect(() => {
    const loadSeminars = async () => {
      setLoading(true);
      setError(false);
      const data = await fetchSeminars();
      if (data) {
        setSeminars(data);
      } else {
        setError(true);
        toast.error("Ошибка загрузки семинаров. Попробуйте позже!");
      }
      setLoading(false);
    };

    loadSeminars();
  }, []);

  const handleDelete = async () => {
    if (deleteSeminarId !== null) {
      setIsDeleting(true);
      const success = await deleteSeminar(deleteSeminarId);
      if (success) {
        setSeminars(seminars.filter((s) => s.id !== deleteSeminarId));
        toast.success("Семинар успешно удален!");
      } else {
        toast.error("Ошибка при удалении семинара.");
      }
      setIsDeleting(false);
      setDeleteSeminarId(null);
    }
  };

  const handleUpdate = async (updatedSeminar: Seminar) => {
    const success = await updateSeminar(updatedSeminar.id, updatedSeminar);
    if (success) {
      setSeminars(seminars.map((s) => (s.id === updatedSeminar.id ? updatedSeminar : s)));
      toast.success("Семинар обновлен!");
    } else {
      toast.error("Ошибка при обновлении семинара.");
    }
    setEditingSeminar(null);
  };  

  if (loading) {
    return (
      <Container sx={{ mt: 4 }} component="section">
        <Typography variant="h2" gutterBottom textAlign="center">
          Семинары
        </Typography>
        <CircularProgress />
      </Container>
    );
  };

  if (seminars.length === 0) {
    return (
      <Container sx={{ mt: 4 }} component="section">
        <Typography variant="h2" gutterBottom textAlign="center">
          Семинары
        </Typography>
        <Typography color="error">Список семинаров пуст</Typography>
      </Container>
    );
  };

  if (error) {
    return (
      <Container sx={{ mt: 4 }} component="section">
        <Typography variant="h2" gutterBottom textAlign="center">
          Семинары
        </Typography>
        <Typography color="error">Не удалось загрузить семинары</Typography>
      </Container>
    );
  };

  return (
    <Container sx={{ mt: 4 }} component="section">
      <Typography variant="h2" gutterBottom textAlign="center">
        Семинары
      </Typography>


      <Grid container component="ul" spacing={3}>
        <AnimatePresence mode='popLayout'>
            {seminars.map((seminar) => (
              <Grid key={seminar.id} component="li">
                <motion.div
                  layout
                  initial={{height: "100%"}}
                  exit={{ opacity: 0, scale: 0.4, y: 50 }}
                  transition={{ duration: 0.7 }}
                >
                  <Card
                    sx={{
                      width: 345,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardMedia component="img" height="200" image={seminar.photo} alt={seminar.title} />
                    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6" sx={{ mb: 1, minHeight: "3rem", display: "flex", alignItems: "center" }}>
                        {seminar.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          flexGrow: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          mb: 1,
                        }}
                      >
                        {seminar.description}
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: "left", color: "text.primary", mt: "auto" }}>
                        📅 {seminar.date} ⏰ {seminar.time}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ display: "flex", justifyContent: "space-between", mt: "auto", pt: 2 }}>
                      <Button size="small" color="primary" onClick={() => setEditingSeminar(seminar)}>
                        Редактировать
                      </Button>
                      <Button size="small" color="error" onClick={() => setDeleteSeminarId(seminar.id)} disabled={isDeleting}>
                        {isDeleting ? <CircularProgress size={20} /> : "Удалить"}
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
        </AnimatePresence>
      </Grid>

      

        {editingSeminar && (
          <ModalWrapper open={!!editingSeminar} onClose={() => setEditingSeminar(null)}>
            <EditModal seminar={editingSeminar} onSave={handleUpdate} onClose={() => setEditingSeminar(null)} />
          </ModalWrapper>
        )}
        {deleteSeminarId && (
          <ModalWrapper open={!!deleteSeminarId} onClose={() => setDeleteSeminarId(null)}>
            <ConfirmDeleteModal onConfirm={handleDelete} onClose={() => setDeleteSeminarId(null)} />
          </ModalWrapper>
        )}
    </Container>
  );
};

export default SeminarsList;