import { Card, Rarity, Task, UserType } from './types';

// คูปองที่ "เอ๋ย" จะได้สุ่ม (ปอนด์เป็นคนให้สัญญา/เปย์)
export const GACHA_POOL_AOEY: Card[] = [
  {
    id: 'a-ssr-1',
    rarity: 'SSR',
    title: '🎫 ตั๋วทริปเที่ยวตามใจเอ๋ย 1 ทริป',
    message: 'แฟนเด็กพร้อมเปย์! พาคนเก่งไปเที่ยวพักผ่อน จะทะเลหรือภูเขาก็จัดไปเลย (ขอบคุณที่กลับมาเจอกันในวัย 36 ของเอ๋ยนะ 💖)',
    iconName: 'Crown',
    themeColor: 'border-yellow-400',
    textColor: 'text-yellow-600',
    bgGradient: 'from-amber-100 via-yellow-200 to-amber-100',
  },
  {
    id: 'a-ssr-2',
    rarity: 'SSR',
    title: '🛍️ บัตรช้อปปิ้งรูดปรื๊ดดด',
    message: 'ให้แฟนเด็กคนนี้ได้เปย์บ้าง! อยากได้อะไรปอนด์จัดให้ ฉลอง 9 เดือนที่เรากลับมาคบกันตั้งแต่พฤศจิครับ 🥰',
    iconName: 'Sparkles',
    themeColor: 'border-rose-400',
    textColor: 'text-rose-600',
    bgGradient: 'from-rose-100 via-pink-200 to-rose-100',
  },
  {
    id: 'a-sr-1',
    rarity: 'SR',
    title: '🍽️ ดินเนอร์มื้อพิเศษสุดหรู',
    message: 'ตั๋วดินเนอร์ร้านโปรด ปอนด์ขอเป็นเจ้ามือเองครับ! ตอบแทนที่เอ๋ยน่ารักกับปอนด์มาตลอด',
    iconName: 'Heart',
    themeColor: 'border-pink-400',
    textColor: 'text-pink-600',
    bgGradient: 'from-pink-50 via-fuchsia-100 to-pink-50',
  },
  {
    id: 'a-sr-2',
    rarity: 'SR',
    title: '💆‍♀️ คูปองสปานวดส่วนตัว 1 ชม.',
    message: 'ช่วงนี้ปวดหลังบ่อย ให้ช่างนวดส่วนตัวที่ชื่อ "ปอนด์" ดูแลร่างกายให้เอ๋ยนะ นวดฟรีจัดเต็ม!',
    iconName: 'Activity',
    themeColor: 'border-purple-400',
    textColor: 'text-purple-600',
    bgGradient: 'from-purple-50 via-violet-100 to-purple-50',
  },
  {
    id: 'a-r-1',
    rarity: 'R',
    title: '🤫 บัตรชนะน็อค (ห้ามเถียง)',
    message: 'เวลาเรางอนกัน หรือปอนด์ดื้อ เอ๋ยใช้ใบนี้ปุ๊บ ปอนด์ยอมแพ้และง้อทันที 1 ครั้งถ้วน!',
    iconName: 'HeartHandshake',
    themeColor: 'border-emerald-300',
    textColor: 'text-emerald-600',
    bgGradient: 'from-emerald-50 to-teal-100',
  },
  {
    id: 'a-r-2',
    rarity: 'R',
    title: '🧹 คูปองพ่อบ้านใจกล้า',
    message: 'วันนี้ปอนด์จะทำงานบ้านให้ทุกอย่าง เอ๋ยแค่นั่งสวยๆ พักผ่อนให้สบายก็พอนะครับคนเก่ง',
    iconName: 'ThumbsUp',
    themeColor: 'border-blue-300',
    textColor: 'text-blue-600',
    bgGradient: 'from-blue-50 to-indigo-100',
  },
  {
    id: 'a-r-3',
    rarity: 'R',
    title: '🫂 คูปองกอดชาร์จแบต',
    message: 'ใช้แลกรับอ้อมกอดอุ่นๆ จากปอนด์ได้ทุกเมื่อที่ต้องการ กอดแน่นๆ ไม่ปล่อยเลยเอ้า!',
    iconName: 'UserPlus',
    themeColor: 'border-slate-300',
    textColor: 'text-slate-600',
    bgGradient: 'from-slate-50 to-gray-100',
  }
];

