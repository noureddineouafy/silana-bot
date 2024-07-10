import fs from 'fs'
let handler = async (m, { conn, text }) => {
    m.reply('لحظة سوف يتم تلبية طلبكم')
    let sesi = await fs.readFileSync('./system/sessions/creds.json')
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'creds.json' }, { quoted: m })
}
handler.help = ['getsession']
handler.tags = ['owner']
handler.command = /^getsession$/i

handler.rowner = true

export default handler
