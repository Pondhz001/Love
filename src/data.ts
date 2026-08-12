import { Card, Task, UserType, Rarity } from './types';

// Gacha Pool for Aoey (Pond provides these)
export const GACHA_POOL_AOEY: Card[] = [
  // SSR (Special/High Value)
  { id: 'a-ssr-1', rarity: 'SSR', title: '✈️ ทริปเที่ยวตามใจเอ๋ย', message: 'ปอนด์จะเป็นสปอนเซอร์และสารถีพาเที่ยว 1 วันเต็ม! เอ๋ยอยากไปไหนจัดแพลนมาได้เลย', iconName: 'Crown', themeColor: 'border-yellow-400', textColor: 'text-yellow-600', bgGradient: 'from-amber-50 via-yellow-100 to-orange-50' },
  { id: 'a-ssr-2', rarity: 'SSR', title: '🛍️ ช้อปปิ้งงบ 1,000 บาท!', message: 'ปอนด์สายเปย์ โอนไว! เอาไปเลยงบช้อปปิ้ง 1,000 บาท ซื้ออะไรก็ได้ตามใจชอบ', iconName: 'ShoppingBag', themeColor: 'border-yellow-400', textColor: 'text-yellow-600', bgGradient: 'from-amber-50 via-yellow-100 to-orange-50' },
  { id: 'a-ssr-3', rarity: 'SSR', title: '🧞‍♂️ Yes Day! 24 ชม.', message: 'วันนี้ปอนด์คือจินนี่ของเอ๋ย! ขออะไรปอนด์ต้องเซย์ Yes! (ภายใต้เงื่อนไขที่เป็นไปได้นะ ฮ่าๆ)', iconName: 'Star', themeColor: 'border-yellow-400', textColor: 'text-yellow-600', bgGradient: 'from-amber-50 via-yellow-100 to-orange-50' },
  { id: 'a-ssr-4', rarity: 'SSR', title: '🍽️ ดินเนอร์หรู 1 มื้อ', message: 'ปอนด์จะพาไปกินของอร่อยๆ ร้านดีๆ เลือกร้านมาได้เลย ปอนด์จ่ายเอง!', iconName: 'Gift', themeColor: 'border-yellow-400', textColor: 'text-yellow-600', bgGradient: 'from-amber-50 via-yellow-100 to-orange-50' },
  
  // SR (Medium Value)
  { id: 'a-sr-1', rarity: 'SR', title: '💆‍♀️ สปาฟูลคอร์สโดยปอนด์', message: 'คูปองนวดจัดเต็ม 45 นาที! ทั้งนวดหลัง นวดไหล่ นวดเท้า ปอนด์บริการเต็มที่', iconName: 'Activity', themeColor: 'border-purple-400', textColor: 'text-purple-600', bgGradient: 'from-purple-50 via-violet-100 to-purple-50' },
  { id: 'a-sr-2', rarity: 'SR', title: '🎬 เอ๋ยเลือกหนังคืนนี้', message: 'คืนนี้ดูหนังเรื่องอะไร เอ๋ยเป็นคนตัดสินใจ ปอนด์ห้ามบ่นห้ามหลับ!', iconName: 'Video', themeColor: 'border-pink-400', textColor: 'text-pink-600', bgGradient: 'from-pink-50 via-fuchsia-100 to-pink-50' },
  { id: 'a-sr-3', rarity: 'SR', title: '🧹 ปอนด์เหมางานบ้าน 1 วัน', message: 'วันนี้เอ๋ยพักผ่อนไปเลย! ปอนด์จะจัดการงานบ้าน ซักผ้า กวาดถู ล้างจานให้เอง', iconName: 'Home', themeColor: 'border-blue-400', textColor: 'text-blue-600', bgGradient: 'from-blue-50 via-cyan-100 to-blue-50' },
  { id: 'a-sr-4', rarity: 'SR', title: '🍰 เลี้ยงขนมหวาน 1 มื้อ', message: 'อยากกินบิงซู ชานม หรือเค้ก? ใช้ใบนี้ปอนด์จะรีบพาไปกินหรือกดสั่ง Delivery ให้ทันที', iconName: 'Coffee', themeColor: 'border-orange-400', textColor: 'text-orange-600', bgGradient: 'from-orange-50 via-amber-100 to-orange-50' },
  { id: 'a-sr-5', rarity: 'SR', title: '🎧 ปอนด์งดเล่นเกม 3 ชม.', message: 'ใช้ใบนี้เพื่อดึงตัวปอนด์ออกจากหน้าจอเกม มาใช้เวลากับเอ๋ยล้วนๆ 3 ชั่วโมงเต็ม!', iconName: 'MonitorOff', themeColor: 'border-red-400', textColor: 'text-red-600', bgGradient: 'from-red-50 via-rose-100 to-red-50' },
  
  // R (Common/Cute)
  { id: 'a-r-1', rarity: 'R', title: '🧋 ปอนด์เลี้ยงน้ำ 1 แก้ว', message: 'ทวงชาเย็น ชาไข่มุก หรือกาแฟจากปอนด์ได้ 1 แก้ว ฟรีๆ', iconName: 'Coffee', themeColor: 'border-emerald-300', textColor: 'text-emerald-600', bgGradient: 'from-emerald-50 to-teal-100' },
  { id: 'a-r-2', rarity: 'R', title: '😘 หอมแก้มซ้ายขวา', message: 'ปอนด์ต้องมาหอมแก้มชื่นใจๆ ซ้ายขวา 1 ที!', iconName: 'MessageCircleHeart', themeColor: 'border-rose-300', textColor: 'text-rose-600', bgGradient: 'from-rose-50 to-pink-100' },
  { id: 'a-r-3', rarity: 'R', title: '🤫 บัตรชนะการเถียง 1 ครั้ง', message: 'เวลาเถียงกันเรื่องเล็กๆ หยิบบัตรนี้มาใช้ เอ๋ยจะเป็นฝ่ายชนะทันที ปอนด์ต้องยอม', iconName: 'Smile', themeColor: 'border-blue-300', textColor: 'text-blue-600', bgGradient: 'from-blue-50 to-indigo-100' },
  { id: 'a-r-4', rarity: 'R', title: '🫂 กอดชาร์จพลัง 1 นาที', message: 'ปอนด์ต้องเข้ามากอดแน่นๆ ชาร์จพลังให้เอ๋ยเต็มๆ 1 นาทีโดยไม่ปล่อย', iconName: 'Heart', themeColor: 'border-red-300', textColor: 'text-red-500', bgGradient: 'from-red-50 to-rose-100' },
  { id: 'a-r-5', rarity: 'R', title: '🍳 ปอนด์ทำอาหารให้ 1 มื้อ', message: 'มื้อนี้เอ๋ยไม่ต้องเหนื่อย ปอนด์จะเข้าครัวโชว์ฝีมือทำอาหารให้กินเอง (หรือซื้อมากินก็ได้นะ)', iconName: 'Gift', themeColor: 'border-amber-300', textColor: 'text-amber-600', bgGradient: 'from-amber-50 to-yellow-100' },
  { id: 'a-r-6', rarity: 'R', title: '📸 ปอนด์เป็นตากล้องส่วนตัว', message: 'ปอนด์จะถ่ายรูปให้เอ๋ยจนกว่าเอ๋ยจะพอใจ ห้ามบ่นว่าเมื่อย!', iconName: 'Camera', themeColor: 'border-cyan-300', textColor: 'text-cyan-600', bgGradient: 'from-cyan-50 to-blue-100' },
];