// คูปองที่ "ปอนด์" จะได้สุ่ม (เอ๋ยเป็นคนให้สัญญา/เปย์)
export const GACHA_POOL_POND: Card[] = [
  {
    id: 'p-ssr-1',
    rarity: 'SSR',
    title: '🎮 อนุมัติซื้อของเล่น/เกม 1 ชิ้น',
    message: 'ตั๋วระดับเทพ! เอ๋ยใจดีอนุมัติให้แฟนเด็กซื้อของเล่นหรือเกมที่เล็งไว้ได้ 1 ชิ้น (ในงบที่ตกลงกันนะ!)',
    iconName: 'Crown',
    themeColor: 'border-yellow-400',
    textColor: 'text-yellow-600',
    bgGradient: 'from-amber-100 via-yellow-200 to-amber-100',
  },
  {
    id: 'p-ssr-2',
    rarity: 'SSR',
    title: '👑 วันของราชาปอนด์',
    message: 'วันนี้เอ๋ยจะยอมตามใจปอนด์ทุกอย่าง 1 วันเต็มๆ อยากไปไหน กินอะไร เล่นเกมกี่ชั่วโมง จัดไป!',
    iconName: 'Sparkles',
    themeColor: 'border-rose-400',
    textColor: 'text-rose-600',
    bgGradient: 'from-rose-100 via-pink-200 to-rose-100',
  },
  {
    id: 'p-sr-1',
    rarity: 'SR',
    title: '🍻 ใบอนุญาตสังสรรค์',
    message: 'คูปองออกไปเจอเพื่อนๆ ปาร์ตี้สังสรรค์ได้ 1 คืนโดยที่เอ๋ยจะไม่บ่น (แต่อย่ากลับดึกเกินนะ เป็นห่วง!)',
    iconName: 'Star',
    themeColor: 'border-purple-400',
    textColor: 'text-purple-600',
    bgGradient: 'from-purple-50 via-violet-100 to-purple-50',
  },
  {
    id: 'p-sr-2',
    rarity: 'SR',
    title: '💆‍♂️ เอ๋ยนวดให้ 30 นาที',
    message: 'ทำงานมาเหนื่อยๆ เอ๋ยจะสวมบทเป็นหมอนวด นวดหลังนวดไหล่ให้แฟนเด็ก 30 นาทีเต็ม!',
    iconName: 'Activity',
    themeColor: 'border-pink-400',
    textColor: 'text-pink-600',
    bgGradient: 'from-pink-50 via-fuchsia-100 to-pink-50',
  },
  {
    id: 'p-r-1',
    rarity: 'R',
    title: '🍜 มื้อนี้เอ๋ยเลี้ยงเอง',
    message: 'คูปองคนสวยใจป๋า! มื้อถัดไปเอ๋ยขอเป็นเจ้ามือเลี้ยงข้าวปอนด์เอง เลือกร้านมาได้เลย',
    iconName: 'Gift',
    themeColor: 'border-emerald-300',
    textColor: 'text-emerald-600',
    bgGradient: 'from-emerald-50 to-teal-100',
  },
  {
    id: 'p-r-2',
    rarity: 'R',
    title: '🤫 บัตรห้ามบ่น 1 แมตช์',
    message: 'ปอนด์ทำผิดนิดหน่อย หรือเล่นเกมเพลิน ใช้ใบนี้ปุ๊บ เอ๋ยจะงดบ่น 1 ครั้งถ้วนรอดตัวไป!',
    iconName: 'Smile',
    themeColor: 'border-blue-300',
    textColor: 'text-blue-600',
    bgGradient: 'from-blue-50 to-indigo-100',
  },
  {
    id: 'p-r-3',
    rarity: 'R',
    title: '😘 หอมแก้มชื่นใจ',
    message: 'คูปองแลกจุ๊บ! แคปมาทวงเมื่อไหร่ เอ๋ยจะหอมแก้มปอนด์ฟอดใหญ่ๆ ให้ชื่นใจเลย',
    iconName: 'MessageCircleHeart',
    themeColor: 'border-red-300',
    textColor: 'text-red-500',
    bgGradient: 'from-red-50 to-rose-100',
  }
];

