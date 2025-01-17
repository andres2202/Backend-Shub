export interface Reservation {
    id?: number;
    user_id?: number;
    hotel_id: number;
    chek_in_date: Date;
    check_out_date: Date;
}

export type UpdateReservation = Omit<Reservation, 'id'>;
