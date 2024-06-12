import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type CustomFormProps = {
  price_per_day: number;
};

export const CustomForm = ({ price_per_day }: CustomFormProps) => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  if (success) {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }

  return (
    <Formik
      initialValues={{ name: "", email: "", address: "", days: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("Name is required!")
          .min(3, "Name should contain at least 3 letters!"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required!"),
        address: Yup.string()
          .required("Address is required!")
          .min(10, "Address should contain at least 10 letters!"),
        days: Yup.number()
          .positive("Days amount should be positive!")
          .min(1, "Choose at least 1 day!")
          .required("Days field is required!"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
        setSuccess(true);
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Box
          borderWidth={"0.5px"}
          borderColor="gray.300"
          borderRadius={"md"}
          shadow={"md"}
        >
          <Form style={{ padding: "1rem" }}>
            <Flex direction={"column"} align={"center"} justify={"center"}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Field
                name="name"
                type="text"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "8px",
                  outline: "none",
                  width: "100%",
                }}
              ></Field>
              <ErrorMessage
                name="name"
                render={(msg) => (
                  <Text color={"red.500"} as="b">
                    {msg}
                  </Text>
                )}
              ></ErrorMessage>

              <FormLabel htmlFor="email" pt={2}>
                Email
              </FormLabel>
              <Field
                name="email"
                type="text"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "8px",
                  outline: "none",
                  width: "100%",
                }}
              ></Field>
              <ErrorMessage
                name="email"
                render={(msg) => (
                  <Text color={"red.500"} as="b">
                    {msg}
                  </Text>
                )}
              ></ErrorMessage>

              <FormLabel htmlFor="address" pt={2}>
                Address
              </FormLabel>
              <Field
                name="address"
                type="text"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "8px",
                  outline: "none",
                  width: "100%",
                }}
              ></Field>
              <ErrorMessage
                name="address"
                render={(msg) => (
                  <Text color={"red.500"} as="b">
                    {msg}
                  </Text>
                )}
              ></ErrorMessage>

              <FormLabel htmlFor="days" pt={2}>
                Days
              </FormLabel>
              <Field
                name="days"
                type="number"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "8px",
                  outline: "none",
                  width: "100%",
                }}
                onChange={(event) => {
                  event.target.value !== "" &&
                    event.target.value >= 0 &&
                    setPrice(parseInt(event.target.value));
                  setFieldValue("days", event.target.value);
                }}
              ></Field>
              <ErrorMessage
                name="days"
                render={(msg) => (
                  <Text color={"red.500"} as="b">
                    {msg}
                  </Text>
                )}
              ></ErrorMessage>

              <Box pt={3}>
                <Button type="submit" variant={"outline"} bg={"orange.100"}>
                  Pay {price * price_per_day} $
                </Button>
              </Box>
            </Flex>
          </Form>
          {success && (
            <Alert status="success">
              <AlertIcon />
              Car is rented!
            </Alert>
          )}
        </Box>
      )}
    </Formik>
  );
};
