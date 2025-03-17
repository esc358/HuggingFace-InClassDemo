var express = require("express");
var router = express.Router();
const { HfInference } = require("@huggingface/inference");
const accessToken = require("../configs/access");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/text-generator", async (req, res) => {
  try {
    const question = req.body.question;
    const client = new HfInference(accessToken);

    const chatCompletion = await client.chatCompletion({
      model: "google/gemma-2-2b-it",
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
      provider: "hf-inference",
      max_tokens: 500,
    });

    const chatCompletionGeneratedText =
      chatCompletion.choices[0].message.content;

    res.json(chatCompletionGeneratedText);
  } catch (error) {
    console.error("Error generating prediction:", error);
    res.status(500).json({ error: "Failed to generate prediction" });
  }
});

module.exports = router;
