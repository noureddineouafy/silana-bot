let handler = async (m, { conn }) => {
    const messages = conn.chats[m.chat].messages;
    if (!db.data.chats[m.chat].total) {
        db.data.chats[m.chat].total = {};
    }
    const participantCounts = db.data.chats[m.chat].total;
    const sortedData = Object.entries(participantCounts)
        .sort((a, b) => b[1] - a[1]);
    const totalM = sortedData.reduce((acc, [, total]) => acc + total, 0);
    const totalPeople = sortedData.length;
    const pesan = sortedData
        .map(([jid, total], index) => `*${index + 1}.* ${jid.replace(/(\d+)@.+/, '@$1')}: *${total}* رسالة`)
        .join('\n');
    await m.reply(
        `📊 *إجمالي الرسائل الأخيرة*: *${totalM}* رسالة من *${totalPeople}* شخص\n\n${pesan}`,
        null, {
            contextInfo: {
                mentionedJid: sortedData.map(([jid]) => jid)
            }
        }
    );
};

handler.help = ['totalchat'];
handler.tags = ['owner'];
handler.command = /^totalchat$/i;
handler.group = true;

handler.before = function(m) {
    if (!m.isGroup) return false;
    if (!db.data.chats[m.chat].total) db.data.chats[m.chat].total = {};
    if (!db.data.chats[m.chat].totalChat) db.data.chats[m.chat].totalChat = 0;
    if (new Date - global.db.data.users[m.sender].totalChat > 2592000000) {
        db.data.chats[m.chat].total = {};
        db.data.chats[m.chat].totalChat = new Date * 1;
    } // إعادة تعيين الإجمالي كل 30 يومًا
    const participantCounts = db.data.chats[m.chat].total;
    let cht = {};
    const messages = conn.chats[m.chat].messages;
    Object.values(messages).forEach(({ key }) =>
        cht[key.participant] = (cht[key.participant] || 0) + 1
    );
    let result = { ...participantCounts };

    for (let key in cht) {
        if (!result.hasOwnProperty(key)) {
            result[key] = cht[key];
            if (!db.data.chats[m.chat].total[key]) {
                db.data.chats[m.chat].total[key] = 1;
            }
        } else {
            result[key] += cht[key];
        }
    }
    setTimeout(async () => {
        db.data.chats[m.chat].total = result;
    }, 1000);
};

export default handler;
