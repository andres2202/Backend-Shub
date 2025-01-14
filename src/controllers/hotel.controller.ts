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

    public updateHotel = async (req: Request, res: Response) => {
        try {
            const role = req.body.tokenDecoded.role;
            if (role !== 'admin') {
                res.status(403).json({ message: 'You do not have the necessary permissions' });
                return;
            }
            const id = parseInt(req.params.id);
            const hotel: Hotel = req.body;
            let hotelUpdated: number = await this.hotelService.updateHotelById(id, hotel);
            if (hotelUpdated > 0) {
                res.status(200).json({ message: 'Hotel updated successfully' });
            } else {
                res.status(404).json({ message: 'Hotel not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error)?.message });
        }
    }

    public deleteHotel = async (req: Request, res: Response) => {
        try {
            const role = req.body.tokenDecoded.role;
            if (role !== 'admin') {
                res.status(403).json({ message: 'You do not have the necessary permissions' });
                return;
            }
            const id = parseInt(req.params.id);
            let hotelDeleted: number = await this.hotelService.deleteHotelById(id);
            if (hotelDeleted > 0) {
                res.status(200).json({ message: 'Hotel deleted successfully' });
            } else {
                res.status(404).json({ message: 'Hotel not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error)?.message });
        }
    }
}