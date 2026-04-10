export type OrderStatus = "PENDING" | "PAID" | "CANCELLED"

export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        price: number;
        image?: string;
    };
}

export interface Order {
    id: number;
    description: string;
    totalPrice: number;
    status: OrderStatus
    createdAt: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    items: OrderItem[];
}
