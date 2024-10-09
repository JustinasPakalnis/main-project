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
    "INSERT INTO inventory(`item`, `owner`, `location`, `value`, `status`, `createdate`, `comment`, `condition`) VALUES(?)";
  const values = [
    req.body.item,
    req.body.owner,
    req.body.location,
    req.body.value,
    req.body.status,
    req.body.createdate,
    req.body.comment,
    req.body.condition,
  ];
  console.log(req.body);

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Inventory buvo pagaminta");
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
    "UPDATE inventory SET `item` = ?, `owner` = ?, `location` = ?, `value` = ?, `status` = ?, `createdate` = ?, `comment` = ?, `condition` = ? WHERE id = ?";
  const values = [
    req.body.item,
    req.body.owner,
    req.body.location,
    req.body.value,
    req.body.status,
    req.body.createdate,
    req.body.comment,
    req.body.condition,
  ];
  db.query(q, [...values, inventoryId], (err, data) => {
    if (err) return res.json(err);
    return res.json("inventory buvo updeitinta");
  });
});

app.get("/users", (req, res) => {
  const q =
    "SELECT id, userstatus, type, firstName, lastName, email FROM main_project_database.users";

  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "An error occurred while fetching users.",
        error: err,
      });
    }

    return res.status(200).json(data);
  });
});

app.get("/usersFullNames", (req, res) => {
  const q =
    "SELECT id, CONCAT(firstName, ' ', lastName) AS fullName FROM main_project_database.users;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  const q = "SELECT * FROM main_project_database.users WHERE email = ?";

  db.query(q, [email], (err, data) => {
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

app.post("/users", (req, res) => {
  const q =
    "INSERT INTO users(`userstatus`, `password`, `type`, `firstName`, `lastName`, `email`) VALUES(?)";
  console.log(req.body);

  const values = [
    req.body.userstatus,
    req.body.password,
    req.body.type,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("User successfully registered");
  });
});

app.post("/users/comment", (req, res) => {
  const q =
    "INSERT INTO usercomment(`userID`, `comment`, `author`) VALUES (?, ?, ?)";

  const author =
    req.body.authorizedUser.firstName + " " + req.body.authorizedUser.lastName;

  const values = [req.body.userCommentID, req.body.comment, author];
  console.log(values);

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error inserting comment:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json("User successfully commented");
  });
});

app.get("/usercomments/:id", (req, res) => {
  const userId = req.params.id;

  const q = "SELECT * FROM main_project_database.usercomment WHERE userId = ?";
  console.log("Fetching comments for user ID:", userId);

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post("/inventory/transfer", (req, res) => {
  const insertQuery =
    "INSERT INTO item_transfers(`item_id`, `from_user`, `to_user`, `transfer_comment`, `status`) VALUES(?)";

  const updateQuery = "UPDATE inventory SET status = ? WHERE id = ?";

  const transferValues = [
    req.body.itemID,
    req.body.fromUser,
    req.body.toUser,
    req.body.comment,
    req.body.transferStatus,
  ];

  const updateValues = ["Transfer", req.body.itemID];

  db.query(insertQuery, [transferValues], (insertErr, insertData) => {
    if (insertErr) {
      return res.status(500).json(insertErr);
    }
    db.query(updateQuery, updateValues, (updateErr, updateData) => {
      if (updateErr) {
        return res.status(500).json(updateErr);
      }
      return res.json("Transfer was successful, and inventory was updated.");
    });
  });
});

app.get("/inventory/transferlist", (req, res) => {
  const q = `
   SELECT 
      item_transfers.*, 
      inventory.condition, 
      inventory.item, 
      CONCAT(toUser.firstName, ' ', toUser.lastName) AS toUserFullName,
      CONCAT(fromUser.firstName, ' ', fromUser.lastName) AS fromUserFullName
    FROM main_project_database.item_transfers
    JOIN main_project_database.inventory ON item_transfers.item_id = inventory.id
    JOIN main_project_database.users AS toUser ON item_transfers.to_user = toUser.id
    JOIN main_project_database.users AS fromUser ON item_transfers.from_user = fromUser.id
  `;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.put("/inventory/transfer/accept/:itemID/:transferID", (req, res) => {
  const itemId = req.params.itemID;
  const transferID = req.params.transferID;
  console.log(itemId);
  console.log(transferID);

  const updateValuesTransferq =
    "UPDATE item_transfers SET status = ? WHERE id= ?";
  const updateValuesItemsq = "UPDATE inventory SET status = ? WHERE id = ?";
  const updateValuesTransfer = ["completed", transferID];
  const updateValuesItems = ["Active", itemId];

  db.query(
    updateValuesTransferq,
    updateValuesTransfer,
    (insertErr, transferData) => {
      if (insertErr) {
        return res.status(500).json(insertErr);
      }
      db.query(
        updateValuesItemsq,
        updateValuesItems,
        (updateErr, inventoryData) => {
          if (updateErr) {
            return res.status(500).json(updateErr);
          }
          return res.json(
            "Transfer was successful, and inventory was updated."
          );
        }
      );
    }
  );
});

app.put("/inventory/transfer/decline/:itemID/:transferID", (req, res) => {
  const itemId = req.params.itemID;
  const transferID = req.params.transferID;
  console.log(itemId);
  console.log(transferID);

  const updateValuesTransferq =
    "UPDATE item_transfers SET status = ? WHERE id= ?";
  const updateValuesItemsq = "UPDATE inventory SET status = ? WHERE id = ?";
  const updateValuesTransfer = ["declined", transferID];
  const updateValuesItems = ["Active", itemId];

  db.query(
    updateValuesTransferq,
    updateValuesTransfer,
    (insertErr, transferData) => {
      if (insertErr) {
        return res.status(500).json(insertErr);
      }
      db.query(
        updateValuesItemsq,
        updateValuesItems,
        (updateErr, inventoryData) => {
          if (updateErr) {
            return res.status(500).json(updateErr);
          }
          return res.json(
            "Transfer was successful, and inventory was updated."
          );
        }
      );
    }
  );
});

app.listen(8800, () => {
  console.log("connected to backend");
});
