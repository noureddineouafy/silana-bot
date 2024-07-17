
import fg from 'api-dylux'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `📌 مثال : \n*${usedPrefix + command}* https://twitter.com/TweetsOfCats/status/1666380787921350657?s=20`
          m.react(rwait)    
          try {
          let { SD, HD, desc, thumb, audio } = await fg.twitter(args[0])
          let te = ` 
*❖────【 تــويـتــر 】────❖*
❒ الوصف: ${desc}`
conn.sendFile(m.chat, HD, 'twitter.mp4', te, m)
m.react(done)
} catch (e) {
  	m.reply(`✹ تاكد من ان الرابط من تويتر`)
	} 
	
}
handler.help = ['twitter'].map(v => v + ' <url>')
handler.tags = ['dl']
handler.command = /^(twitter|تويتر)$/i
handler.diamond = true

export default handler
