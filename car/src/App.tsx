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
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import cars from "./data/data.json";
import CarCard from "./Components/carCard";

function App() {
  return (
    <ChakraProvider>
      <Center p="30" fontSize={"4xl"} as="b" color="orange.500">
        Choose your dream car!
      </Center>
      <Container>
        <HStack>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>

            <Input type="text" placeholder="Search a car..."></Input>
          </InputGroup>

          <InputGroup w={1 / 5}>
            <Input type="date"></Input>
          </InputGroup>

          <InputGroup w={1 / 5}>
            <Input type="date"></Input>
          </InputGroup>
        </HStack>
      </Container>

      <Wrap mx={20} my={10} justify="center" spacing={4}>
        {cars.map((car, i) => {
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
