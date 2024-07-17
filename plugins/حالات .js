export async function before(m, { conn, chatUpdate }) {
  const number = 'YOUR_NUMBER_PHONE' // Input example: 9689411xxxx
  try {
    const message = chatUpdate.messages[0]
    if (message.key.remoteJid !== 'status@broadcast') return
    let mediaMessage = m.message.imageMessage || m.message.videoMessage || m.message.extendedTextMessage
    let mime = mediaMessage?.mimetype || mediaMessage?.mediaType || ''
    if (!mediaMessage) return
    let caption = mediaMessage.caption || mediaMessage.text || ''
    let mediaBuffer
    if (/image|video/g.test(mime)) {
      mediaBuffer = await m.download?.()
      if (mediaBuffer) { await conn.sendFile(`${number}@s.whatsapp.net`, mediaBuffer, '', caption, m) }
    } else { await conn.reply(`${number}@s.whatsapp.net`, caption, m) }
  } catch (error) { await conn.reply(`${number}@s.whatsapp.net`, `Error: ${error}`, m) }
};

