let handler = async (m, { conn }) => {
    // التحقق مما إذا كانت خاصية "audios" مفعلة في الدردشة، إذا كانت الدردشة في مجموعة
    if (m.isGroup && !db.data.chats[m.chat].audios) return

    // رابط الملف الصوتي الجديد
    let vn = 'https://files.catbox.moe/vp6xt8.mp3'
    
    // إرسال حالة "recording" لإعلام المستخدم بأن البوت يقوم بتسجيل صوتي
    conn.sendPresenceUpdate('recording', m.chat)

    try {
        // إرسال الملف الصوتي
        await conn.sendMessage(m.chat, { 
            audio: { url: vn }, 
            seconds: 30,  // تحديث مدة الصوت إلى 30 ثانية
            ptt: true, 
            mimetype: 'audio/mpeg', 
            fileName: `a.mp3` 
        }, { quoted: m })

        // إرسال التسمية التوضيحية بعد إرسال الملف الصوتي
        await conn.sendMessage(m.chat, { text: `اكتب .menu لتشغيل البوت اذا واجهت اي مشكلة تابع صاحب البوت في حسابه \n instagram.com/noureddine_ouafy` }, { quoted: m })
    } catch (error) {
        console.error('Error sending audio:', error)
    }
}

// تحديد الأوامر التي يجب أن يستجيب لها البوت
handler.customPrefix = /^(hi|hello|سلام|سَلَام|slm|menu|ا|ª|A?$)/i
handler.command = /^(hi|hello|سلام|سَلَام|slm|meenu|ا|ª|A?$)/i

export default handler
