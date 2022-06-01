const express = require("express");
const { uuid } = require("uuidv4");
const {
  getGames,
  getGameById,
  addOrUpdateGame,
  deleteGame,
} = require("./dynamo");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running");
});

app.get("/games", async (req, res) => {
  try {
    const games = await getGames();
    res.json(games);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong." });
  }
});

app.get("/games/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const game = await getGameById(id);
    res.json(game);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong." });
  }
});

app.post("/games", async (req, res) => {
  const game = req.body;
  game.id = uuid();
  try {
    const newGame = await addOrUpdateGame(game);
    res.json(newGame);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong." });
  }
});

app.put("/games/:id", async (req, res) => {
  const { id } = req.params;
  const game = req.body;
  game.id = id;
  try {
    const updatedGame = await addOrUpdateGame(game);
    res.json(updatedGame);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong." });
  }
});

app.delete("/games/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await deleteGame(id));
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong." });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
