import { Hotels } from "../models/hotels";
import { Hotel,UpdateHotel } from "../interfaces/hotel";

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

    public async updateHotelById(id: number, hotel:UpdateHotel): Promise<number>{
        try {
            const hotelUpdated = await Hotels.update(hotel, { where: { id } });
            return hotelUpdated[0];
        } catch (error) {
            throw new Error((error as Error)?.message);
        }
    }

    public async deleteHotelById(id: number): Promise<number>{
        try {
            const hotelDeleted = await Hotels.destroy({ where: { id } });
            return hotelDeleted;
        } catch (error) {
            throw new Error((error as Error)?.message);
        }
    }
}