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
  Image,
} from "@chakra-ui/react";
import { SearchIcon, Search2Icon } from "@chakra-ui/icons";
import CarCard from "./CarCardComponent";
import { useContext, useEffect, useState } from "react";
import StackComponent from "./StackComponent";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { MyContext } from "../context/myProvider";

const getFilteredItems = (query, items) => {
  if (!query) return items;
  return items.filter((item) => {
    const { make, model } = item;
    return (
      make.toLowerCase().includes(query.toLowerCase()) ||
      model.toLowerCase().includes(query.toLowerCase())
    );
  });
};

const getFilteredItemsByDates = (queryDateFrom, queryDateTo, items) => {
  if (!queryDateFrom || !queryDateTo) return items;
  return items.filter(
    ({ item }) =>
      item.available === "true" ||
      (item.available === "false" &&
        item.unavailable_dates &&
        new Date(item.unavailable_dates[1]) <= queryDateFrom)
  );
};

function AdminPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [filteredItems, setFilteredItems] = useState([]);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(0);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1200) {
        setPostsPerPage(12);
      } else {
        setPostsPerPage(8);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [currentPosts, setCurrentPosts] = useState([]);

  const context = useContext(MyContext);
  const { data } = context;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    let updatedFilteredItems = getFilteredItems(debouncedQuery, data);
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

  useEffect(() => {
    setFilteredItems(data);
  }, [data]);

  const handleInputDate = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setDateFrom(e.target.dateFrom.value);
    setDateTo(e.target.dateTo.value);
  };

  const isError = !dateTo && !dateFrom && submitted;
  const navigate = useNavigate();
  const handleAddCar = () => {
    navigate("/add");
  };
  const isSmallScreen = window.innerWidth <= 600;

  return (
    <ChakraProvider>
      <Box bg="gray.50" w={"100vw"} h={"100vw"}>
        <button
          style={{
            left: "0",
            top: "0",
            position: "absolute",
            marginTop: "20px",
            marginLeft: "25px",
          }}
          onClick={() => {
            navigate("//");
          }}
        >
          <Image src="./assets/images/admin.png"></Image>
          User
        </button>

        <Center pt="30" pb="5" fontSize="4xl" as="b" color="orange.500">
          Welcome Admin!
        </Center>
        <Button
          position={"absolute"}
          style={{
            top: "0",
            right: "0",
            margin: isSmallScreen ? "0" : "30px",
            backgroundColor: "orange.200",
          }}
          bg={"orange.200"}
          onClick={handleAddCar}
        >
          Add a car!
        </Button>
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
              <CarCard {...car} isAdmin={true} />
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
    </ChakraProvider>
  );
}

export default AdminPage;
