import { Request, Response } from "express";
import { HotelService } from "../services/hotel.services";
import { Hotel } from "../interfaces/hotel";

export class HotelController {
    private hotelService: HotelService;

    constructor() {
        this.hotelService = new HotelService();
    }

    public getHotels = async (req: Request, res: Response) => {
        try {
            const role = req.body.tokenDecoded.role;
            if (role !== 'admin') {
                res.status(403).json({ message: 'You do not have the necessary permissions' });
                return;
            }
            let hotels: Hotel[] = await this.hotelService.getAllHotels();
            res.status(200).json(hotels);
        } catch (error) {
            res.status(500).json({ message: (error as Error)?.message });
        }
    }

    public createHotel = async (req: Request, res: Response) => {
        try {
            const role = req.body.tokenDecoded.role;
            if (role !== 'admin') {
                res.status(403).json({ message: 'You do not have the necessary permissions' });
                return;
            }
            const hotel: Hotel = req.body;
            let hotelCreated: Hotel = await this.hotelService.createHotel(hotel);
            res.status(201).json(hotelCreated);
        } catch (error) {
            res.status(500).json({ message: (error as Error)?.message });
        }
    }
}