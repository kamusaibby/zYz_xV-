module.exports = {
  config: {
    name: "tombot7",
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
    if (text === "tom ki single") {
      return message.reply("- 𝐧𝐚𝐚𝐡 𝐭𝐨𝐦𝐞𝐫 𝐱𝐮𝐧𝐝𝐨𝐫 𝐞𝐤𝐭𝐚 𝐛𝐨𝐰 𝐚𝐜𝐡𝐞 👰‍♀️");
    }
  }
};
