export interface BookEntity {
    id?: string;
    title: string;
    author: string;
    description: string;
    price: number;
    count: number;
    review: number;
}

export interface BookEntityFront {
    id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    count: number;
    review: number;
}