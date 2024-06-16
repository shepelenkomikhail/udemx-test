import {
  Card,
  CardBody,
  CardFooter,
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
  Center,
  Flex,
  FormLabel,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MyContext } from "../context/myProvider";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React from "react";

const imageOptions = [
  { value: "audi.jpeg", label: "Audi" },
  { value: "bmw.jpeg", label: "BMW" },
  { value: "carlogo.png", label: "Car Logo" },
  { value: "chevrolet.jpeg", label: "Chevrolet" },
  { value: "ford.jpeg", label: "Ford" },
  { value: "honda.jpeg", label: "Honda" },
  { value: "lexus.jpeg", label: "Lexus" },
  { value: "mercedes.jpeg", label: "Mercedes" },
  { value: "nissan.jpeg", label: "Nissan" },
  { value: "tesla.jpeg", label: "Tesla" },
  { value: "toyota.jpeg", label: "Toyota" },
];

const colorOptions = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "silver", label: "Silver" },
  { value: "gray", label: "Gray" },
  { value: "yellow", label: "Yellow" },
  { value: "orange", label: "Orange" },
  { value: "brown", label: "Brown" },
  { value: "purple", label: "Purple" },
];

const tableStyles = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "8px",
  outline: "none",
  height: "2rem",
  width: "100%",
  marginTop: "1rem",
  marginBottom: "1rem",
};

