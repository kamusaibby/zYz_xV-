module.exports = {
  config: {
    name: "tombot12",
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
    if (text === "tom kone") {
      return message.reply("𝐓𝐨𝐦 𝐭𝐨𝐦 𝐝𝐚𝐤𝐛𝐢 𝐧𝐚 𝐛𝐨𝐥𝐥𝐚𝐦 😒");
    }
  }
};
