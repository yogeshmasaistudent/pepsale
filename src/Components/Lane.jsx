import React from "react";
import { VStack, Box, Text } from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import Block from "./Block";

const Lane = ({ state, blocks, onDrop, onBlockClick }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "block",
    drop: (item) => onDrop(item.id, state),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box
      ref={drop}
      bg={isOver ? "teal.50" : "gray.50"}
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      transition="background-color 0.3s ease"
      minWidth="250px"
      maxWidth="350px"
      minHeight="400px"
      border="2px solid"
      borderColor={isOver ? "teal.400" : "gray.200"}
      _hover={{ borderColor: "teal.400", transform: "scale(1.02)" }}
      transform={isOver ? "scale(1.02)" : "scale(1.00)"}
    >
      <Text
        fontWeight="extrabold"
        mb={4}
        fontSize="lg"
        textAlign="center"
        color="teal.600"
        letterSpacing="wide"
      >
        {state}
      </Text>
      <VStack spacing={4} align="stretch">
        {blocks.map((block) => (
          <Block
            key={block.id}
            block={block}
            onClick={() => onBlockClick(block)}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Lane;
