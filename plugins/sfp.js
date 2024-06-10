import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. where's the text?\n\nusage:\n${usedPrefix + command} <text>\n\nexemple:\n${usedPrefix + command} menu`
    if (!m.quoted.text) throw `reply to the message!`
    let path = `plugins/${text}.js`
    await fs.writeFileSync(path, m.quoted.text)
    m.reply(`saved in ${path}`)
}
handler.help = ['sfp']
handler.tags = ['owner']
handler.command = /^sfp$/i

handler.owner = true
export default handler
