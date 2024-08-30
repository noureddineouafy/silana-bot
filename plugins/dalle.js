import fetch from 'node-fetch';

const handler = async (m, {conn, text, usedPrefix, command}) => {
    if (!text) throw `يرجى إدخال نص لإنشاء صورة باستخدام DALL-E (الذكاء الاصطناعي)\n\nمثال:\nɞ ${usedPrefix + command} قطط تبكي\nɞ ${usedPrefix + command} قطة باللون البنفسجي مع الأزرق على كوكب المشتري، تضيء الكون بسحرها مع تأثير بسيط.`;
    
    await conn.sendMessage(m.chat, {text: '⌛ يرجى الانتظار لحظة...'}, {quoted: m});
    
    try {
        // استخدام API لإنشاء صورة من النص
        const response = await fetch(`https://api-xovvip.vercel.app/text2img?text=${encodeURIComponent(text)}`);
        if (!response.ok) throw new Error('حدث خطأ في الشبكة');
        
        const buffer = await response.buffer();
        
        await conn.sendMessage(m.chat, {image: buffer}, {quoted: m});
    } catch {
        throw 'خطأ، (API غير متاحة) يرجى المحاولة لاحقاً.';
    }
}
handler.help = ['dalle'];
handler.command = ['dalle'];
export default handler;
