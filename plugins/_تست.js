let handler = async (m, { conn, args, usedPrefix, command }) => {
   conn.relayMessage(m.chat, {
     viewOnceMessage: {
       message: {
         interactiveMessage: {
           header: {
             title: '*قـائـمـة الاوامـــر*'
           },
           body: {
             text:'*اهلا بيك ي قلب اخوك منور بوت العقرب اليوتيوبر اضغط علي الزر بالاسفل لمعرفت اوامر البوت تحياتي لكم جميعا قال الله تعالى: "وَفَوْقَ كُلِّ ذِي عِلْمٍ عَلِيمٌ" [يوسف: 76].*'
           },
           nativeFlowMessage: {
             buttons: [
               {
                 name: 'single_select',
                 buttonParamsJson: JSON.stringify({
                   title: 'اضــغــط هــنــا',
                   sections: [
                     {
                       title: 'List',
                       highlight_label: 'ON',
                       rows: [
                         {
                           header: ' قـسـم الـنـظـام',
                           title: 'الاوامر',
                           description: '',
                           id: '.الاوامر'
                         },
                         {
                           header:' قـسـم الـمـطـور',
                           title: 'المطور',
                           description: '',
                           id: '.المطور'
                         },
                         {
                           header: 'اسـالـه',
                           title: 'يا بوت عطني سؤال انمي',
                           description: '',
                           id: '.سؤال'
                         },
                         {
                           header: 'قــســم الاعـضــاء',
                           title: 'اوامر الاعضاء',
                           description: '',
                           id: '.الاعضاء'
                         },
                         {
                           header:'قــسـم الــــمـشرفـــيـن',
                           title: 'المشرفين',
                           description: '',
                           id: '.اوامر-المشرفيين'
                         },
                         {
                           header: ' قــسـم الالـعـاب',
                           title: 'ترفيه ومرح',
                           description: '',
                           id: '.العاب'
                         },
                         {
                           header: 'قــسـم الـــتـحـــمـيــلات',
                           title: 'قائمة التحميلات',
                           description: '',
                           id: '.التحميلات'
                           },
                         {
                           header: 'قــسـم الــصور',
                           title: 'قائمة الصور',
                           description: '',
                           id: '.الصور' 
                            },
                         {
                           header: 'قــسـم اللـيــفــل',
                           title: 'قائمة اللفل',
                           description: '',
                           id: '.اللفل' 
                            },
                         {
                           header: 'قــسـم ســتـيـكـرات',
                           title: 'ســتـيـكــرات',
                           description: '',
                           id: '.ستيكرات' 
                           },
                         {
                           header: 'قــسـم الاصـــوات', 
                           title:'قائمة الاصوات',
                           description: '',
                           id: '.الاصوات' 
                           },
                         {
                           header: 'قــسـم ديــــن',
                           title: 'قائمة ديـن',
                           description: '',
                           id: '.دين' 
                           },
                         {
                           header: 'قــسـم فـتـح الــبوت ',
                           title: 'قائمة فتح البوت',
                           description: '',
                           id: '.فتح-البوت' 
                           },
                         {
                           header: 'قــسـم الـــمــــطور',
                           title: 'قائمة المطور',
                           description: '',
                           id: '.قائمة_المطور' 
                           },
                         {
                           header: 'قــسـم كــل الاوامــر',
                           title: 'قائمة جميع الاوامر',
                           description: '',
                           id: '.المهام' 
                         }
                       ]
                     }
                   ]
                 }),
                 messageParamsJson: ''
               }
             ]
           }
         }
       }
     }
   }, {})

}

handler.help = ['info']
handler.tags = ['main']
handler.command = ['اوامر']

export default handler