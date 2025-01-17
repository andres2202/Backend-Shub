import { Request, Response } from "express";
import { ReservationService } from "../services/reservation.services";
import { Reservation } from "../interfaces/reservation";

export class ReservationController {
    private reservationService: ReservationService;

    constructor() {
        this.reservationService = new ReservationService();
    }

    public createReservation = async (req: Request, res: Response) => {
        try {
            const reservation: Reservation = req.body;
            let reservationCreated: Reservation = await this.reservationService.createReservation(reservation);
            res.status(201).json(reservationCreated);
        } catch (error) {
            res.status(500).json({ message: (error as Error)?.message });
        }
    }

    public getReservationsByUserId = async (req: Request, res: Response) => {
        try {
            const userId = req.body.tokenDecoded.userId;
            let reservations: Reservation[] = await this.reservationService.getReservationsByUserId(userId);
            res.status(200).json(reservations);
        } catch (error) {
            res.status(500).json({ message: (error as Error)?.message });
        }
    }

    public updateReservation = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const reservation: Reservation = req.body;
            let reservationUpdated: number = await this.reservationService.updateReservation(id, reservation);
            if (reservationUpdated > 0) {
                res.status(200).json({ message: 'Reservation updated successfully' });
            } else {
                res.status(404).json({ message: 'Reservation not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error)?.message });
        }
    }

    public deleteReservationById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            let reservationDeleted: number = await this.reservationService.deleteReservationById(id);
            if (reservationDeleted > 0) {
                res.status(200).json({ message: 'Reservation deleted successfully' });
            } else {
                res.status(404).json({ message: 'Reservation not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error)?.message });
        }
    }
}