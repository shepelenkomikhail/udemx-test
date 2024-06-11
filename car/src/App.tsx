import {
  Center,
  ChakraProvider,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Wrap,
  WrapItem,
  VStack,
  Text,
  Box,
  Circle,
  Button,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

import { SearchIcon, Search2Icon } from "@chakra-ui/icons";
import cars from "./data/data.json";
import CarCard from "./Components/carCard";
import { carCardProps } from "./Types/carCardProps";
import { useState } from "react";

const getFilteredItems = (query: string, items: carCardProps[]) => {
  if (!query) return items;
  return items.filter(
    (item: carCardProps) =>
      item.make.includes(query) || item.model.includes(query)
  );
};

function App() {
  const [query, setQuery] = useState("");
  const filteredItems = getFilteredItems(query, cars);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleInputDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData);
    console.log(formJson);

    setDateFrom(String(formJson.dateFrom));
    setDateFrom(String(formJson.dateTo));
  };
  const isError: boolean = dateTo == "" && dateFrom == "";

  return (
    <ChakraProvider>
      <Center p="30" fontSize={"4xl"} as="b" color="orange.500">
        Choose your dream car!
      </Center>
      <Container>
        <HStack>
          <InputGroup>
            <VStack>
              <Text color={"gray.400"}>Model, name..</Text>

              <Box position="relative" width="100%">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search a car..."
                  pl="40px"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Box>
            </VStack>
          </InputGroup>

          <form onSubmit={handleInputDate}>
            <FormControl isInvalid={isError && submitted}>
              <HStack alignItems="end">
                <InputGroup>
                  <VStack>
                    <Text color="gray.400"> From </Text>
                    <Input
                      type="date"
                      width={150}
                      value={dateFrom}
                      name="dateFrom"
                      onChange={(e) => {
                        setDateFrom(e.target.value);
                      }}
                    ></Input>
                  </VStack>
                </InputGroup>

                <InputGroup>
                  <VStack>
                    <Text color="gray.400" width={150} textAlign={"center"}>
                      {" "}
                      To{" "}
                    </Text>
                    <Input
                      type="date"
                      value={dateTo}
                      name="dateTo"
                      onChange={(e) => {
                        setDateTo(e.target.value);
                      }}
                    ></Input>
                  </VStack>
                </InputGroup>

                <Button variant="outline" type="submit">
                  <Search2Icon></Search2Icon>
                </Button>
              </HStack>
            </FormControl>
          </form>
        </HStack>
      </Container>

      <Wrap mx={20} my={10} justify="center" spacing={4}>
        {filteredItems.map((car, i) => {
          return (
            <WrapItem key={i}>
              <CarCard {...car} />
            </WrapItem>
          );
        })}
      </Wrap>
    </ChakraProvider>
  );
}

export default App;
