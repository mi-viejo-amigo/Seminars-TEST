export type Seminar = {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
};

export type PartialSeminar = Partial<Seminar>;