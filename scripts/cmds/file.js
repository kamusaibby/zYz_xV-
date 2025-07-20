const fs = require('fs');

module.exports = {
  config: {
    name: "sendfile",
    aliases: ["file"],
    version: "1.0",
    author: "Mahir Tahsan",
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["61552930114349",];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("- 𝐒𝐫𝐲 𝐬𝐢𝐫 𝐚𝐩𝐧𝐚𝐫 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐧𝐞𝐢 𝐨𝐧𝐥𝐲 𝐚𝐦𝐚𝐫 𝐛𝐨𝐬𝐬 𝐮𝐬𝐞 𝐤𝐨𝐫𝐭𝐞 𝐩𝐚𝐫𝐛𝐞 🐤", event.threadID, event.messageID);
    }

    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
