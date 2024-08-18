/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
هذه العلامة المائية لي، لا تحذفها
*/

let handler = async (m, { conn, text, args, usedPrefix, command, participants }) => {

    let who = m.mentionedJid[0];

    if (!who) return conn.sendMessage(m.chat, { text: `قم بوسم/الرد على الشخص الذي تريد ${command} !`, mentions: participants.map(a => a.id) }, { quoted: m });

    let user = db.data.users[who];
    if (user.warn == undefined) user.warn = 0;
    if (user.warn >= 4) {
        conn.groupParticipantsUpdate(m.chat, [who], 'remove').then(_ => {
            conn.reply(m.chat, '📣 *سوف يتم طردك من المجموعة لأن مجموع تحذيراتك وصل إلى 5 نقاط* ❗', m);
            user.warn = 0;
        });
    } else {
        if (command == 'warn') {
            user.warn += 1;
            conn.reply(m.chat, `*تمت إضافة تحذير إلى ${await conn.getName(who.split('@')[0] + '@s.whatsapp.net') || who.split('@')[0]}* •> ${user.warn}/5`, m, { mentions: participants.map(a => a.id) });
        } else if (command == 'unwarn') {
            user.warn -= 1;
            conn.reply(m.chat, `*تمت إزالة تحذير من ${await conn.getName(who.split('@')[0] + '@s.whatsapp.net') || who.split('@')[0]}* •> ${user.warn}/5`, m, { mentions: participants.map(a => a.id) });
        }
    }
};

handler.help = ['warn @tag'];
handler.tags = ['owner'];
handler.command = /^(unwarn|warn)$/i;
handler.admin = true;
handler.group = true;

export default handler;
