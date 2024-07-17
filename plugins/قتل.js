
import fetch from 'node-fetch';

let toM = a => '@' + a.split('@')[0];

async function handler(m, { groupMetadata }) {
    // لن يتم التحقق من الجواهر ولن يتم خصم أي شيء

    // قم بإرسال رسالة تأكيد الجريمة
    let ps = groupMetadata.participants.map(v => v.id);
    let a = ps[Math.floor(Math.random() * ps.length)];
    let b;
    do {
        b = ps[Math.floor(Math.random() * ps.length)];
    } while (b === a);

    // رابط الصورة الذي تريده
    const fgytSrdf = 'https://telegra.ph/file/2a505f89bf5040a211855.jpg';

    m.reply(`*🧬 تـم الـإعـلان عـن جـريـمـة 🧬*
*⧉🔪 ╎الـقـاتـل : ${toM(a)}*
*⧉⚰️ ╎الـمـقـتـول : ${toM(b)}*
*تـم الـقـبـض عـلـى الـمُـجـرم ⛓️*
> الأمر للمزاح فقط`, null, {
        mentions: [a, b],
        url: fgytSrdf // تغيير imageUrl إلى fgytSrdf
    });
}

handler.help = ['formarpareja'];
handler.tags = ['main', 'fun'];
handler.command = ['جريمة', 'قتل'];
handler.group = true;

export default handler;
