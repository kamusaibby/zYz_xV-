module.exports = {
  config: {
    name: "tombot8",
    version: "1.0",
    author: "𝐓𝐎𝐌 🦆💨",
    countDown: 1,
    role: 0,
    shortDescription: "Reply to 'tom'",
    longDescription: "Replies with a fixed message when someone says 'tom'",
    category: "fun",
    guide: "Just type: tom"
  },

  onStart: async function () {
    // Nothing needed here
  },

  onChat: async function ({ event, message }) {
    const text = (event.body || "").toLowerCase().trim();
    if (text === "owner ke") {
      return message.reply("𝐀𝐦𝐫 𝐨𝐰𝐧𝐞𝐫 𝐭𝐨𝐦 🙈");
    }
  }
};
