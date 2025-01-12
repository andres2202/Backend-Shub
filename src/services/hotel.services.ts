import { Hotels } from "../models/hotels";
import { Hotel } from "../interfaces/hotel";

export class HotelService{
    
    public async createHotel(hotel: Hotel): Promise<Hotels> {
        try {
            const hotelCreated = await Hotels.create({
                name: hotel.name,
                location: hotel.location
            });
            return hotelCreated;
        } catch (error) {
            throw new Error((error as Error)?.message);
        }
    }

    public async getAllHotels(): Promise<Hotels[]> {
        try {
            const hotels = await Hotels.findAll({ attributes: ['id', 'name', 'location'] });
            return hotels;
        } catch (error) {
            throw new Error((error as Error)?.message);
        }
    }
}