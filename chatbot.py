import sys
import os
import json
from anthropic import Anthropic
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()

# Initialize the Anthropic client using the environment key
api_key = os.getenv("ANTHROPIC_API_KEY")
client = Anthropic(api_key=api_key)
history = []

def main():
    # Read inputs line-by-line from stdin
    for line in sys.stdin:
        msg = line.strip()
        if not msg:
            continue
        
        # Add user query to conversation history
        history.append({"role": "user", "content": msg})
        
        try:
            # Create message call using Claude
            message = client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=300,
                messages=history
            )
            reply = message.content[0].text
            
            # Store assistant response to maintain conversational context
            history.append({"role": "assistant", "content": reply})
            
            # Respond to parent process with success and reply
            print(json.dumps({"status": "success", "reply": reply}), flush=True)
            
        except Exception as e:
            # Remove failed message so history isn't poisoned
            history.pop()
            print(json.dumps({"status": "error", "message": str(e)}), flush=True)

if __name__ == "__main__":
    main()
