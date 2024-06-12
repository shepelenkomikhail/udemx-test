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
  Button,
  FormControl,
} from "@chakra-ui/react";

import { SearchIcon, Search2Icon } from "@chakra-ui/icons";
import cars from "./data/data.json";
import CarCard from "./Components/carCard";
import { carCardProps } from "./Types/carCardProps";
import { useEffect, useState } from "react";
import StackComponent from "./Components/StackComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PurchasePage from "./Components/PurchasePage";
import React from "react";
import AdminPage from "./Components/AdminPage";

const getFilteredItems = (query: string, items: carCardProps[]) => {
  if (!query) return items;
  return items.filter(
    (item: carCardProps) =>
      item.make.includes(query) || item.model.includes(query)
  );
};

const getFilteredItemsByDates = (
  queryDateFrom: Date,
  queryDateTo: Date,
  items: carCardProps[]
) => {
  if (!queryDateFrom || !queryDateTo) return items;
  return items.filter(
    (item: carCardProps) =>
      item.available === "true" ||
      (item.available === "false" &&
        item.unavailable_dates &&
        new Date(item?.unavailable_dates[1]) <= queryDateFrom)
  );
};

function App() {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(
    getFilteredItems(query, cars)
  );

  useEffect(() => {
    setFilteredItems(getFilteredItems(query, cars));
  }, [query]);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleInputDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const formData = new FormData(e.currentTarget);

    const dateFromStr = formData.get("dateFrom") as string;
    const dateToStr = formData.get("dateTo") as string;

    setDateFrom(dateFromStr);
    setDateTo(dateToStr);

    const fromDate = dateFromStr ? new Date(dateFromStr) : undefined;
    const toDate = dateToStr ? new Date(dateToStr) : undefined;

    if (fromDate && toDate) {
      setFilteredItems(getFilteredItemsByDates(fromDate, toDate, cars));
    }
  };

  const isError: boolean = dateTo === "" && dateFrom === "";

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Center
                  pt={"30"}
                  pb={"5"}
                  fontSize={"4xl"}
                  as="b"
                  color="orange.500"
                >
                  Choose your dream car!
                </Center>
                <Container centerContent>
                  <StackComponent>
                    <InputGroup>
                      <VStack align="stretch" width={"full"}>
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
                              />
                            </VStack>
                          </InputGroup>

                          <InputGroup>
                            <VStack>
                              <Text color="gray.400" textAlign={"center"}>
                                {" "}
                                To{" "}
                              </Text>
                              <Input
                                type="date"
                                value={dateTo}
                                name="dateTo"
                                width={150}
                                onChange={(e) => {
                                  setDateTo(e.target.value);
                                }}
                              />
                            </VStack>
                          </InputGroup>

                          <Button variant="outline" type="submit">
                            <Search2Icon />
                          </Button>
                        </HStack>
                      </FormControl>
                    </form>
                  </StackComponent>
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
              </div>
            }
          />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
