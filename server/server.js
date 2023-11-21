import express from "express";
import router from "./src/router/router.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..','client', 'dist');

const addr = "127.0.0.1";
const port = 3030;
const app = express();

// express.static - built in middleware to serve static files
app.use(express.static(distPath));

app.use(express.json());
app.use("/api", router);


app.get("/health", (req, res) => {
    res.send("Server is up and healthy");
})

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, addr, () => {
    console.log(`Server is listening on http://${addr}:${port}`);
})
