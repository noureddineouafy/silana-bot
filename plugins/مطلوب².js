
import uploadImage from '../lib/uploadImage.js'

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw '*رد على صوره المجرم🔒*'
  if (mime && mime.startsWith('video/')) {
    throw '_*حصل ايرور غير متوقع*_';
  }
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)/.test(mime)
  let link = await (isTele ? uploadImage : uploadImage)(media);
  let api = (`https://api.popcat.xyz/wanted?image=${link}`)
  conn.sendFile(m.chat, api, 'wanted.png', `*مطلوب حيا او ميتا⚰️*`, m)
}
handler.help = ['wanted']
handler.tags = ['الاعضاء']
handler.command = ['مطلوب']

export default handler
