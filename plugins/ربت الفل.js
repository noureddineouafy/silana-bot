
global.rpg = {
	
  role(level) {
    level = parseInt(level)
    if (isNaN(level)) return { name: '', level: '' }
    
    const role = [
      { name: "جنية🧚‍♀️", level: 0 }, { name: "مبتدئ❄️", level: 4 }, 
      { name: "ساحر🧙🏻", level: 8 }, { name: "مغوار🌙", level: 12 }, 
      { name: "فارس🏇🏻", level: 16 }, { name: "مغامر🔱", level: 20 }, 
      { name: "سينسي🪶", level: 24 }, { name: "محنك🧜‍♂️", level: 28 }, 
      { name: "قرصان🏴‍☠️", level: 32 }, { name: "حكيم🪔", level: 36 },
      { name: "نخبة🎗️", level: 48 }, { name: "الساحر الأسود", level: 52 }, 
      { name: "صياد🧜🏻‍♂️", level: 56 }, { name: "الملك👑", level: 60 }, 
      { name: "ملك🫅", level: 100 }
    ];

    return role.reverse().find(role => level >= role.level)
  }
}

