import { ReactNode } from "react";
import { HStack, VStack, useBreakpointValue } from "@chakra-ui/react";

interface StackComponentProps {
  children: ReactNode;
}

export default function StackComponent({ children }: StackComponentProps) {
  const Stack =
    useBreakpointValue({
      base: VStack,
      md: HStack,
      lg: HStack,
    }) || VStack;

  return <Stack>{children}</Stack>;
}
