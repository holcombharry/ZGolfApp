export type Course = {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    par: number;
    holes: number;
    scorecard: (number | null)[];
    createdAt: Date;
    updatedAt: Date;
};