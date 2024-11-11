import path from 'path';
import axios from 'axios';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`Please enter the URL!\n\nExample:\n${usedPrefix + command} https://www.mediafire.com/file/l5urnlewucsuhmm/LANABOTZ-V.0.3.zip/file`);

    conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    let downloadLink = await mediafire(text);
    let result = downloadLink.data;

    const fileType = result.mimetype || await getFileTypeFromUrl(result.link);
    const fileName = result.filename || path.basename(result.link);

    if (fileType === "application/zip" || fileType === "application/pdf" || fileType === "application/vnd.ms-excel") {
        conn.sendMessage(m.chat, {
            document: { url: result.link },
            fileName: fileName,
            mimetype: fileType 
        });
    } else if (fileType.startsWith("image/")) {
        conn.sendMessage(m.chat, { 
            image: { url: result.link },
            caption: fileName 
        });
    } else if (fileType.startsWith("audio/")) {
        conn.sendMessage(m.chat, { 
            audio: { url: result.link },
            mimetype: fileType,
            ptt: true
        });
    } else if (fileType.startsWith("video/")) {
        conn.sendMessage(m.chat, { 
            video: { url: result.link },
            caption: fileName 
        });
    } else {
        conn.sendMessage(m.chat, { 
            document: { url: result.link },
            fileName: fileName,
            mimetype: fileType 
        });
    }
};

handler.help = ['mediafiredl'];
handler.tags = ['downloader'];
handler.command = /^(mediafiredl)$/i;
handler.premium = false;
handler.group = false;

export default handler;

async function getFileTypeFromUrl(url) {
    const ext = path.extname(url).toLowerCase();
    switch (ext) {
        case '.zip': return 'application/zip';
        case '.pdf': return 'application/pdf';
        case '.jpg':
        case '.jpeg': return 'image/jpeg';
        case '.png': return 'image/png';
        case '.gif': return 'image/gif';
        case '.mp3': return 'audio/mpeg';
        case '.ogg': return 'audio/ogg';
        case '.wav': return 'audio/wav';
        case '.mp4': return 'video/mp4';
        case '.mkv': return 'video/x-matroska';
        case '.webm': return 'video/webm';
        default: return 'application/octet-stream';
    }
}

async function mediafire(url) {
    const response = await axios.post("https://shinoa.us.kg/api/download/mediafire", {
        text: url,
    }, {
        headers: {
            "accept": "*/*",
            "api_key": "free",
            "Content-Type": "application/json"
        }
    });

    return response.data;
}
