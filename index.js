import express from "express";
import bcrypt from "bcrypt";
const app = express();
app.use(express.json());

const users = [];
app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.get("/users", (req, res) => {
    res.json(users);
})

app.post("/users", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send(password)
    } catch (error) {
        res.status(500).send();
    }
})

app.post("/users/login", async (req, res) => {
    const user = users.find(user => user.name === req.body.name);
    if (user == null) return res.status(404).send("User not found");
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Success")
        } else {
            res.send("Not allowed")
        }
    } catch (error) {
        res.status(500).send();
    }
})

app.listen(8080, () => console.log("listeing to port 8080"));