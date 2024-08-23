let handler = async (m, { text, conn, usedPrefix, command }) => {
    const usageMessage = `هذا الأمر يخص صاحب البوت. من خلاله يمكن حظر شخص من استعمال البوت أو حظره نهائيًا من الدردشة. *مثال:*\n${usedPrefix + command} @${m.sender.split("@")[0]}\nأما بالنسبة لأمر unblock فيستعمل لرفع الحظر عن الشخص ♥`;

    let who = m.mentionedJid && m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.quoted 
        ? m.quoted.sender 
        : text 
        ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' 
        : null;

    if (!who) return conn.reply(m.chat, usageMessage, m, { mentions: [m.sender] });

    let res = [];

    try {
        switch (command) {
            case "blok":
            case "block":
                await conn.updateBlockStatus(who, "block");
                res.push(who);
                break;
            case "unblok":
            case "unblock":
                await conn.updateBlockStatus(who, "unblock");
                res.push(who);
                break;
        }

        if (res.length > 0) {
            conn.reply(m.chat, `تمت العملية بنجاح ${command} ${res.map(v => '@' + v.split("@")[0]).join(', ')}`, m, { mentions: res });
        } else {
            conn.reply(m.chat, usageMessage, m, { mentions: [m.sender] });
        }
    } catch (error) {
        conn.reply(m.chat, 'حدث خطأ أثناء تنفيذ العملية. يرجى المحاولة مرة أخرى لاحقًا.', m);
        console.error(error);
    }
};

handler.help = ["block", "unblock"];
handler.tags = ["owner"];
handler.command = /^(block|unblock)$/i;
handler.owner = true;

export default handler;
