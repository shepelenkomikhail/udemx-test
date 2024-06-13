export default interface carCardProps {
    id: number;
    make: string;
    model: string;
    year: number;
    color: string;
    fuel_type: string;
    transmission: string;
    price_per_day: number;
    available: string;
    image: string;
    unavailable_dates?: string[];
  };