export default function EditCar() {
  const location = useLocation();
  const {
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
  } = location.state;

  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { data, setData } = useContext(MyContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleSubmit = (values, { setSubmitting }) => {
    const newCar = {
      id: id,
      make: values.make,
      model: values.model,
      year: values.year,
      color: values.color,
      fuel_type: values.fuel_type,
      transmission: values.transmission,
      price_per_day: values.price,
      available: "true",
      image: values.image,
    };

    const index = data.findIndex((car) => car.id === newCar.id);

    if (index !== -1) {
      data[index] = newCar;
    }

    setData([...data]);
    setSuccess(true);
    setSubmitting(false);
    onOpen();
  };

  return (
    <Box bg={"gray.50"} minHeight="100vh" width="100vw">
      <Center h={"50vw"}>
        <Formik
          initialValues={{
            image: image,
            make: make,
            model: model,
            fuel_type: fuel_type,
            transmission: transmission,
            color: color,
            year: year,
            price: price_per_day,
          }}
          validationSchema={Yup.object({
            image: Yup.string().required("Image is required!"),
            make: Yup.string()
              .required("Make is required!")
              .min(2, "Should be at least 2 letters!"),
            model: Yup.string()
              .required("Model is required!")
              .min(2, "Should be at least 2 letters!"),
            fuel_type: Yup.string().required("Fuel type is required!"),
            transmission: Yup.string().required("Transm. type is required!"),
            color: Yup.string().required("Color is required!"),
            year: Yup.number()
              .typeError("Year must be a number")
              .required("Year is required!")
              .min(1886, "Should be >1886")
              .max(
                new Date().getFullYear(),
                `Year cannot be later than ${new Date().getFullYear()}`
              ),
            price: Yup.number()
              .typeError("Price must be a number")
              .required("Price is required!")
              .positive("Price must be a positive number"),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <Card w={500} h={600} align={"center"}>
                <Badge
                  fontSize="0.8em"
                  colorScheme={"green"}
                  position={"absolute"}
                  style={{
                    top: "0",
                    right: "0",
                    transform: "translate(10%, -30%)",
                  }}
                >
                  {"Available"}
                </Badge>
                <Flex
                  bg={"orange.300"}
                  borderRadius="md"
                  w="full"
                  h={230}
                  objectFit="cover"
                  align={"center"}
                  justify={"center"}
                  direction="column"
                >
                  <Field
                    as="select"
                    name="image"
                    id="image"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "8px",
                      outline: "none",
                      width: "50%",
                    }}
                  >
                    <option value="" label="Select an image" />
                    {imageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="image"
                    render={(msg) => (
                      <Text color={"red.500"} as="b">
                        {msg}
                      </Text>
                    )}
                  />
                </Flex>

                <CardBody pt={3}>
                  <HStack justify={"center"}>
                    <VStack>
                      <FormLabel
                        htmlFor="make"
                        mb={0}
                        fontWeight={"bold"}
                        fontSize={"xl"}
                      >
                        Make
                      </FormLabel>
                      <Field
                        type="text"
                        name="make"
                        id="make"
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "8px",
                          outline: "none",
                          width: "100%",
                        }}
                        placeholder="Enter a make of a car"
                      ></Field>
                      <ErrorMessage
                        name="make"
                        render={(msg) => (
                          <Text color={"red.500"} as="b">
                            {msg}
                          </Text>
                        )}
                      />
                    </VStack>

                    <VStack>
                      <FormLabel
                        htmlFor="make"
                        mb={0}
                        fontWeight={"bold"}
                        fontSize={"xl"}
                      >
                        Model
                      </FormLabel>
                      <Field
                        type="text"
                        name="model"
                        id="model"
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "8px",
                          outline: "none",
                          width: "100%",
                        }}
                        placeholder="Enter a model of a car"
                      ></Field>
                      <ErrorMessage
                        name="model"
                        render={(msg) => (
                          <Text color={"red.500"} as="b">
                            {msg}
                          </Text>
                        )}
                      />
                    </VStack>
                  </HStack>

                  <TableContainer pt={2} mt={4} mb={1}>
                    <Table variant={"simple"}>
                      <Thead>
                        <Tr>
                          <Th fontSize={20} p={0} textAlign={"center"}>
                            Fuel
                          </Th>
                          <Th fontSize={20} p={2} textAlign={"center"}>
                            Transm.
                          </Th>
                          <Th fontSize={20} p={0} textAlign={"center"}>
                            Color
                          </Th>
                          <Th fontSize={20} p={0} textAlign={"center"}>
                            Year
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td fontSize={12} p={0} textAlign={"center"}>
                            <VStack>
                              <Field
                                as="select"
                                name="fuel_type"
                                id="fuel_type"
                                style={tableStyles}
                              >
                                <option value="">Fuel Type</option>
                                <option value="Gasoline">Gasoline</option>
                                <option value="Electric">Electric</option>
                              </Field>
                              <ErrorMessage
                                name="fuel_type"
                                render={(msg) => (
                                  <Text color={"red.500"} as="b" mt={-4}>
                                    {msg}
                                  </Text>
                                )}
                              />
                            </VStack>
                          </Td>
                          <Td fontSize={12} p={2} textAlign={"center"}>
                            <VStack>
                              <Field
                                as="select"
                                name="transmission"
                                id="transmission"
                                style={tableStyles}
                              >
                                <option value="">Transm. type</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                              </Field>
                              <ErrorMessage
                                name="transmission"
                                render={(msg) => (
                                  <Text color={"red.500"} as="b" mt={-4}>
                                    {msg}
                                  </Text>
                                )}
                              />
                            </VStack>
                          </Td>
                          <Td fontSize={12} p={0} textAlign={"center"}>
                            <VStack>
                              <Field
                                as="select"
                                name="color"
                                id="color"
                                style={tableStyles}
                              >
                                <option value="" label="Color" />
                                {colorOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name="color"
                                render={(msg) => (
                                  <Text color={"red.500"} as="b" mt={-4}>
                                    {msg}
                                  </Text>
                                )}
                              />
                            </VStack>
                          </Td>
                          <Td
                            fontSize={12}
                            p={2}
                            textAlign={"center"}
                            width={"25%"}
                          >
                            <VStack>
                              <Field
                                type="number"
                                name="year"
                                id="year"
                                style={tableStyles}
                                placeholder="YYYY"
                              ></Field>
                              <ErrorMessage
                                name="year"
                                render={(msg) => (
                                  <Text color={"red.500"} as="b" mt={-4}>
                                    {msg}
                                  </Text>
                                )}
                              />
                            </VStack>
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </CardBody>
                <Divider color="gray.300" />
                <CardFooter display={"flex"} flexDirection="column" mt={-4}>
                  <HStack display={"flex"} justify={"center"}>
                    <VStack>
                      <Field
                        type="number"
                        name="price"
                        id="price"
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "8px",
                          outline: "none",
                          height: "2rem",
                          width: "90%",
                          marginTop: "1rem",
                          marginBottom: "1rem",
                        }}
                        placeholder="Enter a price"
                      ></Field>
                      <ErrorMessage
                        name="price"
                        render={(msg) => (
                          <Text color={"red.500"} as="b" mt={-4} mb={1}>
                            {msg}
                          </Text>
                        )}
                      />
                    </VStack>
                    <Text as={"b"}>US$/day</Text>
                  </HStack>
                  <Button type="submit" bg={"orange.200"}>
                    Edit a car!
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
        {success && (
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
            closeOnOverlayClick={false}
          >
            <AlertDialogOverlay>
              <AlertDialogContent mt={-20} mb={20}>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Success!
                </AlertDialogHeader>
                <AlertDialogBody>
                  You've edited a car successfully!
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    onClick={() => navigate("/admin")}
                    bg="green.100"
                  >
                    Back to the Admin Panel
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </Center>
    </Box>
  );
}
