const axios = require('axios');

const csbApi = async () => {
  const base = await axios.get(
    "https://raw.githubusercontent.com/nazrul4x/Noobs/main/Apis.json"
  );
  return base.data.csb;
};

module.exports = {
    config: {
        name: "Imgur",
        version: "1.0.0",
        role: 0,
        author: "♡ Nazrul ♡",
        shortDescription: "imgur upload",
        countDown: 0,
        category: "imgur",
        guide: {
            en: '[🎀~𝐁𝐛𝐲 𝐮𝐩𝐥𝐨𝐚𝐝 𝐘𝐨𝐮𝐫 𝐏𝐡𝐨𝐭𝐨𝐬 𝐚𝐧𝐝 𝐯𝐢𝐝𝐞𝐨 𝐓𝐨 𝐢𝐦𝐠𝐮𝐫]'
        }
    },

    onStart: async ({ api, event }) => {
        let link2;

        if (event.type === "message_reply" && event.messageReply.attachments.length > 0) {
            link2 = event.messageReply.attachments[0].url;
        } else if (event.attachments.length > 0) {
            link2 = event.attachments[0].url;
        } else {
            return api.sendMessage('No attachment detected. Please reply to an image.', event.threadID, event.messageID);
        }

        try {
            const res = await axios.get(`${await csbApi()}/nazrul/imgur?link=${encodeURIComponent(link2)}`);
            const link = res.data.uploaded.image;
            return api.sendMessage(`\n\n${link}`, event.threadID, event.messageID);
        } catch (error) {
            console.error("Error uploading image to Imgur:", error);
            return api.sendMessage("An error occurred while uploading the image to Imgur.", event.threadID, event.messageID);
        }
    }
};
