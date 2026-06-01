export async function generateProductDetails(title: string) {
  // In a real application, this would call OpenAI or Gemini API
  // For the demo, we generate mock data based on the title

  const isIphone = title.toLowerCase().includes('iphone');
  const isAirpods = title.toLowerCase().includes('airpods');
  const isMacbook = title.toLowerCase().includes('macbook');

  let description = "Redtek Bilişim güvencesiyle sunulan bu harika cihaz, üstün teknolojisi ve şık tasarımıyla dikkat çekiyor. Hemen WhatsApp'tan sipariş verebilir veya Sultangazi'deki mağazamızı ziyaret edebilirsiniz.";
  let features = [
    "Orijinal Ürün",
    "Redtek Bilişim Garantisi",
    "Aynı Gün Kargo / Mağazadan Teslim"
  ];

  if (isIphone) {
    description = `Muhteşem kamerası ve güçlü işlemcisiyle ${title}, beklentilerinizi aşacak. İster harika fotoğraflar çekin, ister yüksek performanslı oyunlar oynayın. Sultangazi ve tüm Avrupa yakasına hızlı teslimat seçenekleriyle.`;
    features = [
      "Super Retina XDR Ekran",
      "Gelişmiş Kamera Sistemi",
      "Uzun Pil Ömrü",
      "Face ID Güvenliği"
    ];
  } else if (isAirpods) {
    description = `Aktif gürültü engelleme ve inanılmaz ses kalitesiyle ${title}. Müziğinizi ve aramalarınızı bambaşka bir seviyeye taşıyın. Redtek Bilişim kalitesiyle stoklarımızda.`;
    features = [
      "Aktif Gürültü Engelleme",
      "Şeffaf Mod",
      "Uzun Dinleme Süresi",
      "Tere ve Suya Dayanıklı Tasarım"
    ];
  } else if (isMacbook) {
    description = `Güç ve zarafetin buluştuğu nokta: ${title}. Apple Silicon gücüyle tüm gün süren pil ömrü ve inanılmaz performans. Profesyoneller için tasarlandı.`;
    features = [
      "M Serisi Güçlü İşlemci",
      "Liquid Retina Ekran",
      "Tüm Gün Süren Pil Ömrü",
      "Magic Keyboard"
    ];
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return { description, features };
}
