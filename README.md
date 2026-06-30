# CLI Multi-Turn Chatbot (Node.js & Python Integration)

A lightweight, multi-turn Command Line Interface (CLI) chatbot powered by Anthropic's Claude (`claude-3-5-sonnet-20241022`) model.

## Features
- **Integrated Architecture**: Combines a Node.js CLI coordinator with a Python backend script for handling Anthropic API communications.
- **Multi-turn Context**: Stores conversational history in-memory to maintain context during the chat.
- **Graceful Error Handling**: Detects API errors (such as credit limit / billing issues) and reports them cleanly without crashing the loop.
- **Extremely Lightweight**: Both scripts are compact and optimized for performance and readability.

---

## Setup Instructions

### 1. Installation
Install the Node.js package dependencies:
```bash
npm install
```

Install the Python dependencies:
```bash
pip install anthropic python-dotenv
```

### 2. Configure Environment Secrets
Create a `.env` file in the root of the project and add your API key:
```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

---

## Usage

Start the chatbot command interface:
```bash
node chatbot.js
```

Interact with the bot in your terminal. To close the chatbot, type `exit`.