export const EARN_TASKS: Task[] = [
  // Daily Tasks
  { id: 'd1', title: 'วันนี้ {partner} จุ๊บแก้ม / จุ๊บเหม่งให้ชื่นใจ', points: 2, iconName: 'Smile', color: 'text-rose-500 bg-rose-100', period: 'daily', maxLimit: 3 },
  { id: 'd2', title: 'วันนี้ {partner} กอดชาร์จแบตแน่นๆ', points: 3, iconName: 'UserPlus', color: 'text-pink-500 bg-pink-100', period: 'daily', maxLimit: 3 },
  { id: 'd3', title: 'วันนี้ {partner} บอกรักหวานๆ ให้ใจฟู', points: 2, iconName: 'MessageCircleHeart', color: 'text-red-500 bg-red-100', period: 'daily', maxLimit: 3 },
  { id: 'd4', title: 'วันนี้ {partner} ชงน้ำ / เตรียมกาแฟให้', points: 3, iconName: 'Coffee', color: 'text-orange-500 bg-orange-100', period: 'daily', maxLimit: 2 },
  { id: 'd5', title: 'วันนี้ {partner} ทำอาหาร / ซื้อของโปรดมาให้กิน', points: 5, iconName: 'Gift', color: 'text-amber-500 bg-amber-100', period: 'daily', maxLimit: 2 },
  { id: 'd6', title: 'วันนี้ {partner} ช่วยล้างจานชามจนหมดซิงค์', points: 5, iconName: 'ThumbsUp', color: 'text-cyan-500 bg-cyan-100', period: 'daily', maxLimit: 3 },
  { id: 'd7', title: 'วันนี้ {partner} นวดไหล่ / นวดหลังให้ 15 นาที', points: 8, iconName: 'Activity', color: 'text-purple-500 bg-purple-100', period: 'daily', maxLimit: 2 },
  { id: 'd8', title: 'วันนี้ {partner} เตรียมชุด / บีบยาสีฟันให้', points: 3, iconName: 'Droplet', color: 'text-blue-500 bg-blue-100', period: 'daily', maxLimit: 1 },
  { id: 'd9', title: 'วันนี้ {partner} ชมแฟนให้ชื่นใจ', points: 2, iconName: 'Star', color: 'text-yellow-500 bg-yellow-100', period: 'daily', maxLimit: 5 },
  { id: 'd10', title: 'วันนี้ {partner} ยอมง้อ / ยอมขอโทษก่อนแบบน่ารักๆ', points: 10, iconName: 'HeartHandshake', color: 'text-teal-500 bg-teal-100', period: 'daily', maxLimit: 1 },
  { id: 'd11', title: 'วันนี้ {partner} รับฟังปัญหาและให้กำลังใจตอนเหนื่อย', points: 8, iconName: 'Users', color: 'text-blue-500 bg-blue-100', period: 'daily', maxLimit: 2 },
  { id: 'd12', title: 'วันนี้ {partner} ขับรถรับส่ง / เป็นสารถีให้', points: 5, iconName: 'Car', color: 'text-indigo-500 bg-indigo-100', period: 'daily', maxLimit: 2 },
  { id: 'd13', title: 'วันนี้ {partner} เอาขยะไปทิ้งให้', points: 3, iconName: 'Trash2', color: 'text-gray-500 bg-gray-100', period: 'daily', maxLimit: 1 },

  // Weekly Tasks
  { id: 'w1', title: 'สัปดาห์นี้ {partner} ช่วยซักผ้า / ตากผ้า / พับผ้า', points: 15, iconName: 'Home', color: 'text-blue-500 bg-blue-100', period: 'weekly', maxLimit: 2 },
  { id: 'w2', title: 'สัปดาห์นี้ {partner} ช่วยกวาดบ้าน / ถูบ้านจนสะอาดเอี่ยม', points: 20, iconName: 'Home', color: 'text-indigo-500 bg-indigo-100', period: 'weekly', maxLimit: 2 },
  { id: 'w3', title: 'สัปดาห์นี้ {partner} ล้างห้องน้ำขัดจนเงาวับ', points: 20, iconName: 'Droplet', color: 'text-cyan-500 bg-cyan-100', period: 'weekly', maxLimit: 1 },
  { id: 'w4', title: 'สัปดาห์นี้ {partner} ชวนไปออกกำลังกาย / เสียเหงื่อด้วยกัน', points: 15, iconName: 'Activity', color: 'text-emerald-500 bg-emerald-100', period: 'weekly', maxLimit: 4 },
  { id: 'w5', title: 'สัปดาห์นี้ {partner} ซื้อของเข้าบ้านด้วยกัน', points: 15, iconName: 'ShoppingBag', color: 'text-orange-500 bg-orange-100', period: 'weekly', maxLimit: 2 },
  { id: 'w6', title: 'สัปดาห์นี้ {partner} ล้างรถทำความสะอาดเอี่ยม', points: 20, iconName: 'Car', color: 'text-sky-500 bg-sky-100', period: 'weekly', maxLimit: 1 },
  { id: 'w7', title: 'สัปดาห์นี้ {partner} ทำเซอร์ไพรส์น่ารักๆ หรือพาไปเดท', points: 30, iconName: 'Gift', color: 'text-yellow-500 bg-yellow-100', period: 'weekly', maxLimit: 1 }
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
