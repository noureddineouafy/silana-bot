import fetch from 'node-fetch'

let handler = async (m, { conn, text, args }) => {
	if (!args[0]) throw `*[❗] اكتب اسم التطبيق الي عايز تبحث عنه و ياريت يكون صح*`
	let enc = encodeURIComponent(text)
try {
let json = await fetch(`https://latam-api.vercel.app/api/playstore?apikey=brunosobrino&q=${enc}`)
let gPlay = await json.json()
if (!gPlay.titulo) return m.reply(`[ ! ] بدون نتائج`)
conn.sendMessage(m.chat,{image:{url: gPlay.imagen},caption:`🔍 نتيجة البحث: ${gPlay.titulo}
───────•••───────
🧬 المعرف: ${gPlay.id}
───────•••───────
 الرابط🐦: ${gPlay.link}
───────•••───────
🖼️ الصوره: ${gPlay.imagen}
───────•••───────
 المطور👑: ${gPlay.desarrollador}
───────•••───────
📜 الوصف: ${gPlay.descripcion}
───────•••───────
 العملة💎: ${gPlay.moneda}
───────•••───────
🪙 السعر: ${gPlay.precio}
───────•••───────
 التقيم💌: ${gPlay.puntuacion}`},{quoted:m})
} catch (e) {
await m.reply('جرب تاني يحب')    
console.log(e)
}
}

handler.help = ['playstore <aplicacion>']
handler.tags = ['internet']
handler.command = /^(المتجر|متجر|جوجل-بلاي)$/i

export default handler 
