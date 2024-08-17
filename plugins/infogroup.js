import axios from 'axios';

let handler = async (m, { conn, participants, groupMetadata }) => {
  const ppUrls = [
    'https://i.ibb.co/VVXTRv0/f8323e88975b4e8c15580fbb8daed698.jpg',
    'https://i.ibb.co/mvt0NPZ/31889221389613dd440c9909cd27771a.jpg',
    'https://i.ibb.co/jhCy322/f272360445283d8385c35afa697bdf43.jpg',
  ];
  let ppUrl = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null);

  if (!ppUrl) {
    ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
  }

  const ppBuffer = await axios.get(ppUrl, { responseType: 'arraybuffer' }).then(res => res.data).catch(_ => null);

  const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[m.chat];
  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  
  let text = `*「 معلومات المجموعة 」*\n
  *معرف المجموعة:* 
  ${groupMetadata.id}
  *اسم المجموعة:* 
  ${groupMetadata.subject}
  *وصف المجموعة:* 
  ${groupMetadata.desc?.toString() || 'غير معروف'}
  *إجمالي الأعضاء:*
  ${participants.length} عضو
  *مالك المجموعة:* 
  @${owner.split('@')[0]}
  *مشرفو المجموعة:*
  ${listAdmin}
  *إعدادات المجموعة:*
  ${isBanned ? '✅' : '❌'} محظور
  ${welcome ? '✅' : '❌'} ترحيب
  ${detect ? '✅' : '❌'} كشف
  ${del ? '❌' : '✅'} منع الحذف
  ${antiLink ? '✅' : '❌'} منع الروابط
  *إعدادات الرسائل:*
  ترحيب: ${sWelcome}
  وداعًا: ${sBye}
  ترقية: ${sPromote}
  تنزيل: ${sDemote}
  `.trim();

  if (ppBuffer) {
    conn.sendFile(m.chat, Buffer.from(ppBuffer), 'pp.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] });
  } else {
    conn.reply(m.chat, text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] });
  }
}

handler.help = ['infogroup'];
handler.tags = ['owner'];
handler.command = /^infogroup$/i;

handler.group = true;

export default handler;
