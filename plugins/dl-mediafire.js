import fetch from 'node-fetch'
import { mediafiredl } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems }) => {
	var limit
     if((isOwner || isPrems)) limit = 1200
     else limit = 100
   if (!args[0]) throw `*✳️ أدخـل الـرابــط بـجانـب الأمــر*`
    if (!args[0].match(/mediafire/gi)) throw `*❎ الـرابــط خـاطئ !*`
    let full = /f$/i.test(command)
    let u = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
    let ss = await (await fetch(`https://image.thum.io/get/fullpage/${u}`)).buffer()
    let res = await mediafiredl(args[0])
    let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
    let isLimit = (isPrems || isOwner ? limit : limit) * 1012 < filesize
    let caption = `
↰ *الــأسـم:* ${filename}
↰ *الـمســاحه:* ${filesizeH}
↰ *الـأمـتداد:* ${ext}
↰ *وقـت الـرفع:* ${aploud}
${isLimit ? `\n*❖ يـتجاوز الـملـف حـد الـمساحــه المـتاحـه لـك* *+${limit} MB*\n*كـن عـضو بـريـمـيـام لـتسـتطـيع تـنزيل مـلف بـمساحـة* *900 MB*` : ''} 
`.trim()
    await conn.sendFile(m.chat, ss, 'ssweb.png', caption, m)
    
    if(!isLimit) await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
}
handler.help = ['mediafire <url>']
handler.tags = ['dl', 'prem']
handler.command = ['mediafire', 'ميديافاير'] 
handler.diamond = true
handler.premium = false

export default handler
