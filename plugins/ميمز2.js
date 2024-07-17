import hispamemes from 'hispamemes'
let handler = async (m, {command, conn}) => {
const url = await hispamemes.meme()  
conn.sendFile(m.chat, url, 'error.jpg', `😂😂😂`, m)}
//conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['التالي 🆕', `/${command}`]], m)}
handler.help = ['meme']
handler.tags = ['random']
handler.command = /^(ميم|ميمز2|memes)$/i
export default handler