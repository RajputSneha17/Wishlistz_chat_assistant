export const chatHandler = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    res.json({
      reply: `You said: ${message}`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Server error" });
  }
};
