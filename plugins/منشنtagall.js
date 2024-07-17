let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
let vn = './media/Invocar.mp3'
let pesan = args.join` `
let oi = `*𝙈𝙚𝙣𝙨𝙖𝙟𝙚:* ${pesan}`
let teks = `╭┄〔 *${wm}* 〕┄⊱\n┆⺀𝘼𝙘𝙩𝙞𝙫𝙚 𝙜𝙧𝙪𝙥𝙤𝙨 🗣️⺀*\n┆\n┆❏ ${oi}\n┆\n┆❏ *𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨:*\n`
for (let mem of participants) {
teks += `┆🔸 @${mem.id.split('@')[0]}\n`}
teks += `*└* 𝑳𝒐𝒍𝒊𝑩𝒐𝒕-𝑴𝑫\n\n*▌│█║▌║▌║║▌║▌║▌║█*`
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )
conn.sendFile(m.chat, vn, 'Invocar.mp3', null, m, true, { type: 'audioMessage', ptt: true, sendEphemeral: true })
}
handler.help = ['tagall <mesaje>','invocar <mesaje>']
handler.tags = ['group']
handler.command = /^(tagall|invocar|invocacion|وات|invocación)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
