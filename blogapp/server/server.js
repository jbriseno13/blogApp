const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db-connection.js");

const app = express();

const PORT = 8081;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get("/", (req, res) => {
  res.json({ message: "Hello from My template ExpressJS" });
});

// create the get request
app.get("/api/blogs", cors(), async (req, res) => {
  try {
    const { rows: posts } = await db.query("SELECT * FROM blogtable");
    res.send(posts);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

app.post("/api/blogs", cors(), async (req, res) => {
  const newPost = {
    // timestamp: req.body.timestamp,
    post: req.body.post,
    image: req.body.image,
  };
  console.log([
  
    // newPost.timestamp,
    newPost.post,
    newPost.image,
  ]);
  const result = await db.query(
    "INSERT INTO blogtable( timestamp, post, image) VALUES(CURRENT_TIME, $1, $2) RETURNING *",
    [  newPost.post, newPost.image]
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

// //Edit button

// // app.put('/api/contacts/:contactId',cors(), async(req, res) => {
// //   const contactsId = req.params.contactsId;
// //   const updateContacts = {
// //     id: req.body.id,
// //     name: req.body.name,
// //     m_phone_number: req.body.m_phone_number,
// //     h_phone_number: req.body.h_phone_number,
// //     email: req.body.email,
// //     notes: req.body.notes,
// //   }
// //   console.log(contactsId);
// //   console.log(updateContacts);
// //   for(let contacts of Contacts){
// //     if(contacts.id==contactsId){
// //       let index = Contacts.indexOf(contacts)
// //       Contacts[index] = updateContacts
// //     }
// //   }
// //   res.send(Contacts)

// // });

// // app.put("/api/contacts/:id", async (req, res) => {
// //   const contactsId = req.params.id;
// //   console.log(req.params.id);
// //   try {
// //     await db.query ("UPDATE FROM contacts WHERE id=$1", [contactsId])
// //   }catch (e) {
// //     console.log(e);
// //     return res.status(400).json({ e });
// //   }
// // })

// app.put("/api/contacts/:id", async (req, res) => {
//   console.log(req.body, "this is the body");
//   // : acts as a placeholder
//   const contactId = req.params.id;
//   console.log(contactId);
//   const contact = {
//     name: req.body.name,
//     m_phone_number: req.body.m_phone_number,
//     h_phone_number: req.body.h_phone_number,
//     email: req.body.email,
//     notes: req.body.notes,
//   };
//   console.log("put", contact);
//   try {
//     await db.query(
//       "UPDATE contacts SET name=$1, m_phone_number=$2, h_phone_number=$3, email=$4, notes=$5  WHERE id=$6",
//       [
//         contact.name,
//         contact.m_phone_number,
//         contact.h_phone_number,
//         contact.email,
//         contact.notes,
//         contactId,
//       ]
//     );
//     //const { rows: contacts } = await db.query("SELECT * FROM contacts");
//     //res.send(contacts);
//     res.send({ status: "success" });
//   } catch (e) {
//     console.log(e);
//     return res.status(400).json({ e });
//   }
// });

// //Deletes contacts

// app.delete("/api/contacts/:id", async (req, res) => {
//   const contactsId = req.params.id;
//   console.log(req.params.id);
//   try {
//     await db.query("DELETE FROM contacts WHERE id=$1", [contactsId]);
//     res.send({ status: "success" });
//   } catch (e) {
//     console.log(e);
//     return res.status(400).json({ e });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// //___________________________________________________________________________
