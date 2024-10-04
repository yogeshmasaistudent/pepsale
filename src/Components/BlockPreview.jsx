import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Box,
  Divider,
  Icon,
  Button,
  HStack,
  ModalFooter,
} from "@chakra-ui/react";
import { FiArchive, FiEdit, FiTrash2 } from "react-icons/fi";

const BlockPreview = ({ block, onClose, onEdit, onDelete }) => {
  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="white" borderRadius="lg" boxShadow="2xl">
        <ModalHeader
          color="teal.500"
          fontWeight="bold"
          fontSize="2xl"
          textAlign="center"
        >
          {block.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={5} p={4}>
            {/* State Info */}
            <Box>
              <Text fontWeight="semibold" fontSize="lg" color="gray.700">
                Current State:
              </Text>
              <Text mt={2} fontSize="md" color="gray.500">
                {block.state}
              </Text>
            </Box>

            <Divider />

            {/* Type Info */}
            <Box>
              <Text fontWeight="semibold" fontSize="lg" color="gray.700">
                Type:
              </Text>
              <Text mt={2} fontSize="md" color="gray.500">
                {block.attributes.type}
              </Text>
            </Box>

            <Divider />

            {/* Transition History */}
            <Box>
              <Text fontWeight="semibold" fontSize="lg" color="gray.700">
                Transition History:
              </Text>
              {block.history && block.history.length > 0 ? (
                block.history.map((transition, index) => (
                  <Box
                    key={index}
                    p={3}
                    mt={3}
                    bg="gray.50"
                    borderRadius="md"
                    boxShadow="md"
                    transition="transform 0.2s ease"
                    _hover={{ transform: "scale(1.02)" }}
                  >
                    <HStack justifyContent="space-between">
                      <Text>{`From ${transition.from} to ${transition.to}`}</Text>
                      <Text fontSize="sm" color="gray.400">
                        {transition.timestamp}
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      {JSON.stringify(transition.data)}
                    </Text>
                  </Box>
                ))
              ) : (
                <Box mt={3} display="flex" alignItems="center">
                  <Icon as={FiArchive} color="gray.400" mr={2} />
                  <Text fontSize="md" color="gray.500">
                    No transitions yet
                  </Text>
                </Box>
              )}
            </Box>
          </VStack>
        </ModalBody>
        <Divider />
        <ModalFooter justifyContent="space-between">
          <HStack spacing={4}>
            <Button
              leftIcon={<FiEdit />}
              colorScheme="blue"
              variant="outline"
              onClick={onEdit}
            >
              Edit
            </Button>
            <Button
              leftIcon={<FiTrash2 />}
              colorScheme="red"
              variant="outline"
              onClick={onDelete}
            >
              Delete
            </Button>
          </HStack>
          <Button onClick={onClose} variant="ghost">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BlockPreview;
