import {
  ChakraProvider,
  Center,
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
import AdminPage from "./Components/AdminPage";
import Pagination from "./Components/Pagination";

const getFilteredItems = (query, items) => {
  if (!query) return items;
  return items.filter(
    ({ item }: carCardProps) =>
      item.make.toLowerCase().includes(query.toLowerCase()) ||
      item.model.toLowerCase().includes(query.toLowerCase())
  );
};

const getFilteredItemsByDates = (queryDateFrom, queryDateTo, items) => {
  if (!queryDateFrom || !queryDateTo) return items;
  return items.filter(
    ({ item }: carCardProps) =>
      item.available === "true" ||
      (item.available === "false" &&
        item.unavailable_dates &&
        new Date(item.unavailable_dates[1]) <= queryDateFrom)
  );
};

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [currentPosts, setCurrentPosts] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    let updatedFilteredItems = getFilteredItems(debouncedQuery, cars);
    if (dateFrom && dateTo) {
      updatedFilteredItems = getFilteredItemsByDates(
        new Date(dateFrom),
        new Date(dateTo),
        updatedFilteredItems
      );
    }
    setFilteredItems(updatedFilteredItems);
  }, [debouncedQuery, dateFrom, dateTo]);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setCurrentPosts(filteredItems.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, filteredItems, postsPerPage]);

  const handleInputDate = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setDateFrom(e.target.dateFrom.value);
    setDateTo(e.target.dateTo.value);
  };

  const isError = !dateTo && !dateFrom && submitted;

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Box bg="gray.50" w={"100vw"} h={"80vw"}>
                <Center pt="30" pb="5" fontSize="4xl" as="b" color="orange.500">
                  Choose your dream car!
                </Center>
                <Container centerContent>
                  <StackComponent>
                    <InputGroup>
                      <VStack align="stretch" width="full">
                        <Text color="gray.400">Model, name...</Text>
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
                      <FormControl isInvalid={isError}>
                        <HStack alignItems="end">
                          <InputGroup>
                            <VStack>
                              <Text color="gray.400">From</Text>
                              <Input
                                type="date"
                                width={150}
                                name="dateFrom"
                                onChange={(e) => setDateFrom(e.target.value)}
                              />
                            </VStack>
                          </InputGroup>
                          <InputGroup>
                            <VStack>
                              <Text color="gray.400">To</Text>
                              <Input
                                type="date"
                                name="dateTo"
                                width={150}
                                onChange={(e) => setDateTo(e.target.value)}
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
                  {currentPosts.map((car, i) => (
                    <WrapItem key={i}>
                      <CarCard {...car} />
                    </WrapItem>
                  ))}
                </Wrap>
                <Center pb="8">
                  <Pagination
                    totalPosts={filteredItems.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                  />
                </Center>
              </Box>
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
