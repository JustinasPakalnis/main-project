import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "main_project_database",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/inventory", (req, res) => {
  const q = "SELECT * FROM main_project_database.inventory";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/inventory", (req, res) => {
  const q =
    "INSERT INTO inventory(`item`, `owner`, `location`, `value`) VALUES(?)";
  const values = [
    req.body.item,
    req.body.owner,
    req.body.location,
    req.body.value,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("inventory buvo pagaminta");
  });
});

app.delete("/inventory/:id", (req, res) => {
  const inventoryId = req.params.id;
  const q = "DELETE FROM inventory WHERE id = ?";
  db.query(q, [inventoryId], (err, data) => {
    if (err) return res.json(err);
    console.log("inventory buvo deletinta");
    return res.json("inventory buvo deletinta");
  });
});

app.put("/inventory/:id", (req, res) => {
  const inventoryId = req.params.id;
  const q =
    "UPDATE inventory SET `item` = ?, `owner` = ?, `location` = ?, `value` = ? WHERE id =?";
  const values = [
    req.body.item,
    req.body.owner,
    req.body.location,
    req.body.value,
  ];
  db.query(q, [...values, inventoryId], (err, data) => {
    if (err) return res.json(err);
    return res.json("inventory buvo updeitinta");
  });
});

const adminLogin = {
  userName: "Admin",
  userPassword: "Admin1",
};

const userData = [];
app.get("/users", (req, res) => {
  const q = "SELECT * FROM main_project_database.users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const q = "SELECT * FROM main_project_database.users WHERE username = ?";

  db.query(q, [username], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (data.length === 0) {
      return res.status(200).json({ message: "User not found" });
    }

    const user = data[0];

    if (user.password === password) {
      return res.status(200).json({
        message: "Login approved",
        user: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          type: user.type,
        },
      });
    } else {
      return res
        .status(200)
        .json({ message: "Login denied, incorrect password" });
    }
  });
});

app.listen(8800, () => {
  console.log("connected to backend");
});
