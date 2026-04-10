import burger from "@/assets/burger.webp"
import images from "@/assets/images.jpg"

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Hamburguesa Clásica",
        price: 5.99,
        description: "Pan artesanal, carne 150g, queso y salsa especial.",
        image: burger ,
    },
    {
        id: "2",
        name: "Pizza Pepperoni",
        price: 8.5,
        description: "Pizza mediana con pepperoni y queso mozzarella.",
        image: images ,
    },
];
