module.exports = {
  config: {
    name: "tombot6",
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
    if (text === "samu") {
      return message.reply("𝐓𝐨𝐝𝐞𝐫 𝐯𝐡𝐚𝐛𝐢 𝐥𝐚𝐠𝐞 𝐭𝐨𝐦𝐞𝐫 𝐛𝐨𝐰 🙈");
    }
  }
};
