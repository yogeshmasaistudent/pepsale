import React, { useState, useEffect } from "react";
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
  Select,
} from "@chakra-ui/react";

const AddEditTaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  fields,
  initialData,
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        type: initialData.attributes.type,
        state: initialData.state,
      });
    } else {
      setFormData({});
    }
  }, [initialData]);

  const handleSubmit = () => {
    for (let field of fields) {
      if (!formData[field.name]) {
        alert(`Please fill out the ${field.label} field.`);
        return;
      }
    }
    if (initialData) {
      onSubmit({
        title: formData.title,
        attributes: { type: formData.type },
        state: formData.state,
      });
    } else {
      onSubmit({
        title: formData.title,
        attributes: { type: formData.type },
        state: formData.state,
      });
    }
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
          {initialData ? "Edit Task" : "Add New Task"}
        </ModalHeader>
        <ModalBody>
          <VStack spacing={5}>
            {fields.map((field) => (
              <FormControl key={field.name} isRequired>
                <FormLabel color="gray.700">{field.label}</FormLabel>
                {field.type === "select" ? (
                  <Select
                    placeholder={`Select ${field.label}`}
                    value={formData[field.name] || ""}
                    bg="gray.50"
                    borderRadius="md"
                    _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                ) : (
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
                )}
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
            {initialData ? "Update" : "Add"}
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

export default AddEditTaskModal;
