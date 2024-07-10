let handler = async (m, { usedPrefix, command, text }) => {
    try {
        let who;
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
        else who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;

        let user = global.db.data.users[who];

        if (!who) {
            return m.reply(`منشن عليه يسطا!\n\nexample:\n${usedPrefix + command} @${m.sender.split`@`[0]}`);
        }

        user.premium = false;
        user.premiumTime = 0;
        global.prems = Object.keys(global.db.data.users).filter(key => global.db.data.users[key].premium);
        m.reply(`✔️ تمت إزالة *${user.name}* بنجاح من المستخدم المميز ♥✨`);
    } catch (error) {
        console.error(error);
        m.reply(`حدث خطأ أثناء إزالة المستخدم المميز.♥✨`);
    }
}

handler.help = ['delprem']
handler.tags = ['owner']
handler.command = /^حذف-مميز$/i

handler.group = false
handler.owner = true

export default handler;
