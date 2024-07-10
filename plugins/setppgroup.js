var handler = async (m, { conn, usedPrefix, command }) => {

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/image/.test(mime)) {
let img = await q.download()
if (!img) return conn.reply(m.chat, '*المرجو الاشارة للصورة التي تريد ان تجعلها صورة بروفايل لهذه المجموعة ثم تكتب*\n*.setppgroup*', m,  )
await conn.updateProfilePicture(m.chat, img).then(_ => conn.reply(m.chat, '✅ *تم تحديث صورة بروفايل هذه المجموعة بنجاح*', m, ))
} else return conn.reply(m.chat, '*المرجو الاشارة للصورة التي تريد ان تجعلها صورة بروفايل لهذه المجموعة ثم تكتب*\n*.setppgroup*', m, )

}
handler.help = ['setppgroup']
handler.tags = ['owner']
handler.command = /^صوت-الجروب?$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
