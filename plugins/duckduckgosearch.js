import axios from 'axios';
import cheerio from 'cheerio';
// Handler function for 'duckduckgosearch'
const handler = async (m, { text, prefix, command }) => {
    if (!text) {
        m.reply(`مثال : \n\n *.duckduckgosearch* silana bot`);
        return;
    }

    try {
        const response = await axios.get(`https://duckduckgo.com/html/?q=${encodeURIComponent(text)}`);
        const $ = cheerio.load(response.data);
        const results = [];

        $('.result').each((i, elem) => {
            const title = $(elem).find('.result__title').text();
            const link = $(elem).find('.result__url').attr('href');
            const snippet = $(elem).find('.result__snippet').text();

            if (title && link) {
                results.push({ title, link, snippet });
            }
        });

        if (results.length === 0) {
            m.reply('لا توجد نتائج.');
            return;
        }

        let teks = `بحث DuckDuckGo عن: ${text}\n\n`;
        for (let i = 0; i < Math.min(results.length, 5); i++) {
            const res = results[i];
            teks += `⭔ _العنوان_: ${res.title}\n`;
            teks += `⭔ _الوصف_: ${res.snippet}\n`;
            teks += `⭔ _الرابط_: https:${res.link}\n\n────────────────────────\n\n instagram.com/noureddine_ouafy`;
        }
        m.reply(teks);
    } catch (err) {
        m.reply('حدث خطأ.');
        console.error(err);
    }
};

// Metadata for the handler
handler.help = ['duckduckgosearch'];
handler.command = ['duckduckgosearch'];
handler.tags = ['search'];
export default handler;
