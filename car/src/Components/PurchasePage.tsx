import { useLocation } from "react-router-dom";
import { Box, Flex, HStack } from "@chakra-ui/react";
import CarCard from "./carCard";
import { CustomForm } from "./CustomForm";

const PurchasePage = () => {
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
    <Box pt={"5%"} bg={"blue.100"}>
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
          />
          <CustomForm price_per_day={price_per_day}></CustomForm>
        </HStack>
      </Flex>
    </Box>
  );
};

export default PurchasePage;