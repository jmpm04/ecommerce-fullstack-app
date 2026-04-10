import { Badge } from "@/components/ui/badge";

const STATUS_COLORS: Record<string, string> = {
    PENDING: "bg-yellow-500",
    PAID: "bg-green-600",
    CANCELLED: "bg-red-600",
};

export const OrderStatusBadge = ({ status }: { status: string }) => {
    return (
        <Badge className={`${STATUS_COLORS[status]} text-white`}>
            {status}
        </Badge>
    );
};
