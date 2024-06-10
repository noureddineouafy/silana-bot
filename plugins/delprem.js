let handler = async (m, { usedPrefix, command, text }) => {
    try {
        let who;
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
        else who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;

        let user = global.db.data.users[who];

        if (!who) {
            return m.reply(`tag or mention someone!\n\nexample:\n${usedPrefix + command} @${m.sender.split`@`[0]}`);
        }

        user.premium = false;
        user.premiumTime = 0;
        global.prems = Object.keys(global.db.data.users).filter(key => global.db.data.users[key].premium);
        m.reply(`✔️ successfully removed *${user.name}* from premium user`);
    } catch (error) {
        console.error(error);
        m.reply(`An error occurred while removing the premium user.`);
    }
}

handler.help = ['delprem']
handler.tags = ['owner']
handler.command = /^delprem$/i

handler.group = false
handler.owner = true

export default handler;
