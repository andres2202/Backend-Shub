export interface Hotel{
    id?: number;
    name: string;
    location: string;
}

export type UpdateHotel = Omit<Hotel, 'id'>;