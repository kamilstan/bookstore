export interface CustomerBookEntity {
    id?: string;
    customer_id: string;
    book_id: string;
    reservedTo: Date;
}