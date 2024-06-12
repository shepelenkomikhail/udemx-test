import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Divider,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Badge,
  Button,
} from "@chakra-ui/react";
import { carCardProps } from "../Types/carCardProps";
import { useNavigate } from "react-router-dom";

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
  isAdmin,
}: carCardProps & { isAdmin: boolean }) {
  const navigate = useNavigate();
  const handleClick = () => {
    available == "true" &&
      navigate("/purchase", {
        state: {
          make,
          model,
          year,
          color,
          fuel_type,
          transmission,
          price_per_day,
          available,
          image,
        },
      });
  };
  const handleClickAdmin = () => {
    navigate("/edit", {
      state: {
        make,
        model,
        year,
        color,
        fuel_type,
        transmission,
        price_per_day,
        available,
        image,
      },
    });
  };

  return (
    <Card w={230} align={"center"}>
      <Badge
        fontSize="0.8em"
        colorScheme={available == "true" ? "green" : "red"}
        position={"absolute"}
        style={{ top: "0", right: "0", transform: "translate(10%, -30%)" }}
      >
        {available == "true" ? "Available" : "Taken"}
      </Badge>
      <Image
        src={`./assets/images/${image}`}
        borderRadius="md"
        w="full"
        h={120}
        objectFit="cover"
      ></Image>

      <CardBody pt={3}>
        <HStack justify={"center"}>
          <Text fontSize="2xl" as={"b"} textAlign={"center"}>
            {make}
          </Text>
          <Text color={"gray.500"} fontSize={"xl"} textAlign={"center"}>
            {" "}
            {model}{" "}
          </Text>
        </HStack>

        <TableContainer pt={2}>
          <Table variant={"simple"}>
            <Thead>
              <Tr>
                <Th fontSize={10} p={0} textAlign={"center"}>
                  Fuel
                </Th>
                <Th fontSize={10} p={2} textAlign={"center"}>
                  Transm.
                </Th>
                <Th fontSize={10} p={0} textAlign={"center"}>
                  Color
                </Th>
                <Th fontSize={10} p={2} textAlign={"center"}>
                  Year
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontSize={11} p={0} textAlign={"center"}>
                  {fuel_type}
                </Td>
                <Td fontSize={11} p={2} textAlign={"center"}>
                  {transmission}
                </Td>
                <Td fontSize={11} p={0} textAlign={"center"}>
                  {color}
                </Td>
                <Td fontSize={11} p={2} textAlign={"center"}>
                  {year}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
      <Divider color="gray.300" />
      <CardFooter>
        {!isAdmin && (
          <Button
            variant="outline"
            bg={"orange.100"}
            m={-2}
            onClick={handleClick}
          >
            <Text as="b" mx="1">
              {price_per_day}
            </Text>
            <Text>US$/day</Text>
          </Button>
        )}
        {isAdmin && (
          <Button
            variant="outline"
            bg={"orange.100"}
            m={-2}
            onClick={handleClickAdmin}
          >
            <Text as="b" mx="1">
              Edit
            </Text>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
