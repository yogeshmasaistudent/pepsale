import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Heading,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Lane from "./Lane";
import BlockPreview from "./BlockPreview";
import DataEntryModal from "./DataEntryModal";
import AddEditTaskModal from "./AddEditTaskModal";

const LOCAL_STORAGE_KEY = "swimlane_blocks";

const SwimLaneUI = ({ config }) => {
  const [blocks, setBlocks] = useState([]);
  const [filteredBlocks, setFilteredBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showDataEntryModal, setShowDataEntryModal] = useState(false);
  const [transitionData, setTransitionData] = useState({});
  const [filter, setFilter] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAddEditOpen,
    onOpen: onAddEditOpen,
    onClose: onAddEditClose,
  } = useDisclosure();
  const [editBlock, setEditBlock] = useState(null);
  const toast = useToast();

  // Load blocks from Local Storage on mount
  useEffect(() => {
    const storedBlocks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedBlocks) {
      setBlocks(JSON.parse(storedBlocks));
    } else {
      // Initialize with default blocks if no data in Local Storage
      const initialBlocks = [
        {
          id: 1,
          title: "Block 1",
          state: "todo",
          attributes: { type: "task" },
          history: [],
        },
        {
          id: 2,
          title: "Block 2",
          state: "inProgress",
          attributes: { type: "bug" },
          history: [],
        },
        {
          id: 3,
          title: "Block 3",
          state: "done",
          attributes: { type: "feature" },
          history: [],
        },
      ];
      setBlocks(initialBlocks);
    }
  }, []);

  // Save blocks to Local Storage whenever blocks state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blocks));
  }, [blocks]);

  // Filter blocks based on the search input
  useEffect(() => {
    const filtered = blocks.filter(
      (block) =>
        block.title.toLowerCase().includes(filter.toLowerCase()) ||
        block.attributes.type.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredBlocks(filtered);
  }, [blocks, filter]);

  // Handle dropping a block into a new lane
  const handleDrop = (blockId, newState) => {
    const block = blocks.find((b) => b.id === blockId);
    if (config.allowedTransitions[block.state].includes(newState)) {
      setTransitionData({ blockId, oldState: block.state, newState });
      setShowDataEntryModal(true);
    } else {
      toast({
        title: "Invalid Transition",
        description: `Cannot move from ${block.state} to ${newState}.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle submitting transition data
  const handleDataSubmit = (data) => {
    const timestamp = new Date().toLocaleString();
    setBlocks(
      blocks.map((block) =>
        block.id === transitionData.blockId
          ? {
              ...block,
              state: transitionData.newState,
              history: [
                ...(block.history || []),
                {
                  from: transitionData.oldState,
                  to: transitionData.newState,
                  data,
                  timestamp,
                },
              ],
            }
          : block
      )
    );
    setShowDataEntryModal(false);
    toast({
      title: "Transition Successful",
      description: `Block moved to ${transitionData.newState}.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle clicking on a block to view details
  const handleBlockClick = (block) => {
    setSelectedBlock(block);
  };

  // Handle adding a new task
  const handleAddTask = () => {
    setEditBlock(null); // Ensure no block is being edited
    onAddEditOpen();
  };

  // Handle submitting a new or edited task
  const handleAddEditSubmit = (taskData) => {
    if (editBlock) {
      // Editing an existing block
      setBlocks(
        blocks.map((block) =>
          block.id === editBlock.id ? { ...block, ...taskData } : block
        )
      );
      toast({
        title: "Task Updated",
        description: `Task "${taskData.title}" has been updated.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Adding a new block
      const newBlock = {
        id: Date.now(), // Simple unique ID
        ...taskData,
        history: [],
      };
      setBlocks([...blocks, newBlock]);
      toast({
        title: "Task Added",
        description: `Task "${taskData.title}" has been added.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    onAddEditClose();
  };

  // Handle editing a block from the BlockPreview
  const handleEditBlock = () => {
    setEditBlock(selectedBlock);
    onAddEditOpen();
  };

  // Handle deleting a block from the BlockPreview
  const handleDeleteBlock = () => {
    setBlocks(blocks.filter((block) => block.id !== selectedBlock.id));
    setSelectedBlock(null);
    toast({
      title: "Task Deleted",
      description: `Task has been deleted.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box p={6} maxW="1200px" mx="auto">
        <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.600">
          Swim Lane Task Management
        </Heading>
        <HStack mb={4} spacing={4}>
          <Input
            placeholder="Filter blocks by title or type..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            borderRadius="lg"
            bg="white"
            boxShadow="md"
            p={4}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 5px rgba(66, 153, 225, 0.5)",
            }}
          />
          <Button
            colorScheme="teal"
            onClick={handleAddTask}
            px={6}
            py={6}
            borderRadius="full"
            fontWeight="bold"
          >
            Add Task
          </Button>
        </HStack>
        <HStack
          spacing={6}
          alignItems="flex-start"
          justifyContent="center"
          overflowX="auto"
        >
          {config.states.map((state) => (
            <Lane
              key={state}
              state={state}
              blocks={filteredBlocks.filter((block) => block.state === state)}
              onDrop={handleDrop}
              onBlockClick={handleBlockClick}
            />
          ))}
        </HStack>
        {selectedBlock && (
          <BlockPreview
            block={selectedBlock}
            onClose={() => setSelectedBlock(null)}
            onEdit={handleEditBlock}
            onDelete={handleDeleteBlock}
          />
        )}
        <DataEntryModal
          isOpen={showDataEntryModal}
          onClose={() => setShowDataEntryModal(false)}
          onSubmit={handleDataSubmit}
          fields={config.transitionFields[transitionData.newState] || []}
        />
        <AddEditTaskModal
          isOpen={isAddEditOpen}
          onClose={onAddEditClose}
          onSubmit={handleAddEditSubmit}
          fields={
            config.taskFields || [
              { name: "title", label: "Title", type: "text" },
              { name: "type", label: "Type", type: "text" },
              {
                name: "state",
                label: "State",
                type: "select",
                options: config.states,
              },
            ]
          }
          initialData={editBlock}
        />
      </Box>
    </DndProvider>
  );
};

export default SwimLaneUI;
