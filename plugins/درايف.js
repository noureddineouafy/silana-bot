import fg from 'api-dylux' 
let handler = async (m, { conn, args, usedPrefix, command }) => {

	if (!args[0]) throw `♨ هات لينك جوجل درايف`
	m.react(rwait) 
	try {
	let res = await fg.GDriveDl(args[0])
	 await m.reply(`
♦ *من جوجل درايف* ♦

◁ *الرقم:* ${res.fileName}
◁ *المساحه:* ${res.fileSize}
◁ *النوع:* ${res.mimetype}`)
		
	conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
   } catch {
	m.reply('خطأ، تفقد الرابط او جرب رابط اخر!') 
  }
}
handler.help = ['gdrive']
handler.tags = ['dl', 'prem']
handler.command = ['درايف']
handler.diamond = true
handler.premium = true

export default handler
