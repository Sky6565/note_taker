// Import Express.js
const express = require("express");

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require("path");
const fs = require("fs");

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// Static middleware pointing to the public folder
app.use(express.static("public"));

// GET request for Notes
app.get("/api/notes", (req, res) => {
  // Send a message to the client
  res.json(`${req.method} request received to get notes`);

  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});

// POST request to add a notes
app.post("/api/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a notes`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (tittle && txt) {
    // Variable for the object we will save
    const newNotes = {
      title,
      text,
    };

    // Convert the data to a string so we can save it
    const notesString = JSON.stringify(newNotes);

    // Obtain existing notes
    fs.readFile("./db/notes.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsednotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNotes);

        // Write the string to a file
        fs.writeFile(
          "./db/notes.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!")
        );
      }
    });

    const response = {
      status: "saved",
      body: newNotes,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting notes");
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
