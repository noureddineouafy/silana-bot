let handler = async (m, { conn, text }) => {
if (!text) throw '*مــــــــــثــــال :*\n\n *.ttp Hello bobiza*'
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  let res = `https://api.lolhuman.xyz/api/ttp?apikey=GataDiosV2&text=${text}`
  conn.sendFile(m.chat, res, 'bobiza.webp', '', m, false, { asSticker: true })
}
handler.help = ['ttp']
handler.tags = ['sticker']
handler.command = /^(ttp)$/i
export default handler
