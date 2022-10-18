export interface CustomerBookEntity {
    id?: string;
    customerId: string;
    bookId: string;
    purchaseDate: string;
    bookCount: number;
}

export interface CustomerBookIdEntity {
    bookId: string;
}
