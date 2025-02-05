import axios from "axios";
import { Seminar, PartialSeminar } from "./types";

// Использую axios для упрощения читаемости сетевых запросов
// Разместим наш адрес API не в .env а прямо тут.
const API_URL = "http://localhost:5000/seminars";

//  ----------------------- API -----------------------

export const fetchSeminars = async (): Promise<Seminar[] | null> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки семинаров:", error);
    return null;
  }
};

export const deleteSeminar = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(`Ошибка удаления семинара с id ${id}:`, error);
    return false;
  }
};

// на всякий случай указываю отправляемый тип данных PartialSeminar, ведь вероятно буду отправлять не все поля
export const updateSeminar = async (id: number, data: PartialSeminar): Promise<boolean> => {
  try {
    await axios.put(`${API_URL}/${id}`, data);
    return true;
  } catch (error) {
    console.error(`Ошибка обновления семинара с id ${id}:`, error);
    return false;
  }
};