// Gacha Pool for Pond (Aoey provides these)
export const GACHA_POOL_POND: Card[] = [
  // SSR
  { id: 'p-ssr-1', rarity: 'SSR', title: '🎮 วันฟรีสไตล์ของปอนด์!', message: 'คูปองปล่อยอิสระ! ปอนด์จะเล่นเกมหรือทำอะไรก็ได้ทั้งวัน เอ๋ยจะไม่บ่น ไม่กวนใจ', iconName: 'Crown', themeColor: 'border-yellow-400', textColor: 'text-yellow-600', bgGradient: 'from-amber-50 via-yellow-100 to-orange-50' },
  { id: 'p-ssr-2', rarity: 'SSR', title: '🎁 งบซื้อของเล่น 1,000!', message: 'เอ๋ยใจดี อนุมัติงบ 1,000 บาท ให้ปอนด์ไปซื้อเกม หรือของเล่นที่อยากได้!', iconName: 'Gift', themeColor: 'border-yellow-400', textColor: 'text-yellow-600', bgGradient: 'from-amber-50 via-yellow-100 to-orange-50' },
  { id: 'p-ssr-3', rarity: 'SSR', title: '🍖 มื้อใหญ่ปิ้งย่าง/ชาบู', message: 'เอ๋ยจะเป็นเจ้ามือพาไปเลี้ยงปิ้งย่าง หรือชาบูชุดใหญ่ กินให้พุงกางไปเลย!', iconName: 'Star', themeColor: 'border-yellow-400', textColor: 'text-yellow-600', bgGradient: 'from-amber-50 via-yellow-100 to-orange-50' },
  { id: 'p-ssr-4', rarity: 'SSR', title: '🧞‍♂️ Yes Day! ของปอนด์', message: 'วันนี้เอ๋ยจะตามใจปอนด์ทุกอย่าง (ที่อยู่ในขอบเขตนะ) ขออะไรบอกมาได้เลย', iconName: 'HeartHandshake', themeColor: 'border-yellow-400', textColor: 'text-yellow-600', bgGradient: 'from-amber-50 via-yellow-100 to-orange-50' },

  // SR
  { id: 'p-sr-1', rarity: 'SR', title: '🍻 ใบอนุญาตสังสรรค์', message: 'คูปองออกไปเจอเพื่อนๆ ปาร์ตี้สังสรรค์ได้ 1 คืนโดยที่เอ๋ยจะไม่บ่น (แต่อย่ากลับดึกนะ!)', iconName: 'Star', themeColor: 'border-purple-400', textColor: 'text-purple-600', bgGradient: 'from-purple-50 via-violet-100 to-purple-50' },
  { id: 'p-sr-2', rarity: 'SR', title: '💆‍♂️ เอ๋ยนวดให้ 30 นาที', message: 'ทำงานมาเหนื่อยๆ เอ๋ยจะสวมบทเป็นหมอนวด นวดหลังนวดไหล่ให้ 30 นาทีเต็ม!', iconName: 'Activity', themeColor: 'border-pink-400', textColor: 'text-pink-600', bgGradient: 'from-pink-50 via-fuchsia-100 to-pink-50' },
  { id: 'p-sr-3', rarity: 'SR', title: '🕹️ เอ๋ยเล่นเกมเป็นเพื่อน 2 ชม.', message: 'เอ๋ยจะมานั่งเล่นเกมเป็นเพื่อนปอนด์ 2 ชั่วโมงเต็ม สอนเล่นได้เลย!', iconName: 'MonitorPlay', themeColor: 'border-blue-400', textColor: 'text-blue-600', bgGradient: 'from-blue-50 via-cyan-100 to-blue-50' },
  { id: 'p-sr-4', rarity: 'SR', title: '🍔 คืนนี้กินจั๊งค์ฟู้ดได้!', message: 'อนุญาตให้กินพิซซ่า ไก่ทอด หรือของอ้วนๆ ได้ 1 มื้อ เอ๋ยจะไม่ห้ามเรื่องน้ำหนัก', iconName: 'Coffee', themeColor: 'border-orange-400', textColor: 'text-orange-600', bgGradient: 'from-orange-50 via-amber-100 to-orange-50' },
  { id: 'p-sr-5', rarity: 'SR', title: '😴 ตื่นสายได้ 1 วัน', message: 'วันหยุดนี้อนุญาตให้นอนตื่นสายกี่โมงก็ได้ เอ๋ยจะไม่ปลุก ไม่บ่น!', iconName: 'Moon', themeColor: 'border-indigo-400', textColor: 'text-indigo-600', bgGradient: 'from-indigo-50 via-blue-100 to-indigo-50' },

  // R
  { id: 'p-r-1', rarity: 'R', title: '🍜 มื้อนี้เอ๋ยเลี้ยงเอง', message: 'คูปองคนสวยใจป๋า! มื้อถัดไปเอ๋ยขอเป็นเจ้ามือเลี้ยงข้าวปอนด์เอง', iconName: 'Gift', themeColor: 'border-emerald-300', textColor: 'text-emerald-600', bgGradient: 'from-emerald-50 to-teal-100' },
  { id: 'p-r-2', rarity: 'R', title: '🤫 บัตรห้ามบ่น 1 แมตช์', message: 'ทำผิดนิดหน่อย หรือเล่นเกมเพลิน ใช้ใบนี้ปุ๊บ เอ๋ยจะงดบ่น 1 ครั้งถ้วนรอดตัวไป!', iconName: 'Smile', themeColor: 'border-blue-300', textColor: 'text-blue-600', bgGradient: 'from-blue-50 to-indigo-100' },
  { id: 'p-r-3', rarity: 'R', title: '😘 หอมแก้มชื่นใจ', message: 'คูปองแลกจุ๊บ! แคปมาทวงเมื่อไหร่ เอ๋ยจะหอมแก้มปอนด์ฟอดใหญ่ๆ ให้ชื่นใจเลย', iconName: 'MessageCircleHeart', themeColor: 'border-red-300', textColor: 'text-red-500', bgGradient: 'from-red-50 to-rose-100' },
  { id: 'p-r-4', rarity: 'R', title: '🥤 เอ๋ยเลี้ยงน้ำ 1 แก้ว', message: 'ทวงกาแฟ ชาเขียว หรือน้ำอัดลม จากเอ๋ยได้ 1 แก้ว', iconName: 'Coffee', themeColor: 'border-amber-300', textColor: 'text-amber-600', bgGradient: 'from-amber-50 to-yellow-100' },
  { id: 'p-r-5', rarity: 'R', title: '🛋️ เอ๋ยหยิบของให้ 1 ครั้ง', message: 'นั่งอยู่ไม่อยากลุก ใช้ใบนี้สั่งเอ๋ยไปหยิบน้ำ หยิบขนม หยิบรีโมทให้ได้ 1 ครั้ง!', iconName: 'Hand', themeColor: 'border-purple-300', textColor: 'text-purple-600', bgGradient: 'from-purple-50 to-fuchsia-100' },
  { id: 'p-r-6', rarity: 'R', title: '🎧 ขอเวลาส่วนตัว 1 ชม.', message: 'ต้องการสมาธิทำคิ้วท์ หรือเล่นเกม ใช้ใบนี้ขอเวลาส่วนตัว 1 ชม. เอ๋ยจะไม่กวน', iconName: 'Headphones', themeColor: 'border-slate-300', textColor: 'text-slate-600', bgGradient: 'from-slate-50 to-gray-100' },
];

