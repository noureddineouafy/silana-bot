import fetch from  'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'
import { JSDOM } from 'jsdom'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `*هذا الامر خاص بتحميل فيديوات الفيسبوك نكتب هكذا على سبيل المثال*\n\n*.facebook* https://www.facebook.com/100063533185520/posts/pfbid02Xk1RabX31yg93Hg736NTQFYWtWmmioTGXLs4eM3EVQvRRk6FDbKWRiyXSFdorHEtl/`
  m.reply('loading ....')
  try {
  let res = await FaceBook(text)
  await conn.sendFile(m.chat, res.video_hd, 'bobiza.mp4', res.desc, m)
  } catch (e) {
m.reply('وقعت مشكلة')
}
}
handler.help = ['facebook']
handler.tags = ['downloader']
handler.command = /^facebook$/i

export default handler

async function FaceBook(url){ 
   return new Promise(async(resolve, reject) => { 
     try { 
       const config = { 
         'id': url, 
         'locale': 'id' 
       } 
       const { data, status } = await axios('https://getmyfb.com/process', { 
         method: 'POST', 
         data: new URLSearchParams(Object.entries(config)), 
         headers: { 
           "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36", 
           "cookie": "PHPSESSID=914a5et39uur28e84t9env0378; popCookie=1; prefetchAd_4301805=true" 
         } 
       }) 
       if (status === 200) { 
         const $ = cheerio.load(data) 
         const thumb = $('div.container > div.results-item > div.results-item-image-wrapper').find('img').attr('src') 
         const desc = $('div.container > div.results-item > div.results-item-text').text().trim() 
         const video_hd = $('div.container > div.results-download > ul > li:nth-child(1) > a').attr('href') 
         const video_sd = $('div.container > div.results-download > ul > li:nth-child(2) > a').attr('href') 
         const hasil = { 
           desc: desc, 
           thumb: thumb, 
           video_sd: video_sd, 
           video_hd: video_hd 
         }; 
         resolve(hasil) 
       } else { 
         console.log('No result found') 
       } 
     } catch (error) { 
       console.error(error) 
     } 
   }) 
 }
