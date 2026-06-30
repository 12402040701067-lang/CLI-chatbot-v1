import { spawn } from "child_process";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pythonProcess = spawn("python", [path.join(__dirname, "chatbot.py")]);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("🤖 Anthropic Node+Python Chatbot\nType 'exit' to quit\n");

pythonProcess.on("close", (code) => {
    if (code !== 0) {
        console.log(`\nPython backend exited with code ${code}`);
    }
    process.exit();
});

let stdoutData = "";
let pendingCallback = null;

pythonProcess.stdout.on("data", (data) => {
    stdoutData += data.toString();
    if (stdoutData.includes("\n")) {
        const lines = stdoutData.split("\n");
        stdoutData = lines.pop();
        for (const line of lines) {
            if (line.trim() && pendingCallback) {
                try {
                    const response = JSON.parse(line);
                    pendingCallback(response);
                } catch (e) {
                    console.error("Error parsing Python output:", line);
                }
            }
        }
    }
});

pythonProcess.stderr.on("data", (data) => {
    console.error(`Python Error: ${data}`);
});

function promptUser() {
    rl.question("You: ", (msg) => {
        if (msg.trim().toLowerCase() === "exit") {
            console.log("Bye 👋");
            pythonProcess.kill();
            rl.close();
            return;
        }
        
        pendingCallback = (response) => {
            if (response.status === "success") {
                console.log(`\nBot: ${response.reply}\n`);
            } else {
                console.log(`\nError: ${response.message}\n`);
            }
            promptUser();
        };

        pythonProcess.stdin.write(msg.trim() + "\n");
    });
}

promptUser();