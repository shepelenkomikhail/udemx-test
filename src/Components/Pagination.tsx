import { Button, HStack } from "@chakra-ui/react";
import { useState } from "react";

type PaginationProps = {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
}: PaginationProps) => {
  const [currentPage, setCurrentPageState] = useState(1);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    setCurrentPageState(page);
  };

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <HStack spacing={2}>
      {pages.map((page, index) => {
        return (
          <Button
            key={index}
            colorScheme={currentPage === page ? "blue" : "gray"}
            onClick={() => handleClick(page)}
          >
            {page}
          </Button>
        );
      })}
    </HStack>
  );
};

export default Pagination;
