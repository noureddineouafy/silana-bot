let handler = async (m, { text, conn, usedPrefix, command }) => {
let why = `*┃🚫┃┊✓ مثال للاستخدام الصحيح:↞*\n*—◉ ${usedPrefix + command} @${m.sender.split("@")[0]}*`
let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
if (!who) conn.reply(m.chat, why, m, { mentions: [m.sender] })
let res = [];
switch (command) {
case "blok": case "بلوك":
if (who) await conn.updateBlockStatus(who, "block").then(() => { res.push(who); })
else conn.reply(m.chat, why, m, { mentions: [m.sender] })
break
case "unblok": case "رفع-البلوك":
if (who) await conn.updateBlockStatus(who, "unblock").then(() => { res.push(who); })
else conn.reply(m.chat, why, m, { mentions: [m.sender] })
break
}
if (res[0]) conn.reply(m.chat, `*┃🚫┃┊✓ تم استخدام الامر بنجاح↞ ${command} للمستخدم ${res ? `${res.map(v => '@' + v.split("@")[0])}` : ''}*`, m, { mentions: res })}
handler.command = /^(بلوك|رفع-البلوك)$/i
handler.rowner = true
export default handler
