module.exports = {
    config: {
        name: "tom-birthday",
        version: "1.0",
        author: "Samir",
        aliases: ["tom-bty"],
        countDown: 5,
        role: 0,
        category: "birthday🎀",
        shortDescription: "See tom's Birthday",
        longDescription: "tom's Birthday Countdown",
        guide: {
            vi: "{p}{n}",
            en: "{p}{n}"
        }
    },

    onStart: async function ({ event, api }) {
        const currentYear = new Date().getFullYear();
        // Set target date to November 9 of current year
        const targetDate = new Date(`November 9, ${currentYear} 00:00:00`).getTime();
        const now = new Date().getTime();
        
        // If birthday has passed this year, set target to next year
        let t = targetDate - now;
        if (t <= 0) {
            const nextYear = currentYear + 1;
            const nextTargetDate = new Date(`November 9, ${nextYear} 00:00:00`).getTime();
            t = nextTargetDate - now;
        }

        if (t <= 0) {
            return api.sendMessage("🎉🎂 Happy birthday Saif!!", event.threadID, event.messageID);
        }

        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));

        const countdownMessage = `
🤍🎀 𝐓𝐎𝐌 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆_♡︎ 
━━━━━━━━━━━━━━━━━━━━━━
🐼 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆 𝗗𝗮𝘁𝗲: 9th November, 2007
📅 𝗧𝗶𝗺𝗲 𝗟𝗲𝗳𝘁 𝗳𝗼𝗿 𝗻𝗲𝘅𝘁 𝗯𝗶𝗿𝘁𝗵𝗱𝗮𝘆: 
» ${days} days  
» ${hours} hours  
» ${minutes} minutes  
» ${seconds} seconds
━━━━━━━━━━━━━━━━━━━━━━`;

        return api.sendMessage(countdownMessage, event.threadID, event.messageID);
    }
};
