import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
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
  Box,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/myProvider";
import carCardProps from "../Types/carCardProps";

export const EditForm = ({
  id,
  make,
  model,
  year,
  color,
  fuel_type,
  transmission,
  price_per_day,
  available,
  image,
}: carCardProps) => {
  return (
    <form>
      <Card w={400} h={500} align={"center"}>
        <Badge
          fontSize="0.8em"
          colorScheme={available == "true" ? "green" : "red"}
          position={"absolute"}
          style={{ top: "0", right: "0", transform: "translate(10%, -30%)" }}
        >
          {available == "true" ? "Available" : "Taken"}
        </Badge>
        <Box>
          <EditIcon
            position={"absolute"}
            style={{ left: "0", transform: "translate(-50%, -40%)" }}
          />
        </Box>
        <Image
          src={`./assets/images/${image}`}
          borderRadius="md"
          w="full"
          h={230}
          objectFit="cover"
        ></Image>

        <CardBody pt={3}>
          <HStack justify={"center"}>
            <Box>
              <button>
                <EditIcon
                  position={"absolute"}
                  style={{ transform: "translate(-50%, -150%)" }}
                />
              </button>
            </Box>
            <Text fontSize="4xl" as={"b"} textAlign={"center"}>
              {make}
            </Text>
            <Text color={"gray.500"} fontSize={"4xl"} textAlign={"center"}>
              {" "}
              {model}{" "}
            </Text>
            <Box>
              <button>
                <EditIcon
                  position={"absolute"}
                  style={{ transform: "translate(-50%, -150%)" }}
                />
              </button>
            </Box>
          </HStack>

          <TableContainer pt={2}>
            <Table variant={"simple"}>
              <Thead>
                <Tr>
                  <Th fontSize={20} p={0} textAlign={"center"}>
                    <Box>
                      <button>
                        <EditIcon
                          position={"absolute"}
                          style={{
                            transform: "translate(100%, -100%)",
                            width: "0.9rem",
                            left: "0",
                          }}
                        />
                      </button>
                    </Box>
                    Fuel
                  </Th>
                  <Th fontSize={20} p={2} textAlign={"center"}>
                    <Box>
                      <button>
                        <EditIcon
                          position={"absolute"}
                          style={{
                            transform: "translate(100%, -100%)",
                            width: "0.9rem",
                            left: "90",
                          }}
                        />
                      </button>
                    </Box>
                    Transm.
                  </Th>
                  <Th fontSize={20} p={0} textAlign={"center"}>
                    <Box>
                      <button>
                        <EditIcon
                          position={"absolute"}
                          style={{
                            transform: "translate(100%, -100%)",
                            width: "0.9rem",
                            left: "203",
                          }}
                        />
                      </button>
                    </Box>
                    Color
                  </Th>
                  <Th fontSize={20} p={2} textAlign={"center"}>
                    <Box>
                      <button>
                        <EditIcon
                          position={"absolute"}
                          style={{
                            transform: "translate(100%, -100%)",
                            width: "0.9rem",
                            left: "290",
                          }}
                        />
                      </button>
                    </Box>
                    Year
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontSize={22} p={0} textAlign={"center"}>
                    {fuel_type}
                  </Td>
                  <Td fontSize={22} p={4} textAlign={"center"}>
                    {transmission}
                  </Td>
                  <Td fontSize={22} p={0} textAlign={"center"}>
                    {color}
                  </Td>
                  <Td fontSize={22} p={4} textAlign={"center"}>
                    {year}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
        <Divider color="gray.300" />
        <CardFooter>
          <Box>
            <button>
              <EditIcon
                position={"absolute"}
                style={{
                  transform: "translate(-80%, -150%)",
                }}
              />
            </button>
          </Box>
          <Text as="b" mx="1" fontSize={22}>
            {price_per_day}
          </Text>
          <Text fontSize={22}>US$/day</Text>
        </CardFooter>
      </Card>
    </form>
  );
};
