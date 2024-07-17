
function textToBinary(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}

function binaryToText(binary) {
    return binary.split(' ').map(bin => {
        return String.fromCharCode(parseInt(bin, 2));
    }).join('');
}

const handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`*❌ يرجى كتابة نص بعد الأمر، مثل: ${usedPrefix}${command} النص*`);
    }

    const content = text.trim();

    if (command === 'تشفير') {
        const binary = textToBinary(content);
        m.reply(`*النص المُشفر بالعد الثنائي🧑🏻‍💻🚫:*\n${binary}`);
    } else if (command === 'فك-شفرة') {
        try {
            const originalText = binaryToText(content);
            m.reply(`*النص الأصلي🧑🏻‍💻:*\n${originalText}`);
        } catch (error) {
            m.reply('*❌ حدث خطأ في فك الشفرة. يرجى التأكد من إدخال شفرة العد الثنائي الصحيحة.*');
        }
    } else {
        m.reply(`*❌ أمر غير معروف. يرجى استخدام ${usedPrefix}تشفير أو ${usedPrefix}فك-شفرة.*`);
    }
}

handler.command = ['تشفير', 'فك-شفرة'];
handler.tags = ['tools'];

export default handler;
