import axios from 'axios';

const handler = async (m, { conn, text }) => {
  const tags = ['lucu', 'relate', 'gaming', 'nostalgia', 'teknologi', 'random', 'komik', 'editan', 'wtf', 'olahraga', 'anime', 'opini', 'dark', 'absurd', 'cringe', 'sus', 'binatang'];
  
  // التحقق من صحة النص
  if (text && !tags.includes(text)) {
    return m.reply(`لم يتم العثور على "Meme" "${text}"! \n\n${tags.map(v => `- ${v}`).join('\n')}`);
  }

  let url;
  const page = Math.round(Math.random() * 25);

  // تحديد عنوان URL استنادًا إلى النص
  if (!text) {
    url = `https://lahelu.com/api/post/get-posts?feed=1&page=${page}`;
  } else {
    url = `https://lahelu.com/api/post/get-posts?feed=1&hashtags[]=lucu&page=${page}`;
  }

  try {
    const response = await axios.get(url);
    const anu = response.data;
    const data = anu.postInfos[Math.floor(Math.random() * anu.postInfos.length)];
    
    // إرسال الفيديو أو الصورة
    if (/^video/i.test(data.media)) {
      return await conn.sendMessage(m.chat, { video: { url: 'https://cache.lahelu.com/' + data.media }, caption: data.title }, { quoted: m });
    }
    if (/^image/i.test(data.media)) {
      return await conn.sendMessage(m.chat, { image: { url: 'https://cache.lahelu.com/' + data.media }, caption: data.title }, { quoted: m });
    }
  } catch (error) {
    console.error("حدث خطأ:", error);
    m.reply("حدث خطأ أثناء استرجاع البيانات.");
  }
};

handler.command = handler.help = ['lahelu'];
handler.tags = ['tools'];

export default handler;
