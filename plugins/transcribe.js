import { transcribe } from '../lib/transcribe.js';

let handler = async(m, { conn, text, args, command, usedPrefix }) => {

    let q = m.quoted ? m.quoted : m;
    if (!q) return m.reply('لم يتم العثور على الوسائط');
    
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || '';
    if (!/audio/.test(mime)) return m.reply(`رد على الأوديو  باستخدام الأمر \n ${usedPrefix + command}`);

    let media = await q.download?.();
    let { data, success } = await transcribe(media);

    if (!success) return m.reply('فشل في تحميل البيانات.');
    conn.sendMessage(m.chat, { text: data.text }, { quoted: m });
}

handler.help = ['transcribe'];
handler.tags = ['ai'];
handler.command = /^(transcribe)$/i;
export default handler;
