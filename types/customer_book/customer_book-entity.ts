export interface CustomerBookEntity {
    id?: string;
    customerId: string;
    bookId: string;
    reservedTo: Date;
}