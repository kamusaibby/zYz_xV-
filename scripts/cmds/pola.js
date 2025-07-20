module.exports.config = { 
    name: "pola", 
    category: "TOOLS", 
    author: "Romim",
    role:2
};

const userResponses = {};
let listenerActive = false;

module.exports.onStart = function({ api, event }) { 
    const mention = Object.keys(event.mentions)[0]; 
    if (!mention) return api.sendMessage("Mention a user please.", event.threadID);

    api.getUserInfo(mention, (err, userInfo) => {
        if (err) return api.sendMessage("Failed to retrieve user information.", event.threadID);

        let genderText;  
        switch (userInfo[mention].gender) {  
            case 1: 
                genderText = "মাইয়া"; 
                break;  
            case 2: 
                genderText = "পোলা"; 
                break;  
            default: 
                genderText = "হিজড়া";
        }  
        const msg = [`খাংকির ${genderText} তর মারে চুইদা তোর মার বোদা তে আমার মাল ফালাবো তোর বাপ আমি`, `ওওও বান্দি র ${genderText} মাগির ছাওয়াল  তোর বাপ আমি  😍.     
    .`, `মাদারচোদ তর আম্মু পম পম খায় তোর বাপ আমি`,
`এখন ছন্দের তালে তালে তোর মারে চুদবো আাজকে খালে বিলে আমি তোর বাপ 💔 `,
`৩-৩-৬ তোর মারে তচুদামি করমু তোর মার ভ**** জয়..`,
`তোর মারে দিবানিশি রাইতে চাঁদ দেখানোর কথা বলে তোর মারে ক্ষেতে ফেলে কুত্তা দিয়ে চুদাবো🌸🥰
    `,
`বাড়ির পাশে বরিশাল মুরগি তোর মায়ে রে চুইদ্দা তোর মার ভোদা তে দিমু 1 বালতি মাল`,

`খাঙ্কিরপোলা পোলা তর বোনের  হোগায় ইনপুট, তর মায়ের ভোদায় আউটপুট।`,
`কিরে চড়াইন্না বদাইন্না মাগীর ${genderText} গাধার আছে নাকি
 চামড়া তোর মার ভোদা তুই কামড়া`,
`চোদা খাইয়া তোর মা যাইবো  মইরা,তোর কচি বইন টা রে চুদুম আমি তোর বইনের দুদ 2 টা ধইরা`,
`চুদা খাইয়া তোর মা বলব বাবা চার আমি বলব তুই আগে কো তোর ভোদাটা কার? `,
`কাচ্চি খাইতে লাগে নাকি মজা তোর মায় রে চুইদ্দা খামু আমি 1 কুলকি গাজা গাঁজা খেয়ে তোর মায়েরে চুইদা তোর মারে gift দিমু খাজা😘`,
`মালের রং নাকি সাদা,,মুরগি মাগীর ${genderText} তোর মা রে চুইদ্দা বানামু আমি অন লাইন এ গাঁধা`,
`তোর মায় রে চোদতে চোদতে তোর মায় দিসে কাইন্দা,,মুরগি মাগীর পোলা তোর কচি বইন টা রে ও চুদুম তোর হাত পা বাইন্দা`,
`চুদি`];
       

        const userName = userInfo[mention].name;

        userResponses[event.threadID] = {
            targetID: mention,
            callerID: event.senderID,
            initialSent: false,
            index: 0,
            msg: msg,
            userName: userName
        };

        if (!listenerActive) {
            api.listenMqtt((err, message) => {
                if (err || !message || !message.body || !message.threadID) return;

                const threadData = userResponses[message.threadID];
                if (!threadData) return;

                const { targetID, callerID, initialSent, index, msg, userName } = threadData;

                if (message.senderID === targetID) {
                    if (!initialSent) {
                        const mentionTag = {
                            id: targetID,
                            tag: `@${userName}`
                        };
                        api.sendMessage({
                            body: `কিরে @${userName} - ছোট ভালো আছিস?`,
                            mentions: [mentionTag]
                        }, message.threadID, (err, info) => {
                            if (err) return;
                            setTimeout(() => {
                                api.unsendMessage(info.messageID);
                            }, 70000);
                        }, message.messageID);
                        threadData.initialSent = true;
                    } else {
                        const currentMsg = msg[index % msg.length];
                        api.sendMessage(currentMsg, message.threadID, (err, info) => {
                            if (err) return;
                            setTimeout(() => {
                                api.unsendMessage(info.messageID);
                            }, 70000);
                        }, message.messageID);
                        threadData.index++;
                    }
                } else if (message.senderID === callerID) {
                    api.setMessageReaction('😎', message.messageID, (err) => {}, true);
                }
            });
            listenerActive = true;
        }
    });
};
