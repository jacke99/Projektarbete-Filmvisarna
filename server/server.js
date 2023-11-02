import express from "express";
import router from "./src/router/router.js";



const addr = "127.0.0.1";
const port = 3030;
const app = express();

app.use(express.json());
app.use("/api", router);


app.get("/health", (req, res) => {
    res.send("Server is up and healthy");
})

app.listen(port, addr, () => {
    console.log(`Server is listening on http://${addr}:${port}`);
})