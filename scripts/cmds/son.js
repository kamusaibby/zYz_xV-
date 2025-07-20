module.exports.config = {
    name: "son",
    category: "automation",
    author: "Romim"
}

const userResponses = {};
module.exports.onStart = async function({ api, event }) {
    const mention = Object.keys(event.mentions)[0]; 
    if (!mention) return api.sendMessage("mention please", event.threadID);

    api.getUserInfo(mention, async (err, userInfo) => {
        if (err) {
            return api.sendMessage("Failed to retrieve user information.", event.threadID);
        }

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

        const msg = [`খাংকির ${genderText} তর মারে চুইদা তোর মার বোদা তে আমার মাল ফালাবো তোর বাপ আমি`, `ওওও বান্দি র ${genderText} মাগির ছাওয়াল  তোর বাপ আমি  😍.     
    .`, `মাদারচোদ তর আম্মু পম পম খায় তোর বাপ আমি`,
`এখন ছন্দের তালে তালে তোর মারে চুদবো আাজকে খালে বিলে আমি তোর বাপ 💔 `,
`৩-৩-৬ তোর মারে তচুদামি করমু তোর মার ভ**** জয়..`,
`তোর মারে দিবানিশি রাইতে চাঁদ দেখানোর কথা বলে তোর মারে ক্ষেতে ফেলে কুত্তা দিয়ে চুদাবো🌸🥰
    `,
`বাড়ির পাশে বরিশাল মুরগি তোর মায়ে রে চুইদ্দা তোর মার ভোদা তে দিমু 1 বালতি মাল`,

`খাঙ্কিরপোলা পোলা তর বোনের  হোগায় ইনপুট, তর মায়ের ভোদায় আউটপুট।`,
`কিরে চড়াইন্না বদাইন্না মাগীর ${genderText} গাধার আছে নাকি
 চামড়া তোর মার ভোদা তুই কামড়া`,
`চোদা খাইয়া তোর মা যাইবো  মইরা,তোর কচি বইন টা রে চুদুম আমি তোর বইনের দুদ 2 টা ধইরা`,
`চুদা খাইয়া তোর মা বলব বাবা চার আমি বলব তুই আগে কো তোর ভোদাটা কার? `,
`কাচ্চি খাইতে লাগে নাকি মজা তোর মায় রে চুইদ্দা খামু আমি 1 কুলকি গাজা গাঁজা খেয়ে তোর মায়েরে চুইদা তোর মারে gift দিমু খাজা😘`,
`মালের রং নাকি সাদা,,মুরগি মাগীর ${genderText} তোর মা রে চুইদ্দা বানামু আমি অন লাইন এ গাঁধা`,
`তোর মায় রে চোদতে চোদতে তোর মায় দিসে কাইন্দা,,মুরগি মাগীর পোলা তোর কচি বইন টা রে ও চুদুম তোর হাত পা বাইন্দা`,
`চুদি`];

        let index = 0;
        api.sendMessage(`kire ${event.mentions[mention]} - son valo achis?`, event.threadID);

        if (!userResponses[mention]) {
            userResponses[mention] = { index: 0 };
        }

        api.listenMqtt((err, message) => {
            if (message.senderID === mention && message.body) {
                const currentIndex = userResponses[mention].index;
                api.sendMessage(msg[currentIndex % msg.length], message.threadID, message.messageID);
                userResponses[mention].index++;
            }
        });
    });
        }
