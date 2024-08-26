import fetch from 'node-fetch';

async function picSumAvz(text) {
  try {
    const imageUrl = `https://picsum.photos/seed/${text}/800/600`;
    return imageUrl;
  } catch (err) {
    return null;
  }
}

const handler = async (m, { conn, args, command }) => {
  const q = args.join(' '); // للحصول على الاستعلام الكامل

  if (!q) {
    return m.reply(`مثال:\n\n${command} nature`);
  }

  // البحث عن الصورة
  const result = await picSumAvz(q);
  if (result) {
    const message = {
      image: { url: result },
      caption: `نتيجة البحث عن الصورة: ${q}\n instagram.com/noureddine_ouafy`
    };
    await conn.sendMessage(m.chat, message);
  } else {
    m.reply('حدث خطأ.');
  }
}

handler.help = ['picsum'];
handler.tags = ['search'];
handler.command = /^(picsum)$/i;

export default handler;
