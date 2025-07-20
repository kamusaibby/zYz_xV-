module.exports = {
  config: {
    name: "tombot",
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
    if (text === "tom") {
      return message.reply("𝐎𝐲 𝐚𝐦𝐚𝐫 𝐨𝐰𝐧𝐞𝐫 𝐛𝐮𝐣𝐡𝐬𝐨𝐬𝐡  !!");
    }
  }
};
