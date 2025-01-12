import { Reservation,UpdateReservation } from "../interfaces/reservation";
import { Reservations } from "../models/reservations";

export class ReservationService {
    
    public async createReservation(reservation: Reservation): Promise<Reservations> {
        try {
            const reservationCreated = await Reservations.create({
                user_id: reservation.user_id,
                hotel_id: reservation.hotel_id,
                chek_in_date: reservation.chek_in_date,
                check_out_date: reservation.check_out_date
            });
            return reservationCreated;
        } catch (error) {
            throw new Error((error as Error)?.message);
        }
    }

    public async getReservationsByUserId(user_id: number): Promise<Reservations[]> {
        try {
            const reservations = await Reservations.findAll({ where: { user_id }, attributes: ['id', 'user_id', 'hotel_id', 'chek_in_date', 'check_out_date'] });
            return reservations;
        } catch (error) {
            throw new Error((error as Error)?.message);
        }
    }

    public async updateReservation(id: number, reservation: UpdateReservation): Promise<number> {
        try {
            const reservationUpdated = await Reservations.update(reservation, { where: { id } });
            return reservationUpdated[0];
        } catch (error) {
            throw new Error((error as Error)?.message);
        }
    }

    public async deleteReservationById(id: number): Promise<number> {
        try {
            const reservationDeleted = await Reservations.destroy({ where: { id } });
            return reservationDeleted;
        } catch (error) {
            throw new Error((error as Error)?.message);
        }
    }
}