/* Preview sample data — shaped exactly as the page scripts in public/js read it. */
window.DATA = {
  stats: { convToday: 452, convTrend: 12, aiHandled: 86, aiTrend: 4, transfers: 23, transTrend: -8, newContacts: 37, newTrend: 18 },

  numbers: {
    main: {
      label: { ar: "الرقم الرئيسي", en: "Main number" }, phone: "+968 9123 4567", active: true,
      meta: { phoneId: "104872819283746", accessToken: "EAAG-demo-token", wabaId: "237456891023456", callbackUrl: "https://api.sabalandqa.com/webhook/v1/whatsapp/main", verifyToken: "saba_k3m9x2p7q4wz", version: "v23.0" },
    },
    second: {
      label: { ar: "الرقم الإضافي", en: "Second number" }, phone: "+968 9765 4321", active: true,
      meta: { phoneId: "109928374655102", accessToken: "EAAG-demo-token", wabaId: "237456891098812", callbackUrl: "https://api.sabalandqa.com/webhook/v1/whatsapp/second", verifyToken: "saba_p8w2n6c4t9hb", version: "v23.0" },
    },
  },
  apiVersions: ["v23.0", "v22.0", "v21.0", "v20.0"],

  tags: [
    { id: "vip", ar: "VIP", en: "VIP", color: "gold" },
    { id: "active", ar: "نشط", en: "Active", color: "green" },
    { id: "new", ar: "جديد", en: "New", color: "blue" },
    { id: "wholesale", ar: "جملة", en: "Wholesale", color: "ai" },
    { id: "inactive", ar: "غير نشط", en: "Inactive", color: "gray" },
  ],
  convTags: [
    { id: "order", ar: "طلب", en: "Order", color: "green" },
    { id: "inquiry", ar: "استفسار", en: "Inquiry", color: "blue" },
    { id: "complaint", ar: "شكوى", en: "Complaint", color: "red" },
    { id: "followup", ar: "متابعة", en: "Follow-up", color: "amber" },
    { id: "done", ar: "مكتمل", en: "Done", color: "gold" },
  ],

  agents: [
    { id: "a1", n: "مريم السيابية", ne: "Mariam Al Siyabi", role: { ar: "خدمة العملاء", en: "Customer care" }, status: "active" },
    { id: "a2", n: "يوسف الهنائي", ne: "Yousef Al Hinai", role: { ar: "المبيعات", en: "Sales" }, status: "active" },
    { id: "a3", n: "هشام العبدالله", ne: "Hisham Al Abdullah", role: { ar: "الإدارة", en: "Management" }, status: "active" },
    { id: "a4", n: "ليلى الزدجالية", ne: "Laila Al Zadjali", role: { ar: "خدمة العملاء", en: "Customer care" }, status: "disabled" },
  ],

  conversations: [
    {
      id: "c1", name: "سالم البلوشي", nameEn: "Salem Al Balushi", phone: "+968 9234 5512", num: "main", lang: "ar",
      mode: "ai", aiOn: true, unread: 2, time: "10:42 ص", timeEn: "10:42 AM", tag: "vip", convTag: "order",
      topic: { ar: "طلب عسل سدر", en: "Sidr honey order" }, first: { ar: "مارس 2025", en: "Mar 2025" }, count: 14,
      msgs: [
        { t: "in", x: "السلام عليكم، عندكم عسل سدر ملكي؟", xe: "Hi, do you have royal Sidr honey?", tm: "10:38 ص", tme: "10:38 AM" },
        { t: "ai", x: "وعليكم السلام أخوي سالم 🌿 إيه متوفر! عسل السدر الملكي اليمني بـ 250 ر.ق للكيلو، و130 ر.ق لنص الكيلو. تحب أجهز لك طلب؟", xe: "Hello Salem 🌿 Yes, it's in stock! Royal Yemeni Sidr is 250 QAR per kg, or 130 QAR for half a kilo. Shall I prepare an order?", tm: "10:38 ص", tme: "10:38 AM" },
        { t: "in", x: "أبي 2 كيلو، والتوصيل لصحار كم ياخذ؟", xe: "I'd like 2 kg. How long is delivery to Sohar?", tm: "10:40 ص", tme: "10:40 AM" },
        { t: "ai", x: "تمام 👌 2 كيلو = 500 ر.ق، والتوصيل لصحار خلال 24-48 ساعة ومجاناً لأن طلبك فوق الحد. أحتاج منك الموقع وطريقة الدفع.", xe: "Great 👌 2 kg = 500 QAR, and delivery to Sohar takes 24–48 hours — free, since your order is above the minimum. I just need your location and payment method.", tm: "10:41 ص", tme: "10:41 AM" },
        { t: "in", x: "الدفع عند الاستلام إن شاء الله", xe: "Cash on delivery, please", tm: "10:42 ص", tme: "10:42 AM" },
      ],
      history: [
        { topic: { ar: "عسل السمر", en: "Samar honey" }, date: { ar: "12 أغسطس", en: "Aug 12" }, by: "AI" },
        { topic: { ar: "استفسار عن الشحن", en: "Shipping question" }, date: { ar: "3 يوليو", en: "Jul 3" }, by: "مريم" },
      ],
    },
    {
      id: "c2", name: "بريا شارما", nameEn: "Priya Sharma", phone: "+968 9877 1203", num: "second", lang: "en",
      mode: "ai", aiOn: true, unread: 1, time: "10:31 ص", timeEn: "10:31 AM", tag: "new", convTag: "inquiry",
      topic: { ar: "زيت حبة البركة", en: "Black seed oil" }, first: { ar: "اليوم", en: "Today" }, count: 1,
      msgs: [
        { t: "in", x: "Hi, is the black seed oil cold pressed?", tm: "10:28 ص", tme: "10:28 AM" },
        { t: "ai", x: "Hi Priya! 🌿 Yes — our black seed oil is 100% cold-pressed. The 250 ml bottle is 35 QAR. Would you like to order?", tm: "10:28 ص", tme: "10:28 AM" },
        { t: "in", x: "Great, do you deliver to Muscat?", tm: "10:31 ص", tme: "10:31 AM" },
      ],
      history: [],
    },
    {
      id: "c3", name: "فاطمة الحارثية", nameEn: "Fatma Al Harthy", phone: "+968 9301 7788", num: "main", lang: "ar",
      mode: "human", aiOn: false, unread: 0, time: "10:05 ص", timeEn: "10:05 AM", tag: "vip", convTag: "complaint",
      topic: { ar: "عبوة تالفة", en: "Damaged jar" }, first: { ar: "يناير 2025", en: "Jan 2025" }, count: 9,
      msgs: [
        { t: "in", x: "طلبي وصل والعلبة مكسورة 😞", xe: "My order arrived and the jar is broken 😞", tm: "9:52 ص", tme: "9:52 AM" },
        { t: "ai", x: "نعتذر جداً يا فاطمة 🙏 بحوّلك الحين لزميلتي مريم تتابع معك مباشرة.", xe: "We're so sorry, Fatma 🙏 I'm passing you to my colleague Mariam right now.", tm: "9:52 ص", tme: "9:52 AM" },
        { t: "out", x: "أهلاً فاطمة، أنا مريم. نعتذر عن اللي صار، بنرسل لك بديل اليوم بدون أي رسوم 🌿", xe: "Hi Fatma, this is Mariam. Sorry about that — we'll send a replacement today at no cost 🌿", tm: "10:01 ص", tme: "10:01 AM", human: true },
        { t: "in", x: "مشكورين على سرعة التجاوب ❤️", xe: "Thank you for the quick response ❤️", tm: "10:05 ص", tme: "10:05 AM" },
      ],
      history: [{ topic: { ar: "طلب هدية", en: "Gift order" }, date: { ar: "20 مايو", en: "May 20" }, by: "AI" }],
    },
    {
      id: "c4", name: "راجيش كومار", nameEn: "Rajesh Kumar", phone: "+968 9455 2290", num: "second", lang: "hi",
      mode: "ai", aiOn: true, unread: 3, time: "9:47 ص", timeEn: "9:47 AM", tag: "wholesale", convTag: "order",
      topic: { ar: "طلب جملة", en: "Wholesale order" }, first: { ar: "يونيو 2025", en: "Jun 2025" }, count: 5,
      msgs: [
        { t: "in", x: "नमस्ते, मुझे 10 किलो शहद चाहिए, होलसेल रेट क्या है?", tm: "9:44 ص", tme: "9:44 AM" },
        { t: "ai", x: "नमस्ते राजेश जी 🌿 10 किलो पर विशेष होलसेल रेट मिलेगा। मैं आपको हमारी सेल्स टीम से जोड़ रही हूँ।", tm: "9:45 ص", tme: "9:45 AM" },
        { t: "in", x: "ठीक है, धन्यवाद 🙏", tm: "9:47 ص", tme: "9:47 AM" },
      ],
      history: [{ topic: { ar: "عسل المراعي", en: "Mountain honey" }, date: { ar: "2 يونيو", en: "Jun 2" }, by: "يوسف" }],
    },
    {
      id: "c5", name: "خالد الرواحي", nameEn: "Khalid Al Rawahi", phone: "+968 9612 0034", num: "main", lang: "ar",
      mode: "ai", aiOn: false, closed: true, unread: 0, time: "أمس", timeEn: "Yesterday", tag: "active", convTag: "done",
      topic: { ar: "فاتورة طلب", en: "Order invoice" }, first: { ar: "فبراير 2025", en: "Feb 2025" }, count: 7,
      msgs: [
        { t: "in", x: "ممكن ترسلون لي فاتورة الطلب؟", xe: "Could you send me the order invoice?", tm: "8:10 م", tme: "8:10 PM" },
        { t: "ai", x: "أكيد أخوي خالد، تفضل الفاتورة 👇", xe: "Of course, Khalid — here's the invoice 👇", tm: "8:10 م", tme: "8:10 PM", file: "فاتورة-SB-2418.pdf" },
        { t: "in", x: "وصلت، شكراً 👍", xe: "Got it, thanks 👍", tm: "8:12 م", tme: "8:12 PM" },
      ],
      history: [],
    },
    {
      id: "c6", name: "نورة العامري", nameEn: "Noura Al Amri", phone: "+968 9188 4021", num: "second", lang: "ar",
      mode: "ai", aiOn: true, unread: 0, time: "9:12 ص", timeEn: "9:12 AM", tag: "active", convTag: "followup",
      topic: { ar: "خلطة العسل الملكية", en: "Royal honey blend" }, first: { ar: "أبريل 2025", en: "Apr 2025" }, count: 4,
      msgs: [
        { t: "in", x: "الخلطة الملكية فيها مكسرات؟ ولدي عنده حساسية", xe: "Does the royal blend have nuts? My son has an allergy", tm: "9:10 ص", tme: "9:10 AM" },
        { t: "ai", x: "إيه يا نورة، الخلطة فيها مكسرات. أنصحك بعسل المراعي الجبلية بـ 95 ر.ق للكيلو، خفيف ومناسب للأطفال 🌿", xe: "Yes Noura, the blend contains nuts. I'd suggest our mountain honey at 95 QAR/kg — light and great for kids 🌿", tm: "9:12 ص", tme: "9:12 AM" },
      ],
      history: [],
    },
    {
      id: "c7", name: "أحمد حسن", nameEn: "Ahmed Hassan", phone: "+968 9520 6617", num: "main", lang: "en",
      mode: "human", aiOn: false, unread: 0, time: "8:55 ص", timeEn: "8:55 AM", tag: "new", convTag: "inquiry",
      topic: { ar: "هدايا الشركات", en: "Corporate gifts" }, first: { ar: "اليوم", en: "Today" }, count: 1,
      msgs: [
        { t: "in", x: "Hello, we need 40 gift boxes for our company event. Can you customise them?", tm: "8:41 ص", tme: "8:41 AM" },
        { t: "ai", x: "Hello Ahmed! Custom gift boxes are handled by our sales team — connecting you now 🌿", tm: "8:41 ص", tme: "8:41 AM" },
        { t: "out", x: "Hi Ahmed, Yousef here. Yes, we can add your logo. I'll send options within the hour.", tm: "8:55 ص", tme: "8:55 AM", human: true },
      ],
      history: [],
    },
    {
      id: "c8", name: "عائشة الشكيلية", nameEn: "Aisha Al Shukaili", phone: "+968 9733 1450", num: "main", lang: "ar",
      mode: "ai", aiOn: true, unread: 0, time: "8:20 ص", timeEn: "8:20 AM", tag: "vip", convTag: "order",
      topic: { ar: "زعفران", en: "Saffron" }, first: { ar: "ديسمبر 2024", en: "Dec 2024" }, count: 21,
      msgs: [
        { t: "in", x: "أبي 3 غرام زعفران مع نص كيلو سدر ملكي", xe: "I'd like 3 g of saffron and half a kilo of royal Sidr", tm: "8:18 ص", tme: "8:18 AM" },
        { t: "ai", x: "تم يا عائشة ✅ 3 غرام زعفران (165 ر.ق) + نص كيلو سدر ملكي (130 ر.ق) = 295 ر.ق. نفس عنوانك السابق؟", xe: "Done, Aisha ✅ 3 g saffron (165 QAR) + half a kilo royal Sidr (130 QAR) = 295 QAR. Same address as last time?", tm: "8:20 ص", tme: "8:20 AM" },
      ],
      history: [{ topic: { ar: "طلب شهري", en: "Monthly order" }, date: { ar: "4 سبتمبر", en: "Sep 4" }, by: "AI" }],
    },
  ],

  contacts: [
    { id: "k1", n: "سالم البلوشي", ne: "Salem Al Balushi", ph: "+968 9234 5512", tag: "vip", lang: "ar", conv: 14, last: { ar: "منذ 5 د", en: "5 min ago" }, num: "main" },
    { id: "k2", n: "بريا شارما", ne: "Priya Sharma", ph: "+968 9877 1203", tag: "new", lang: "en", conv: 1, last: { ar: "منذ 15 د", en: "15 min ago" }, num: "second" },
    { id: "k3", n: "فاطمة الحارثية", ne: "Fatma Al Harthy", ph: "+968 9301 7788", tag: "vip", lang: "ar", conv: 9, last: { ar: "منذ 40 د", en: "40 min ago" }, num: "main" },
    { id: "k4", n: "راجيش كومار", ne: "Rajesh Kumar", ph: "+968 9455 2290", tag: "wholesale", lang: "hi", conv: 5, last: { ar: "منذ ساعة", en: "1 h ago" }, num: "second" },
    { id: "k5", n: "خالد الرواحي", ne: "Khalid Al Rawahi", ph: "+968 9612 0034", tag: "active", lang: "ar", conv: 7, last: { ar: "أمس", en: "Yesterday" }, num: "main" },
    { id: "k6", n: "نورة العامري", ne: "Noura Al Amri", ph: "+968 9188 4021", tag: "active", lang: "ar", conv: 4, last: { ar: "منذ ساعتين", en: "2 h ago" }, num: "second" },
    { id: "k7", n: "أحمد حسن", ne: "Ahmed Hassan", ph: "+968 9520 6617", tag: "new", lang: "en", conv: 1, last: { ar: "منذ ساعتين", en: "2 h ago" }, num: "main" },
    { id: "k8", n: "عائشة الشكيلية", ne: "Aisha Al Shukaili", ph: "+968 9733 1450", tag: "vip", lang: "ar", conv: 21, last: { ar: "منذ 3 ساعات", en: "3 h ago" }, num: "main" },
    { id: "k9", n: "سنيل ناير", ne: "Sunil Nair", ph: "+968 9402 8812", tag: "wholesale", lang: "hi", conv: 11, last: { ar: "منذ 3 أيام", en: "3 days ago" }, num: "second" },
    { id: "k10", n: "مها البوسعيدية", ne: "Maha Al Busaidi", ph: "+968 9277 6603", tag: "inactive", lang: "ar", conv: 2, last: { ar: "منذ شهرين", en: "2 months ago" }, num: "main" },
  ],

  quickReplies: [
    { id: "q1", cat: "welcome", lang: "ar", used: 412, title: { ar: "ترحيب", en: "Welcome" },
      body: { ar: "أهلاً وسهلاً {{اسم_العميل}} 🌿 نورت متجر سبا! كيف نقدر نخدمك اليوم؟", en: "Welcome {{customer_name}} 🌿 Thanks for reaching Saba! How can we help you today?" } },
    { id: "q2", cat: "pricing", lang: "ar", used: 268, title: { ar: "أسعار العسل", en: "Honey prices" },
      body: { ar: "🍯 سدر ملكي: 250 ر.ق/كيلو\n🍯 سدر يومي: 170 ر.ق/كيلو\n🍯 سمر: 130 ر.ق/كيلو\n🍯 مراعي جبلية: 95 ر.ق/كيلو", en: "🍯 Royal Sidr: 250 QAR/kg\n🍯 Daily Sidr: 170 QAR/kg\n🍯 Samar: 130 QAR/kg\n🍯 Mountain: 95 QAR/kg" } },
    { id: "q3", cat: "shipping", lang: "ar", used: 197, title: { ar: "مدة التوصيل", en: "Delivery time" },
      body: { ar: "التوصيل لكل عُمان خلال 24-48 ساعة 🚚 ومجاني للطلبات فوق 25 ر.ع.", en: "We deliver across Oman in 24–48 hours 🚚 — free on orders over 25 OMR." } },
    { id: "q4", cat: "shipping", lang: "en", used: 64, title: { ar: "تتبع الطلب", en: "Order tracking" },
      body: { ar: "طلبك رقم {{رقم_الطلب}} في الطريق إليك 📦", en: "Your order {{order_no}} is on its way 📦" } },
    { id: "q5", cat: "closing", lang: "ar", used: 233, title: { ar: "شكر وإغلاق", en: "Thanks & close" },
      body: { ar: "شكراً {{اسم_العميل}} على ثقتك فينا 💛 بالعافية مقدماً!", en: "Thank you {{customer_name}} for trusting us 💛 Enjoy!" } },
    { id: "q6", cat: "custom", lang: "hi", used: 38, title: { ar: "ترحيب بالهندية", en: "Hindi welcome" },
      body: { ar: "नमस्ते {{اسم_العميل}} 🌿 सबा में आपका स्वागत है!", en: "नमस्ते {{customer_name}} 🌿 सबा में आपका स्वागत है!" } },
  ],

  campaigns: [
    { id: "m1", n: { ar: "عرض عسل السدر — الخريف", en: "Sidr honey — autumn offer" }, aud: "all", num: "main", sent: 3240, read: 2780, reply: 410, st: "active", date: { ar: "اليوم", en: "Today" } },
    { id: "m2", n: { ar: "هدايا كبار العملاء", en: "VIP gift boxes" }, aud: "vip", num: "main", sent: 420, read: 398, reply: 96, st: "done", date: { ar: "28 سبتمبر", en: "Sep 28" } },
    { id: "m3", n: { ar: "أسعار الجملة الجديدة", en: "New wholesale prices" }, aud: "wholesale", num: "second", sent: 180, read: 151, reply: 44, st: "active", date: { ar: "1 أكتوبر", en: "Oct 1" } },
    { id: "m4", n: { ar: "ترحيب بالعملاء الجدد", en: "New customer welcome" }, aud: "new", num: "second", sent: 0, read: 0, reply: 0, st: "sched", date: { ar: "10 أكتوبر", en: "Oct 10" } },
    { id: "m5", n: { ar: "عروض اليوم الوطني", en: "National Day offers" }, aud: "active", num: "main", sent: 0, read: 0, reply: 0, st: "draft", date: { ar: "—", en: "—" } },
  ],

  activity: [
    { color: "ai", icon: "sparkle", t: { ar: "الذكاء الاصطناعي أكمل طلب سالم البلوشي (500 ر.ق)", en: "AI completed Salem Al Balushi's order (500 QAR)" }, tm: { ar: "منذ دقيقتين", en: "2 min ago" } },
    { color: "blue", icon: "transfer", t: { ar: "تحويل محادثة فاطمة الحارثية إلى مريم", en: "Fatma Al Harthy's chat transferred to Mariam" }, tm: { ar: "منذ 40 د", en: "40 min ago" } },
    { color: "green", icon: "contacts", t: { ar: "عميلة جديدة: بريا شارما", en: "New contact: Priya Sharma" }, tm: { ar: "منذ 15 د", en: "15 min ago" } },
    { color: "gold", icon: "campaign", t: { ar: "حملة «عرض عسل السدر» وصلت 3,240 عميل", en: "“Sidr honey” campaign reached 3,240 customers" }, tm: { ar: "منذ ساعة", en: "1 h ago" } },
    { color: "ai", icon: "sparkle", t: { ar: "الذكاء الاصطناعي رد على 38 محادثة خارج الدوام", en: "AI answered 38 after-hours chats" }, tm: { ar: "الليلة الماضية", en: "Last night" } },
  ],

  team: [
    { id: "t1", name: "هشام العبدالله", email: "info@sabalandqa.com", phone: "+968 9123 4567", status: "active", created: { ar: "يناير 2024", en: "Jan 2024" }, av: "#C9870A", owner: true, perms: ["overview", "conversations", "contacts", "replies", "campaigns", "reports", "ai-settings", "team", "account"] },
    { id: "t2", name: "مريم السيابية", email: "mariam@sabalandqa.com", phone: "+968 9345 1180", status: "active", created: { ar: "مارس 2024", en: "Mar 2024" }, av: "#2E9E5B", perms: ["overview", "conversations", "contacts", "replies"] },
    { id: "t3", name: "يوسف الهنائي", email: "yousef@sabalandqa.com", phone: "+968 9456 2271", status: "active", created: { ar: "يونيو 2024", en: "Jun 2024" }, av: "#3B72C9", perms: ["overview", "conversations", "contacts", "campaigns", "reports"] },
    { id: "t4", name: "ليلى الزدجالية", email: "laila@sabalandqa.com", phone: "+968 9567 3362", status: "disabled", created: { ar: "فبراير 2025", en: "Feb 2025" }, av: "#7C56C9", perms: ["conversations"] },
  ],

  PERMS: [
    { id: "overview", ar: "نظرة عامة", en: "Overview" },
    { id: "conversations", ar: "المحادثات", en: "Conversations" },
    { id: "contacts", ar: "جهات الاتصال", en: "Contacts" },
    { id: "replies", ar: "الردود السريعة", en: "Quick replies" },
    { id: "campaigns", ar: "الحملات", en: "Campaigns" },
    { id: "reports", ar: "التقارير", en: "Reports" },
    { id: "ai-settings", ar: "إعدادات الذكاء الاصطناعي", en: "AI settings" },
    { id: "team", ar: "الفريق", en: "Team" },
    { id: "account", ar: "إعدادات الحساب", en: "Account settings" },
  ],

  reports: {
    weekDays: { ar: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"], en: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"] },
    weekTotal: [312, 358, 401, 377, 452, 498, 452],
    weekAI: [262, 301, 349, 322, 391, 437, 389],
    langDist: [
      { ar: "العربية", en: "Arabic", pct: 68, color: "#C9870A" },
      { ar: "الإنجليزية", en: "English", pct: 22, color: "#3B72C9" },
      { ar: "الهندية", en: "Hindi", pct: 10, color: "#7C56C9" },
    ],
    byNumber: [
      { num: "main", conv: 1840, ai: 1600, transfers: 94, resp: 1.2 },
      { num: "second", conv: 1010, ai: 850, transfers: 48, resp: 1.7 },
    ],
    aiVsHuman: [86, 14],
    classDist: [
      { ar: "نشط", en: "Active", pct: 42, color: "#2E9E5B" },
      { ar: "جديد", en: "New", pct: 28, color: "#3B72C9" },
      { ar: "VIP", en: "VIP", pct: 18, color: "#C9870A" },
      { ar: "جملة", en: "Wholesale", pct: 12, color: "#7C56C9" },
    ],
    convTagDist: [
      { ar: "طلب", en: "Order", pct: 38, color: "#2E9E5B" },
      { ar: "استفسار", en: "Inquiry", pct: 34, color: "#3B72C9" },
      { ar: "متابعة", en: "Follow-up", pct: 14, color: "#D9922B" },
      { ar: "شكوى", en: "Complaint", pct: 6, color: "#D8484C" },
    ],
    topics: [
      { ar: "أسعار العسل", en: "Honey prices", pct: 34 },
      { ar: "التوصيل والشحن", en: "Delivery & shipping", pct: 22 },
      { ar: "تأكيد الطلبات", en: "Order confirmation", pct: 18 },
      { ar: "الزيوت الطبيعية", en: "Natural oils", pct: 14 },
      { ar: "الإرجاع والاستبدال", en: "Returns", pct: 6 },
    ],
    staff: [
      { n: "مريم السيابية", ne: "Mariam Al Siyabi", av: "#2E9E5B", h: 214, resp: { ar: "1.8 د", en: "1.8 min" }, rate: 4.9 },
      { n: "يوسف الهنائي", ne: "Yousef Al Hinai", av: "#3B72C9", h: 167, resp: { ar: "2.4 د", en: "2.4 min" }, rate: 4.7 },
      { n: "هشام العبدالله", ne: "Hisham Al Abdullah", av: "#C9870A", h: 58, resp: { ar: "3.1 د", en: "3.1 min" }, rate: 4.8 },
    ],
    peak: [
      [0, 0, 0, 0, 1, 2, 3, 3, 3, 4, 5, 3],
      [0, 0, 0, 0, 1, 3, 3, 2, 3, 4, 4, 2],
      [0, 0, 0, 0, 1, 2, 3, 3, 3, 4, 4, 2],
      [0, 0, 0, 0, 1, 2, 3, 2, 3, 3, 4, 2],
      [0, 0, 0, 1, 1, 3, 3, 3, 4, 4, 5, 3],
      [1, 0, 0, 0, 1, 2, 3, 3, 4, 5, 5, 4],
      [1, 0, 0, 0, 0, 1, 1, 2, 3, 4, 4, 3],
    ],
    hourly: [8, 4, 2, 1, 1, 3, 9, 22, 38, 52, 61, 64, 58, 49, 46, 55, 68, 79, 92, 108, 121, 112, 84, 41],
  },
};
