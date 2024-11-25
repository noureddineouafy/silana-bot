import axios from 'axios';
import fs from 'fs';

async function boreal(prompt, negativePrompt = 'low quality') {
    let data = JSON.stringify({
        "model": {
            "instance_prompt": "photo",
            "image": "https://huggingface.co/kudzueye/Boreal/resolve/main/images/ComfyUI_00845_.png",
            "id": "kudzueye/Boreal",
            "metadata": "8cd8fcd4-73b0-4742-b67c-b82625b07b52_metadatakudzueye-Boreal.png",
            "isPublic": true,
            "gallery": [],
            "infos": {}
        },
        "inputs": prompt,
        "parameters": {
            "negative_prompt": negativePrompt
        }
    });

    let config = {
        method: 'POST',
        url: 'https://lorastudio.co/api/generate',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
            'Content-Type': 'application/json',
            'accept-language': 'id-ID',
            'referer': 'https://lorastudio.co/generate?model=kudzueye/Boreal',
            'origin': 'https://lorastudio.co',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'priority': 'u=0',
            'te': 'trailers'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        const imageData = response.data.image;
        const base64Data = imageData.replace(/^data:image\/png;base64,/, "");

        const outputPath = 'output.png';
        fs.writeFileSync(outputPath, base64Data, 'base64');
        return outputPath;
    } catch (error) {
        console.error('Error generating image:', error);
        throw new Error('Failed to generate image');
    }
}

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply('Please provide a prompt for the image generation.');
    }

    try {
        const imagePath = await boreal(text);
        await conn.sendFile(m.chat, imagePath, 'generated-image.png', 'Here is your generated image.', m);
    } catch (error) {
        m.reply('Failed to generate the image. Please try again later.');
    }
};

handler.help = handler.command = ['lorastudio'];
handler.tags = ['ai'];
export default handler;
