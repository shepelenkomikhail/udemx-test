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
import { carCardProps } from "../Types/carCardProps";

export const EditForm = ({
  make,
  model,
  year,
  color,
  fuel_type,
  transmission,
  price_per_day,
  available,
  image,
  isAdmin,
}: carCardProps) => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  if (success) {
    setTimeout(() => {
      navigate("/admin");
    }, 500);
  }

  return <>Admin Lox</>;
};
