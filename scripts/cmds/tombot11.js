module.exports = {
  config: {
    name: "tombot11",
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
    if (text === "oii tom") {
      return message.reply("𝐓𝐨𝐦 𝐫𝐞 𝐝𝐚𝐤𝐢𝐬𝐡 𝐧𝐡 𝐠𝐨𝐟 𝐥𝐨𝐢𝐲𝐚 𝐛𝐮𝐬𝐲 𝐚𝐜𝐡𝐞 𝐛𝐮𝐣𝐡𝐥𝐢 𝐦𝐨𝐠𝐚  !!");
    }
  }
};