export const EARN_TASKS: Task[] = [
  // Daily Tasks
  { id: 'd1', title: 'จุ๊บแก้ม / จุ๊บเหม่งให้ชื่นใจ', points: 2, iconName: 'Smile', color: 'text-rose-500 bg-rose-100', period: 'daily', maxLimit: 3 },
  { id: 'd2', title: 'กอดชาร์จแบตแน่นๆ 10 วินาที', points: 3, iconName: 'UserPlus', color: 'text-pink-500 bg-pink-100', period: 'daily', maxLimit: 3 },
  { id: 'd3', title: 'บอกรักหวานๆ ให้ใจฟู', points: 2, iconName: 'MessageCircleHeart', color: 'text-red-500 bg-red-100', period: 'daily', maxLimit: 3 },
  { id: 'd4', title: 'ชงน้ำ / เตรียมกาแฟให้', points: 3, iconName: 'Coffee', color: 'text-orange-500 bg-orange-100', period: 'daily', maxLimit: 2 },
  { id: 'd5', title: 'ทำอาหาร / ซื้อของโปรดมาให้กิน', points: 5, iconName: 'Gift', color: 'text-amber-500 bg-amber-100', period: 'daily', maxLimit: 2 },
  { id: 'd6', title: 'ช่วยล้างจานชามจนหมดซิงค์', points: 5, iconName: 'ThumbsUp', color: 'text-cyan-500 bg-cyan-100', period: 'daily', maxLimit: 3 },
  { id: 'd7', title: 'นวดไหล่ / นวดหลังให้ 15 นาที', points: 8, iconName: 'Activity', color: 'text-purple-500 bg-purple-100', period: 'daily', maxLimit: 2 },
  { id: 'd8', title: 'ชมแฟนว่าน่ารัก / หล่อ สวย', points: 2, iconName: 'Star', color: 'text-yellow-500 bg-yellow-100', period: 'daily', maxLimit: 5 },
  { id: 'd9', title: 'ยอมง้อ / ยอมขอโทษก่อนเวลาตึงๆ', points: 10, iconName: 'HeartHandshake', color: 'text-teal-500 bg-teal-100', period: 'daily', maxLimit: 1 },
  { id: 'd10', title: 'รับฟังปัญหาและให้กำลังใจตอนเหนื่อย', points: 8, iconName: 'Users', color: 'text-blue-500 bg-blue-100', period: 'daily', maxLimit: 2 },
  { id: 'd11', title: 'เอาขยะไปทิ้งให้', points: 3, iconName: 'Trash2', color: 'text-gray-500 bg-gray-100', period: 'daily', maxLimit: 1 },
  { id: 'd12', title: 'ส่งข้อความหาตอนทำงานว่าคิดถึง', points: 2, iconName: 'MessageCircleHeart', color: 'text-pink-500 bg-pink-100', period: 'daily', maxLimit: 2 },
  { id: 'd13', title: 'ป้อนขนม / อาหาร 1 คำ', points: 2, iconName: 'Heart', color: 'text-red-400 bg-red-100', period: 'daily', maxLimit: 3 },

  // Weekly Tasks
  { id: 'w1', title: 'ช่วยซักผ้า / ตากผ้า / พับผ้า', points: 15, iconName: 'Home', color: 'text-blue-500 bg-blue-100', period: 'weekly', maxLimit: 2 },
  { id: 'w2', title: 'ช่วยกวาดบ้าน / ถูบ้านจนสะอาดเอี่ยม', points: 20, iconName: 'Home', color: 'text-indigo-500 bg-indigo-100', period: 'weekly', maxLimit: 2 },
  { id: 'w3', title: 'ล้างห้องน้ำขัดจนเงาวับ', points: 20, iconName: 'Droplet', color: 'text-cyan-500 bg-cyan-100', period: 'weekly', maxLimit: 1 },
  { id: 'w4', title: 'ชวนไปออกกำลังกาย / เสียเหงื่อด้วยกัน', points: 15, iconName: 'Activity', color: 'text-emerald-500 bg-emerald-100', period: 'weekly', maxLimit: 4 },
  { id: 'w5', title: 'ซื้อของเข้าบ้านด้วยกัน', points: 15, iconName: 'ShoppingBag', color: 'text-orange-500 bg-orange-100', period: 'weekly', maxLimit: 2 },
  { id: 'w6', title: 'ทำเซอร์ไพรส์น่ารักๆ หรือพาไปเดท', points: 30, iconName: 'Gift', color: 'text-yellow-500 bg-yellow-100', period: 'weekly', maxLimit: 1 },
  { id: 'w7', title: 'ดูหนังด้วยกัน 1 เรื่อง (งดจับมือถือ)', points: 20, iconName: 'Video', color: 'text-purple-500 bg-purple-100', period: 'weekly', maxLimit: 2 },
  { id: 'w8', title: 'นั่งคุยกันเรื่องดีๆ / วางแผนอนาคต 30 นาที', points: 25, iconName: 'MessageCircleHeart', color: 'text-rose-500 bg-rose-100', period: 'weekly', maxLimit: 1 },
];

export function pullRandomCard(pulledIds: string[], user: UserType): Card | null {
  const poolBase = user === 'aoey' ? GACHA_POOL_AOEY : GACHA_POOL_POND;
  const availablePool = poolBase.filter(card => !pulledIds.includes(card.id));
  
  if (availablePool.length === 0) return null;

  const rand = Math.random();
  let targetRarity: Rarity;
    
  if (rand < 0.10) targetRarity = 'SSR';      // 10% chance
  else if (rand < 0.40) targetRarity = 'SR';  // 30% chance
  else targetRarity = 'R';                    // 60% chance

  let pool = availablePool.filter(card => card.rarity === targetRarity);
    
  if (pool.length === 0) {
    pool = availablePool;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

export function getRarityColor(rarity: Rarity): string {
  switch (rarity) {
    case 'SSR': return 'text-yellow-500 bg-yellow-100 ring-yellow-400';
    case 'SR': return 'text-fuchsia-500 bg-fuchsia-100 ring-fuchsia-400';
    case 'R': return 'text-blue-500 bg-blue-100 ring-blue-400';
  }
}
