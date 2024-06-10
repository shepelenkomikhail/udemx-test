import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Center,
  Text,
} from "@chakra-ui/react";

type carCardProps = {
  make: string;
  model: string;
  year: number;
  color: string;
  fuel_type: string;
  transmission: string;
  price_per_day: number;
  available: string;
  image: string;
};

export default function carCard({
  make,
  model,
  year,
  color,
  fuel_type,
  transmission,
  price_per_day,
  available,
  image,
}: carCardProps) {
  return (
    <Card w={230}>
      <CardHeader>
        <Image
          src={`./assets/images/${image}`}
          borderRadius="md"
          w="full"
          h={120}
        ></Image>
      </CardHeader>
      <CardBody>
        <Heading fontSize="2xl" align="center">
          {make}
        </Heading>
      </CardBody>
    </Card>
  );
}
