import { Box, Flex, HStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import CarCard from "./CarCardComponent";
import { EditForm } from "./EditForm";

const EditCar = () => {
  const location = useLocation();
  const {
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
  return (
    <Box pt={"5%"} bg={"gray.50"} minHeight="100vh" width="100vw">
      <Flex justify={"center"}>
        <HStack
          spacing={20}
          py={8}
          px={14}
          borderWidth={"0.5px"}
          borderColor="gray.300"
          borderRadius={"md"}
          bg={"yellow.50"}
        >
          <CarCard
            make={make}
            model={model}
            year={year}
            color={color}
            fuel_type={fuel_type}
            transmission={transmission}
            price_per_day={price_per_day}
            available={available}
            image={image}
            isAdmin={true}
          />
          <EditForm
            make={make}
            model={model}
            year={year}
            color={color}
            fuel_type={fuel_type}
            transmission={transmission}
            price_per_day={price_per_day}
            available={available}
            image={image}
          ></EditForm>
        </HStack>
      </Flex>
    </Box>
  );
};

export default EditCar;
