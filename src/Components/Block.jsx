import React from "react";
import { Box, Text, Icon, Flex } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { FiMove } from "react-icons/fi";

const Block = ({ block, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "block",
    item: { id: block.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={drag}
      bgGradient="linear(to-r, teal.500, blue.500)"
      p={4}
      borderRadius="lg"
      boxShadow="lg"
      opacity={isDragging ? 0.6 : 1}
      cursor="pointer"
      onClick={onClick}
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "xl",
      }}
      _active={{
        transform: "scale(0.98)",
      }}
    >
      <Flex alignItems="center">
        <Icon as={FiMove} color="whiteAlpha.800" boxSize={6} mr={2} />
        <Text color="white" fontWeight="bold" fontSize="lg">
          {block.title}
        </Text>
      </Flex>
      <Text fontSize="sm" color="whiteAlpha.700" mt={2}>
        {block.attributes.type}
      </Text>
    </Box>
  );
};

export default Block;
