# Swimlane UI with Drag-and-Drop Functionality

## Project Overview

This project implements a Swimlane User Interface (UI) that supports drag-and-drop functionality for blocks representing different stages or states. The UI provides configurable swimlanes, block transitions with data entry prompts, block previews with transition history, and top-level filtering for enhanced user experience and productivity.

## Features

- **Drag-and-Drop Swimlanes**: Move blocks between swimlanes representing various states.
- **Configurable UI**: Blocks can only move to specified lanes based on predefined rules in the master configuration.
- **Transition Data Entry**: Upon moving a block, users are prompted to enter required data to confirm the transition.
- **Block Preview**: Clicking on a block displays its details, including a history of its transitions.
- **Top-Level Filter**: Filter blocks based on specified attributes, making it easier to manage and track specific blocks.

## Tech Stack

- **Frontend**: React.js with Redux for state management.
- **UI Library**: Any preferred UI library (e.g., Material-UI, Chakra UI) to enhance the overall user experience.
- **Backend**: Mocked data (optional backend integration).

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yogeshmasaistudent/pepsale.git
   cd swimlane-ui
