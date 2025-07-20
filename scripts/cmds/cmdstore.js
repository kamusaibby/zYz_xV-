 const axios = require("axios");

const availableCmdsUrl = "https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/availableCmds.json";
const cmdUrlsJson = "https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/cmdUrls.json";
const ITEMS_PER_PAGE = 10;

async function runCommand({ api, event, args }) {
  const query = args.join(" ").trim().toLowerCase();

  try {
    const response = await axios.get(availableCmdsUrl);
    let cmds = response.data.cmdName;
    let finalArray = cmds;
    let page = 1;

    if (query) {
      if (!isNaN(query)) {
        page = parseInt(query);
      } else if (query.length === 1) {
        finalArray = cmds.filter(cmd => cmd.cmd.startsWith(query));
        if (finalArray.length === 0) {
          return api.sendMessage(`❌ | "${query}"𝐝𝐢𝐲𝐞 𝐤𝐨𝐧𝐨 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐩𝐚𝐨𝐚 𝐣𝐚𝐲 𝐧𝐢  !!`, event.threadID, event.messageID);
        }
      } else {
        finalArray = cmds.filter(cmd => cmd.cmd.includes(query));
        if (finalArray.length === 0) {
          return api.sendMessage(`❌ | "${query}"𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐭𝐚 𝐤𝐡𝐮𝐣𝐡𝐞 𝐩𝐚𝐜𝐜𝐡𝐢 𝐧𝐚𝐡 !!`, event.threadID, event.messageID);
        }
      }
    }

    const totalPages = Math.ceil(finalArray.length / ITEMS_PER_PAGE);
    if (page < 1 || page > totalPages) {
      return api.sendMessage(
        `❌ | Please page number 1 theke ${totalPages} 𝐄𝐫 𝐦𝐨𝐝𝐝𝐡𝐞 𝐝𝐚𝐰 !!`,
        event.threadID,
        event.messageID
      );
    }

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const cmdsToShow = finalArray.slice(startIndex, endIndex);

    let msg = `╭───✦ Cmd Store ✦───╮\n│ 📜 Page: ${page} of ${totalPages} page(s)\n│ 💬 Total: ${finalArray.length} commands\n`;

    cmdsToShow.forEach((cmd, index) => {
      msg += `│ ───✦ ${startIndex + index + 1}. ${cmd.cmd}\n│ 👤 AUTHOR: ${cmd.author}\n│ 🔄 UPDATE: ${cmd.update || "N/A"}\n`;
    });
    msg += `╰─────────────⧕`;

    if (page < totalPages) {
      msg += `\nType "cmdstore ${page + 1}" 𝐟𝐨𝐫 𝐦𝐨𝐫𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬! 😎`;
    }

    api.sendMessage(
      msg,
      event.threadID,
      (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: "cmdstore",
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
          cmdName: finalArray,
          page
        });
      },
      event.messageID
    );
  } catch (error) {
    api.sendMessage("❌ |𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐥𝐨𝐚𝐝 𝐤𝐨𝐫𝐭𝐞 𝐠𝐢𝐲𝐞 𝐛𝐡𝐮𝐥 𝐡𝐨𝐲𝐞𝐜𝐡𝐞 !!", event.threadID, event.messageID);
  }
}

module.exports = {
  config: {
    name: "cmdstore",
    aliases: ["cs", "cmds"],
    author: "Dipto",
    version: "6.9",
    role: 2,
    description: {
      en: "Commands Store of Dipto"
    },
    countDown: 3,
    category: "goatbot",
    guide: {
      en: "{pn} [command name | single character | page number]"
    }
  },

  onStart: async function ({ api, event, args }) {
    runCommand({ api, event, args });
  },

  onChat: async function ({ api, event }) {
    const body = event.body || "";
    const args = body.trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();
    if (["cmdstore", "cs", "cmds"].includes(commandName)) {
      runCommand({ api, event, args });
    }
  },

  onReply: async function ({ api, event, Reply }) {
    if (Reply.author != event.senderID) {
      return api.sendMessage("𝐖𝐡𝐨 𝐚𝐫𝐞 𝐲𝐨𝐮? 🐸", event.threadID, event.messageID);
    }

    const reply = parseInt(event.body);
    const startIndex = (Reply.page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    if (isNaN(reply) || reply < startIndex + 1 || reply > endIndex) {
      return api.sendMessage(
        `❌ | Please reply with a number between ${startIndex + 1} and ${Math.min(endIndex, Reply.cmdName.length)}.`,
        event.threadID,
        event.messageID
      );
    }

    try {
      const cmdName = Reply.cmdName[reply - 1].cmd;
      const { status } = Reply.cmdName[reply - 1];
      const response = await axios.get(cmdUrlsJson);
      const selectedCmdUrl = response.data[cmdName];

      if (!selectedCmdUrl) {
        return api.sendMessage("❌ | 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐔𝐑𝐋 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝 !!", event.threadID, event.messageID);
      }

      api.unsendMessage(Reply.messageID);
      const msg = `╭───────⭓\n│ STATUS : ${status || "N/A"}\n│ Command Url: ${selectedCmdUrl}\n╰─────────────⭓`;
      api.sendMessage(msg, event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage("❌ | 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐔𝐑𝐋 𝐩𝐚𝐰𝐚 𝐣𝐚𝐲 𝐧𝐢 !!", event.threadID, event.messageID);
    }
  }
};
