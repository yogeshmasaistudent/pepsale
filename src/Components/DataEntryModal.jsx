import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
} from "@chakra-ui/react";

const DataEntryModal = ({ isOpen, onClose, onSubmit, fields }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="white" borderRadius="xl" boxShadow="2xl" p={4}>
        <ModalHeader
          color="teal.500"
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
        >
          Enter Transition Data
        </ModalHeader>
        <ModalBody>
          <VStack spacing={5}>
            {fields.map((field) => (
              <FormControl key={field.name}>
                <FormLabel color="gray.700">{field.label}</FormLabel>
                <Input
                  type={field.type}
                  value={formData[field.name] || ""}
                  bg="gray.50"
                  borderRadius="md"
                  _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                />
              </FormControl>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            px={8}
            py={6}
            borderRadius="full"
            fontWeight="bold"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="outline"
            borderColor="teal.500"
            color="teal.500"
            borderRadius="full"
            px={8}
            py={6}
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DataEntryModal;
