import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
let handler = async (m) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw '*اعمل ريبلاي للصوره او الفيديو ال عاوز ترفعه يحب*'
let media = await q.download()
let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
let link = await (isTele ? uploadImage : uploadFile)(media)
m.reply(`*⎔↞┃رابط ملفك🔖┃* ${link}`)
}
handler.help = ['tourl <reply image>']
handler.tags = ['sticker']
handler.command = /^(تليجراف|رفع-تليجراف)$/i
export default handler
