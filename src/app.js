/* Sabaland mobile app prototype — same pages, sections and data as the web dashboard, laid out for a phone. */
(function () {
  "use strict";
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  /* ---------- extra strings for the mobile shell ---------- */
  [
    ["appName", "تطبيق أرض سبأ", "Sabaland app"],
    ["panelSub", "تطبيق إدارة محادثات واتساب والذكاء الاصطناعي لفريق أرض سبأ. نفس صفحات وأقسام اللوحة، مصممة للموبايل.", "WhatsApp and AI conversation management for the Sabaland team. The same pages and sections as the web dashboard, designed for mobile."],
    ["pTheme", "المظهر", "Theme"], ["pLang", "اللغة", "Language"], ["pScreens", "الشاشات", "Screens"],
    ["replay", "إعادة السبلاش", "Replay splash"], ["light", "فاتح", "Light"], ["dark", "داكن", "Dark"],
    ["sample", "كل البيانات تجريبية", "All data is sample data"],
    ["scForgot", "نسيت كلمة المرور", "Forgot password"],
    ["testing", "جارٍ الاختبار…", "Testing…"], ["passShort", "كلمة المرور الجديدة لازم تكون 8 أحرف على الأقل", "The new password needs at least 8 characters"],
    ["fpTitle", "نسيت كلمة المرور؟", "Forgot your password?"],
    ["fpSub", "اختر طريقة استلام رمز التحقق، وسنرسل لك رمزاً من 4 أرقام.", "Choose where to get your code. We'll send a 4-digit verification code."],
    ["fpWhatsapp", "واتساب", "WhatsApp"], ["fpPhone", "رقم الواتساب", "WhatsApp number"], ["fpSend", "إرسال رمز التحقق", "Send code"],
    ["fpErrEmail", "اكتب بريداً إلكترونياً صحيحاً، مثل name@sabalandqa.com", "Enter a valid email, like name@sabalandqa.com"],
    ["fpErrPhone", "رقم الواتساب في {c} يتكوّن من {n} أرقام", "A WhatsApp number in {c} has {n} digits"],
    ["navSettings", "الإعدادات", "Settings"], ["grpTools", "الأدوات", "Tools"], ["grpApp", "التطبيق", "App"],
    ["viewProfile", "عرض الملف الشخصي", "View profile"], ["version", "الإصدار", "Version"],
    ["ntTitle", "الإشعارات", "Notifications"], ["ntOn", "مفعّلة", "On"], ["ntAlerts", "نبّهني عند", "Notify me about"],
    ["ntAlertsSub", "اختر الأحداث التي تصلك عنها إشعارات على هذا الجهاز", "Choose what sends a notification to this device"],
    ["ntNewMsg", "رسالة جديدة من عميل", "New customer message"], ["ntTransfer", "تحويل محادثة إليّ", "A chat transferred to me"],
    ["ntHandoff", "عميل يطلب موظفاً", "A customer asks for a person"], ["ntCampaign", "انتهاء إرسال حملة", "A campaign finishes sending"],
    ["ntDaily", "ملخص يومي الساعة 9 م", "Daily summary at 9 PM"], ["ntHow", "طريقة التنبيه", "How you're alerted"],
    ["ntSound", "الصوت", "Sound"], ["ntVibrate", "الاهتزاز", "Vibration"], ["ntDnd", "عدم الإزعاج", "Do not disturb"],
    ["ntDndSub", "أوقف الإشعارات في ساعات محددة، والذكاء الاصطناعي يكمل الرد على العملاء", "Silence notifications during set hours; the AI keeps answering customers"],
    ["ntDndOn", "تفعيل عدم الإزعاج", "Turn on do not disturb"],
    ["helpTitle", "المساعدة والدعم", "Help & support"], ["faqTitle", "أسئلة شائعة", "Common questions"],
    ["faq1q", "كيف أوقف الرد الآلي في محادثة؟", "How do I pause the AI in a chat?"],
    ["faq1a", "افتح المحادثة واضغط زر «AI يعمل» أعلى الشاشة ليتحول إلى «AI متوقف». اضغطه مرة أخرى لتشغيله.", "Open the chat and tap “AI on” at the top so it switches to “AI paused”. Tap it again to turn it back on."],
    ["faq2q", "كيف أحوّل محادثة لموظف؟", "How do I hand a chat to a teammate?"],
    ["faq2a", "من داخل المحادثة اضغط «تحويل»، اختر الموظف وأضف ملاحظة إن أردت. يتوقف الذكاء الاصطناعي تلقائياً بعد التحويل.", "In the chat tap “Transfer”, choose the teammate and add a note if you like. The AI pauses automatically."],
    ["faq3q", "كيف أربط رقم واتساب جديد؟", "How do I connect another WhatsApp number?"],
    ["faq3a", "من المزيد ← إعدادات الذكاء الاصطناعي ← «ربط رقم جديد»، ثم أدخل Phone Number ID و WABA ID و Access Token من حساب Meta للأعمال.", "Go to More → AI settings → “Connect a number”, then enter the Phone Number ID, WABA ID and Access Token from your Meta Business account."],
    ["faq4q", "لماذا لا يرد الذكاء الاصطناعي على عميل؟", "Why isn't the AI replying to a customer?"],
    ["faq4a", "تأكد أن الـ AI غير متوقف في المحادثة، وأن المحادثة غير مغلقة، وأن رقم الواتساب مفعّل في إعدادات الذكاء الاصطناعي.", "Check that the AI isn't paused in that chat, the chat isn't closed, and the WhatsApp number is turned on in AI settings."],
    ["faq5q", "كيف أضيف رداً سريعاً؟", "How do I add a quick reply?"],
    ["faq5a", "من المزيد ← الردود السريعة ← زر +. استخدم {{اسم_العميل}} و {{رقم_الطلب}} ليتم استبدالها تلقائياً.", "Go to More → Quick replies → +. Use {{customer_name}} and {{order_no}} and they fill in automatically."],
    ["contactUs", "تواصل معنا", "Contact us"], ["supportWa", "الدعم عبر واتساب", "Support on WhatsApp"], ["supportMail", "البريد الإلكتروني", "Email"],
    ["supportHours", "ساعات الدعم", "Support hours"], ["supportHoursV", "السبت – الخميس، 9 ص – 6 م", "Sat – Thu, 9 AM – 6 PM"],
    ["reportTitle", "الإبلاغ عن مشكلة", "Report a problem"], ["reportSub", "اكتب ما حدث وسنتواصل معك في أقرب وقت", "Tell us what happened and we'll get back to you"],
    ["reportTopic", "نوع المشكلة", "Problem type"], ["rtChat", "المحادثات", "Chats"], ["rtAi", "الرد الآلي", "AI replies"], ["rtNumber", "ربط رقم واتساب", "WhatsApp number"], ["rtOther", "أخرى", "Other"],
    ["reportMsg", "التفاصيل", "Details"], ["reportMsgPh", "مثال: الرسائل لا تصل من الرقم الإضافي منذ الصباح", "e.g. Messages from the second number stopped arriving this morning"],
    ["reportSend", "إرسال البلاغ", "Send report"], ["reportSent", "تم إرسال البلاغ، سنتواصل معك قريباً", "Report sent. We'll be in touch soon"],
    ["ntSettings", "إعدادات الإشعارات", "Notification settings"], ["ntToday", "اليوم", "Today"], ["ntYesterday", "أمس", "Yesterday"], ["ntReadAll", "تحديد الكل كمقروء", "Mark all as read"],
    ["ntAllRead", "تم تحديد كل الإشعارات كمقروءة", "All notifications marked as read"],
    ["segCount", "عميل", "contacts"], ["segNew", "تصنيف جديد", "New segment"], ["segActs", "خيارات التصنيف", "Segment options"],
    ["catNew", "فئة جديدة", "New category"], ["catActs", "خيارات الفئة", "Category options"], ["catCount", "رد", "replies"],
    ["nameAr", "الاسم (عربي)", "Name (Arabic)"], ["nameEn", "الاسم (إنجليزي)", "Name (English)"], ["colorLbl", "اللون", "Color"],
    ["aiAutoClose", "إغلاق المحادثات تلقائياً", "Auto-close conversations"],
    ["aiAutoCloseDesc", "إذا لم يرد العميل على آخر رسالة منّا خلال المدة المحددة، يُرسل المساعد رسالة إغلاق — وإذا لم يرد بعدها، تُغلق المحادثة.", "If the customer doesn't reply to our last message within the set time, the assistant sends a closing message — and if there's still no reply, the chat closes."],
    ["aiAutoCloseEnabled", "تفعيل الإغلاق التلقائي", "Turn on auto-close"], ["aiAutoCloseHours", "مدة الانتظار (ساعات)", "Wait time (hours)"],
    ["aiAutoCloseUseAi", "رسالة إغلاق ذكية (AI)", "Smart closing message (AI)"], ["aiAutoCloseMsg", "رسالة الإغلاق", "Closing message"],
    ["aiAutoCloseSteps", "الخطوة 1: إرسال رسالة إغلاق — الخطوة 2: إغلاق المحادثة إذا لم يرد العميل بعد نفس المدة.", "Step 1: send a closing message — Step 2: close the chat if the customer still doesn't reply after the same time."],
    ["defaultLang", "اللغة الافتراضية", "Default language"], ["defaultLangHint", "تُستخدم عندما تكون لغة العميل معطّلة أو غير واضحة.", "Used when the customer's language is turned off or unclear."],
    ["rngApply", "تطبيق", "Apply"], ["rngTitle", "الفترة الزمنية", "Time period"], ["rngCustomHint", "اختر يومين من التقويم", "Pick two days on the calendar"],
    ["vReqMsgOrFile", "اكتب نص الرسالة أو أضف مرفقاً", "Write a message or add an attachment"], ["vFileBig", "الحد الأقصى لحجم الملف 16 ميجا", "Files can be up to 16 MB"],
    ["vFileType", "نوع الملف غير مدعوم", "This file type isn't supported"], ["vDupPhoneMember", "هذا الرقم مستخدم لموظف آخر", "Another team member uses this number"],
    ["voiceSend", "إرسال", "Send"], ["voiceCancel", "إلغاء", "Cancel"], ["voiceNote", "رسالة صوتية", "Voice message"],
    ["ntNewMsg2", "رسالة جديدة", "New message"], ["ntNewContact", "جهة اتصال جديدة", "New contact"], ["ntCampaigns", "الحملات التسويقية", "Marketing campaigns"], ["ntReplies", "تعديلات الردود السريعة", "Quick reply changes"],
    ["optional", "اختياري", "Optional"], ["fbPick", "اختر ملفاً للإرفاق", "Choose a file to attach"], ["fbTypes", "صورة، PDF، مستند، فيديو أو صوت · حتى 16 ميجا", "Image, PDF, document, video or audio · up to 16 MB"], ["fbRemove", "إزالة الملف", "Remove file"], ["repSubShort", "تحليلات المحادثات والمساعد والفريق", "Chats, AI and team insights"], ["repliesSubShort", "ردود جاهزة للفريق والمساعد الذكي", "Ready replies for your team and AI"], ["ntMasterT", "تفعيل الإشعارات", "Turn on notifications"], ["ntMasterD", "عند الإيقاف لن تصلك أي إشعارات على هذا الجهاز", "When off, this device won't get any notifications"], ["catTabSeg", "تصنيفات العملاء", "Customer segments"], ["catTabTags", "وسوم المحادثات", "Conversation tags"], ["catTabRc", "فئات الردود", "Reply categories"], ["catsMgmt", "إدارة التصنيفات", "Categories"], ["catsMgmtSub", "كل التصنيفات والوسوم والفئات في مكان واحد", "All tags, segments and categories in one place"],
    ["unitSeg", "تصنيفات", "segments"], ["unitTag", "وسوم", "tags"], ["unitCat", "فئات", "categories"], ["replyCatSub", "فئات لترتيب الردود السريعة — تظهر عند إضافة رد أو اختياره", "Groups for quick replies — shown when adding or picking a reply"], ["mRoleLbl", "الدور", "Role"], ["mAddedLbl", "تاريخ الإضافة", "Date added"], ["mStaff", "موظف", "Staff"], ["ddAgentPh", "اختر موظفاً", "Choose a team member"], ["ddContactPh", "اختر جهة اتصال", "Choose a contact"], ["ddNone", "بدون — سأدخل رقماً جديداً", "None — I'll enter a new number"], ["ddEmpty", "لا توجد نتائج", "No matches"], ["fltTitle", "تصفية جهات الاتصال", "Filter contacts"], ["fltReset", "إعادة تعيين", "Reset"],
    ["fltShow", "عرض النتائج", "Show results"], ["fltTag", "التصنيف", "Tag"], ["fltLang", "اللغة", "Language"], ["fltAll", "الكل", "All"], ["fltManage", "إدارة التصنيفات", "Manage tags"], ["pCreds", "بيانات الدخول التجريبية", "Demo sign-in details"], ["pFill", "تعبئة الحقول", "Fill in the fields"], ["toastCampSending", "بدأ إرسال الحملة على دفعات", "Campaign started sending in chunks"],
    ["msgLocation", "الموقع", "Location"], ["msgPhoto", "صورة", "Photo"], ["msgEditExpired", "انتهت مدة التعديل (15 دقيقة)", "The 15-minute edit window has passed"], ["reqNote", "الحقول المعلّمة بـ * إلزامية", "Fields marked * are required"],
    ["vReq", "هذا الحقل إلزامي", "This field is required"],
    ["vEmail", "اكتب بريداً إلكترونياً صحيحاً، مثل name@sabalandqa.com", "Enter a valid email, like name@sabalandqa.com"],
    ["vMin", "اكتب {n} أحرف على الأقل", "Use at least {n} characters"], ["vMax", "الحد الأقصى {n} حرفاً", "Keep it to {n} characters or fewer"],
    ["vDigits", "أرقام فقط، من {a} إلى {b} رقماً", "Digits only, {a}–{b} digits"], ["vInt", "اكتب رقماً صحيحاً بين {a} و {b}", "Enter a whole number between {a} and {b}"],
    ["vPrefix", "لازم يبدأ بـ {p}", "It must start with {p}"], ["vNoSpace", "بدون مسافات", "No spaces"],
    ["vSame", "اختر كلمة مرور مختلفة عن الحالية", "Choose a password different from the current one"],
    ["vVars", "المتغير {v} غير معروف. المتاح: {{اسم_العميل}} و {{رقم_الطلب}}", "Unknown variable {v}. Available: {{customer_name}} and {{order_no}}"],
    ["vDupPhone", "هذا الرقم مسجّل بالفعل لـ {n}", "This number already belongs to {n}"], ["vDupEmail", "هذا البريد مستخدم لعضو آخر", "Another member already uses this email"],
    ["vDupName", "الاسم موجود بالفعل، اختر اسماً آخر", "This name already exists, choose another"],
    ["vNumOff", "هذا الرقم معطّل. فعّله من إعدادات الذكاء الاصطناعي أو اختر رقماً آخر", "This number is turned off. Turn it on in AI settings or pick another"],
    ["vOneOf", "اختر جهة اتصال من القائمة أو اكتب رقماً جديداً", "Pick a contact from the list or type a new number"],
    ["vHours", "وقت النهاية لازم يكون بعد وقت البداية", "The end time must be after the start time"],
    ["vFix", "صحّح الحقول المعلّمة بالأحمر", "Fix the fields marked in red"],
    ["ccPick", "اختر الدولة", "Choose country"], ["ccSearch", "ابحث عن دولة أو رمز", "Search country or code"],
    ["fpCodeTitle", "أدخل رمز التحقق", "Enter the code"], ["fpCodeSub", "أرسلنا رمزاً من 4 أرقام إلى", "We sent a 4-digit code to"],
    ["fpVerify", "تأكيد الرمز", "Verify code"], ["fpResendIn", "إعادة الإرسال خلال", "Resend in"], ["fpResend", "إعادة إرسال الرمز", "Resend code"],
    ["fpResent", "تم إرسال رمز جديد", "New code sent"],
    ["fpNewTitle", "كلمة مرور جديدة", "Set a new password"], ["fpNewSub", "اختر كلمة مرور قوية لم تستخدمها من قبل.", "Choose a strong password you haven't used before."],
    ["fpR1", "8 أحرف على الأقل", "At least 8 characters"], ["fpR2", "رقم واحد على الأقل", "At least one number"],
    ["fpR3", "حرف إنجليزي كبير وصغير", "Upper- and lowercase letters"], ["fpR4", "رمز مثل ! @ #", "A symbol like ! @ #"],
    ["fpWeak", "ضعيفة", "Weak"], ["fpFair", "متوسطة", "Fair"], ["fpStrong", "قوية", "Strong"],
    ["fpMismatch", "كلمتا المرور غير متطابقتين", "The passwords don't match"], ["fpSave", "حفظ كلمة المرور", "Save password"],
    ["fpDoneTitle", "تم تغيير كلمة المرور", "Password changed"], ["fpDoneSub", "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.", "You can now sign in with your new password."],
    ["fpBackLogin", "العودة لتسجيل الدخول", "Back to sign in"],
    ["scSplash", "السبلاش", "Splash"], ["scLogin", "تسجيل الدخول", "Sign in"], ["scChat", "شاشة المحادثة", "Chat"], ["scMore", "المزيد", "More"],
    ["tabHome", "الرئيسية", "Home"], ["tabChats", "المحادثات", "Chats"], ["tabContacts", "العملاء", "Contacts"], ["tabReports", "التقارير", "Reports"], ["tabMore", "المزيد", "More"],
    ["morning", "صباح الخير", "Good morning"], ["evening", "مساء الخير", "Good evening"], ["meName", "هشام العبدالله", "Hisham Al Abdullah"],

    ["email", "البريد الإلكتروني", "Email"], ["password", "كلمة المرور", "Password"], ["remember", "تذكرني", "Remember me"],
    ["forgot", "نسيت كلمة المرور؟", "Forgot password?"], ["signIn", "تسجيل الدخول", "Sign in"],
    ["toastWelcome", "أهلاً هشام 👋", "Welcome, Hisham 👋"], ["skip", "تخطي", "Skip"], ["tagline", "عسل يمني أصيل · زيوت طبيعية", "Authentic Yemeni honey · natural oils"],
    ["unreadN", "غير مقروءة", "unread"], ["sendFrom", "الأرقام", "Numbers"],
    ["darkMode", "الوضع الداكن", "Dark mode"], ["logout", "تسجيل الخروج", "Sign out"], ["general", "عام", "General"],
    ["prefs", "التفضيلات", "Preferences"], ["usedN", "مرة استخدام", "uses"], ["read", "قراءة", "read"],
    ["sent", "مُرسلة", "sent"], ["perfNum", "الأداء حسب الرقم", "Performance by number"], ["emojis", "الرموز", "Emoji"],
    ["numSwitchTitle", "اختر رقم واتساب", "Choose a WhatsApp number"], ["contactActs", "خيارات جهة الاتصال", "Contact options"],
    ["openChat", "فتح المحادثة", "Open chat"], ["memberActs", "خيارات العضو", "Member options"], ["replyActs", "خيارات الرد", "Reply options"],
    ["campActs", "خيارات الحملة", "Campaign options"], ["displayName", "اسم الرقم (للعرض)", "Display name"], ["activeSlots", "فترات نشطة", "Active slots"], ["weekTotalLbl", "محادثة خلال 7 أيام", "chats in the last 7 days"], ["today", "اليوم", "Today"], ["cmpYesterday", "النسب مقارنةً بأمس", "Changes compared with yesterday"], ["handled", "محادثة", "chats"], ["respAvg", "متوسط الرد", "avg. reply"],
  ].forEach(([k, ar, en]) => { I18N.ar[k] = ar; I18N.en[k] = en; });

  let LANG = store.get("sa-lang") === "en" ? "en" : "ar";
  const T = (k) => (I18N[LANG] && k in I18N[LANG] ? I18N[LANG][k] : k in I18N.ar ? I18N.ar[k] : k);
  const L = (o) => (o == null ? "" : typeof o !== "object" || Array.isArray(o) ? o : o[LANG] != null ? o[LANG] : o.ar);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const $ = (s, r) => (r || document).querySelector(s);

  /* brand colors on the shared sample data */
  const R = DATA.reports;
  ["var(--orange)", "var(--maroon)", "var(--ai)"].forEach((c, i) => { R.langDist[i].color = c; });
  ["var(--leaf)", "var(--blue)", "var(--orange)", "var(--ai)"].forEach((c, i) => { R.classDist[i].color = c; });
  ["var(--leaf)", "var(--blue)", "var(--amber)", "var(--red)"].forEach((c, i) => { R.convTagDist[i].color = c; });
  const AVC = ["#D9531A", "#6D3639", "#1F8A45", "#2F6FCF", "#6F4FD6", "#A86A0E", "#B03A6A", "#0E7C74"];
  const avColor = (i) => AVC[Math.abs(i) % AVC.length];
  DATA.team.forEach((m, i) => { m.av = avColor(i); });
  // contact segments ("تصنيفات العملاء") and quick-reply categories, named as in the dashboard
  DATA.tags = [
    { id: "vip", ar: "VIP", en: "VIP", color: "gold" }, { id: "wholesale", ar: "تاجر جملة", en: "Wholesale", color: "ai" },
    { id: "new", ar: "عميل جديد", en: "New", color: "blue" }, { id: "active", ar: "عميل نشط", en: "Active", color: "green" },
    { id: "inactive", ar: "غير نشط", en: "Inactive", color: "gray" },
  ];
  DATA.replyCats = [{ id: "welcome", ar: "ترحيب", en: "Welcome" }, { id: "pricing", ar: "الأسعار", en: "Pricing" }, { id: "shipping", ar: "التوصيل", en: "Shipping" }, { id: "closing", ar: "إغلاق", en: "Closing" }, { id: "custom", ar: "مخصص", en: "Custom" }];
  DATA.PERMS = DATA.PERMS.filter((p) => p.id !== "account").concat([{ id: "conversasion_tags", ar: "وسوم المحادثات", en: "Conversation tags" }]);
  DATA.team.forEach((m) => { m.perms = m.perms.map((p) => (p === "account" ? "conversasion_tags" : p)); });
  // sample media like the inbox shows (location from the customer, product photo from staff)
  (function () { const c = DATA.conversations.find((x) => x.id === "c1"); if (!c) return;
    c.msgs.splice(4, 0, { t: "in", loc: { ar: "صحار — الحي التجاري، شارع 12", en: "Sohar — Commercial district, St 12" }, x: "📍", xe: "📍", tm: "10:41 ص", tme: "10:41 AM" },
      { t: "out", img: 1, x: "سدر ملكي — عبوة 1 كيلو", xe: "Royal Sidr — 1 kg jar", tm: "10:41 ص", tme: "10:41 AM", human: true }); })();
  const LANG5 = [["ar", "langAr"], ["en", "langEn"], ["hi", "langHi"], ["hi_rom", "langHiRom"], ["ur_rom", "langUrRom"]];
  const AI_MSG = {
    off: { ar: "شكراً لتواصلك مع سبا فريقنا غير متاح حالياً، لكن سجّلت طلبك وسنعاود التواصل أول الدوام.", en: "Thanks for contacting Saba Land Our team is offline now, but I've logged your order and we'll reply first thing.", hi: "संपर्क करने के लिए धन्यवाद। हमारी टीम अभी ऑफ़लाइन है, लेकिन आपका अनुरोध दर्ज हो गया है और हम काम शुरू होते ही जवाब देंगे।", hi_rom: "Dhanyawad for contacting us. Hamari team abhi offline hai, lekin aapki request note ho gayi hai — hum jaldi jawab denge.", ur_rom: "Shukriya for contacting us. Hamari team abhi offline hai, lekin aapki request note ho gayi hai — hum jaldi jawab denge." },
    close: { ar: "شكراً لتواصلك مع سبا لاند يا {{اسم_العميل}} 🌿 إذا ما عندك أي استفسار إضافي، نعتبر المحادثة مغلقة حالياً — وإذا احتجت أي شي، راسلنا في أي وقت.", en: "Thanks for chatting with us, {{customer_name}} 🌿 If you do not need anything else, we will close this chat for now — message us anytime if you need help.", hi: "धन्यवाद {{customer_name}} 🌿 अगर आपको और कुछ नहीं चाहिए, तो हम यह चैट बंद कर रहे हैं — जब भी ज़रूरत हो, हमें फिर से लिखें।", hi_rom: "Dhanyawad {{customer_name}} 🌿 Agar aur kuch nahi chahiye, hum yeh chat band kar rahe hain — jab bhi zaroorat ho, humein phir se likhein.", ur_rom: "Shukriya {{customer_name}} 🌿 Agar aur kuch nahi chahiye, hum yeh chat band kar rahe hain — jab bhi zaroorat ho, humein phir se likhein." },
  };
  R.staff.forEach((m, i) => { m.av = avColor(i + 1); });

  /* ---------- icons ---------- */
  const P = (d) => d.split("|").map((x) => `<path d="${x}"/>`).join("");
  const C = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
  const RC = (x, y, w, h, rx) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  const USERS = P("M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|M22 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75") + C(9, 7, 4);
  const IC = {
    home: P("M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"),
    chat: P("M7.9 20A9 9 0 1 0 4 16.1L2 22Z"),
    whatsapp: P("M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21|M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"),
    sparkle: P("M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z|M19 3v4|M21 5h-4"),
    ai: RC(3, 8, 18, 12, 2) + P("M12 8V4H8|M2 14h2|M20 14h2|M15 13v2|M9 13v2"),
    transfer: P("M8 3 4 7l4 4|M4 7h16|M16 21l4-4-4-4|M20 17H4"),
    users: USERS,
    user: P("M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2") + C(12, 7, 4),
    reports: P("M3 3v18h18|M18 17V9|M13 17V5|M8 17v-3"),
    grid: RC(3, 3, 7, 7, 2) + RC(14, 3, 7, 7, 2) + RC(3, 14, 7, 7, 2) + RC(14, 14, 7, 7, 2),
    globe: C(12, 12, 10) + P("M2 12h20|M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"),
    clock: C(12, 12, 10) + P("M12 6v6l4 2"),
    up: P("M22 7 13.5 15.5 8.5 10.5 2 17|M16 7h6v6"),
    down: P("M22 17 13.5 8.5 8.5 13.5 2 7|M16 17h6v-6"),
    more: C(12, 12, 1) + C(19, 12, 1) + C(5, 12, 1),
    moreV: C(12, 5, 1) + C(12, 12, 1) + C(12, 19, 1),
    pen: P("M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"),
    copy: RC(8, 8, 14, 14, 2) + P("M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"),
    trash: P("M3 6h18|M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6|M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"),
    x: P("M18 6 6 18|M6 6l12 12"),
    plus: P("M5 12h14|M12 5v14"),
    campaign: P("M3 11l18-5v12L3 14v-3z|M11.6 16.8a3 3 0 1 1-5.8-1.6"),
    send: P("M22 2 11 13|M22 2l-7 20-4-9-9-4 20-7z"),
    eye: P("M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z") + C(12, 12, 3),
    eyeOff: P("M9.88 9.88a3 3 0 1 0 4.24 4.24|M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68|M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61|M2 2l20 20"),
    reply: P("M9 17 4 12l5-5|M20 18v-2a4 4 0 0 0-4-4H4"),
    tag: P("M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z") + C(7.5, 7.5, 0.5),
    search: C(11, 11, 8) + P("M21 21l-4.3-4.3"),
    file: P("M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z|M14 2v6h6"),
    check: P("M20 6 9 17l-5-5"),
    check2: P("M18 6 7 17l-5-5|M22 10l-7.5 7.5L13 16"),
    chevD: P("m6 9 6 6 6-6"),
    chevE: P("m9 18 6-6-6-6"),
    back: P("m15 18-6-6 6-6"),
    phone: P("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"),
    info: C(12, 12, 10) + P("M12 16v-4|M12 8h.01"),
    refresh: P("M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8|M21 3v5h-5|M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16|M8 16H3v5"),
    clip: P("m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"),
    smile: C(12, 12, 10) + P("M8 14s1.5 2 4 2 4-2 4-2|M9 9h.01|M15 9h.01"),
    key: P("M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z") + C(16.5, 7.5, 0.5),
    shield: P("M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"),
    lock: RC(3, 11, 18, 11, 2) + P("M7 11V7a5 5 0 0 1 10 0v4"),
    link: P("M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71|M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"),
    upload: P("M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M17 8l-5-5-5 5|M12 3v12"),
    settings: C(12, 12, 3) + P("M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"),
    palette: C(13.5, 6.5, 0.5) + C(17.5, 10.5, 0.5) + C(8.5, 7.5, 0.5) + C(6.5, 12.5, 0.5) + P("M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"),
    moon: P("M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"),
    sun: C(12, 12, 4) + P("M12 2v2|M12 20v2|M4.93 4.93l1.41 1.41|M17.66 17.66l1.41 1.41|M2 12h2|M20 12h2|M6.34 17.66l-1.41 1.41|M19.07 4.93l-1.41 1.41"),
    logout: P("M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4|M16 17l5-5-5-5|M21 12H9"),
    play: P("M6 4l14 8-14 8z"),
    bell: P("M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9|M10.3 21a1.94 1.94 0 0 0 3.4 0"),
    star: P("M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"),
    mic: RC(9, 2, 6, 12, 3) + P("M19 10v2a7 7 0 0 1-14 0v-2|M12 19v3"),
    pin: P("M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z") + C(12, 10, 3),
    sliders: P("M4 6h10|M18 6h2|M4 12h4|M12 12h8|M4 18h12|M20 18h0") + C(16, 6, 2) + C(10, 12, 2) + C(18, 18, 2),
    mail: RC(2, 4, 20, 16, 2) + P("m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"),
    calendar: RC(3, 4, 18, 18, 2) + P("M16 2v4|M8 2v4|M3 10h18"),
    bolt: P("M13 2 3 14h9l-1 8 10-12h-9l1-8z"),
    inbox: P("M22 12h-6l-2 3h-4l-2-3H2|M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"),
  };
  const FLIP = { chevE: 1, back: 1, send: 1, reply: 1 };
  const ic = (n) => `<svg class="i${FLIP[n] ? " flip" : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n] || IC.info}</svg>`;

  /* ---------- helpers ---------- */
  const initials = (n) => { const s = String(n || "").trim(); if (!s) return "?"; return /[؀-ۿ]/.test(s) ? (s.charAt(0) === "ه" ? "هـ" : s.charAt(0)) : s.split(/\s+/).slice(0, 2).map((w) => w[0].toUpperCase()).join(""); };
  const numLabel = (id) => (DATA.numbers[id] ? L(DATA.numbers[id].label) : id);
  const tagById = (id) => DATA.tags.find((t) => t.id === id) || { ar: "—", en: "—", color: "gray" };
  const ctagById = (id) => DATA.convTags.find((t) => t.id === id) || { ar: "—", en: "—", color: "gray" };
  const LANGS = { ar: { ar: "العربية", en: "Arabic" }, en: { ar: "الإنجليزية", en: "English" }, hi: { ar: "الهندية", en: "Hindi" } };
  const langLabel = (c) => (LANGS[c] ? L(LANGS[c]) : c);
  const tagVar = (c) => ({ gold: "orange", gray: "ink-3", green: "leaf", ai: "ai" }[c] || c);
  const catBy = (id) => DATA.replyCats.find((c) => c.id === id) || { ar: "—", en: "—" };
  const badge = (t) => `<span class="badge b-${t.color}">${esc(L(t))}</span>`;
  const av = (name, i, cls, num) => `<span class="av ${cls || ""}" style="background:${avColor(i)}">${esc(initials(name))}${num ? `<i class="nd ${num}"></i>` : ""}</span>`;
  const convName = (c) => (LANG === "ar" ? c.name : c.nameEn);
  const convTime = (c) => (LANG === "ar" ? c.time : c.timeEn);
  const msgText = (m) => (LANG === "ar" ? m.x : m.xe || m.x);
  const msgTime = (m) => (LANG === "ar" ? m.tm : m.tme || m.tm);
  const cName = (k) => (LANG === "ar" ? k.n : k.ne);
  const nowLabel = () => { const d = new Date(); let h = d.getHours(); const m = String(d.getMinutes()).padStart(2, "0"); const pm = h >= 12; h = h % 12 || 12; return LANG === "ar" ? `${h}:${m} ${pm ? "م" : "ص"}` : `${h}:${m} ${pm ? "PM" : "AM"}`; };
  const fmt = (n) => Number(n).toLocaleString(LANG === "ar" ? "en-US" : "en-US");
  const trend = (v, label) => `<span class="trend ${v >= 0 ? "up" : "down"}">${ic(v >= 0 ? "up" : "down")}${Math.abs(v)}%${label ? " " + label : ""}</span>`;
  const sw = (on, attrs) => `<label class="sw"><input type="checkbox" ${on ? "checked" : ""} ${attrs || ""}><span></span></label>`;
  // the signed-in user's avatar: the uploaded photo when there is one, else the initial
  const meAv = (style) => S.photo
    ? `<span class="av lg" style="${style};overflow:hidden"><img src="${S.photo}" alt="" style="width:100%;height:100%;object-fit:cover"></span>`
    : `<span class="av lg" style="background:linear-gradient(135deg,var(--orange),#B9461A);${style}">هـ</span>`;
  /* ---------- phone field: flag + dial code picker + number ---------- */
  const CC = [
    { iso: "om", ar: "عُمان", en: "Oman", dial: "+968", len: 8 }, { iso: "qa", ar: "قطر", en: "Qatar", dial: "+974", len: 8 },
    { iso: "ae", ar: "الإمارات", en: "UAE", dial: "+971", len: 9 }, { iso: "sa", ar: "السعودية", en: "Saudi Arabia", dial: "+966", len: 9 },
    { iso: "kw", ar: "الكويت", en: "Kuwait", dial: "+965", len: 8 }, { iso: "bh", ar: "البحرين", en: "Bahrain", dial: "+973", len: 8 },
    { iso: "ye", ar: "اليمن", en: "Yemen", dial: "+967", len: 9 }, { iso: "eg", ar: "مصر", en: "Egypt", dial: "+20", len: 10 },
    { iso: "jo", ar: "الأردن", en: "Jordan", dial: "+962", len: 9 }, { iso: "in", ar: "الهند", en: "India", dial: "+91", len: 10 },
    { iso: "pk", ar: "باكستان", en: "Pakistan", dial: "+92", len: 10 }, { iso: "bd", ar: "بنغلاديش", en: "Bangladesh", dial: "+880", len: 10 },
  ];
  const ccBy = (iso) => CC.find((c) => c.iso === iso) || CC[0];
  // simplified SVG flags (Windows shows emoji flags as letters)
  const H3 = (a, b, c) => `<rect width="30" height="6.7" fill="${a}"/><rect y="6.7" width="30" height="6.6" fill="${b}"/><rect y="13.3" width="30" height="6.7" fill="${c}"/>`;
  const SAW = (x, teeth, fill) => { let d = `M0 0H${x}`; const h = 20 / teeth; for (let i = 0; i < teeth; i++) d += `L${x + 3.2} ${h * i + h / 2}L${x} ${h * (i + 1)}`; return `<path d="${d}H0Z" fill="${fill}"/>`; };
  const FLAGS = {
    om: `<rect width="30" height="20" fill="#DB161B"/><rect x="9" width="21" height="6.7" fill="#fff"/><rect x="9" y="13.3" width="21" height="6.7" fill="#008000"/>`,
    qa: `<rect width="30" height="20" fill="#8A1538"/>${SAW(8, 9, "#fff")}`,
    ae: `${H3("#00732F", "#fff", "#000")}<rect width="8" height="20" fill="#FF0000"/>`,
    sa: `<rect width="30" height="20" fill="#006C35"/><rect x="8" y="6" width="14" height="3.6" rx="1.2" fill="#fff"/><rect x="7" y="12.4" width="16" height="1.4" rx=".7" fill="#fff"/>`,
    kw: `${H3("#007A3D", "#fff", "#CE1126")}<path d="M0 0l7.5 6.7v6.6L0 20z" fill="#000"/>`,
    bh: `<rect width="30" height="20" fill="#CE1126"/>${SAW(8, 5, "#fff")}`,
    ye: H3("#CE1126", "#fff", "#000"),
    eg: `${H3("#CE1126", "#fff", "#000")}<circle cx="15" cy="10" r="2" fill="#C09300"/>`,
    jo: `${H3("#000", "#fff", "#007A3D")}<path d="M0 0l13 10L0 20z" fill="#CE1126"/><circle cx="4.6" cy="10" r="1.1" fill="#fff"/>`,
    in: `${H3("#FF9933", "#fff", "#138808")}<circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" stroke-width=".9"/>`,
    pk: `<rect width="30" height="20" fill="#01411C"/><rect width="7.5" height="20" fill="#fff"/><circle cx="19" cy="10" r="5" fill="#fff"/><circle cx="20.6" cy="8.7" r="4.4" fill="#01411C"/>`,
    bd: `<rect width="30" height="20" fill="#006A4E"/><circle cx="13.5" cy="10" r="6" fill="#F42A41"/>`,
  };
  const flag = (iso) => `<svg class="flag" viewBox="0 0 30 20" aria-hidden="true">${FLAGS[iso] || FLAGS.om}</svg>`;
  const fmtPhone = (d, len) => { const g = len === 10 ? [3, 3, 4] : len === 9 ? [2, 3, 4] : [4, 4]; let out = [], i = 0; for (const n of g) { if (i >= d.length) break; out.push(d.slice(i, i + n)); i += n; } if (i < d.length) out.push(d.slice(i)); return out.join(" "); };
  const phPh = (len) => fmtPhone("9".padEnd(len, "x"), len);
  function splitPhone(full) {
    const raw = String(full || "").replace(/\s/g, "");
    const c = CC.slice().sort((a, b) => b.dial.length - a.dial.length).find((x) => raw.startsWith(x.dial)) || CC[0];
    return { c, num: raw.startsWith(c.dial) ? raw.slice(c.dial.length) : raw.replace(/^\+\d*/, "") };
  }
  const telIn = (id, full) => {
    const { c, num } = splitPhone(full);
    return `<div class="tel" dir="ltr" data-cc="${c.iso}"><button type="button" class="tel-cc" data-act="ccOpen" aria-haspopup="listbox" aria-expanded="false" aria-label="${T("ccPick")}"><span class="cc-in" dir="ltr">${flag(c.iso)}<span class="num">${c.dial}</span></span>${ic("chevD")}</button><input id="${id}" class="tel-num" type="tel" inputmode="tel" dir="ltr" value="${fmtPhone(num.replace(/\D/g, ""), c.len)}" placeholder="${phPh(c.len)}" autocomplete="off"></div>`;
  };
  const telVal = (id) => { const i = $("#" + id), c = ccBy(i.closest(".tel").dataset.cc), d = i.value.replace(/\D/g, ""); return { full: d ? `${c.dial} ${fmtPhone(d, c.len)}` : "", digits: d, c }; };
  // the country list opens as its own small sheet stacked above whatever is on screen (even another sheet)
  const ccPicker = (cur) => `<div class="scrim" data-act="ccClose"></div><div class="sheet surf-2" role="dialog" aria-modal="true" aria-label="${T("ccPick")}"><div class="grab"></div>
    <div class="sh-h"><div class="sh-t"><h3>${T("ccPick")}</h3></div><button class="ibtn sm surf" data-act="ccClose" aria-label="close">${ic("x")}</button></div>
    <div class="search" style="margin:0 20px 6px">${ic("search")}<input class="cc-search inp" type="search" placeholder="${T("ccSearch")}" aria-label="${T("ccSearch")}"></div>
    <div class="sh-b cc-list" role="listbox">${CC.map((c) => `<button type="button" class="cc-opt${c.iso === cur ? " on" : ""}" role="option" aria-selected="${c.iso === cur}" data-act="ccSet" data-arg="${c.iso}" data-q="${c.ar} ${c.en} ${c.dial}">${flag(c.iso)}<span>${L(c)}</span><span class="d num" dir="ltr">${c.dial}</span>${c.iso === cur ? `<span style="color:var(--accent)">${ic("check")}</span>` : ""}</button>`).join("")}</div></div>`;
  function ccClose(now) {
    const host = $("#pickHost"); if (!host || !host.innerHTML) return;
    if (S.ccTarget) { const b = S.ccTarget.querySelector(".tel-cc"); if (b) b.setAttribute("aria-expanded", "false"); }
    if (now) { host.innerHTML = ""; return; }
    host.querySelectorAll(".scrim,.sheet").forEach((e) => e.classList.remove("show"));
    setTimeout(() => { if (!host.querySelector(".sheet.show")) host.innerHTML = ""; }, 380);
  }
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.matches(".tel-num")) { const c = ccBy(t.closest(".tel").dataset.cc), d = t.value.replace(/\D/g, "").slice(0, c.len + 2); t.value = fmtPhone(d, c.len); }
    if (t.matches(".cc-search")) { const q = t.value.trim().toLowerCase(); t.closest(".sheet").querySelectorAll(".cc-opt").forEach((o) => { o.hidden = !!q && !o.dataset.q.toLowerCase().includes(q); }); }
  });

  const pass = (id, val, ph, ltr) => `<div class="ifield has-end"><span class="if-ic">${ic("lock")}</span><input id="${id}" class="inp" type="password" ${ltr ? 'dir="ltr"' : ""} value="${esc(val)}" placeholder="${ph}" autocomplete="off"><button type="button" class="if-end" data-act="eye" data-arg="${id}" aria-label="${LANG === "ar" ? "إظهار كلمة المرور" : "Show password"}">${ic("eye")}</button></div>`;
  const tgl = (label, on, attrs) => `<div class="tgl"><span>${label}</span>${sw(on, attrs)}</div>`;
  const unreadTotal = () => DATA.conversations.reduce((s, c) => s + (c.closed ? 0 : c.unread || 0), 0);
  const getConv = (id) => DATA.conversations.find((c) => c.id === id);

  /* ---------- charts (plain SVG) ---------- */
  let gid = 0;
  function smooth(pts) {
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
    }
    return d;
  }
  function lineChart(labels, series, opts) {
    const W = 330, H = (opts && opts.h) || 150, pl = 30, pr = 6, pt = 10, pb = 22;
    const rtl = LANG === "ar";
    const max = Math.max(...series.flatMap((s) => s.data));
    const step = max > 300 ? 200 : max > 100 ? 50 : 25;
    const top = Math.ceil(max / step) * step;
    const n = labels.length;
    const xAt = (i) => { const t = n === 1 ? 0 : i / (n - 1); const x = pl + t * (W - pl - pr); return rtl ? W - x : x; };
    const yAt = (v) => pt + (1 - v / top) * (H - pt - pb);
    const yLabX = rtl ? W - 2 : 2;
    let g = "";
    for (let v = 0; v <= top; v += step) g += `<line class="grid" x1="${rtl ? pr : pl}" x2="${rtl ? W - pl : W - pr}" y1="${yAt(v)}" y2="${yAt(v)}"/><text x="${yLabX}" y="${yAt(v) + 3}" text-anchor="${rtl ? "end" : "start"}">${v}</text>`;
    const every = n > 12 ? 4 : 1;
    labels.forEach((l, i) => { if (i % every === 0) g += `<text x="${xAt(i)}" y="${H - 6}" text-anchor="middle">${esc(l)}</text>`; });
    let defs = "", paths = "";
    series.forEach((s, si) => {
      const id = "lg" + ++gid;
      const pts = s.data.map((v, i) => [xAt(i), yAt(v)]);
      const d = smooth(pts);
      defs += `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:${s.color};stop-opacity:${si ? 0.16 : 0.3}"/><stop offset="1" style="stop-color:${s.color};stop-opacity:0"/></linearGradient>`;
      paths += `<path class="ar" d="${d} L${pts[pts.length - 1][0]},${yAt(0)} L${pts[0][0]},${yAt(0)} Z" fill="url(#${id})"/>`;
      paths += `<path class="ln" pathLength="1" d="${d}" style="fill:none;stroke:${s.color};stroke-width:2.6;stroke-linecap:round"/>`;
      const e = pts[pts.length - 1];
      paths += `<circle class="end" cx="${e[0]}" cy="${e[1]}" r="4.5" style="fill:${s.color};stroke:var(--bg);stroke-width:2.5"/>`;
    });
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img"><defs>${defs}</defs>${g}${paths}</svg>`;
  }
  function donut(vals, colors, center, sub, size) {
    const r = 46, c = 2 * Math.PI * r, tot = vals.reduce((a, b) => a + b, 0);
    let off = 0, arcs = "";
    vals.forEach((v, i) => {
      const len = (v / tot) * c;
      arcs += `<circle class="arc" cx="60" cy="60" r="${r}" style="--i:${i};fill:none;stroke:${colors[i]};stroke-width:14;stroke-dasharray:${Math.max(len - 3, 0)} ${c};stroke-dashoffset:${-off};stroke-linecap:round" transform="rotate(-90 60 60)"/>`;
      off += len;
    });
    const px = size || 128;
    return `<div class="donut" style="width:${px}px;height:${px}px"><svg viewBox="0 0 120 120" width="${px}" height="${px}"><circle cx="60" cy="60" r="${r}" style="fill:none;stroke:var(--hair);stroke-width:14"/>${arcs}</svg><div class="dc"><b class="num">${center}</b><span>${sub || ""}</span></div></div>`;
  }
  // weekly bars: bar = all chats that day, purple base = the share answered by AI; the last day is today
  function weekBars(days, total, ai) {
    const max = Math.max(...total), today = total.length - 1;
    return `<div class="wbars" role="img">${days.map((d, i) => `<div class="wb${i === today ? " today" : ""}"><div class="wcol"><span class="wv num">${total[i]}</span><span class="wt" style="height:${Math.round((total[i] / max) * 112)}px"><i style="height:${Math.round((ai[i] / total[i]) * 100)}%"></i></span></div><span class="wd">${i === today ? T("today") : esc(d)}</span></div>`).join("")}</div>`;
  }
  const dist = (label, pct, color) => `<div class="dist"><div class="dt"><span>${esc(label)}</span><b>${pct}%</b></div><div class="bar"><i style="width:${pct}%;background:${color}"></i></div></div>`;

  /* ---------- state ---------- */
  const S = { screen: "splash", tab: "overview", chat: null, filter: "all", num: "all", q: "", cq: "", fTag: "all", fLang: "all", fNum: "all", ntOn: true, qrCat: "all", catTab: "seg", range: "repPeriodCurrentMonth", fp: { step: 1, via: "email", id: "info@sabalandqa.com" }, sheet: null, sheetArg: null, confirm: null, from: "more" };
  const TABS = ["overview", "conversations", "contacts", "more"];
  const SUBS = ["segments", "replies", "campaigns", "reports", "ai-settings", "team", "account", "profile", "set-appearance", "set-notifs", "set-security", "set-lang", "set-tags", "set-cats", "reply-cats"];
  // screens whose "add" action is a floating button: sheet to open + its label
  const FABS = { conversations: ["newConv", "newConv"], contacts: ["contactForm", "addContact"], replies: ["replyForm", "addReply"], campaigns: ["campForm", "addCamp"], team: ["memberForm", "addMember"], segments: ["segForm", "segNew"], "set-tags": ["tagForm", "addConvTag"], "reply-cats": ["catForm", "catNew"], "set-cats": () => CAT_TABS.find((x) => x[0] === S.catTab)[4] };

  /* ---------- screens ---------- */
  const SCR = {};
  const hdr = (title, sub, right) => `<div class="hdr"><div class="ttl"><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ""}</div>${right || ""}</div>`;
  const subHdr = (title, right, sub) => `<div class="sub-hdr"><button class="ibtn surf" data-act="back" aria-label="back">${ic("back")}</button><div class="sh-tt"><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ""}</div>${right || ""}</div>`;
  const cardT = (icon, title, extra) => `<div class="card-t"><span class="ci">${ic(icon)}</span><h4>${title}</h4>${extra || ""}</div>`;
  // stat tile: icon + trend on top, big figure, label. `acc` = the one orange tile per grid.
  const stat = (icn, cls, val, label, tr, acc) => `<div class="st ${acc ? "acc" : "surf"}"><div class="st-top"><span class="ti ${acc ? "" : cls}">${ic(icn)}</span>${tr || ""}</div><div class="st-v">${val}</div><div class="st-l">${label}</div></div>`;

  /* ---------- notification center ---------- */
  const NOTIFS = [ // mirrors NotificationService payloads: new message / conversation / contact, transfer to you, campaigns, quick replies
    { id: "n1", icon: "chat", cls: "c-g", day: "today", unread: true, go: ["chat", "c4"], t: { ar: "رسالة جديدة من راجيش كومار", en: "New message from Rajesh Kumar" }, s: { ar: "طلب جملة · الرقم الإضافي", en: "Wholesale order · second number" }, tm: { ar: "منذ 5 د", en: "5 min ago" } },
    { id: "n2", icon: "transfer", cls: "c-b", day: "today", unread: true, go: ["chat", "c3"], t: { ar: "تحويل محادثة إليك: فاطمة الحارثية", en: "Conversation transferred to you: Fatma Al Harthy" }, s: { ar: "حوّلها المساعد الذكي · شكوى", en: "Transferred by the AI · complaint" }, tm: { ar: "منذ 10 د", en: "10 min ago" } },
    { id: "n3", icon: "chat", cls: "c-o", day: "today", unread: true, go: ["chat", "c2"], t: { ar: "محادثة جديدة: بريا شارما", en: "New conversation: Priya Sharma" }, s: { ar: "الرقم الإضافي", en: "Second number" }, tm: { ar: "منذ 30 د", en: "30 min ago" } },
    { id: "n4", icon: "users", cls: "c-ai", day: "today", unread: false, go: ["contacts"], t: { ar: "جهة اتصال جديدة: أحمد حسن", en: "New contact: Ahmed Hassan" }, s: { ar: "أُضيفت تلقائياً من واتساب", en: "Added automatically from WhatsApp" }, tm: { ar: "منذ ساعتين", en: "2 h ago" } },
    { id: "n5", icon: "campaign", cls: "c-o", day: "yesterday", unread: false, go: ["campaigns"], t: { ar: "جاري إرسال الحملة «عرض عسل السدر — الخريف»", en: "Sending campaign “Sidr honey — autumn offer”" }, s: { ar: "كل العملاء · الرقم الرئيسي", en: "All customers · main number" }, tm: { ar: "أمس 8:30 م", en: "Yesterday 8:30 PM" } },
    { id: "n6", icon: "bolt", cls: "c-m", day: "yesterday", unread: false, go: ["replies"], t: { ar: "تم تعديل رد سريع: أسعار العسل", en: "Quick reply updated: Honey prices" }, s: { ar: "بواسطة مريم السيابية", en: "By Mariam Al Siyabi" }, tm: { ar: "أمس 4:10 م", en: "Yesterday 4:10 PM" } },
  ];
  const ntUnread = () => NOTIFS.filter((n) => n.unread).length;
  const bellBtn = () => { const n = ntUnread(); return `<button class="ibtn surf bell${n ? " has" : ""}" data-act="go" data-arg="notifications" aria-label="${T("ntTitle")}${n ? " · " + n + " " + T("unreadN") : ""}">${ic("bell")}${n ? `<span class="bdg num">${n}</span>` : ""}</button>`; };
  SCR.notifications = () => {
    const n = ntUnread();
    const group = (day, key) => { const items = NOTIFS.filter((x) => x.day === day); return items.length ? `<div class="sec"><div class="sec-h"><h3>${T(key)}</h3></div><div class="list surf">${items.map((x) => `<button class="row nt${x.unread ? " is-unread" : ""}" data-act="openNotif" data-arg="${x.id}"><span class="mi ${x.cls}">${ic(x.icon)}</span><span class="rb"><span class="rn">${esc(L(x.t))}</span><span class="rs">${esc(L(x.s))} · ${esc(L(x.tm))}</span></span>${x.unread ? '<i class="ndot-u" aria-label="unread"></i>' : ""}</button>`).join("")}</div></div>` : ""; };
    return `<div class="scroller">${subHdr(T("ntTitle"))}
      ${n ? `<div class="nt-bar"><span>${n} ${T("unreadN")}</span><button data-act="ntReadAll">${T("ntReadAll")}</button></div>` : ""}
      ${group("today", "ntToday")}${group("yesterday", "ntYesterday")}</div>`;
  };

  SCR.overview = () => {
    const s = DATA.stats, r = DATA.reports;
    const greet = new Date().getHours() < 12 ? T("morning") : T("evening");
    const weekSum = r.weekTotal.reduce((a, b) => a + b, 0);
    return `<div class="scroller">
      <div class="hdr greet"><div class="ttl"><p class="hi">${greet} <span class="wave" aria-hidden="true">👋</span></p><h2>${T("meName")}</h2></div>${bellBtn()}</div>
      <div class="bento2">
        ${stat("chat", "", `<span id="statConv">${s.convToday}</span>`, T("ovConvToday"), trend(s.convTrend), true)}
        ${stat("sparkle", "c-ai", s.aiHandled + "%", T("ovAIHandled"), trend(s.aiTrend))}
        ${stat("transfer", "c-b", s.transfers, T("ovTransfers"), trend(s.transTrend))}
        ${stat("users", "c-g", s.newContacts, T("ovNewContacts"), trend(s.newTrend))}
      </div>
      <p class="hint" style="margin:8px 4px 0">${T("cmpYesterday")}</p>
      <div class="sec"><div class="card surf">${cardT("reports", T("ovChartTitle"))}
        <div class="wsum"><div><b class="num">${fmt(weekSum)}</b><span>${T("weekTotalLbl")}</span></div><span class="badge b-ai">AI ${Math.round((r.weekAI.reduce((a, b) => a + b, 0) / weekSum) * 100)}%</span></div>
        ${weekBars(L(r.weekDays).map((d) => (LANG === "ar" ? d.replace("ال", "") : d)), r.weekTotal, r.weekAI)}
        <div class="legend"><span><i style="background:var(--t-o);box-shadow:inset 0 0 0 1px var(--orange)"></i>${T("legendTotal")}</span><span><i style="background:var(--ai)"></i>${T("legendAI")}</span></div>
      </div></div>
      <div class="sec stack">
        <div class="card surf">${cardT("globe", T("ovLangSplit"))}
          <div class="donut-wrap">${donut(r.langDist.map((l) => l.pct), r.langDist.map((l) => l.color), r.langDist[0].pct + "%", L(r.langDist[0]), 112)}
          <div class="donut-list">${r.langDist.map((l) => `<div class="mini"><span><i style="background:${l.color}"></i>${esc(L(l))}</span><b class="num">${l.pct}%</b></div>`).join("")}</div></div>
        </div>
        <div class="card surf">${cardT("whatsapp", T("ovByNumber"))}
          ${r.byNumber.map((b) => { const p = Math.round((b.ai / b.conv) * 100); return `<div class="nrow">
            <div class="nr-h"><span class="ndot ${b.num}"></span>${numLabel(b.num)}</div>
            <div class="nr-v num">${fmt(b.conv)} <small>${T("handled")}</small></div>
            <div class="bar"><i style="width:${p}%;background:var(--ai)"></i></div>
            <div class="nr-m num"><span>AI <b>${p}%</b></span><span>${T("thTransfers")} <b>${b.transfers}</b></span><span>${T("thResp")} <b>${b.resp} ${T("min")}</b></span></div></div>`; }).join("")}
        </div>
      </div>
      <div class="sec"><div class="card surf">${cardT("clock", T("ovActivity"))}
        ${DATA.activity.map((a) => `<div class="act"><span class="ai ${{ ai: "c-ai", blue: "c-b", green: "c-g", gold: "c-o" }[a.color]}">${ic(a.icon === "contacts" ? "users" : a.icon)}</span><div><p>${esc(L(a.t))}</p><time>${esc(L(a.tm))}</time></div></div>`).join("")}
      </div></div>
    </div>`;
  };

  function convFiltered() {
    const q = S.q.trim().toLowerCase();
    return DATA.conversations.filter((c) => {
      if (S.num !== "all" && c.num !== S.num) return false;
      if (S.filter === "unread" && !c.unread) return false;
      if (S.filter === "ai" && c.mode !== "ai") return false;
      if (S.filter === "human" && c.mode !== "human") return false;
      if (S.filter === "closed" && !c.closed) return false;
      if (S.filter !== "closed" && S.filter !== "all" && c.closed) return false;
      const last = c.msgs.length ? msgText(c.msgs[c.msgs.length - 1]) : "";
      if (q && !(convName(c).toLowerCase().includes(q) || last.toLowerCase().includes(q) || c.phone.includes(q))) return false;
      return true;
    });
  }
  function convList() {
    const list = convFiltered();
    if (!list.length) return `<div class="card surf" style="text-align:center;padding:30px">${ic("inbox")}<p style="margin-top:8px;color:var(--ink-2)">${T("emptyTitle")}</p></div>`;
    return `<div class="clist">${list.map((c) => {
      const i = DATA.conversations.indexOf(c), last = c.msgs[c.msgs.length - 1];
      return `<button class="row surf conv-card${c.unread && !c.closed ? " has-unread" : ""}" data-act="openChat" data-arg="${c.id}" style="${c.closed ? "opacity:.6" : ""}">
        ${av(convName(c), i, "", c.num)}
        <span class="rb"><span class="r1"><span class="rn">${esc(convName(c))}</span><span class="rt">${esc(convTime(c))}</span></span>
          <span class="r2"><span class="rs">${last && last.t === "ai" ? `<span style="color:var(--ai)">AI: </span>` : ""}${esc(last ? msgText(last) : "")}</span>${c.unread && !c.closed ? `<span class="unread">${c.unread}</span>` : ""}</span>
          <span class="r3">${c.closed ? `<span class="mode closed">${ic("check2")}${T("fClosed")}</span>` : `<span class="mode ${c.mode}">${ic(c.mode === "ai" ? "sparkle" : "user")}${c.mode === "ai" ? "AI" : T("fHuman")}</span>`}${c.convTag ? badge(ctagById(c.convTag)) : ""}</span></span></button>`;
    }).join("")}</div>`;
  }
  SCR.conversations = () => {
    const u = unreadTotal();
    const f = [["all", "fAll"], ["unread", "fUnread"], ["ai", "fAI"], ["human", "fHuman"], ["closed", "fClosed"]];
    const nsLabel = S.num === "all" ? T("allNumbers") : numLabel(S.num);
    const nsSub = S.num === "all" ? `${DATA.numbers.main.phone} · ${DATA.numbers.second.phone}` : DATA.numbers[S.num].phone;
    return `<div class="scroller">
      ${hdr(T("convTitle"), `${u} ${T("unreadN")}`, bellBtn())}
      <div class="search has-filter">${ic("search")}<input id="convQ" class="surf" type="search" value="${esc(S.q)}" placeholder="${T("convSearchPh")}" aria-label="${T("convSearchPh")}">
        <button class="s-filter${S.num !== "all" ? " on" : ""}" data-act="sheet" data-arg="numSwitch" aria-label="${T("numSwitchTitle")}: ${nsLabel}" title="${nsLabel}">${ic("sliders")}${S.num !== "all" ? `<span class="ndot ${S.num}"></span>` : ""}</button></div>
      ${S.num !== "all" ? `<div class="num-on"><span class="ndot ${S.num}"></span>${nsLabel}<button data-act="pickNum" data-arg="all" aria-label="${T("allNumbers")}">${ic("x")}</button></div>` : ""}
      <div class="chips" style="margin-bottom:12px">${f.map(([k, key]) => `<button class="chip ${S.filter === k ? "on" : "surf"}" data-act="filter" data-arg="${k}">${T(key)}${k === "unread" && u ? `<span class="cnt">${u}</span>` : ""}</button>`).join("")}</div>
      <div id="convList">${convList()}</div>
    </div>`;
  };

  function msgsHtml(c) {
    return `<div class="day surf">${LANG === "ar" ? "اليوم" : "Today"}</div>` + c.msgs.map((m) => {
      const cls = m.t === "in" ? "in surf" : m.t === "ai" ? "ai" : "out";
      const idx = c.msgs.indexOf(m), mine = m.t === "out" && m.human;
      if (m.deleted) return `<div class="bub ${cls} deleted">${ic("x")}${T("msgDeleted")}</div>`;
      const meta = `<span class="bt">${m.edited ? T("msgEdited") + " · " : ""}${esc(msgTime(m))}${m.human ? " · " + T("humanReply") : ""}${m.t !== "in" ? ic("check2") : ""}</span>`;
      const tap = mine ? ` data-act="sheet" data-arg="msgActs:${idx}" role="button" tabindex="0"` : "";
      if (m.loc) return `<div class="bub ${cls} media"><span class="map">${ic("pin")}</span><span class="cap"><strong>${T("msgLocation")}</strong><span>${esc(L(m.loc))}</span></span>${meta}</div>`;
      if (m.img) return `<div class="bub ${cls} media"${tap}><span class="photo"><svg viewBox="0 0 120 120" aria-hidden="true"><rect x="38" y="30" width="44" height="12" rx="4" fill="currentColor" opacity=".55"/><path d="M34 46h52v38a10 10 0 0 1-10 10H44a10 10 0 0 1-10-10z" fill="currentColor"/><path d="M60 58c6 8 9 12 9 16a9 9 0 0 1-18 0c0-4 3-8 9-16z" fill="#fff" opacity=".85"/></svg></span><span class="cap">${esc(msgText(m))}</span>${meta}</div>`;
      if (m.voice) return `<div class="bub ${cls} voice"><span class="vplay">${ic("play")}</span><span class="vwave">${"<i></i>".repeat(22)}</span><span class="num">${m.voice}</span><span class="bt">${esc(msgTime(m))}${m.human ? " · " + T("humanReply") : ""}${ic("check2")}</span></div>`;
      return `<div class="bub ${cls}"${tap}>${m.t === "ai" ? `<span class="tag">${ic("sparkle")}${T("aiReply")}</span>` : ""}${m.file ? `<span class="file"><span class="fi">${ic("file")}</span><span><strong style="display:block;font-size:12.5px">${esc(m.file)}</strong><span class="hint">PDF</span></span></span>` : ""}${esc(msgText(m))}${meta}</div>`;
    }).join("");
  }
  SCR.chat = () => {
    const c = getConv(S.chat) || DATA.conversations[0];
    S.chat = c.id;
    const i = DATA.conversations.indexOf(c);
    return `<div class="chat">
      <header class="chat-bar">
        <div class="cb-row">
          <button class="ibtn sm" data-act="back" aria-label="back">${ic("back")}</button>
          <button class="who" data-act="sheet" data-arg="cust">${av(convName(c), i, "sm", c.num)}
            <span class="who-t"><strong>${esc(convName(c))}${c.aiOn ? `<span class="ai-mark" title="${T("aiActive")}" aria-label="${T("aiActive")}">${ic("sparkle")}</span>` : ""}<span class="lang">${(c.lang || "ar").toUpperCase()}</span></strong>
            <span class="sub"><span class="on">${T("online")}</span><i>·</i><span class="ndot ${c.num}"></span>${T(c.num === "main" ? "viaMain" : "viaSecond")}</span></span></button>
          <button class="ibtn sm" data-act="sheet" data-arg="chatOpts" aria-label="${T("actions")}">${ic("moreV")}</button>
        </div>
      </header>
      <div class="msgs" id="msgs">${msgsHtml(c)}</div>
      ${c.closed ? `<div class="closed-bar surf"><span class="mi c-g">${ic("check2")}</span><div class="cb"><strong>${T("chatClosed")}</strong><span>${T("chatClosedDesc")}</span></div><button class="btn btn-p btn-sm" data-act="reopen">${ic("refresh")}${T("reopenChat")}</button></div>`
        : `<div class="attach-row" id="attachRow" hidden></div><input type="file" id="fileIn" hidden>
        <div class="composer surf">
        <button class="ibtn sm" data-act="attach" aria-label="${T("export")}">${ic("clip")}</button>
        <button class="ibtn sm" data-act="sheet" data-arg="qr" aria-label="${T("quickReplies")}">${ic("bolt")}</button>
        <textarea id="draft" rows="1" placeholder="${T("typeMsg")}" aria-label="${T("typeMsg")}"></textarea>
        <button class="ibtn sm" data-act="sheet" data-arg="emoji" aria-label="${T("emojis")}">${ic("smile")}</button>
        <button class="ibtn sm" data-act="voice" aria-label="${T("voiceBtn")}">${ic("mic")}</button>
        <button class="send" data-act="send" aria-label="send">${ic("send")}</button>
        <div class="rec" hidden><span class="rec-dot"></span><span class="rec-t num" id="recT">0:00</span><span class="rec-l">${T("voiceRecording")}</span>
          <button class="ibtn sm" data-act="voiceCancel" aria-label="${T("voiceCancel")}">${ic("trash")}</button><button class="send" data-act="voiceSend" aria-label="${T("voiceSend")}">${ic("send")}</button></div></div>`}
    </div>`;
  };

  function contactRows() {
    const q = S.cq.trim().toLowerCase();
    const list = DATA.contacts.filter((k) => (S.fTag === "all" || k.tag === S.fTag) && (S.fLang === "all" || k.lang === S.fLang) && (!q || cName(k).toLowerCase().includes(q) || k.ph.includes(q)));
    if (!list.length) return `<div class="card surf" style="text-align:center;padding:30px;color:var(--ink-2)">${T("emptyTitle")}</div>`;
    return `<div class="clist">${list.map((k) => {
      const i = DATA.contacts.indexOf(k);
      return `<button class="row surf conv-card" data-act="sheet" data-arg="contactActs:${k.id}">${av(cName(k), i)}
        <span class="rb"><span class="name-line"><span class="rn">${esc(cName(k))}</span>${badge(tagById(k.tag))}</span>
        <span class="rs" dir="ltr" style="text-align:${LANG === "ar" ? "right" : "left"};margin-top:2px">${k.ph}</span></span><span class="chev">${ic("chevE")}</span></button>`;
    }).join("")}</div>`;
  }
  SCR.contacts = () => `<div class="scroller">
      ${hdr(T("contactsTitle"), `${DATA.contacts.length} · ${T("contactsSub")}`, bellBtn())}
      <div class="search has-filter">${ic("search")}<input id="contQ" class="surf" type="search" value="${esc(S.cq)}" placeholder="${T("search")}" aria-label="${T("search")}">
        <button class="s-filter${S.fTag !== "all" || S.fLang !== "all" ? " on" : ""}" data-act="sheet" data-arg="contFilter" aria-label="${T("fltTitle")}">${ic("sliders")}${S.fTag !== "all" || S.fLang !== "all" ? `<span class="fcount">${(S.fTag !== "all") + (S.fLang !== "all")}</span>` : ""}</button></div>
      ${S.fTag !== "all" || S.fLang !== "all" ? `<div class="chips" style="margin-bottom:10px">${S.fTag !== "all" ? `<span class="num-on">${esc(L(tagById(S.fTag)))}<button data-act="fltSet" data-arg="fTag:all" aria-label="${T("fltReset")}">${ic("x")}</button></span>` : ""}${S.fLang !== "all" ? `<span class="num-on">${langLabel(S.fLang)}<button data-act="fltSet" data-arg="fLang:all" aria-label="${T("fltReset")}">${ic("x")}</button></span>` : ""}</div>` : ""}
      <div id="contList">${contactRows()}</div>
    </div>`;

  SCR.segments = () => `<div class="scroller">${subHdr(T("contactTagsTitle"), "", T("contactTagsSub"))}
      ${segList()}
    </div>`;

  SCR.replies = () => `<div class="scroller">
      ${subHdr(T("repliesTitle"), "", T("repliesSubShort"))}
      <div class="chips qr-cats" role="tablist">${[{ id: "all" }].concat(DATA.replyCats).map((c) => { const n = c.id === "all" ? DATA.quickReplies.length : DATA.quickReplies.filter((q) => q.cat === c.id).length; return `<button role="tab" aria-selected="${S.qrCat === c.id}" class="chip ${S.qrCat === c.id ? "on" : "surf"}" data-act="qrCat" data-arg="${c.id}">${c.id === "all" ? T("fltAll") : esc(L(c))}<span class="cnt">${n}</span></button>`; }).join("")}</div>
      <div class="clist">${DATA.quickReplies.filter((q) => S.qrCat === "all" || q.cat === S.qrCat).map((q) => `<button class="row surf conv-card qr-card" data-act="sheet" data-arg="replyActs:${q.id}">
        <span class="mi c-o">${ic("bolt")}</span>
        <span class="rb"><span class="r1"><span class="rn">${esc(L(q.title))}</span><span class="rt">${ic("chat").replace('class="i"', 'class="i" style="width:12px;height:12px"')}${q.used}</span></span>
          <span class="qr-body">${esc(L(q.body)).replace(/\{\{[^}]+\}\}/g, (m) => `<span class="var">${m}</span>`)}</span>
          <span class="r3"><span class="badge b-gold">${esc(L(catBy(q.cat)))}</span><span class="lang">${q.lang.toUpperCase()}</span></span></span></button>`).join("")}</div>
    </div>`;

  const CST = { active: ["b-green", "stActive"], sending: ["b-ai", "stSending"], sched: ["b-amber", "stSched"], draft: ["b-gray", "stDraft"], done: ["b-blue", "stDone"] };
  const AUD = { all: "audAll", vip: "audVip", active: "audActive", new: "audNew", wholesale: "audWholesale" };
  SCR.campaigns = () => {
    const cs = DATA.campaigns, sent = cs.reduce((s, c) => s + c.sent, 0), read = cs.reduce((s, c) => s + c.read, 0), rep = cs.reduce((s, c) => s + c.reply, 0);
    return `<div class="scroller">
      ${subHdr(T("campTitle"), "", T("campSub"))}
      <div class="bento2">
        ${stat("campaign", "", cs.filter((c) => c.st === "active").length, T("campActive"), "", true)}
        ${stat("send", "c-b", fmt(sent), T("campSent"))}
        ${stat("eye", "c-g", (sent ? Math.round((read / sent) * 100) : 0) + "%", T("campRead"))}
        ${stat("reply", "c-ai", (sent ? Math.round((rep / sent) * 100) : 0) + "%", T("campReply"))}
      </div>
      <div class="sec">${cs.map((c) => { const st = CST[c.st], rp = c.sent ? Math.round((c.read / c.sent) * 100) : 0; return `<div class="card surf">
        <div style="display:flex;gap:12px;align-items:flex-start"><span class="mi c-o">${ic("campaign")}</span>
          <div style="flex:1;min-width:0"><strong style="display:block;font-size:14.5px">${esc(L(c.n))}</strong><span class="hint" style="display:flex;align-items:center;gap:5px"><span class="ndot ${c.num}" style="width:6px;height:6px"></span>${numLabel(c.num)} · ${esc(L(c.date))}</span></div>
          <button class="ibtn sm" data-act="sheet" data-arg="campActs:${c.id}" aria-label="${T("actions")}">${ic("more")}</button></div>
        <div style="display:flex;gap:6px;margin:10px 0"><span class="badge ${st[0]} dot">${T(st[1])}</span><span class="badge b-gray">${T(AUD[c.aud])}</span></div>
        ${c.sent ? `<div style="display:flex;align-items:center;gap:10px;font-size:12.5px"><span class="num" style="white-space:nowrap"><b>${fmt(c.sent)}</b> ${T("sent")}</span><div class="bar"><i style="width:${rp}%"></i></div><span class="num"><b>${rp}%</b> ${T("read")}</span></div>` : `<div class="hint">—</div>`}
      </div>`; }).join("")}</div>
    </div>`;
  };

  SCR.reports = () => {
    const r = DATA.reports, ar = LANG === "ar";
    const hours = r.hourly.map((_, h) => (h % 12 || 12) + (ar ? (h < 12 ? "ص" : "م") : h < 12 ? "a" : "p"));
    const slots = ar ? ["12ص", "", "4ص", "", "8ص", "", "12م", "", "4م", "", "8م", ""] : ["12a", "", "4a", "", "8a", "", "12p", "", "4p", "", "8p", ""];
    const days = ar ? ["سبت", "أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"] : ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    let peak = [0, 0, 0];
    r.peak.forEach((row, d) => row.forEach((v, s) => { if (v > peak[0]) peak = [v, d, s]; }));
    const fullSlots = ar ? ["12 ص", "2 ص", "4 ص", "6 ص", "8 ص", "10 ص", "12 م", "2 م", "4 م", "6 م", "8 م", "10 م"] : ["12am", "2am", "4am", "6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"];
    return `<div class="scroller">
      ${subHdr(T("repTitle"), "", T("repSubShort"))}
      <div class="rep-range"><button class="chip surf" style="height:36px" data-act="sheet" data-arg="range">${ic("calendar").replace('class="i"', 'class="i" style="width:15px;height:15px"')}${T(S.range)}${ic("chevD").replace('class="i"', 'class="i" style="width:14px;height:14px"')}</button></div>
      <div class="bento2">
        ${stat("chat", "", "2,850", T("repTotalConv"), trend(14), true)}
        ${stat("sparkle", "c-ai", "86%", T("repResolve"), trend(4))}
        ${stat("clock", "c-b", "1.4 " + T("min"), T("repResp"), `<span class="trend up">${ic("down")}12%</span>`)}
        ${stat("users", "c-g", "1,248", T("repContacts"), trend(18))}
      </div>
      <div class="sec"><div class="card surf">${cardT("reports", T("repConvTrend"))}${lineChart(hours, [{ data: r.hourly, color: "var(--orange)" }], { h: 160 })}</div></div>
      <div class="sec"><div class="card surf">${cardT("sparkle", T("repAiVsHuman"))}
        <div class="donut-wrap">${donut(r.aiVsHuman, ["var(--ai)", "var(--blue)"], r.aiVsHuman[0] + "%", "AI")}
        <div class="donut-list"><div class="kv"><span style="display:flex;align-items:center;gap:8px"><i style="width:9px;height:9px;border-radius:3px;background:var(--ai)"></i>${T("aiResolved")}</span><strong>${r.aiVsHuman[0]}%</strong></div><div class="kv"><span style="display:flex;align-items:center;gap:8px"><i style="width:9px;height:9px;border-radius:3px;background:var(--blue)"></i>${T("humanResolved")}</span><strong>${r.aiVsHuman[1]}%</strong></div></div></div></div></div>
      <div class="sec"><div class="card surf">${cardT("globe", T("repLangDist"))}${r.langDist.map((l) => dist(L(l), l.pct, l.color)).join("")}</div>
        <div class="card surf">${cardT("users", T("repClassDist"))}${r.classDist.map((l) => dist(L(l), l.pct, l.color)).join("")}</div>
        <div class="card surf">${cardT("tag", T("repConvTags"))}${r.convTagDist.map((l) => dist(L(l), l.pct, l.color)).join("")}</div></div>
      <div class="sec"><div class="card surf">${cardT("chat", T("repTopTopics"))}
        ${r.topics.map((t, i) => `<div style="display:flex;gap:12px;align-items:center;padding:7px 0"><span class="rank ${i === 0 ? "c-o" : "c-m"}">${i + 1}</span><div style="flex:1;min-width:0"><div class="dist" style="margin:0"><div class="dt"><span>${esc(L(t))}</span><b>${t.pct}%</b></div><div class="bar"><i style="width:${t.pct * 2.5}%"></i></div></div></div></div>`).join("")}</div></div>
      <div class="sec"><div class="sec-h"><h3>${T("repStaffPerf")}</h3></div><div class="list surf">
        ${r.staff.map((s) => `<div class="row"><span class="av sm" style="background:${s.av}">${esc(initials(LANG === "ar" ? s.n : s.ne))}</span><span class="rb"><span class="r1"><span class="rn">${esc(LANG === "ar" ? s.n : s.ne)}</span><span class="badge b-gold">★ ${s.rate}</span></span><span class="r2"><span class="rs">${s.h} ${T("handled")} · ${esc(L(s.resp))} ${T("respAvg")}</span></span></span></div>`).join("")}</div></div>
      <div class="sec"><div class="card surf">${cardT("clock", T("repPeak"))}
        <div class="heat"><span></span>${slots.map((s) => `<span class="hh">${s}</span>`).join("")}
          ${r.peak.map((row, d) => `<span class="hd">${days[d]}</span>${row.map((v) => `<span class="hc h${v}"></span>`).join("")}`).join("")}</div>
        <div class="legend" style="justify-content:space-between"><span>${ar ? "هادئ" : "Quiet"} <span style="display:inline-flex;gap:3px">${[1, 2, 3, 4, 5].map((v) => `<i class="h${v}" style="width:14px;height:9px"></i>`).join("")}</span> ${ar ? "ذروة" : "Peak"}</span></div>
        <div class="kv" style="margin-top:8px"><span>${ar ? "أعلى ضغط" : "Peak time"}</span><strong>${T(["daySat", "daySun", "dayMon", "dayTue", "dayWed", "dayThu", "dayFri"][peak[1]])} · ${fullSlots[peak[2]]}</strong></div>
        <div class="kv"><span>${T("activeSlots")}</span><strong class="num">${r.peak.flat().filter((v) => v > 0).length}/84</strong></div>
      </div></div>
    </div>`;
  };

  // one textarea per reply language, switched with chips (dashboard shows the five stacked)
  const langMsgs = (kind) => `<div class="chips lang-tabs" data-lt="${kind}" style="margin-bottom:8px">${LANG5.map(([l, k], i) => `<button type="button" class="chip ${i ? "surf" : "on"}" data-act="langTab" data-arg="${kind}:${l}">${T(k)}</button>`).join("")}</div>
    ${LANG5.map(([l], i) => `<textarea id="${kind}Msg-${l}" class="ta" rows="3" ${["en", "hi_rom", "ur_rom"].includes(l) ? 'dir="ltr"' : ""} ${i ? "hidden" : ""} aria-label="${T(kind === "off" ? "offMsg" : "aiAutoCloseMsg")} · ${l}">${esc(AI_MSG[kind][l])}</textarea>`).join("")}`;
  SCR["ai-settings"] = () => {
    const n = DATA.numbers;
    const days = ["daySat", "daySun", "dayMon", "dayTue", "dayWed", "dayThu", "dayFri"];
    const prompt = "أنت «هَنا» — المساعدة الذكية لمتجر «سبا» المتخصص في العسل اليمني الأصلي والزيوت الطبيعية والبهارات. ردّك يجب أن يكون قصيراً، ودوداً، واثقاً، وباللهجة الخليجية/العُمانية البسيطة.\n\n🍯 العسل\n• عسل السدر الملكي اليمني — 250 ر.ق / كيلو\n• عسل السدر اليومي — 170 ر.ق / كيلو\n• عسل السمر — 130 ر.ق / كيلو\n• عسل المراعي الجبلية — 95 ر.ق / كيلو\n\n📌 قواعد الرد\n1. اذكر السعر والوزن بوضوح في أول رد.\n2. لا تخترع منتجات أو أسعار غير موجودة.\n3. للشكاوى → حوّل فوراً لموظف بشري.";
    return `<div class="scroller">
      ${subHdr(T("aiTitle"), "", T("aiSub"))}
      <div class="card surf">${cardT("key", T("aiOpenAI"), `<span class="badge b-green dot">${T("connected")}</span>`)}<p class="card-d">${T("aiOpenAIDesc")}</p>
        <div class="fld"><label for="aiKey">${T("apiKey")}</label><input id="aiKey" class="inp" type="password" value="sk-••••••••••••••••••••" dir="ltr"></div>
        <div class="grid2"><div class="fld"><label for="aiModel">${T("aiModel")}</label><select id="aiModel" class="sel"><option>gpt-4o-mini</option><option>gpt-4o</option><option>gpt-4.1</option><option>o4-mini</option></select></div>
          <div class="fld"><label for="aiTok">${T("maxTokens")}</label><input id="aiTok" class="inp" type="number" value="600"></div></div>
        <div class="fld"><label for="aiTemp" style="display:flex;justify-content:space-between"><span>${T("temperature")}</span><b id="tempV" style="color:var(--accent)">0.4</b></label><input id="aiTemp" class="range" type="range" min="0" max="1" step="0.1" value="0.4"><span class="hint">${T("tempHelp")}</span></div>
        <button class="btn btn-g surf btn-sm" data-act="testConn" data-arg="toastTested">${ic("refresh")}${T("testConn")}</button></div>
      <div class="card surf">${cardT("whatsapp", T("aiMeta"))}<p class="card-d">${T("aiMetaDesc")}</p>
        ${["main", "second"].map((id) => `<div class="tgl"><span style="display:flex;gap:10px;align-items:center;min-width:0"><span class="mi c-g">${ic("whatsapp")}</span><span style="min-width:0"><strong style="display:block;font-size:14px">${numLabel(id)}</strong><span class="hint" dir="ltr">${n[id].phone} · ${n[id].meta.version}</span></span></span>
          <span style="display:flex;align-items:center;gap:6px"><span class="badge dot ${n[id].active !== false ? "b-green" : "b-gray"}" id="nst-${id}">${n[id].active !== false ? T("numActive") : T("numDisabled")}</span><button class="ibtn sm" data-act="sheet" data-arg="meta:${id}" aria-label="${T("manageNum")}">${ic("pen")}</button>${sw(n[id].active !== false, `data-num="${id}" aria-label="${T("disableNum")}"`)}</span></div>`).join("")}
        <button class="btn btn-g surf btn-blk btn-sm" style="margin-top:10px" data-act="sheet" data-arg="meta:new">${ic("plus")}${T("connectNumber")}</button></div>
      <div class="card surf">${cardT("globe", T("aiLangs"))}<p class="card-d">${T("aiLangsDesc")}</p>${LANG5.map(([l, k]) => tgl(T(k), l === "ar" || l === "en" || l === "hi")).join("")}
        <div class="fld" style="margin:12px 0 0"><label for="aiDef">${T("defaultLang")}</label><select id="aiDef" class="sel">${LANG5.map(([l, k]) => `<option value="${l}">${T(k)}</option>`).join("")}</select><span class="hint">${T("defaultLangHint")}</span></div></div>
      <div class="card surf">${cardT("sparkle", T("aiTone"))}<p class="card-d">${T("aiToneDesc")}</p>
        <div class="seg surf" style="margin-bottom:14px">${["toneShort", "toneFriendly", "toneFormal", "toneLuxury"].map((k, i) => `<button class="${i === 1 ? "on" : ""}" data-act="seg">${T(k)}</button>`).join("")}</div>
        <div class="fld" style="margin:0"><label for="aiDia">${T("aiDialect")}</label><select id="aiDia" class="sel"><option>${T("dialectMSA")}</option><option selected>${T("dialectGulf")}</option><option>${T("dialectEgy")}</option><option>${T("dialectLevant")}</option></select><span class="hint">${T("aiDialectDesc")}</span></div></div>
      <div class="card surf">${cardT("ai", T("aiPrompt"))}<p class="card-d">${T("aiPromptDesc")}</p>
        <textarea id="aiPrompt" class="ta" rows="9" dir="rtl">${esc(prompt)}</textarea><p class="hint" style="margin:6px 0 10px">${T("aiPromptHint")}</p>
        <button class="btn btn-p btn-sm" data-act="aiSave" data-arg="aiPrompt">${ic("check")}${T("save")}</button></div>
      <div class="card surf">${cardT("transfer", T("aiTransfer"))}<p class="card-d">${T("aiTransferDesc")}</p>
        ${tgl(T("trComplaint"), true)}${tgl(T("trCustomReq"), true)}${tgl(T("trAskHuman"), true)}${tgl(T("trUnsure"), true)}
        <div class="fld" style="margin:12px 0 0"><label for="aiAgent">${T("defaultAgent")}</label><select id="aiAgent" class="sel">${DATA.agents.filter((a) => a.status === "active").map((a) => `<option>${esc(LANG === "ar" ? a.n : a.ne)}</option>`).join("")}</select></div></div>
      <div class="card surf">${cardT("shield", T("aiForbid"))}<p class="card-d">${T("aiForbidDesc")}</p><textarea id="aiForbid" class="ta" rows="3" placeholder="${T("aiForbidPh")}">أسعار المنافسين&#10;ادعاءات طبية علاجية&#10;معلومات داخلية عن المتجر</textarea></div>
      <div class="card surf">${cardT("clock", T("aiHours"))}<p class="card-d">${T("aiHoursDesc")}</p>${tgl(T("always247"), true)}
        <div class="lbl" style="margin:12px 0 4px">${T("staffHours")}</div>
        ${days.map((d, i) => `<div class="hday${i === 6 ? " off" : ""}"><div class="hd-top"><strong>${T(d)}</strong>${sw(i !== 6, `data-day="${i}" aria-label="${T(d)}"`)}</div>
          <div class="hd-t"><label>${T("from")} <input class="inp" type="time" value="08:00" aria-label="${T(d)} ${T("from")}"></label><label>${T("to")} <input class="inp" type="time" value="22:00" aria-label="${T(d)} ${T("to")}"></label></div></div>`).join("")}
        <div class="lbl" style="margin:14px 0 8px">${T("offMsg")}</div>${langMsgs("off")}
        <div class="off-note">${ic("info")}<span><b>${T("offMsg")}</b> — ${T("aiHoursDesc")}</span></div></div>
      <div class="card surf">${cardT("check2", T("aiAutoClose"))}<p class="card-d">${T("aiAutoCloseDesc")}</p>${tgl(T("aiAutoCloseEnabled"), true)}
        <div class="fld" style="margin:12px 0"><label for="acHours">${T("aiAutoCloseHours")}</label><input id="acHours" class="inp" type="number" min="1" max="168" value="24"></div>
        ${tgl(T("aiAutoCloseUseAi"), true)}<div class="lbl" style="margin:14px 0 8px">${T("aiAutoCloseMsg")}</div>${langMsgs("close")}
        <div class="off-note">${ic("info")}<span>${T("aiAutoCloseSteps")}</span></div></div>
      <button class="btn btn-o btn-blk" style="margin-top:16px" data-act="aiSave">${ic("check")}${T("save")}</button>
    </div>`;
  };

  SCR.team = () => `<div class="scroller">
      ${subHdr(T("teamTitle"), "", T("teamSub"))}
      <div class="clist">${DATA.team.map((m) => `<button class="row surf conv-card" data-act="sheet" data-arg="memberActs:${m.id}">
        <span class="av" style="background:${m.av}">${esc(initials(m.name))}</span>
        <span class="rb"><span class="name-line"><span class="rn">${esc(m.name)}</span>${mStatus(m)}</span>
        <span class="rs" dir="ltr" style="text-align:${LANG === "ar" ? "right" : "left"};margin-top:2px">${esc(m.email)}</span></span><span class="chev">${ic("chevE")}</span></button>`).join("")}</div>
    </div>`;

  // account panels: the profile opens from the card on "More"; the rest are pages under the Settings list
  const segList = () => `<div class="clist">${DATA.tags.map((t) => { const n = DATA.contacts.filter((k) => k.tag === t.id).length; return `<button class="row surf conv-card" data-act="sheet" data-arg="segActs:${t.id}">
        <span class="mi seg-dot" style="--c:var(--${tagVar(t.color)})">${ic("tag")}</span>
        <span class="rb"><span class="rn">${esc(L(t))}</span><span class="rs" style="margin-top:2px">${n} ${T("segCount")}</span></span><span class="chev">${ic("chevE")}</span></button>`; }).join("")}</div>`;
  const tagList = () => `<div class="clist">${DATA.convTags.map((t) => `<button class="row surf conv-card" data-act="sheet" data-arg="tagActs:${t.id}">
          <span class="mi seg-dot" style="--c:var(--${tagVar(t.color)})">${ic("tag")}</span>
          <span class="rb"><span class="r1"><span class="rn">${esc(L(t))}</span>${badge(t)}</span>
            <span class="r2"><span class="rs">${T("thUsage")}: ${DATA.conversations.filter((c) => c.convTag === t.id).length}</span></span></span>
          <span class="chev">${ic("chevE")}</span></button>`).join("")}</div>`;
  const rcList = () => `<div class="clist">${DATA.replyCats.map((c) => `<button class="row surf conv-card" data-act="sheet" data-arg="catActs:${c.id}">
        <span class="mi c-o">${ic("bolt")}</span>
        <span class="rb"><span class="rn">${esc(L(c))}</span><span class="rs" style="margin-top:2px">${DATA.quickReplies.filter((q) => q.cat === c.id).length} ${T("catCount")}</span></span><span class="chev">${ic("chevE")}</span></button>`).join("")}</div>`;
  const CAT_TABS = [["seg", "catTabSeg", "contactTagsSub", segList, ["segForm", "segNew"]], ["tags", "catTabTags", "tagsSub", tagList, ["tagForm", "addConvTag"]], ["rc", "catTabRc", "replyCatSub", rcList, ["catForm", "catNew"]]];
  const accPanels = () => {
    const th = store.get("sa-theme") || "auto";
    return {
      profile: `<div class="card surf" style="text-align:center">${meAv("margin:4px auto 10px")}<button class="btn btn-g surf btn-sm" data-act="pickPhoto">${ic("upload")}${T("changePhoto")}</button><input type="file" id="photoIn" accept="image/*" hidden></div>
        <div class="card surf"><div class="fld"><label for="pName">${T("profName")}</label><input id="pName" class="inp" value="هشام العبدالله"></div><div class="fld"><label for="pMail">${T("profEmail")}</label><input id="pMail" class="inp" dir="ltr" value="info@sabalandqa.com"></div><div class="fld"><label for="pPh">${T("profPhone")}</label>${telIn("pPh", "+968 9123 4567")}</div><button class="btn btn-p btn-blk" data-act="profileSave">${ic("check")}${T("save")}</button></div>`,
      appearance: `<div class="card surf"><div class="lbl" style="margin-bottom:8px">${T("appTheme")}</div><div class="seg surf">${["light", "dark", "auto"].map((k) => `<button class="${th === k ? "on" : ""}" data-act="setTheme" data-arg="${k}">${T(k === "light" ? "themeLight" : k === "dark" ? "themeDark" : "themeAuto")}</button>`).join("")}</div>
        <div class="lbl" style="margin:16px 0 8px">${T("appAccent")}</div><div style="display:flex;gap:10px">${["#E0571E", "#6D3639", "#23944A", "#2F6FCF", "#6F4FD6"].map((c) => `<button data-act="accent" data-arg="${c}" aria-label="${c}" style="width:44px;height:44px;border-radius:14px;background:${c};box-shadow:inset 0 1px 0 rgba(255,255,255,.4)"></button>`).join("")}</div></div>`,
      security: `<div class="card surf">${cardT("lock", T("secChangePass"))}<div class="fld"><label for="pCur">${T("curPass")}</label>${pass("pCur", "********", "••••••••")}</div><div class="fld"><label for="pNew">${T("newPass")}</label>${pass("pNew", "", "••••••••", true)}</div><div class="fld"><label for="pCon">${T("confirmPass")}</label>${pass("pCon", "", "••••••••", true)}<span class="fp-err" id="pErr" hidden></span></div><button class="btn btn-p btn-blk" data-act="updPass">${ic("check")}${T("updatePass")}</button></div>`,
      lang: `<div class="card surf"><div class="lbl" style="margin-bottom:8px">${T("langInterface")}</div><div class="seg surf"><button class="${LANG === "ar" ? "on" : ""}" data-act="setLang" data-arg="ar">العربية</button><button class="${LANG === "en" ? "on" : ""}" data-act="setLang" data-arg="en">English</button></div>
        <div class="fld" style="margin-top:14px"><label for="pReg">${T("region")}</label><select id="pReg" class="sel"><option>(GMT+4) مسقط</option><option>(GMT+3) الدوحة</option><option>(GMT+5:30) الهند</option></select></div><div class="fld" style="margin:0"><label for="pDf">${T("dateFormat")}</label><select id="pDf" class="sel"><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></div></div>`,
      cats: `<div class="chips qr-cats cat-chips2" role="tablist">${CAT_TABS.map(([id, k, , list]) => `<button role="tab" class="chip ${S.catTab === id ? "on" : "surf"}" aria-selected="${S.catTab === id}" data-act="catTab" data-arg="${id}">${T(k)}<span class="cnt">${{ seg: DATA.tags, tags: DATA.convTags, rc: DATA.replyCats }[id].length}</span></button>`).join("")}</div>
        ${(() => { const t = CAT_TABS.find((x) => x[0] === S.catTab); return `<p style="margin:2px 4px 14px;font-size:13px;color:var(--ink-2)">${T(t[2])}</p>${t[3]()}`; })()}`,
      tags: `
        ${tagList()}`,
      notifs: `<div class="card surf nt-master"><div class="tgl"><span><strong>${T("ntMasterT")}</strong><small>${T("ntMasterD")}</small></span>${sw(S.ntOn, 'id="ntMaster"')}</div></div>
        <div class="sec-h nt-sec"><h3>${T("ntSettings")}</h3></div>
        <div class="nt-rest${S.ntOn ? "" : " is-off"}"><div class="card surf">${cardT("bell", T("ntAlerts"))}<p class="card-d">${T("ntAlertsSub")}</p>
          ${tgl(T("ntNewMsg2"), true)}${tgl(T("notifNewConv"), true)}${tgl(T("ntNewContact"), true)}${tgl(T("notifTransfer"), true)}${tgl(T("ntCampaigns"), true)}${tgl(T("ntReplies"), false)}</div>
        <div class="card surf">${cardT("bell", T("ntHow"))}${tgl(T("notifSound"), true)}${tgl(T("ntVibrate"), true)}</div>
        <div class="card surf">${cardT("moon", T("ntDnd"))}<p class="card-d">${T("ntDndSub")}</p>${tgl(T("ntDndOn"), false, 'id="dndSw"')}
          <div class="hd-t" id="dndTimes" style="opacity:.45;pointer-events:none"><label>${T("from")} <input class="inp" type="time" value="22:00" aria-label="${T("ntDnd")} ${T("from")}"></label><label>${T("to")} <input class="inp" type="time" value="08:00" aria-label="${T("ntDnd")} ${T("to")}"></label></div></div></div>`,
    };
  };
  const SETTINGS = [["appearance", "tabAppearance", "palette", "c-o"], ["notifs", "ntTitle", "bell", "c-ai"], ["security", "tabSecurity", "shield", "c-b"], ["lang", "tabLang", "globe", "c-g"], ["cats", "catsMgmt", "tag", "c-m"]];
  SCR.profile = () => `<div class="scroller">${subHdr(T("tabProfile"))}${accPanels().profile}</div>`;
  SCR.account = () => {
    const th = store.get("sa-theme") || "auto";
    const hint = { appearance: T(th === "light" ? "themeLight" : th === "dark" ? "themeDark" : "themeAuto"), notifs: T("ntOn"), security: T("secChangePass"), lang: LANG === "ar" ? "العربية" : "English", cats: "3" };
    return `<div class="scroller">${subHdr(T("navSettings"))}
      <div class="list surf">${SETTINGS.map(([id, k, icn, cls]) => `<button class="row" data-act="go" data-arg="set-${id}"><span class="mi ${cls}">${ic(icn)}</span><span class="rb"><span class="rn">${T(k)}</span></span><span class="hint">${esc(hint[id])}</span><span class="chev">${ic("chevE")}</span></button>`).join("")}</div></div>`;
  };
  // conversation tags keep their page, now reached from "إدارة التصنيفات"
  SCR["set-tags"] = () => `<div class="scroller">${subHdr(T("tabTags"), "", T("tagsSub"))}${accPanels().tags}</div>`;
  SCR["reply-cats"] = () => `<div class="scroller">${subHdr(T("replyCatTitle"), "", T("replyCatSub"))}
      ${rcList()}
    </div>`;
  SETTINGS.forEach(([id, k]) => { SCR["set-" + id] = () => `<div class="scroller">${subHdr(T(k))}${accPanels()[id]}</div>`; });

  const APP_VERSION = "1.0.0"; // shown on the splash and at the bottom of "More"
  SCR.more = () => {
    const item = (go, icn, cls, key) => `<button class="row" data-act="go" data-arg="${go}"><span class="mi ${cls}">${ic(icn)}</span><span class="rb"><span class="rn">${T(key)}</span></span><span class="chev">${ic("chevE")}</span></button>`;
    return `<div class="scroller">
      ${hdr(T("tabMore"), "", bellBtn())}
      <button class="prof surf" data-act="go" data-arg="profile" aria-label="${T("tabProfile")}">${meAv("width:60px;height:60px;font-size:22px")}<span class="rb" style="flex:1;text-align:start"><strong>هشام العبدالله</strong><span dir="ltr" style="text-align:${LANG === "ar" ? "right" : "left"}">info@sabalandqa.com</span><span class="prof-link">${T("viewProfile")}</span></span><span class="chev">${ic("chevE")}</span></button>
      <div class="sec"><div class="sec-h"><h3>${T("grpMkt")}</h3></div><div class="list surf">
        ${item("replies", "bolt", "c-o", "navReplies")}
        ${item("campaigns", "campaign", "c-m", "navCampaigns")}
        ${item("reports", "reports", "c-b", "navReports")}</div></div>
      <div class="sec"><div class="sec-h"><h3>${T("grpAcct")}</h3></div><div class="list surf">
        ${item("team", "users", "c-b", "navTeam")}
        ${item("account", "settings", "c-g", "navSettings")}</div></div>
      <div class="sec"><button class="btn btn-d btn-blk" data-act="logout">${ic("logout")}${T("logout")}</button></div>
      <p class="app-ver">${T("brandName")} · ${T("version")} <span class="num" dir="ltr">${APP_VERSION}</span></p>
    </div>`;
  };

  /* forgot password: 1 choose email/WhatsApp → 2 four-digit code → 3 new password → 4 done */
  const maskId = (v, via) => {
    if (via === "email") return v.replace(/^(.{2}).*(@.*)$/, "$1•••$2");
    const d = v.replace(/[^\d+]/g, ""); // keep the country code and the last 4 digits
    return d.length > 8 ? `${d.slice(0, 4)} •••• ${d.slice(-4)}` : v.replace(/\d(?=\d{4})/g, "•");
  };
  SCR.forgot = () => {
    const f = S.fp, st = f.step;
    const head = (icn, title, sub) => `<div class="fp-head"><span class="fp-ic">${ic(icn)}</span><h2>${title}</h2><p>${sub}</p></div>`;
    let body = "";
    if (st === 1) body = head("lock", T("fpTitle"), T("fpSub")) + `<form class="lg-form surf-2" id="fpForm1" novalidate>
        <div class="seg surf" style="margin-bottom:14px"><button type="button" class="${f.via === "email" ? "on" : ""}" data-act="fpVia" data-arg="email">${T("email")}</button><button type="button" class="${f.via === "wa" ? "on" : ""}" data-act="fpVia" data-arg="wa">${T("fpWhatsapp")}</button></div>
        <div class="fld"><label for="fpId">${f.via === "email" ? T("email") : T("fpPhone")}</label>${f.via === "email" ? `<input id="fpId" class="inp" dir="ltr" type="email" value="${esc(f.id)}" placeholder="name@sabalandqa.com" autocomplete="off">` : telIn("fpId", f.id)}</div>
        <button class="btn btn-o btn-blk" type="submit">${ic(f.via === "email" ? "send" : "whatsapp")}${T("fpSend")}</button></form>`;
    if (st === 2) body = head("shield", T("fpCodeTitle"), `${T("fpCodeSub")} <b>⁦${esc(maskId(f.id, f.via))}⁩</b>`) + `<form class="lg-form surf-2" id="fpForm2" novalidate>
        <div class="otp" dir="ltr">${[0, 1, 2, 3].map((i) => `<input inputmode="numeric" maxlength="1" autocomplete="one-time-code" aria-label="${i + 1}" data-otp="${i}">`).join("")}</div>
        <button class="btn btn-o btn-blk" type="submit" id="fpVerify" disabled>${T("fpVerify")}</button>
        <div class="fp-resend" id="fpResend"></div></form>`;
    if (st === 3) body = head("key", T("fpNewTitle"), T("fpNewSub")) + `<form class="lg-form surf-2" id="fpForm3" novalidate>
        <div class="fld"><label for="fpP1" style="display:flex;justify-content:space-between">${T("newPass")}<span id="fpStr"></span></label>${pass("fpP1", "", "••••••••", true)}</div>
        <div class="meter"><i id="fpMeter"></i></div>
        <ul class="rules" id="fpRules">${["fpR1", "fpR2", "fpR3", "fpR4"].map((k) => `<li data-rule="${k}">${ic("check")}${T(k)}</li>`).join("")}</ul>
        <div class="fld"><label for="fpP2">${T("confirmPass")}</label>${pass("fpP2", "", "••••••••", true)}<span class="fp-err" id="fpErr" hidden>${T("fpMismatch")}</span></div>
        <button class="btn btn-o btn-blk" type="submit" id="fpSave" disabled>${T("fpSave")}</button></form>`;
    if (st === 4) body = `<div class="fp-done"><span class="fp-ok">${ic("check")}</span><h2>${T("fpDoneTitle")}</h2><p>${T("fpDoneSub")}</p><button class="btn btn-o btn-blk" data-act="go" data-arg="login">${T("fpBackLogin")}</button></div>`;
    return `<div class="auth"><div class="auth-top">${st < 4 ? `<button class="ibtn surf" data-act="fpBack" aria-label="back">${ic("back")}</button><div class="fp-steps" aria-hidden="true">${[1, 2, 3].map((i) => `<i class="${i <= st ? "on" : ""}"></i>`).join("")}</div>` : ""}</div><div class="auth-body">${body}</div></div>`;
  };
  function fpStep(n) { S.fp.step = n; render(true); }
  function fpTimer() {
    clearInterval(S.fpT); let left = 59;
    const paint = () => { const el = $("#fpResend"); if (!el) return clearInterval(S.fpT); el.innerHTML = left > 0 ? `${T("fpResendIn")} <b class="num">0:${String(left).padStart(2, "0")}</b>` : `<button type="button" data-act="fpResend">${T("fpResend")}</button>`; };
    paint(); S.fpT = setInterval(() => { left--; paint(); if (left <= 0) clearInterval(S.fpT); }, 1000);
  }
  function bindForgot() {
    const f1 = $("#fpForm1"); if (f1) f1.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate("fp1")) return;
      S.fp.id = S.fp.via === "email" ? $("#fpId").value.trim() : telVal("fpId").full; fpStep(2); toast("toastSent");
    });
    const f2 = $("#fpForm2"); if (f2) {
      const boxes = Array.from(f2.querySelectorAll("[data-otp]")), btn = $("#fpVerify");
      const sync = () => { boxes.forEach((b) => b.classList.toggle("filled", !!b.value)); btn.disabled = boxes.some((b) => !b.value); };
      boxes.forEach((b, i) => {
        b.addEventListener("input", () => { b.value = b.value.replace(/\D/g, "").slice(-1); if (b.value && boxes[i + 1]) boxes[i + 1].focus(); sync(); });
        b.addEventListener("keydown", (e) => { if (e.key === "Backspace" && !b.value && boxes[i - 1]) { boxes[i - 1].focus(); boxes[i - 1].value = ""; sync(); } });
        b.addEventListener("paste", (e) => { const d = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, boxes.length); if (!d) return; e.preventDefault(); d.split("").forEach((ch, k) => { if (boxes[k]) boxes[k].value = ch; }); (boxes[d.length] || boxes[boxes.length - 1]).focus(); sync(); });
      });
      setTimeout(() => boxes[0].focus(), 350);
      f2.addEventListener("submit", (e) => { e.preventDefault(); if (!btn.disabled) { clearInterval(S.fpT); fpStep(3); } });
      fpTimer();
    }
    const f3 = $("#fpForm3"); if (f3) {
      const p1 = $("#fpP1"), p2 = $("#fpP2"), btn = $("#fpSave");
      const check = () => {
        const v = p1.value, r = { fpR1: v.length >= 8, fpR2: /\d/.test(v), fpR3: /[a-z]/.test(v) && /[A-Z]/.test(v), fpR4: /[^A-Za-z0-9\s]/.test(v) };
        const n = Object.values(r).filter(Boolean).length;
        Object.keys(r).forEach((k) => f3.querySelector(`[data-rule="${k}"]`).classList.toggle("ok", r[k]));
        const lvl = !v ? null : n <= 2 ? ["fpWeak", "var(--red)"] : n === 3 ? ["fpFair", "var(--amber)"] : ["fpStrong", "var(--leaf)"];
        $("#fpMeter").style.width = v ? (n / 4) * 100 + "%" : "0"; $("#fpMeter").style.background = lvl ? lvl[1] : "";
        $("#fpStr").textContent = lvl ? T(lvl[0]) : ""; $("#fpStr").style.color = lvl ? lvl[1] : "";
        const mismatch = p2.value && p2.value !== v; $("#fpErr").hidden = !mismatch;
        btn.disabled = !(r.fpR1 && r.fpR2 && n >= 3 && p2.value === v);
      };
      p1.addEventListener("input", check); p2.addEventListener("input", check);
      f3.addEventListener("submit", (e) => { e.preventDefault(); if (!btn.disabled) { fpStep(4); toast("toastPass"); } });
    }
  }

  SCR.login = () => `<div class="login">
      <div class="lg-top"><svg class="lg-mark" viewBox="0 0 1200 1528" role="img" aria-label="${T("brandName")}"><use href="#lg-mark"/><use href="#lg-textAr"/><use href="#lg-textEn"/></svg>
        <h2>${T("loginTitle")}</h2><p class="lg-sub">${T("loginDesc")}</p></div>
      <form class="lg-form surf-2" id="loginForm">
        <div class="fld"><label for="lgMail">${T("loginEmail")}</label><div class="ifield"><span class="if-ic">${ic("mail")}</span><input id="lgMail" class="inp" type="email" dir="ltr" placeholder="name@sabalandqa.com" autocomplete="off"></div></div>
        <div class="fld"><label for="lgPass">${T("loginPass")}</label>${pass("lgPass", "", "••••••••")}</div>
        <button class="btn btn-o btn-blk" type="submit">${T("loginBtn")}</button>
      </form></div>`;

  /* ---------- sheets ---------- */
  const SH = {};
  const shHead = (title, sub) => `<div class="sh-h"><div class="sh-t"><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ""}</div><button class="ibtn sm surf" data-act="closeSheet" aria-label="close">${ic("x")}</button></div>`;
  const shFoot = (btn) => `<div class="sh-f"><button class="btn btn-g surf" data-act="closeSheet">${T("cancel")}</button>${btn}</div>`;
  const opt = (act, arg, icn, cls, title, sub, on) => `<button class="opt ${on ? "on" : ""}" data-act="${act}" data-arg="${arg}"><span class="mi ${cls}">${ic(icn)}</span><span class="ob"><strong>${title}</strong>${sub ? `<span>${sub}</span>` : ""}</span>${on ? `<span style="color:var(--accent)">${ic("check")}</span>` : ""}</button>`;

  const contCount = () => DATA.contacts.filter((k) => (S.fTag === "all" || k.tag === S.fTag) && (S.fLang === "all" || k.lang === S.fLang)).length;
  SH.contFilter = () => shHead(T("fltTitle")) + `<div class="sh-b">
    ${(() => { const opts = [{ id: "all" }].concat(DATA.tags), cnt = (t) => (t.id === "all" ? DATA.contacts.length : DATA.contacts.filter((k) => k.tag === t.id).length);
      const row = (t) => `<span class="mi ${t.id === "all" ? "c-m" : "seg-dot"}" ${t.id === "all" ? "" : `style="--c:var(--${tagVar(t.color)})"`}>${ic(t.id === "all" ? "users" : "tag")}</span><span class="ob"><strong>${t.id === "all" ? T("fltAll") : esc(L(t))}</strong><span>${cnt(t)} ${T("segCount")}</span></span>`;
      const cur = opts.find((t) => t.id === S.fTag) || opts[0];
      return `<div class="fld"><label for="cfTag" class="lbl-row">${T("fltTag")}<button type="button" class="lnk-add" data-act="fltManage">${T("fltManage")}</button></label><div class="dd">
        <button type="button" class="sel dd-btn has" id="cfTag" data-act="ddToggle" aria-haspopup="listbox" aria-expanded="false"><span class="dd-cur">${row(cur)}</span>${ic("chevD")}</button>
        <div class="dd-panel surf" hidden><div class="search dd-search">${ic("search")}<input id="ddQ" type="search" placeholder="${T("search")}" aria-label="${T("search")}" autocomplete="off"><button type="button" class="dd-x" data-act="ddClose" aria-label="${T("cancel")}">${ic("chevD")}</button></div>
          <div class="dd-list" role="listbox">${opts.map((t) => `<button type="button" class="opt${S.fTag === t.id ? " on" : ""}" role="option" data-act="fltSet" data-arg="fTag:${t.id}" data-q="${esc((t.id === "all" ? T("fltAll") : t.ar + " " + t.en).toLowerCase().replace(/s/g, ""))}">${row(t)}${S.fTag === t.id ? `<span style="color:var(--accent)">${ic("check")}</span>` : ""}</button>`).join("")}
            <p class="hint dd-empty" hidden>${T("ddEmpty")}</p></div></div></div></div>`; })()}
    <div class="fld"><label>${T("fltLang")}</label>
    <div class="chips flt-chips">${["all", "ar", "en", "hi"].map((l) => `<button class="chip ${S.fLang === l ? "on" : "surf"}" data-act="fltSet" data-arg="fLang:${l}">${l === "all" ? T("fltAll") : langLabel(l)}</button>`).join("")}</div></div></div>
    <div class="sh-f"><button class="btn btn-g surf" data-act="fltSet" data-arg="reset">${T("fltReset")}</button><button class="btn btn-p" data-act="closeSheet">${T("fltShow")} (${contCount()})</button></div>`;
  SH.numSwitch = () => shHead(T("numSwitchTitle")) + `<div class="sh-b" style="padding-bottom:22px">
    ${opt("pickNum", "all", "whatsapp", "c-g", T("allNumbers"), `<span dir="ltr">${DATA.numbers.main.phone} · ${DATA.numbers.second.phone}</span>`, S.num === "all")}
    ${["main", "second"].map((n) => opt("pickNum", n, "whatsapp", n === "main" ? "c-g" : "c-b", numLabel(n), `<span dir="ltr">${DATA.numbers[n].phone}</span>`, S.num === n)).join("")}</div>`;
  // searchable dropdown of contacts; the chosen one shows in the field
  const contactDD = (selId) => { const k = selId && DATA.contacts.find((x) => x.id === selId), ki = k ? DATA.contacts.indexOf(k) : 0;
    return `<div class="dd">
      <button type="button" class="sel dd-btn${k ? " has" : ""}" id="ncC" data-act="ddToggle" aria-haspopup="listbox" aria-expanded="false">${k ? `${av(cName(k), ki, "sm")}<span class="dd-v"><strong>${esc(cName(k))}</strong><span dir="ltr">${k.ph}</span></span>` : `<span class="dd-ph">${T("ddContactPh")}</span>`}${ic("chevD")}</button>
      <div class="dd-panel surf" hidden><div class="search dd-search">${ic("search")}<input id="ddQ" type="search" placeholder="${T("search")}" aria-label="${T("search")}" autocomplete="off"><button type="button" class="dd-x" data-act="ddClose" aria-label="${T("cancel")}">${ic("chevD")}</button></div>
        <div class="dd-list" role="listbox">${k ? `<button type="button" class="opt" data-act="ncPick" data-arg=""><span class="mi c-m">${ic("x")}</span><span class="ob"><strong>${T("ddNone")}</strong></span></button>` : ""}${DATA.contacts.map((c, i) => `<button type="button" class="opt ${selId === c.id ? "on" : ""}" role="option" data-act="ncPick" data-arg="${c.id}" data-q="${esc((cName(c) + " " + c.ph.replace(/s/g, "")).toLowerCase())}">${av(cName(c), i, "sm")}<span class="ob"><strong>${esc(cName(c))}</strong><span dir="ltr">${c.ph}</span></span>${selId === c.id ? `<span style="color:var(--accent)">${ic("check")}</span>` : ""}</button>`).join("")}
          <p class="hint dd-empty" hidden>${T("ddEmpty")}</p></div></div></div>`; };
  SH.newConv = () => shHead(T("newConvTitle"), T("newConvSub")) + `<div class="sh-b"><div class="fld"><label for="ncC">${T("pickContact")}</label>${contactDD(S.sheetArg)}</div>
    <div class="fld" style="margin-top:10px"><label for="ncPh">${T("orNewNum")}</label>${telIn("ncPh", "+968 ")}</div>
    <div class="fld"><label for="ncFrom">${T("fromNumber")}</label><select id="ncFrom" class="sel"><option value="main">${numLabel("main")}</option><option value="second">${numLabel("second")}</option></select></div></div>` + shFoot(`<button class="btn btn-o" data-act="ncStart">${ic("chat")}${T("startChat")}</button>`);
  SH.cust = () => {
    const c0 = getConv(S.chat), i = DATA.conversations.indexOf(c0);
    const c = S.custDraft ? Object.assign({}, c0, S.custDraft) : c0; // keeps unsaved picks across the "add segment" sheet
    S.custDraft = null;
    return `<div class="cust-hero">${av(convName(c), i, "lg")}
      <div class="ch-t"><h3>${esc(convName(c))}</h3><p dir="ltr">${c.phone}</p>
        <div class="ch-b">${badge(tagById(c.tag))}${c.convTag ? badge(ctagById(c.convTag)) : ""}<span class="badge b-gray"><span class="ndot ${c.num}" style="width:6px;height:6px"></span>${numLabel(c.num)}</span></div></div>
      <button class="ibtn sm surf" data-act="closeSheet" aria-label="close">${ic("x")}</button></div>
    <div class="sh-b"><div class="fld"><label for="cuTag" class="lbl-row">${T("convTag")}<button type="button" class="lnk-add" data-act="openTag">${ic("plus")}${T("addConvTag")}</button></label><select id="cuTag" class="sel"><option value="">${T("noTag")}</option>${DATA.convTags.map((t) => `<option value="${t.id}" ${t.id === c.convTag ? "selected" : ""}>${esc(L(t))}</option>`).join("")}</select></div>
      <div class="fld"><label for="cuSeg" class="lbl-row">${T("cpClass")}<button type="button" class="lnk-add" data-act="openSeg">${ic("plus")}${T("addClass")}</button></label><select id="cuSeg" class="sel">${DATA.tags.map((t) => `<option value="${t.id}" ${t.id === c.tag ? "selected" : ""}>${esc(L(t))}</option>`).join("")}</select></div>
      <div class="card surf cust-info"><div class="kv"><span>${T("cpFirst")}</span><strong>${esc(L(c.first))}</strong></div><div class="kv"><span>${T("cpConvs")}</span><strong>${c.count}</strong></div><div class="kv"><span>${T("cpLastTopic")}</span><strong>${esc(L(c.topic))}</strong></div><div class="kv"><span>${T("cpLang")}</span><strong>${langLabel(c.lang)}</strong></div></div>
      <div class="fld"><label for="cuNote">${T("cpNotes")}</label><textarea id="cuNote" class="ta" rows="2" placeholder="${T("cpNotePh")}">${esc(c.note || "")}</textarea></div>
      <div class="lbl cust-hist">${T("cpHistory")}${c.history && c.history.length ? ` (${c.history.length})` : ""}</div>
      ${c.history && c.history.length ? `<div class="clist">${c.history.map((h) => `<div class="row surf conv-card hist-card"><span class="mi ${h.by === "AI" ? "c-ai" : "c-b"}">${ic(h.by === "AI" ? "sparkle" : "user")}</span><span class="rb"><span class="rn">${esc(L(h.topic))}</span><span class="rs" style="margin-top:2px">${esc(L(h.date))} · ${esc(h.by)}</span></span></div>`).join("")}</div>` : `<p class="hint">${T("cpNoHistory")}</p>`}
      </div><div class="sh-f"><button class="btn btn-g surf" data-act="sheet" data-arg="transfer">${ic("transfer")}${T("transfer")}</button><button class="btn btn-p" data-act="custSave">${T("save")}</button></div>`;
  };
  const swatches = (id, colors, cur) => `<div class="lbl" style="margin-bottom:8px">${T("colorLbl")}</div><div class="swatches" id="${id}">${colors.map((c) => `<button type="button" class="badge b-${c}${c === cur ? " on" : ""}" data-act="pickColor" data-arg="${c}" aria-label="${c}">●</button>`).join("")}</div>`;
  SH.segForm = (id) => { const t = id && DATA.tags.find((x) => x.id === id); return shHead(t ? T("edit") : T("segNew")) + `<div class="sh-b">
    <div class="fld"><label for="sgAr">${T("nameAr")}</label><input id="sgAr" class="inp" value="${t ? esc(t.ar) : ""}" placeholder="${T("contactTagNameArPh")}"></div>
    <div class="fld"><label for="sgEn">${T("nameEn")}</label><input id="sgEn" class="inp" dir="ltr" value="${t ? esc(t.en) : ""}" placeholder="${T("contactTagNameEnPh")}"></div>
    ${swatches("sgC", ["gold", "green", "blue", "red", "ai", "amber", "gray"], t ? t.color : "gold")}</div>` + shFoot(`<button class="btn btn-p" data-act="saveSeg" data-arg="${id || ""}">${t ? T("save") : T("add")}</button>`); };
  SH.segActs = (id) => { const t = DATA.tags.find((x) => x.id === id); return actsSheet(L(t), [["sheet", "segForm:" + id, "pen", "c-b", T("edit")], ["askDel", "seg:" + id, "trash", "c-r", T("delete")]], `<div class="c-info surf">
      <div class="kv"><span>${T("nameAr")}</span><strong>${esc(t.ar)}</strong></div>
      <div class="kv"><span>${T("nameEn")}</span><strong dir="ltr">${esc(t.en)}</strong></div>
      <div class="kv"><span>${T("colorLbl")}</span>${badge(t)}</div>
      <div class="kv"><span>${T("thContactTagUsage")}</span><strong>${DATA.contacts.filter((k) => k.tag === id).length} ${T("segCount")}</strong></div></div>`); };
  SH.catForm = (id) => { const c = id && DATA.replyCats.find((x) => x.id === id); return shHead(c ? T("edit") : T("catNew")) + `<div class="sh-b">
    <div class="fld"><label for="rcAr">${T("nameAr")}</label><input id="rcAr" class="inp" value="${c ? esc(c.ar) : ""}"></div>
    <div class="fld"><label for="rcEn">${T("nameEn")}</label><input id="rcEn" class="inp" dir="ltr" value="${c ? esc(c.en) : ""}"></div></div>` + shFoot(`<button class="btn btn-p" data-act="saveCat" data-arg="${id || ""}">${c ? T("save") : T("add")}</button>`); };
  SH.catActs = (id) => actsSheet(L(catBy(id)), [["sheet", "catForm:" + id, "pen", "c-b", T("edit")], ["askDel", "rcat:" + id, "trash", "c-r", T("delete")]]);
  // date span of each dashboard period, from today
  const rangeSpan = (k) => { const d = new Date(), y = d.getFullYear(), m = d.getMonth();
    const f = (x) => x.toLocaleDateString(LANG === "ar" ? "ar-u-nu-latn" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
    const s = { repPeriodCurrentMonth: [new Date(y, m, 1), d], repPeriodPreviousMonth: [new Date(y, m - 1, 1), new Date(y, m, 0)], repPeriodCurrentYear: [new Date(y, 0, 1), d], repPeriodPreviousYear: [new Date(y - 1, 0, 1), new Date(y - 1, 11, 31)] }[k];
    return s ? `${f(s[0])} - ${f(s[1])}` : T("rngCustomHint"); };
  SH.range = () => shHead(T("rngTitle")) + `<div class="sh-b" style="padding-bottom:22px"><div class="rng-list">${["repPeriodCurrentMonth", "repPeriodPreviousMonth", "repPeriodCurrentYear", "repPeriodPreviousYear", "repPeriodCustom"].map((k) => `<button class="rng-it surf${S.range === k ? " on" : ""}${k === "repPeriodCustom" ? " custom" : ""}" data-act="pickRange" data-arg="${k}"><span class="rb"><strong>${T(k)}</strong><span>${rangeSpan(k)}</span></span>${S.range === k ? `<span class="rng-ck">${ic("check")}</span>` : ""}</button>`).join("")}</div>
    ${S.range === "repPeriodCustom" ? `<div class="hd-t" style="margin-top:12px"><label>${T("from")} <input class="inp" type="date" value="2026-09-01" aria-label="${T("from")}"></label><label>${T("to")} <input class="inp" type="date" value="2026-10-05" aria-label="${T("to")}"></label></div><button class="btn btn-p btn-blk" style="margin-top:12px" data-act="closeSheet">${T("rngApply")}</button>` : ""}</div>`;
  SH.tagActs = (id) => { const t = DATA.convTags.find((x) => x.id === id); return actsSheet(L(t), [["sheet", "tagForm:" + id, "pen", "c-b", T("edit")], ["askDel", "ctag:" + id, "trash", "c-r", T("delete")]]); };
  SH.transfer = () => { const ag = DATA.agents.filter((a) => a.status === "active"), row = (a, i) => `<span class="av sm" style="background:${avColor(i + 1)}">${esc(initials(LANG === "ar" ? a.n : a.ne))}</span><span class="ob"><strong>${esc(LANG === "ar" ? a.n : a.ne)}</strong><span>${esc(L(a.role))}</span></span>`;
    return shHead(T("transferTitle"), T("transferSub")) + `<div class="sh-b"><div class="fld"><label for="trAg">${T("selectAgent")}</label><div class="dd">
      <button type="button" class="sel dd-btn has" id="trAg" data-act="ddToggle" aria-haspopup="listbox" aria-expanded="false"><span class="dd-cur">${row(ag[0], 0)}</span>${ic("chevD")}</button>
      <div class="dd-panel surf" hidden><div class="search dd-search">${ic("search")}<input id="ddQ" type="search" placeholder="${T("search")}" aria-label="${T("search")}" autocomplete="off"><button type="button" class="dd-x" data-act="ddClose" aria-label="${T("cancel")}">${ic("chevD")}</button></div>
        <div class="dd-list" role="listbox">${ag.map((a, i) => `<button type="button" class="opt${i === 0 ? " on" : ""}" role="option" data-act="ddPick" data-arg="${a.id || i}" data-q="${esc((a.n + " " + a.ne).toLowerCase().replace(/s/g, ""))}">${row(a, i)}</button>`).join("")}
          <p class="hint dd-empty" hidden>${T("ddEmpty")}</p></div></div></div></div>
    <div class="fld"><label for="trNote">${T("note")}</label><textarea id="trNote" class="ta" rows="2"></textarea></div></div>` + shFoot(`<button class="btn btn-o" data-act="transferDo">${ic("transfer")}${T("transfer")}</button>`); };
  SH.qr = () => shHead(T("quickReplies"), T("insertReply")) + `<div class="qr-top">
      <div class="search">${ic("search")}<input id="qrQ" class="surf" type="search" placeholder="${T("search")}" aria-label="${T("search")}" autocomplete="off"></div>
      <div class="chips qr-cats">${[{ id: "all" }].concat(DATA.replyCats).map((c) => `<button type="button" class="chip ${c.id === "all" ? "on" : "surf"}" data-act="qrSheetCat" data-arg="${c.id}">${c.id === "all" ? T("fltAll") : esc(L(c))}</button>`).join("")}</div></div>
    <div class="sh-b" style="padding-bottom:22px">${DATA.quickReplies.map((q) => `<button class="qr surf" data-act="qrPick" data-arg="${q.id}" data-cat="${q.cat}" data-q="${esc((L(q.title) + " " + L(q.body)).toLowerCase())}"><span class="qh"><strong>${esc(L(q.title))}</strong><span class="badge b-gray">${esc(L(catBy(q.cat)))}</span></span><p>${esc(L(q.body))}</p></button>`).join("")}<p class="hint dd-empty" id="qrEmpty" hidden>${T("ddEmpty")}</p></div>`;
  SH.emoji = () => shHead(T("emojis")) + `<div class="sh-b" style="padding-bottom:22px"><div class="emo">${["🐝", "🍯", "🌿", "✅", "🙏", "🌟", "📦", "🚚", "❤️", "😊", "👌", "🎁", "💛", "🌹", "🌷", "🍃", "☀️", "🌙", "👍", "😍", "🤲"].map((e) => `<button data-act="emoji" data-arg="${e}">${e}</button>`).join("")}</div></div>`;
  SH.call = () => { const c = getConv(S.chat), i = DATA.conversations.indexOf(c); return shHead(T("callTitle") + convName(c), T("callDesc")) + `<div class="sh-b" style="text-align:center"><div class="call-av" style="background:${avColor(i)}">${esc(initials(convName(c)))}</div><h3 style="margin-top:16px">${esc(convName(c))}</h3><p class="hint" dir="ltr" style="font-size:14px">${c.phone}</p><p class="hint" style="display:flex;gap:6px;justify-content:center;align-items:center;margin-top:4px"><span class="ndot ${c.num}"></span>${numLabel(c.num)}</p></div>` + shFoot(`<button class="btn btn-o" data-act="callDo" style="background:linear-gradient(135deg,#2BB35A,#1C8A43);box-shadow:0 12px 26px -10px rgba(35,148,74,.6)">${ic("phone")}${T("callNow")}</button>`); };
  SH.chatOpts = () => { const c = getConv(S.chat), it = [["sheet", "cust", "info", "c-m", T("cpInfo")], ["sheet", "call", "phone", "c-g", T("callBtn")], ["sheet", "transfer", "transfer", "c-b", T("transfer")], ["sheet", "cust", "tag", "c-o", c.convTag ? `${T("convTag")}: ${esc(L(ctagById(c.convTag)))}` : T("convTag")]];
    if (!c.closed) it.push(["sheet", "closeChat", "check2", "c-g", T("closeChat")]);
    return actsSheet(convName(c), it); };
  SH.closeChat = () => shHead(T("closeChatTitle"), T("closeChatMsg")) + shFoot(`<button class="btn btn-p" data-act="closeChatDo">${ic("check2")}${T("closeChat")}</button>`);
  // dashboard rules: own text messages can be edited for 15 minutes and deleted for 48 hours (dashboard copy only)
  const canEdit = (m) => !m.file && !m.voice && !m.img && m.at && Date.now() - m.at < 15 * 60e3;
  SH.msgActs = (i) => { const m = getConv(S.chat).msgs[+i]; const it = []; if (canEdit(m)) it.push(["sheet", "msgEdit:" + i, "pen", "c-b", T("msgEdit")]); it.push(["sheet", "msgDel:" + i, "trash", "c-r", T("msgDelete")]);
    return actsSheet(m.img ? T("msgPhoto") : esc(msgText(m).slice(0, 40)), it) + (canEdit(m) ? "" : `<p class="hint" style="padding:0 20px 20px;margin-top:-12px">${T("msgEditExpired")}</p>`); };
  SH.msgEdit = (i) => { const m = getConv(S.chat).msgs[+i]; return shHead(T("msgEditTitle")) + `<div class="sh-b"><div class="fld"><label for="meT">${T("rBody")}</label><textarea id="meT" class="ta" rows="4">${esc(msgText(m))}</textarea></div>
    <div class="off-note">${ic("info")}<span>${T("msgEditHint")}</span></div></div>` + shFoot(`<button class="btn btn-p" data-act="msgEditSave" data-arg="${i}">${T("save")}</button>`); };
  SH.msgDel = (i) => shHead(T("msgDeleteTitle"), T("msgDeleteMsg")) + shFoot(`<button class="btn btn-d" data-act="msgDelDo" data-arg="${i}">${ic("trash")}${T("delete")}</button>`);
  SH.sendCamp = (id) => shHead(T("cmpSend"), T("cmpChunkConfirm")) + shFoot(`<button class="btn btn-o" data-act="sendCampDo" data-arg="${id}">${ic("send")}${T("cmpSend")}</button>`);
  SH.confirm = () => shHead(T("confirmTitle"), T("confirmMsg")) + shFoot(`<button class="btn btn-d" data-act="confirmYes">${ic("trash")}${T("delete")}</button>`);
  const actsSheet = (title, items, top) => shHead(title) + `<div class="sh-b" style="padding-bottom:22px">${top || ""}<div class="acts">${items.map(([act, arg, icn, cls, label]) => `<button class="opt act-it surf${act === "askDel" ? " danger" : ""}" data-act="${act}" data-arg="${arg}"><span class="mi ${cls}">${ic(icn)}</span><span class="ob"><strong>${label}</strong></span><span class="chev">${ic("chevE")}</span></button>`).join("")}</div></div>`;
  SH.contactActs = (id) => { const k = DATA.contacts.find((x) => x.id === id); return actsSheet(cName(k), [["chatWith", id, "chat", "c-g", T("openChat")], ["sheet", "contactForm:" + id, "pen", "c-b", T("edit")], ["askDel", "contact:" + id, "trash", "c-r", T("delete")]], `<div class="c-info surf">
      <div class="kv"><span>${T("cPhone")}</span><strong dir="ltr">${k.ph}</strong></div>
      <div class="kv"><span>${T("thTag")}</span>${badge(tagById(k.tag))}</div>
      <div class="kv"><span>${T("thLang")}</span><strong>${langLabel(k.lang)}</strong></div>
      <div class="kv"><span>${T("cpConvs")}</span><strong>${k.conv}</strong></div>
      <div class="kv"><span>${T("thLastSeen")}</span><strong>${esc(L(k.last))}</strong></div></div>`); };
  SH.replyActs = (id) => actsSheet(L(DATA.quickReplies.find((x) => x.id === id).title), [["sheet", "replyForm:" + id, "pen", "c-b", T("edit")], ["dupReply", id, "copy", "c-o", T("duplicate")], ["askDel", "reply:" + id, "trash", "c-r", T("delete")]]);
  SH.campActs = (id) => actsSheet(L(DATA.campaigns.find((x) => x.id === id).n), [["sheet", "campForm:" + id, "pen", "c-b", T("edit")]].concat(DATA.campaigns.find((x) => x.id === id).st === "sending" ? [] : [["sheet", "sendCamp:" + id, "send", "c-g", T("cmpSend")]], [["dupCamp", id, "copy", "c-o", T("duplicate")], ["askDel", "camp:" + id, "trash", "c-r", T("delete")]]));
  const mStatus = (m) => (m.status === "active" ? `<span class="badge b-green dot">${T("stMActive")}</span>` : `<span class="badge b-gray dot">${T("stMDisabled")}</span>`);
  SH.memberActs = (id) => { const m = DATA.team.find((x) => x.id === id); const it = m.owner ? [["sheet", "perms:" + id, "shield", "c-o", T("mPerms")]] : [["sheet", "memberForm:" + id, "pen", "c-b", T("editMember")], ["sheet", "perms:" + id, "shield", "c-o", T("mPerms")]]; if (!m.owner) it.push(["toggleMember", id, m.status === "active" ? "lock" : "check", "c-a", m.status === "active" ? T("actDisable") : T("actEnable")], ["askDel", "member:" + id, "trash", "c-r", T("delete")]); return actsSheet(m.name, it, `<div class="c-info surf">
      <div class="kv"><span>${T("mRoleLbl")}</span>${m.owner ? `<span class="badge b-gold">${T("ownerRole")}</span>` : `<strong>${T("mStaff")}</strong>`}</div>
      <div class="kv"><span>${T("thStatus")}</span>${mStatus(m)}</div>
      <div class="kv"><span>${T("mPhone")}</span><strong dir="ltr">${esc(m.phone)}</strong></div>
      <div class="kv"><span>${T("mPerms")}</span><strong>${m.perms.length}/9</strong></div>
      <div class="kv"><span>${T("mAddedLbl")}</span><strong>${esc(L(m.created))}</strong></div></div>`); };
  SH.contactForm = (id) => { const k = id && DATA.contacts.find((x) => x.id === id); return shHead(k ? T("edit") : T("addContact")) + `<div class="sh-b">
    <div class="fld"><label for="fcN">${T("cName")}</label><input id="fcN" class="inp" value="${k ? esc(cName(k)) : ""}"></div>
    <div class="fld"><label for="fcP">${T("cPhone")}</label>${k && k.conv ? `<fieldset disabled class="locked">${telIn("fcP", k.ph)}</fieldset><span class="hint">${ic("lock").replace('class="i"', 'class="i" style="width:12px;height:12px;vertical-align:-1px"')} ${T("contactPhoneLocked")}</span>` : telIn("fcP", k ? k.ph : "+968 ")}</div>
    <div class="grid2"><div class="fld"><label for="fcT">${T("cTag")}</label><select id="fcT" class="sel">${DATA.tags.map((t) => `<option value="${t.id}" ${k && k.tag === t.id ? "selected" : ""}>${esc(L(t))}</option>`).join("")}</select></div>
    <div class="fld"><label for="fcL">${T("cLang")}</label><select id="fcL" class="sel">${["ar", "en", "hi"].map((l) => `<option value="${l}" ${k && k.lang === l ? "selected" : ""}>${langLabel(l)}</option>`).join("")}</select></div></div>
    ${k ? "" : `<div class="fld"><label for="fcNum">${T("thWaNum")}</label><select id="fcNum" class="sel"><option value="main">${numLabel("main")}</option><option value="second">${numLabel("second")}</option></select></div>`}</div>` + shFoot(`<button class="btn btn-p" data-act="saveContact" data-arg="${id || ""}">${k ? T("save") : T("add")}</button>`); };
  SH.replyForm = (id) => { const q = id && DATA.quickReplies.find((x) => x.id === id); return shHead(q ? T("edit") : T("addReply")) + `<div class="sh-b">
    <div class="fld"><label for="frT">${T("rTitle")}</label><input id="frT" class="inp" value="${q ? esc(L(q.title)) : ""}" placeholder="${T("rTitlePh")}"></div>
    <div class="grid2"><div class="fld"><label for="frC">${T("rCat")}</label><select id="frC" class="sel">${DATA.replyCats.map((c) => `<option value="${c.id}" ${q && q.cat === c.id ? "selected" : ""}>${esc(L(c))}</option>`).join("")}</select></div>
    <div class="fld"><label for="frL">${T("rLang")}</label><select id="frL" class="sel">${["ar", "en", "hi"].map((l) => `<option value="${l}" ${q && q.lang === l ? "selected" : ""}>${langLabel(l)}</option>`).join("")}</select></div></div>
    <div class="fld"><label for="frB">${T("rBody")}</label><textarea id="frB" class="ta" rows="4" placeholder="${T("rBodyPh")}">${q ? esc(L(q.body)) : ""}</textarea><span class="hint">${T("rVarHint")}</span></div></div>` + shFoot(`<button class="btn btn-p" data-act="saveReply" data-arg="${id || ""}">${q ? T("save") : T("add")}</button>`); };
  SH.campForm = (id) => { const cp = id && DATA.campaigns.find((x) => x.id === id); return shHead(cp ? T("edit") : T("addCamp")) + `<div class="sh-b">
    <div class="fld"><label for="fmN">${T("cmpName")}</label><input id="fmN" class="inp" value="${cp ? esc(L(cp.n)) : ""}" placeholder="${T("cmpNamePh")}"></div>
    <div class="fld"><label for="fmA">${T("cmpAudience")}</label><select id="fmA" class="sel">${Object.keys(AUD).map((k) => `<option value="${k}" ${cp && cp.aud === k ? "selected" : ""}>${T(AUD[k])}</option>`).join("")}</select></div>
    <div class="fld"><label for="fmNum">${T("cmpNumber")}</label><select id="fmNum" class="sel"><option value="main">${numLabel("main")}</option><option value="second" ${cp && cp.num === "second" ? "selected" : ""}>${numLabel("second")}</option></select></div>
    <div class="fld"><label for="fmM">${T("cmpMsg")}</label><textarea id="fmM" class="ta" rows="4" placeholder="${T("cmpMsgPh")}"></textarea></div>
    <div class="fld"><label for="fmFile">${T("cmpAttachBtn")}</label>
      <div class="filebox"><input type="file" id="fmFile" class="file-hidden" accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.mp4,.mp3,.ogg">
        <label class="fb-drop" for="fmFile"><span class="fb-ic">${ic("upload")}</span><span class="fb-t"><strong>${T("fbPick")}</strong><small>${T("fbTypes")}</small></span></label>
        <div class="fb-file" hidden><span class="fb-ic">${ic("file")}</span><span class="fb-t"><strong class="fb-n"></strong><small class="fb-s"></small></span><button type="button" class="ibtn sm" data-act="fbClear" aria-label="${T("fbRemove")}">${ic("x")}</button></div></div>
      <span class="hint">${T("cmpAttachHint")}</span></div>
    <div class="off-note">${ic("info")}<span>${T("cmpChunkNotice")}</span></div></div>` + shFoot(`<button class="btn btn-o" data-act="saveCamp" data-arg="${id || ""}">${cp ? T("save") : `${ic("send")}${T("cmpCreate")}`}</button>`); };
  SH.memberForm = (id) => { const m = id && DATA.team.find((x) => x.id === id); return shHead(m ? T("editMember") : T("addMember")) + `<div class="sh-b">
    <div class="fld"><label for="fuN">${T("mName")}</label><input id="fuN" class="inp" value="${m ? esc(m.name) : ""}" placeholder="${LANG === "ar" ? "مثال: محمد أحمد" : "e.g. Mohammed Ahmed"}"></div>
    <div class="fld"><label for="fuE">${T("mEmail")}</label><input id="fuE" class="inp" dir="ltr" type="email" value="${m ? esc(m.email) : ""}" placeholder="name@sabalandqa.com"></div>
    <div class="fld"><label for="fuP">${T("mPhone")}</label>${telIn("fuP", m ? m.phone : "+968 ")}</div>
    <div class="fld"><label for="fuW">${T("mPassword")}</label>${pass("fuW", "", m ? T("mPasswordPh") : "••••••••")}</div>
    <div class="fld"><label for="fuW2">${T("mPasswordConfirm")}</label>${pass("fuW2", "", "••••••••")}</div></div>` + shFoot(`${m ? "" : `<button class="btn btn-g surf" data-act="saveMember" data-arg="|perms">${ic("shield")}${T("mPerms")}</button>`}<button class="btn btn-p" data-act="saveMember" data-arg="${id || ""}">${m ? T("save") : T("add")}</button>`); };
  const PIC = { overview: "home", conversations: "chat", contacts: "users", replies: "bolt", campaigns: "campaign", reports: "reports", "ai-settings": "ai", team: "users", account: "settings", conversasion_tags: "tag" };
  SH.perms = (id) => { const m = DATA.team.find((x) => x.id === id); return `<div class="sh-h perm-h"><button class="ibtn sm surf" data-act="sheet" data-arg="memberActs:${id}" aria-label="back">${ic("back")}</button><div class="sh-t"><h3>${T("permsTitle")}</h3></div><button class="ibtn sm surf" data-act="closeSheet" aria-label="close">${ic("x")}</button></div><div class="sh-b">
    <div class="perm-who surf"><span class="av" style="background:${m.av}">${esc(initials(m.name))}</span><span class="rb"><strong>${esc(m.name)}</strong><span dir="ltr">${esc(m.email)}</span></span>${m.owner ? `<span class="badge b-gold">${T("ownerRole")}</span>` : `<span class="badge b-gray">${m.perms.length}/9</span>`}</div>
    <p class="hint perm-sub">${T("permsSub")}</p>
    <div style="display:flex;gap:8px;margin-bottom:10px"><button class="btn btn-g surf btn-sm" data-act="permsAll" data-arg="1">${T("selectAllPerms")}</button><button class="btn btn-g surf btn-sm" data-act="permsAll" data-arg="0">${T("clearAllPerms")}</button></div>
    <div id="permsList" class="perm-grid">${DATA.PERMS.map((p) => `<label class="perm"><input type="checkbox" data-perm="${p.id}" ${m.perms.includes(p.id) ? "checked" : ""} ${m.owner ? "disabled" : ""}><span class="pi">${ic(PIC[p.id])}</span><span class="pn">${esc(L(p))}</span><span class="pc">${ic("check")}</span></label>`).join("")}</div>
    ${m.owner ? `<p class="hint" style="margin-top:10px">${LANG === "ar" ? "المدير العام لديه صلاحيات كاملة دائماً." : "The owner always has full access."}</p>` : ""}</div>` + shFoot(`<button class="btn btn-p" data-act="permsSave" data-arg="${id}" ${m.owner ? "disabled" : ""}>${ic("check")}${T("save")}</button>`); };
  SH.meta = (id) => { const isNew = id === "new"; const n = isNew ? { meta: { phoneId: "", wabaId: "", accessToken: "", callbackUrl: "https://api.sabalandqa.com/webhook/v1/whatsapp/new", verifyToken: "saba_x7k2m9p4", version: "v23.0" }, phone: "+968 " } : DATA.numbers[id];
    return shHead(isNew ? T("connectNumber") : T("manageNum") + " — " + numLabel(id), T("aiMetaDesc")) + `<div class="sh-b">
    ${isNew ? `<div class="fld"><label for="mtLb">${T("displayName")}</label><input id="mtLb" class="inp" placeholder="${LANG === "ar" ? "مثال: الرقم الإضافي" : "e.g. Second number"}"></div><div class="fld"><label for="mtPh">${T("fpPhone")}</label>${telIn("mtPh", "+968 ")}</div>` : ""}
    <div class="fld"><label for="mtPid">${T("phoneId")}</label><input id="mtPid" class="inp" dir="ltr" value="${n.meta.phoneId}" placeholder="104872819283746"><span class="hint">${T("phoneIdHint")}</span></div>
    <div class="fld"><label for="mtW">${T("wabaId")}</label><input id="mtW" class="inp" dir="ltr" value="${n.meta.wabaId}" placeholder="237456891023456"><span class="hint">${T("wabaIdHint")}</span></div>
    <div class="fld"><label for="mtT">${T("accessToken")}</label>${pass("mtT", n.meta.accessToken, "EAAG…", true)}<span class="hint">${T("accessTokenHint")}</span></div>
    <div class="fld"><label for="mtC">${T("callbackUrl")}</label><div class="inrow"><input id="mtC" class="inp" dir="ltr" readonly value="${n.meta.callbackUrl}"><button type="button" class="ibtn surf" data-act="copy" data-arg="mtC" aria-label="${T("copy")}">${ic("copy")}</button></div><span class="hint">${T("callbackUrlHint")}</span></div>
    <div class="fld"><label for="mtV">${T("verifyToken")}</label><div class="inrow"><input id="mtV" class="inp" dir="ltr" value="${n.meta.verifyToken}"><button type="button" class="ibtn surf" data-act="copy" data-arg="mtV" aria-label="${T("copy")}">${ic("copy")}</button><button type="button" class="ibtn surf" data-act="regen" aria-label="${T("regenerate")}">${ic("refresh")}</button></div><span class="hint">${T("verifyTokenHint")}</span></div>
    <div class="fld"><label for="mtVer">${T("apiVersion")}</label><select id="mtVer" class="sel">${DATA.apiVersions.map((v) => `<option ${v === n.meta.version ? "selected" : ""}>${v}${v === "v23.0" ? " (latest)" : ""}</option>`).join("")}</select><span class="hint">${T("apiVersionHint")}</span></div></div>` + shFoot(`${isNew ? "" : `<button class="btn btn-g surf" data-act="testConn" data-arg="metaTestSuccess">${ic("refresh")}${T("testConn")}</button>`}<button class="btn btn-p" data-act="metaSave" data-arg="${isNew ? "toastNumLinked" : "metaSaved"}">${ic(isNew ? "link" : "check")}${isNew ? T("connectNumber") : T("save")}</button>`); };
  SH.tagForm = (id) => { const t = id && DATA.convTags.find((x) => x.id === id); return shHead(t ? T("edit") : T("addConvTag")) + `<div class="sh-b">
    <div class="fld"><label for="ftN">${T("thTagName")}</label><input id="ftN" class="inp" value="${t ? esc(L(t)) : ""}" placeholder="${T("tagNamePh")}"></div>
    <div class="lbl" style="margin-bottom:8px">${T("tagColorLabel")}</div><div style="display:flex;gap:8px" id="ftC">${["gold", "green", "blue", "red", "ai", "amber"].map((c) => `<button class="badge b-${c} ${(t ? t.color : "gold") === c ? "on" : ""}" data-act="pickColor" data-arg="${c}" style="height:40px;width:44px;justify-content:center;border-radius:12px;${(t ? t.color : "gold") === c ? "outline:2px solid var(--ink)" : ""}" aria-label="${c}">●</button>`).join("")}</div></div>` + shFoot(`<button class="btn btn-p" data-act="saveTag" data-arg="${id || ""}">${t ? T("save") : T("add")}</button>`); };

  /* ---------- rendering ---------- */
  const isDark = () => document.documentElement.dataset.theme === "dark" || (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  function render(anim) {
    const view = $("#view");
    const keep = !anim && view.querySelector(".scroller") ? view.querySelector(".scroller").scrollTop : 0;
    const f = typeof FABS[S.screen] === "function" ? FABS[S.screen]() : FABS[S.screen];
    const fabHtml = f ? `<button class="fab" data-act="sheet" data-arg="${f[0]}" aria-label="${T(f[1])}">${ic("plus")}</button>` : "";
    view.innerHTML = S.screen === "splash" ? "" : `<div class="screen${anim ? " enter" : ""}">${SCR[S.screen]()}${fabHtml}</div>`;
    if (anim) $("#app").classList.remove("hide-chrome");
    const sc = view.querySelector(".scroller"); if (sc && keep) sc.scrollTop = keep;
    const showTabs = TABS.includes(S.screen); // sub-pages (reached from a tab) get the full screen; their header has a back button
    const cur = S.screen === "segments" && S.prev === "contacts" ? "contacts" : SUBS.includes(S.screen) ? "more" : S.screen;
    const u = unreadTotal();
    $("#tabbar").hidden = !showTabs;
    $("#app").classList.toggle("has-tabs", showTabs);
    $("#tabbar").innerHTML = [["overview", "home", "tabHome"], ["conversations", "chat", "tabChats"], ["contacts", "users", "tabContacts"], ["more", "grid", "tabMore"]]
      .map(([id, icn, k]) => `<button class="tab ${cur === id ? "on" : ""}" data-act="tab" data-arg="${id}" aria-label="${T(k)}">${ic(icn)}<span>${T(k)}</span>${id === "conversations" && u ? `<span class="tb">${u}</span>` : ""}</button>`).join("");
    after();
    decorate(view);
    if (anim) setupMotion(view);
    renderPanel();
  }

  /* ---------- motion: entrance stagger, lazy reveal on scroll, animated stats ---------- */
  const ITEM_SEL = ".hdr, .sub-hdr, .st, .card, .row, .sec-h, .chips, .search, .prof, .btn-blk, .scroller > p";
  const COUNT_SEL = ".st-v, .nr-v, .wsum b, .dc b, .wv, .dt b, .mini b, .kv strong.num, .num > b";
  let io = null;
  function countUp(el, delay) {
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
    while (w.nextNode()) if (/\d/.test(w.currentNode.nodeValue)) nodes.push(w.currentNode);
    nodes.forEach((n) => {
      const orig = n.nodeValue, m = orig.match(/\d[\d,]*(\.\d+)?/);
      if (!m) return;
      const str = m[0], target = parseFloat(str.replace(/,/g, "")), dec = m[1] ? m[1].length - 1 : 0, comma = str.includes(",");
      const show = (v) => { n.nodeValue = orig.replace(str, comma ? v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) : v.toFixed(dec)); };
      const D = 950, t0 = performance.now() + delay;
      show(0);
      const step = (now) => { const p = Math.min(1, Math.max(0, (now - t0) / D)); show(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
      setTimeout(() => show(target), delay + D + 120); // lands on the exact value even if frames are throttled
    });
  }
  function animateStats(root, base) {
    root.style.setProperty("--b", base + "ms");
    root.querySelectorAll(".wbars .wt, .heat .hc").forEach((el, i) => el.style.setProperty("--i", i));
    root.querySelectorAll(".bar > i").forEach((el, i) => el.style.setProperty("--i", i));
    root.classList.add("anim");
    if (root.matches(COUNT_SEL)) countUp(root, base);
    root.querySelectorAll(COUNT_SEL).forEach((el) => countUp(el, base));
  }
  // placeholder shaped like what is loading: list rows get avatar + two lines, cards get icon + title + lines
  function skelFor(el) {
    if (el.classList.contains("row")) return `<div class="skel sk-row"><i class="sk-av"></i><div class="sk-col"><i class="sk-l" style="width:55%"></i><i class="sk-l" style="width:82%"></i></div></div>`;
    if (el.classList.contains("card") || el.classList.contains("st")) {
      const lines = Math.max(1, Math.min(6, Math.floor((el.offsetHeight - 90) / 26)));
      return `<div class="skel"><div class="sk-h"><i class="sk-c"></i><i class="sk-l" style="width:42%;height:13px"></i></div>${Array.from({ length: lines }, (_, i) => `<i class="sk-l" style="width:${[100, 88, 64, 94, 76, 58][i]}%"></i>`).join("")}</div>`;
    }
    return `<div class="skel sk-line"><i class="sk-l" style="width:46%;height:13px"></i></div>`;
  }
  function setupMotion(view) {
    if (io) io.disconnect();
    const sc = view.querySelector(".scroller");
    if (!sc || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(sc.querySelectorAll(ITEM_SEL)).filter((el) => !el.parentElement.closest(ITEM_SEL));
    const top0 = sc.getBoundingClientRect().top, fold = sc.clientHeight - 30;
    const reveal = (el) => {
      if (el.dataset.lzq) return; el.dataset.lzq = "1"; io.unobserve(el);
      setTimeout(() => { const sk = el.querySelector(":scope > .skel"); if (sk) sk.remove(); el.classList.remove("lz"); el.style.setProperty("--d", "0ms"); el.classList.add("rv"); animateStats(el, 120); }, 420 + Math.random() * 300);
    };
    io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) reveal(en.target); }), { root: sc, threshold: 0.12 });
    // a fast flick can jump past items without them ever intersecting; load anything already scrolled past
    sc.addEventListener("scroll", () => { const b = sc.getBoundingClientRect().bottom; sc.querySelectorAll(".lz:not([data-lzq])").forEach((el) => { if (el.getBoundingClientRect().top < b) reveal(el); }); }, { passive: true });
    let k = 0;
    items.forEach((el) => {
      if (el.getBoundingClientRect().top - top0 < fold) {
        const d = Math.min(k++, 10) * 55;
        el.style.setProperty("--d", d + "ms"); el.classList.add("rv"); animateStats(el, d + 160);
      } else { el.classList.add("lz"); el.insertAdjacentHTML("beforeend", skelFor(el)); io.observe(el); }
    });
  }
  function after() {
    const m = $("#msgs"); if (m) m.scrollTop = m.scrollHeight;
    const q = $("#convQ"); if (q) q.addEventListener("input", (e) => { S.q = e.target.value; $("#convList").innerHTML = convList(); });
    const cq = $("#contQ"); if (cq) cq.addEventListener("input", (e) => { S.cq = e.target.value; $("#contList").innerHTML = contactRows(); });
    ["fTag", "fLang", "fNum"].forEach((id) => { const s = $("#" + id); if (s) s.addEventListener("change", (e) => { S[id] = e.target.value; render(); }); });
    const d = $("#draft"); if (d) { d.addEventListener("input", () => { d.style.height = "auto"; d.style.height = Math.min(d.scrollHeight, 110) + "px"; }); d.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ACT.send(); } }); }
    const t = $("#aiTemp"); if (t) t.addEventListener("input", (e) => { $("#tempV").textContent = e.target.value; });
    document.querySelectorAll("[data-num]").forEach((cb) => cb.addEventListener("change", (e) => {
      const id = e.target.dataset.num, on = e.target.checked, b = $("#nst-" + id);
      DATA.numbers[id].active = on;
      if (b) { b.className = "badge dot " + (on ? "b-green" : "b-gray"); b.textContent = on ? T("numActive") : T("numDisabled"); }
      toast("toastSaved");
    }));
    document.querySelectorAll("[data-day]").forEach((cb) => cb.addEventListener("change", (e) => e.target.closest(".hday").classList.toggle("off", !e.target.checked)));
    const fi = $("#fileIn"); if (fi) fi.addEventListener("change", (e) => {
      const f = e.target.files[0]; if (!f) return;
      S.attach = f.name; const r = $("#attachRow"); r.hidden = false;
      r.innerHTML = `<span class="attach-chip surf">${ic("file")}<span>${esc(f.name)}</span><button type="button" data-act="dropAttach" aria-label="${T("delete")}">${ic("x")}</button></span>`;
      toast("toastFile");
    });
    // tab bar + floating button slide away while scrolling down and come back on any scroll up
    const sc = $("#view .scroller"), app = $("#app");
    if (sc) { let last = sc.scrollTop; sc.addEventListener("scroll", () => { const y = sc.scrollTop, d = y - last; if (Math.abs(d) < 8) return; app.classList.toggle("hide-chrome", d > 0 && y > 60); last = y; }, { passive: true }); }
    const nm = $("#ntMaster"); if (nm) { const apply = () => { const rest = $(".nt-rest"); rest.classList.toggle("is-off", !S.ntOn); rest.querySelectorAll("input").forEach((i) => { i.disabled = !S.ntOn; }); };
      apply(); nm.addEventListener("change", (e) => { S.ntOn = e.target.checked; apply(); toast("toastSaved"); }); }
    const dnd = $("#dndSw"); if (dnd) dnd.addEventListener("change", (e) => { const t = $("#dndTimes"); t.style.opacity = e.target.checked ? "1" : ".45"; t.style.pointerEvents = e.target.checked ? "" : "none"; });
    bindForgot();
    const ph = $("#photoIn"); if (ph) ph.addEventListener("change", (e) => {
      const f = e.target.files[0]; if (!f) return;
      const rd = new FileReader(); rd.onload = () => { S.photo = rd.result; render(); toast("toastSaved"); }; rd.readAsDataURL(f);
    });
    const lf = $("#loginForm"); if (lf) lf.addEventListener("submit", (e) => { e.preventDefault(); if (!validate("login")) return; go("overview"); toast("toastWelcome"); });
  }
  function go(screen, opts) {
    closeSheet(true); ccClose(true);
    if (TABS.includes(screen)) S.tab = screen;
    if (SUBS.includes(screen) || screen === "chat") S.from = S.screen === "chat" || SUBS.includes(S.screen) ? S.from : S.screen;
    S.screen = screen;
    render(true);
  }

  function openSheet(spec) {
    const [type, arg] = String(spec).split(":");
    S.sheet = type; S.sheetArg = arg || null;
    const host = $("#sheetHost");
    host.innerHTML = `<div class="scrim" data-act="closeSheet"></div><div class="sheet surf-2" role="dialog" aria-modal="true"><div class="grab"></div>${SH[type](arg)}</div>`;
    decorate(host.querySelector(".sheet"));
    void host.offsetHeight; // commit the closed position so the slide-up transition runs
    host.querySelectorAll(".scrim,.sheet").forEach((e) => e.classList.add("show"));
  }
  function refreshSheet() { const sh = $("#sheetHost .sheet"); if (sh && S.sheet) { sh.innerHTML = `<div class="grab"></div>${SH[S.sheet](S.sheetArg)}`; decorate(sh); } }
  function closeSheet(now) {
    const host = $("#sheetHost"); if (!host || !host.innerHTML) return;
    S.sheet = null;
    if (now) { host.innerHTML = ""; return; }
    host.querySelectorAll(".scrim,.sheet").forEach((e) => e.classList.remove("show"));
    setTimeout(() => { if (!S.sheet) host.innerHTML = ""; }, 380);
  }
  /* ---------- form validation ----------
     One rule set per form, keyed by field id. req = required (marked *), anything else is marked optional.
     Rules follow what each dashboard record needs; the dashboard itself only requires tag/segment names. */
  const VARS = ["{{اسم_العميل}}", "{{رقم_الطلب}}", "{{customer_name}}", "{{order_no}}"];
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const V = { // mirrors the Laravel FormRequests (app/Http/Requests); "report" is app-only
    login: { lgMail: { req: 1, type: "email" }, lgPass: { req: 1 } },
    fp1: { fpId: { req: 1, type: "email" } },
    fp3: { fpP1: { req: 1, marker: 1 }, fpP2: { req: 1, marker: 1 } },
    contact: { fcN: { req: 1, max: 255 }, fcP: { req: 1, unique: "contact" }, fcT: { req: 1 }, fcL: { req: 1 }, fcNum: {} },
    reply: { frT: { req: 1, max: 255 }, frC: { req: 1 }, frL: { req: 1 }, frB: { req: 1, max: 5000 } },
    camp: { fmN: { req: 1, max: 255 }, fmA: { req: 1 }, fmNum: { req: 1 }, fmM: { max: 5000, reqWithout: "fmFile" }, fmFile: { file: 1 } },
    member: { fuN: { req: 1, max: 255 }, fuE: { req: 1, type: "email", max: 255, unique: "member" }, fuP: { req: 1, unique: "memberPhone" }, fuW: { reqNew: 1, min: 8 }, fuW2: { reqNew: 1, confirmOf: "fuW" } },
    meta: { mtLb: { max: 40 }, mtPh: { req: 1 }, mtPid: { req: 1, max: 100 }, mtW: { req: 1 }, mtT: { reqNew: 1 }, mtV: { req: 1 }, mtVer: { req: 1 } },
    tag: { ftN: { req: 1, max: 255 } },
    seg: { sgAr: { req: 1, max: 255 }, sgEn: { req: 1, max: 255 } },
    rcat: { rcAr: { req: 1, max: 255 }, rcEn: { req: 1, max: 255 } },
    newConv: { ncPh: { oneOf: 1 }, ncFrom: { req: 1 } },
    transfer: { trNote: { max: 1000 } },
    cust: { cuTag: {}, cuSeg: {}, cuNote: { max: 5000 } },
    profile: { pName: { req: 1, max: 255 }, pMail: { req: 1, type: "email", max: 255 }, pPh: { req: 1 } },
    security: { pCur: { req: 1 }, pNew: { req: 1, min: 8, notSame: "pCur" }, pCon: { req: 1, match: "pNew" } },
    ai: { aiKey: { max: 255 }, aiModel: { req: 1 }, aiTok: { req: 1, int: [1, 128000] }, aiDef: { req: 1 }, aiDia: { req: 1 }, aiPrompt: { cardLabel: 1 }, aiAgent: {}, aiForbid: { cardLabel: 1 }, acHours: { req: 1, int: [1, 168] } },
  };
  const FIELD = {};
  Object.entries(V).forEach(([form, f]) => Object.entries(f).forEach(([id, rule]) => { FIELD[id] = { form, rule }; }));
  const tpl = (k, o) => Object.entries(o).reduce((s, [a, b]) => s.split("{" + a + "}").join(b), T(k));
  const UNIQUE = {
    contact: (s, tv, ctx) => { const full = tv.c.dial + tv.digits, k = DATA.contacts.find((x) => x.id !== ctx.editId && x.ph.replace(/[^\d+]/g, "") === full); return k ? tpl("vDupPhone", { n: cName(k) }) : null; },
    member: (s, tv, ctx) => DATA.team.some((m) => m.id !== ctx.editId && m.email.toLowerCase() === s.toLowerCase()) ? T("vDupEmail") : null,
    ctag: (s, tv, ctx) => DATA.convTags.some((t) => t.id !== ctx.editId && (t.ar === s || t.en === s)) ? T("vDupName") : null,
    memberPhone: (s, tv, ctx) => { const full = tv.c.dial + tv.digits; return DATA.team.some((m) => m.id !== ctx.editId && m.phone.replace(/[^\d+]/g, "") === full) ? T("vDupPhoneMember") : null; },
  };
  function check(id, r, ctx) {
    const el = $("#" + id); if (!el) return null;
    const isTel = el.classList.contains("tel-num"), tv = isTel ? telVal(id) : null, s = isTel ? tv.digits : el.value.trim();
    if (el.type === "file") {
      const f = el.files && el.files[0]; if (!f) return null;
      if (f.size > 16 * 1024 * 1024) return T("vFileBig");
      return /\.(jpe?g|png|gif|webp|pdf|docx?|xlsx?|pptx?|txt|mp4|mp3|ogg)$/i.test(f.name) ? null : T("vFileType");
    }
    if (r.confirmOf) { const src = $("#" + r.confirmOf).value; if (!src && !s) return null; if (!s) return T("vReq"); return s === src ? null : T("fpMismatch"); }
    if (!s) {
      if (r.reqWithout) { const o = $("#" + r.reqWithout); return o && o.files && o.files.length ? null : T("vReqMsgOrFile"); }
      return r.req || (r.reqNew && ctx.isNew) ? T("vReq") : r.oneOf && !ctx.picked ? T("vOneOf") : null;
    }
    if (isTel && s.length !== tv.c.len) return tpl("fpErrPhone", { c: L(tv.c), n: tv.c.len });
    if (r.type === "email" && !isTel && !EMAIL.test(s)) return T("vEmail");
    if (r.digits && !(/^\d+$/.test(s) && s.length >= r.digits[0] && s.length <= r.digits[1])) return tpl("vDigits", { a: r.digits[0], b: r.digits[1] });
    if (r.int) { const n = Number(s); if (!Number.isInteger(n) || n < r.int[0] || n > r.int[1]) return tpl("vInt", { a: r.int[0], b: r.int[1] }); }
    if (r.prefix && !s.startsWith(r.prefix)) return tpl("vPrefix", { p: r.prefix });
    if (r.nospace && /\s/.test(s)) return T("vNoSpace");
    if (r.min && s.length < r.min) return tpl("vMin", { n: r.min });
    if (r.max && s.length > r.max) return tpl("vMax", { n: r.max });
    if (r.match && s !== $("#" + r.match).value.trim()) return T("fpMismatch");
    if (r.notSame && s === $("#" + r.notSame).value.trim()) return T("vSame");
    if (r.vars) { const bad = (s.match(/\{\{[^}]*\}\}/g) || []).find((x) => !VARS.includes(x)); if (bad) return tpl("vVars", { v: bad }); }
    if (r.unique) { const d = UNIQUE[r.unique](s, tv, ctx); if (d) return d; }
    if (r.activeNum && DATA.numbers[s] && DATA.numbers[s].active === false) return T("vNumOff");
    return null;
  }
  function setErr(id, msg) {
    const el = $("#" + id); if (!el) return;
    const wrap = el.closest(".tel") || el.closest(".inrow") || el.closest(".ifield") || el.closest(".filebox") || el, err = $("#" + id + "-err");
    wrap.classList.toggle("invalid", !!msg); el.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) { err.innerHTML = msg ? `${ic("info")}<span>${esc(msg)}</span>` : ""; err.hidden = !msg; }
  }
  S.vctx = {};
  function validate(form, ctx, only) {
    ctx = ctx || {}; S.vctx[form] = ctx;
    let first = null;
    Object.entries(V[form]).forEach(([id, r]) => {
      if (only && !only.includes(id)) return;
      const el = $("#" + id); if (!el) return;
      el.dataset.vt = "1"; const msg = check(id, r, ctx); setErr(id, msg);
      if (msg && !first) first = el;
    });
    if (form === "ai" && !only) document.querySelectorAll(".hday:not(.off)").forEach((d) => {
      const [a, b] = d.querySelectorAll('input[type="time"]'), bad = a.value >= b.value;
      [a, b].forEach((i) => i.classList.toggle("invalid", bad));
      let e = d.querySelector(".ferr"); if (!e) { d.insertAdjacentHTML("beforeend", `<span class="ferr" hidden></span>`); e = d.querySelector(".ferr"); }
      e.innerHTML = bad ? `${ic("info")}<span>${T("vHours")}</span>` : ""; e.hidden = !bad;
      if (bad && !first) first = a;
    });
    if (first) { first.scrollIntoView({ block: "center", behavior: "smooth" }); setTimeout(() => first.focus({ preventScroll: true }), 250); toast("vFix", "err"); }
    return !first;
  }
  // marks every known field in `root`: * or "optional" on its label, an error slot, and a counter for long texts
  function decorate(root) {
    if (!root) return;
    Object.entries(FIELD).forEach(([id, { form, rule }]) => {
      const el = root.querySelector("#" + id); if (!el || el.dataset.vf) return;
      el.dataset.vf = form;
      const req = rule.req || rule.reqNew;
      let label = root.querySelector(`label[for="${id}"]`);
      if (!label && rule.cardLabel) label = el.closest(".card") && el.closest(".card").querySelector(".card-t h4");
      if (label && !label.querySelector(".req,.opt-tag") && !rule.oneOf) {
        const mark = req ? `<span class="req" aria-hidden="true">*</span>` : `<span class="opt-tag">${T("optional")}</span>`;
        const txt = Array.from(label.childNodes).find((n) => n.nodeType === 3 && n.textContent.trim());
        if (txt) txt.after(document.createRange().createContextualFragment(mark)); else label.insertAdjacentHTML("beforeend", mark);
      }
      if (req) el.setAttribute("aria-required", "true");
      const wrap = el.closest(".tel") || el.closest(".inrow") || el.closest(".ifield") || el.closest(".filebox") || el;
      const counter = rule.max >= 1000 ? `<span class="cnt num" data-cnt="${id}">${el.value.length}/${rule.max}</span>` : "";
      wrap.insertAdjacentHTML("afterend", `<div class="fmeta"><span class="ferr" id="${id}-err" role="alert" hidden></span>${counter}</div>`);
      el.setAttribute("aria-describedby", id + "-err");
    });
  }
  // after a first attempt, errors update as the person types
  const revalidate = (e) => {
    const el = e.target, f = el.dataset && el.dataset.vf;
    if (f) { const c = $("#" + el.id + "-err") && el.closest("form,.sheet,.screen"); const cnt = document.querySelector(`[data-cnt="${el.id}"]`); if (cnt) { cnt.textContent = `${el.value.length}/${FIELD[el.id].rule.max}`; cnt.classList.toggle("over", el.value.length > FIELD[el.id].rule.max); } if (c && el.dataset.vt) setErr(el.id, check(el.id, FIELD[el.id].rule, S.vctx[f] || {})); }
    Object.entries(FIELD).forEach(([id, { rule, form }]) => { if (rule.match === el.id) { const m = $("#" + id); if (m && m.dataset.vt) setErr(id, check(id, rule, S.vctx[form] || {})); } });
  };
  document.addEventListener("input", revalidate);
  document.addEventListener("change", revalidate);
  document.addEventListener("change", (e) => { // working-hours rows clear their error once fixed
    const d = e.target.closest && e.target.closest(".hday"); if (!d || !d.querySelector(".ferr:not([hidden])")) return;
    const [a, b] = d.querySelectorAll('input[type="time"]'), bad = a.value >= b.value;
    [a, b].forEach((i) => i.classList.toggle("invalid", bad)); d.querySelector(".ferr").hidden = !bad;
  });

  let toastT;
  // the picker panel is moved onto the sheet as an overlay page, then back into its field when closed
  function ddOpen(dd, open) {
    if (!dd) return; const btn = dd.querySelector(".dd-btn"), p = dd._panel || dd.querySelector(".dd-panel"), sheet = dd.closest(".sheet");
    dd._panel = p; p._dd = dd; btn.setAttribute("aria-expanded", String(open)); dd.classList.toggle("open", open);
    if (open) {
      if (!p.querySelector(".pk-h")) { const lbl = dd.closest(".fld").querySelector("label"), t = lbl ? [...lbl.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim() : "";
        p.insertAdjacentHTML("afterbegin", `<div class="pk-h"><button type="button" class="ibtn sm surf" data-act="ddClose" aria-label="back">${ic("back")}</button><h3>${esc(t)}</h3></div>`); }
      sheet.appendChild(p); p.classList.add("pk-page"); p.hidden = false; sheet.classList.add("picking");
      void p.offsetWidth; p.classList.add("in");
      const i = p.querySelector("input"); i.value = ""; filterDD(p, ""); setTimeout(() => i.focus({ preventScroll: true }), 320);
    } else {
      p.classList.remove("in"); sheet && sheet.classList.remove("picking");
      setTimeout(() => { if (p.classList.contains("in")) return; p.hidden = true; p.classList.remove("pk-page"); if (dd.isConnected) dd.appendChild(p); }, 300);
    }
  }
  function filterQR() {
    const s = ($("#qrQ") || {}).value ? $("#qrQ").value.trim().toLowerCase() : "", cat = ($(".qr-top .chip.on") || { dataset: { arg: "all" } }).dataset.arg;
    let n = 0; document.querySelectorAll("#sheetHost .qr[data-cat]").forEach((b) => { const hit = (cat === "all" || b.dataset.cat === cat) && (!s || b.dataset.q.includes(s)); b.hidden = !hit; if (hit) n++; });
    const e = $("#qrEmpty"); if (e) e.hidden = !!n;
  }
  function fileBoxSync(inp) {
    const box = inp.closest(".filebox"); if (!box) return; const f = inp.files && inp.files[0];
    box.querySelector(".fb-drop").hidden = !!f; box.querySelector(".fb-file").hidden = !f;
    if (f) { box.querySelector(".fb-n").textContent = f.name; box.querySelector(".fb-s").textContent = f.size >= 1048576 ? (f.size / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(f.size / 1024)) + " KB"; }
  }
  document.addEventListener("change", (e) => { if (e.target.classList && e.target.classList.contains("file-hidden")) fileBoxSync(e.target); });
  function filterDD(panel, s) {
    let n = 0; panel.querySelectorAll(".opt[data-q]").forEach((o) => { const hit = !s || o.dataset.q.includes(s); o.hidden = !hit; if (hit) n++; });
    panel.querySelector(".dd-empty").hidden = !!n;
  }
  document.addEventListener("input", (e) => { if (e.target.id === "qrQ") filterQR(); if (e.target.id === "ddQ") filterDD(e.target.closest(".dd-panel"), e.target.value.trim().toLowerCase().replace(/s/g, "")); });
  function toast(key, kind) {
    const t = $("#toast");
    t.classList.toggle("err", kind === "err");
    t.innerHTML = `${ic(kind === "err" ? "info" : "check")}<span>${T(key)}</span>`;
    t.classList.add("show"); clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------- theme / language ---------- */
  function setTheme(th) {
    store.set("sa-theme", th);
    if (th === "auto") delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = th;
    render();
  }
  function setLang(l) {
    LANG = l; store.set("sa-lang", l);
    document.documentElement.lang = l; document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    render();
  }

  /* ---------- actions ---------- */
  const ACT = {
    go: (a) => { S.prev = S.screen; S.segDraft = S.tagDraft = null; go(a); }, tab: (a) => go(a),
    openNotif: (id) => {
      const n = NOTIFS.find((x) => x.id === id); n.unread = false;
      if (n.go[0] === "chat") return ACT.openChat(n.go[1]);
      S.prev = "notifications"; go(n.go[0]);
    },
    ntReadAll: () => { NOTIFS.forEach((n) => { n.unread = false; }); render(); toast("ntAllRead"); },
    back: () => go((S.screen === "segments" || S.screen === "set-cats") && S.prev === "contacts" ? "contacts" : ["segments", "set-tags", "reply-cats"].includes(S.screen) ? "set-cats" : S.screen === "notifications" ? S.tab : S.prev === "notifications" && S.screen !== "notifications" && !TABS.includes(S.screen) ? (S.prev = null, "notifications") : S.screen === "chat" ? "conversations" : S.screen.startsWith("set-") ? "account" : SUBS.includes(S.screen) ? "more" : S.tab),
    copyText: (v) => { const done = () => toast("copied"); try { navigator.clipboard.writeText(v).then(done, done); } catch (e) { done(); } },
    openChat: (id) => { S.chat = id; const c = getConv(id); if (c) c.unread = 0; go("chat"); },
    chatWith: (id) => { const k = DATA.contacts.find((x) => x.id === id); const c = DATA.conversations.find((x) => x.phone === k.ph); if (c) ACT.openChat(c.id); else { closeSheet(); toast("toastSent"); } },
    filter: (f) => { S.filter = f; render(); },
    sheet: (spec) => openSheet(spec), closeSheet: () => closeSheet(),
    toggleTheme: () => setTheme(isDark() ? "light" : "dark"),
    toggleLang: () => setLang(LANG === "ar" ? "en" : "ar"),
    setTheme: (t) => setTheme(t), setLang: (l) => setLang(l),
    accent: (c) => { document.documentElement.style.setProperty("--accent", c); toast("toastSaved"); },
    seg: (a, el) => { el.parentElement.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === el)); },
    pickOpt: (a, el) => { el.parentElement.querySelectorAll(".opt").forEach((b) => b.classList.toggle("on", b === el)); },
    toast: (k, el, e) => { if (e) e.preventDefault(); toast(k); },
    aiToggle: () => { const c = getConv(S.chat); c.aiOn = !c.aiOn; c.mode = c.aiOn ? "ai" : "human"; render(); },
    send: () => {
      const d = $("#draft"); if (!d) return; const v = d.value.trim(); if (!v && !S.attach) return;
      const c = getConv(S.chat), t = nowLabel();
      const msg = { t: "out", x: v || "📎", xe: v || "📎", tm: t, tme: t, human: true, at: Date.now() };
      if (S.attach) { msg.file = S.attach; ACT.dropAttach(); }
      c.msgs.push(msg); c.time = c.timeEn = t;
      $("#msgs").innerHTML = msgsHtml(c); $("#msgs").scrollTop = 1e6; d.value = ""; d.style.height = "auto";
      if (c.aiOn) simReply(c);
    },
    attach: () => { const fi = $("#fileIn"); if (fi) fi.click(); },
    dropAttach: () => { S.attach = null; const r = $("#attachRow"); if (r) { r.hidden = true; r.innerHTML = ""; } const fi = $("#fileIn"); if (fi) fi.value = ""; },
    custSave: () => {
      if (!validate("cust")) return;
      const c = getConv(S.chat);
      c.convTag = $("#cuTag").value || null; c.tag = $("#cuSeg").value; c.note = $("#cuNote").value;
      closeSheet(true); render(); toast("toastSaved");
    },
    openTag: () => { S.tagDraft = { tag: $("#cuSeg").value, note: $("#cuNote").value }; openSheet("tagForm"); },
    openSeg: () => { S.segDraft = { convTag: $("#cuTag").value || null, note: $("#cuNote").value }; openSheet("segForm"); },
    // segment form serves the segments page and the customer sheet ("إضافة تصنيف"), which it returns to
    saveSeg: (id) => {
      if (!validate("seg", { editId: id })) return;
      const v = { ar: $("#sgAr").value.trim(), en: $("#sgEn").value.trim(), color: $("#sgC .on") ? $("#sgC .on").dataset.arg : "gold" };
      const t = id && DATA.tags.find((x) => x.id === id);
      if (t) Object.assign(t, v); else { id = "t" + Date.now(); DATA.tags.push(Object.assign({ id }, v)); }
      if (S.segDraft && S.sheet === "segForm" && S.screen === "chat") { S.custDraft = Object.assign({}, S.segDraft, { tag: id }); S.segDraft = null; openSheet("cust"); toast("toastClassAdded"); return; }
      closeSheet(true); render(); toast("toastSaved");
    },
    saveCat: (id) => {
      if (!validate("rcat", { editId: id })) return;
      const v = { ar: $("#rcAr").value.trim(), en: $("#rcEn").value.trim() }, c = id && DATA.replyCats.find((x) => x.id === id);
      if (c) Object.assign(c, v); else DATA.replyCats.push(Object.assign({ id: "rc" + Date.now() }, v));
      closeSheet(true); render(); toast("toastSaved");
    },
    langTab: (a, el) => {
      const [kind, l] = a.split(":"); el.parentElement.querySelectorAll(".chip").forEach((b) => { b.classList.toggle("on", b === el); b.classList.toggle("surf", b !== el); });
      document.querySelectorAll(`[id^="${kind}Msg-"]`).forEach((t) => { t.hidden = t.id !== kind + "Msg-" + l; });
    },
    msgEditSave: (i) => { const v = $("#meT").value.trim(); if (!v) return setErr("meT", T("vReq")); if (v.length > 5000) return setErr("meT", tpl("vMax", { n: 5000 })); const c = getConv(S.chat), m = c.msgs[+i]; m.x = m.xe = v; m.edited = true; closeSheet(true); $("#msgs").innerHTML = msgsHtml(c); toast("toastSaved"); },
    msgDelDo: (i) => { const c = getConv(S.chat); c.msgs[+i].deleted = true; closeSheet(true); $("#msgs").innerHTML = msgsHtml(c); toast("toastDeleted"); },
    sendCampDo: (id) => { const cp = DATA.campaigns.find((x) => x.id === id); cp.st = "sending"; closeSheet(true); render(); toast("toastCampSending"); },
    catTab: (t) => { S.catTab = t; render(); },
    fbClear: (a, el) => { const inp = el.closest(".filebox").querySelector("input[type=file]"); inp.value = ""; fileBoxSync(inp); inp.dispatchEvent(new Event("input", { bubbles: true })); },
    qrSheetCat: (c, el) => { el.parentElement.querySelectorAll(".chip").forEach((b) => { b.classList.toggle("on", b === el); b.classList.toggle("surf", b !== el); }); filterQR(); },
    qrCat: (c, el) => { S.qrCat = c; render(); const on = $(".qr-cats .chip.on"); if (on) on.scrollIntoView({ inline: "nearest", block: "nearest" }); },
    pickRange: (k) => { S.range = k; if (k === "repPeriodCustom") openSheet("range"); else { closeSheet(true); render(); } },
    // voice note: simulated recording (the dashboard records with MediaRecorder and uploads an .ogg)
    voice: () => {
      const r = $(".composer .rec"); if (!r) return; r.hidden = false; $(".composer").classList.add("recording");
      const t0 = Date.now(); clearInterval(S.recTimer);
      S.recTimer = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000), el = $("#recT"); if (!el) return clearInterval(S.recTimer); el.textContent = Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }, 250);
    },
    voiceCancel: () => { clearInterval(S.recTimer); const r = $(".composer .rec"); if (r) { r.hidden = true; $(".composer").classList.remove("recording"); $("#recT").textContent = "0:00"; } },
    voiceSend: () => {
      const len = $("#recT").textContent === "0:00" ? "0:03" : $("#recT").textContent; ACT.voiceCancel();
      const c = getConv(S.chat), t = nowLabel();
      c.msgs.push({ t: "out", x: "🎤 " + T("voiceNote"), xe: "🎤 Voice message", tm: t, tme: t, human: true, voice: len, at: Date.now() });
      c.time = c.timeEn = t; $("#msgs").innerHTML = msgsHtml(c); $("#msgs").scrollTop = 1e6; toast("voiceRecorded");
    },
    eye: (id, el) => { const i = $("#" + id), show = i.type === "password"; i.type = show ? "text" : "password"; el.innerHTML = ic(show ? "eyeOff" : "eye"); },
    copyDemo: (k) => { const v = DEMO[k]; const done = () => toast("copied"); try { navigator.clipboard.writeText(v).then(done, done); } catch (e) { done(); } },
    fillDemo: () => {
      const fill = () => { $("#lgMail").value = DEMO.email; $("#lgPass").value = DEMO.pass; ["lgMail", "lgPass"].forEach((id) => $("#" + id).dispatchEvent(new Event("input", { bubbles: true }))); };
      if (S.screen === "login") fill(); else { go("login"); setTimeout(fill, 350); }
    },
    copy: (id) => {
      const i = $("#" + id);
      const done = () => toast("copied");
      try { navigator.clipboard.writeText(i.value).then(done, () => { i.select(); done(); }); } catch (e) { i.select(); done(); }
    },
    regen: () => { const a = "abcdefghjkmnpqrstuvwxyz23456789"; let s = "saba_"; for (let i = 0; i < 14; i++) s += a[Math.floor(Math.random() * a.length)]; $("#mtV").value = s; },
    qrPick: (id) => { const q = DATA.quickReplies.find((x) => x.id === id); const c = getConv(S.chat); q.used++; closeSheet(); const d = $("#draft"); if (d) { d.value = L(q.body).replace(/\{\{(اسم_العميل|customer_name)\}\}/g, convName(c)).replace(/\{\{(التاريخ|date)\}\}/g, new Date().toLocaleDateString(LANG === "ar" ? "ar-OM" : "en-GB")); d.focus(); d.dispatchEvent(new Event("input")); } },
    emoji: (e) => { const d = $("#draft"); if (d) { d.value += e; } closeSheet(); },
    transferDo: () => { if (!validate("transfer")) return; const c = getConv(S.chat); if (c) { c.aiOn = false; c.mode = "human"; } closeSheet(true); render(); toast("toastTransfer"); },
    closeChatDo: () => { const c = getConv(S.chat); c.closed = true; c.aiOn = false; closeSheet(true); render(); toast("toastChatClosed"); },
    reopen: () => { const c = getConv(S.chat); c.closed = false; render(); toast("toastChatReopened"); },
    callDo: () => { closeSheet(); toast("toastCallStarted"); },
    fltSet: (a) => {
      if (a === "reset") { S.fTag = S.fLang = "all"; } else { const [k, v] = a.split(":"); S[k] = v; }
      render(); if (S.sheet === "contFilter") refreshSheet();
    },
    fltManage: () => { closeSheet(true); S.catTab = "seg"; S.prev = "contacts"; go("set-cats"); },
    pickNum: (n) => { S.num = n; closeSheet(); render(); },
    ncPick: (id) => { S.sheetArg = id; refreshSheet(); },
    ddPick: (v, el) => {
      const p = el.closest(".dd-panel"), dd = p._dd || el.closest(".dd"), btn = dd.querySelector(".dd-btn");
      p.querySelectorAll(".dd-list .opt").forEach((o) => o.classList.toggle("on", o === el));
      btn.querySelector(".dd-cur").innerHTML = el.innerHTML; btn.dataset.value = v;
      ddOpen(dd, false);
    },
    ddToggle: (a, el) => ddOpen(el.closest(".dd"), true),
    ddClose: (a, el) => { const p = el.closest(".dd-panel"); ddOpen((p && p._dd) || el.closest(".dd"), false); },
    ncStart: () => {
      const typed = $("#ncPh") && telVal("ncPh").digits;
      if (!validate("newConv", { picked: S.sheetArg && !typed })) return;
      const k = !typed && S.sheetArg && DATA.contacts.find((x) => x.id === S.sheetArg);
      const ex = k && DATA.conversations.find((c) => c.phone === k.ph);
      if (ex) return ACT.openChat(ex.id);
      const ph = ($("#ncPh") && telVal("ncPh").full) || "+968 9000 0000", id = "nc" + Date.now(), t = nowLabel();
      DATA.conversations.unshift({ id, name: k ? k.n : "عميل جديد", nameEn: k ? k.ne : "New customer", phone: k ? k.ph : ph, num: ($("#ncFrom") || {}).value || "main", lang: k ? k.lang : "ar", mode: "ai", aiOn: true, unread: 0, time: t, timeEn: t, tag: "new", convTag: "inquiry", topic: { ar: "محادثة جديدة", en: "New chat" }, first: { ar: "الآن", en: "Now" }, count: 1, msgs: [], history: [] });
      ACT.openChat(id);
    },
    saveContact: (id) => { if (!validate("contact", { editId: id })) return; const n = $("#fcN").value.trim(), ph = telVal("fcP").full, tag = $("#fcT").value, lang = $("#fcL").value; const k = id && DATA.contacts.find((x) => x.id === id); if (k) Object.assign(k, { n, ne: n, ph, tag, lang }); else DATA.contacts.unshift({ id: "k" + Date.now(), n, ne: n, ph, tag, lang, conv: 0, last: { ar: "الآن", en: "Now" }, num: "main" }); closeSheet(true); render(); toast("toastContactAdded"); },
    saveReply: (id) => { if (!validate("reply")) return; const ti = $("#frT").value.trim(), b = $("#frB").value.trim(), cat = $("#frC").value, lang = $("#frL").value; const q = id && DATA.quickReplies.find((x) => x.id === id); if (q) Object.assign(q, { title: { ar: ti, en: ti }, body: { ar: b, en: b }, cat, lang }); else DATA.quickReplies.unshift({ id: "q" + Date.now(), cat, lang, title: { ar: ti, en: ti }, body: { ar: b, en: b }, used: 0 }); closeSheet(true); render(); toast("toastReplyAdded"); },
    dupReply: (id) => { const o = DATA.quickReplies.find((x) => x.id === id); DATA.quickReplies.unshift(Object.assign({}, o, { id: "q" + Date.now(), used: 0 })); closeSheet(true); render(); toast("toastReplyAdded"); },
    saveCamp: (id) => { if (!validate("camp")) return; const n = $("#fmN").value.trim(); const cp = id && DATA.campaigns.find((x) => x.id === id); if (cp) { Object.assign(cp, { n: { ar: n, en: n }, aud: $("#fmA").value, num: $("#fmNum").value }); closeSheet(true); render(); toast("toastSaved"); return; } DATA.campaigns.unshift({ id: "m" + Date.now(), n: { ar: n, en: n }, aud: $("#fmA").value, num: $("#fmNum").value, sent: 0, read: 0, reply: 0, st: "active", date: { ar: "الآن", en: "Now" } }); closeSheet(true); render(); toast("toastCampAdded"); },
    dupCamp: (id) => { const o = DATA.campaigns.find((x) => x.id === id); DATA.campaigns.unshift(Object.assign({}, o, { id: "m" + Date.now(), st: "draft", sent: 0, read: 0, reply: 0 })); closeSheet(true); render(); toast("toastCampAdded"); },
    saveMember: (arg) => {
      const [id, then] = String(arg || "").split("|");
      if (!validate("member", { editId: id, isNew: !id })) return;
      const name = $("#fuN").value.trim(), email = $("#fuE").value.trim(), phone = telVal("fuP").full;
      let m = id && DATA.team.find((x) => x.id === id);
      if (m) Object.assign(m, { name, email, phone });
      else { m = { id: "t" + Date.now(), name, email, phone, status: "active", created: { ar: "الآن", en: "Now" }, av: avColor(DATA.team.length), perms: ["overview", "conversations"] }; DATA.team.push(m); }
      closeSheet(true); render(); toast(id ? "toastMemberUpdated" : "toastMemberAdded");
      if (then === "perms") openSheet("perms:" + m.id);
    },
    toggleMember: (id) => { const m = DATA.team.find((x) => x.id === id); m.status = m.status === "active" ? "disabled" : "active"; closeSheet(true); render(); toast(m.status === "active" ? "toastMemberEnabled" : "toastMemberDisabled"); },
    permsAll: (on) => document.querySelectorAll("#permsList input:not(:disabled)").forEach((i) => { i.checked = on === "1"; }),
    permsSave: (id) => { const m = DATA.team.find((x) => x.id === id); m.perms = Array.from(document.querySelectorAll("#permsList input:checked")).map((i) => i.dataset.perm); closeSheet(true); render(); toast("toastPermsSaved"); },
    metaSave: (k) => { if (!validate("meta")) return; closeSheet(); toast(k); },
    pickColor: (c, el) => { el.parentElement.querySelectorAll("button").forEach((b) => { b.style.outline = b === el ? "2px solid var(--ink)" : "none"; b.classList.toggle("on", b === el); }); },
    saveTag: (id) => { if (!validate("tag", { editId: id })) return; const nm = $("#ftN").value.trim(); const col = ($("#ftC .on") || {}).dataset ? $("#ftC .on").dataset.arg : "gold"; const t = id && DATA.convTags.find((x) => x.id === id); if (t) Object.assign(t, { ar: nm, en: nm, color: col }); else { id = "ct" + Date.now(); DATA.convTags.push({ id, ar: nm, en: nm, color: col }); }
      if (S.tagDraft && S.screen === "chat") { S.custDraft = Object.assign({}, S.tagDraft, { convTag: id }); S.tagDraft = null; openSheet("cust"); toast("toastSaved"); return; }
      closeSheet(true); render(); toast("toastSaved"); },
    askDel: (spec) => {
      const [kind, id] = spec.split(":");
      if (kind === "seg" && DATA.contacts.some((k) => k.tag === id)) { closeSheet(true); return toast("toastContactTagInUse", "err"); }
      if (kind === "rcat" && DATA.quickReplies.some((q) => q.cat === id)) { closeSheet(true); return toast("toastCategoryInUse", "err"); }
      S.confirm = spec; openSheet("confirm");
    },
    confirmYes: () => {
      const [kind, id] = S.confirm.split(":");
      const map = { contact: "contacts", reply: "quickReplies", camp: "campaigns", member: "team", ctag: "convTags", seg: "tags", rcat: "replyCats" };
      DATA[map[kind]] = DATA[map[kind]].filter((x) => x.id !== id);
      if (kind === "ctag") DATA.conversations.forEach((c) => { if (c.convTag === id) c.convTag = null; });
      closeSheet(true); render(); toast("toastDeleted");
    },
    logout: () => go("login"),
    replay: () => playSplash(),
    pickPhoto: () => { const i = $("#photoIn"); if (i) i.click(); },
    updPass: () => {
      if (!validate("security")) return;
      ["pNew", "pCon"].forEach((id) => { $("#" + id).value = ""; delete $("#" + id).dataset.vt; });
      toast("toastPass");
    },
    profileSave: () => { if (validate("profile")) toast("toastSaved"); },
    aiSave: (only) => { if (validate("ai", {}, only ? [only] : null)) toast("toastSaved"); },
    testConn: (k, el) => {
      if (el.disabled) return;
      const html = el.innerHTML; el.disabled = true; el.innerHTML = `<span class="spin"></span>${T("testing")}`;
      setTimeout(() => { el.disabled = false; el.innerHTML = html; toast(k); }, 1300);
    },
    ccOpen: (a, el) => {
      S.ccTarget = el.closest(".tel"); el.setAttribute("aria-expanded", "true");
      const host = $("#pickHost"); host.innerHTML = ccPicker(S.ccTarget.dataset.cc);
      void host.offsetHeight; host.querySelectorAll(".scrim,.sheet").forEach((e) => e.classList.add("show"));
      const on = host.querySelector(".cc-opt.on"); if (on) on.scrollIntoView({ block: "nearest" });
    },
    ccClose: () => ccClose(),
    ccSet: (iso) => {
      const tel = S.ccTarget; if (!tel) return;
      const c = ccBy(iso), num = tel.querySelector(".tel-num");
      tel.dataset.cc = iso;
      tel.querySelector(".cc-in").innerHTML = `${flag(iso)}<span class="num">${c.dial}</span>`;
      num.placeholder = phPh(c.len); num.value = fmtPhone(num.value.replace(/\D/g, "").slice(0, c.len), c.len);
      ccClose(); setTimeout(() => num.focus({ preventScroll: true }), 200);
    },
    forgot: () => { S.fp = { step: 1, via: "email", id: "info@sabalandqa.com" }; go("forgot"); },
    fpVia: (v) => { const cur = $("#fpId"); S.fp.via = v; S.fp.id = v === "email" ? "info@sabalandqa.com" : "+968 9123 4567"; if (cur) render(); },
    fpBack: () => { clearInterval(S.fpT); if (S.fp.step > 1) fpStep(S.fp.step - 1); else go("login"); },
    fpResend: () => { fpTimer(); toast("fpResent"); },
    jump: (s) => { if (s === "forgot") return ACT.forgot(); if (s === "splash") return playSplash(); if (s === "chat" && !S.chat) S.chat = DATA.conversations[0].id; go(s); },
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-act]"); if (!a) return;
    const fn = ACT[a.dataset.act]; if (!fn) return;
    if (a.tagName === "A") e.preventDefault();
    fn(a.dataset.arg, a, e);
  });
  document.addEventListener("keydown", (e) => { if (e.key !== "Escape") return; if ($("#pickHost").innerHTML) ccClose(); else closeSheet(); });

  /* AI auto-reply simulation after the staff sends while AI is on */
  function simReply(c) {
    setTimeout(() => { if (S.screen !== "chat" || S.chat !== c.id) return; const m = $("#msgs"); m.insertAdjacentHTML("beforeend", `<div class="typing surf" id="typing"><i></i><i></i><i></i></div>`); m.scrollTop = 1e6; }, 700);
    setTimeout(() => {
      const t = nowLabel();
      c.msgs.push({ t: "in", x: "تمام، مشكورين 🙏", xe: "Great, thank you 🙏", tm: t, tme: t });
      if (S.screen === "chat" && S.chat === c.id) { $("#msgs").innerHTML = msgsHtml(c); $("#msgs").scrollTop = 1e6; }
    }, 2600);
  }

  /* ---------- splash ---------- */
  let spT = [];
  function playSplash() {
    spT.forEach(clearTimeout); spT = [];
    closeSheet(true);
    S.screen = "splash"; render();
    const host = $("#splashHost");
    host.innerHTML = `<div class="splash" id="splash">
      <div class="amb"><i></i><i></i><i></i></div>
      <svg class="sp-logo" viewBox="-40 -40 1280 1610" role="img" aria-label="${T("brandName")}">
        <path class="sp-draw" d="M400 30 L800 30 Q860 30 892 82 L1146 492 Q1172 540 1146 588 L892 1006 Q860 1058 800 1058 L400 1058 Q340 1058 308 1006 L54 588 Q28 540 54 492 L308 82 Q340 30 400 30 Z"/>
        <use class="sp-ring" href="#lg-ring"/>
        <use class="sp-hand" href="#lg-hand"/>
        <use class="sp-leaf" href="#lg-leaf"/>
        <use class="sp-pillars" href="#lg-pillars"/>
        <ellipse class="sp-ripple r1" cx="615" cy="1212" rx="120" ry="30"/>
        <ellipse class="sp-ripple r2" cx="615" cy="1212" rx="120" ry="30"/>
        <use class="sp-drop" href="#lg-drop"/>
        <use class="sp-ar" href="#lg-textAr"/>
        <use class="sp-en" href="#lg-textEn"/>
      </svg>
      <p class="sp-skip sp-ver">${T("version")} <span class="num" dir="ltr">${APP_VERSION}</span></p></div>`;
    spT.push(setTimeout(endSplash, 4300));
  }
  function endSplash() {
    spT.forEach(clearTimeout); spT = [];
    const sp = $("#splash"); if (!sp) return;
    sp.classList.add("out");
    S.screen = "login"; render(true);
    spT.push(setTimeout(() => { $("#splashHost").innerHTML = ""; }, 700));
  }
  ACT.skipSplash = endSplash;

  /* ---------- control panel ---------- */
  const DEMO = { email: "info@sabalandqa.com", pass: "sabaland" }; // prototype login only — not a real account password
  function renderPanel() {
    const p = $("#panel"); if (!p) return;
    p.innerHTML = `<svg class="p-logo" viewBox="0 0 1200 1528" aria-hidden="true"><use href="#lg-mark"/><use href="#lg-textAr"/><use href="#lg-textEn"/></svg>
      <div><h1>${T("appName")}</h1><p style="margin-top:6px">${T("panelSub")}</p></div>
      <div class="p-group"><span class="p-label">${T("pTheme")} · ${T("pLang")}</span><div class="p-row">
        <button class="p-btn" data-act="toggleTheme">${ic(isDark() ? "sun" : "moon")}${isDark() ? T("light") : T("dark")}</button>
        <button class="p-btn" data-act="toggleLang">${ic("globe")}${LANG === "ar" ? "English" : "العربية"}</button>
        <button class="p-btn" data-act="replay">${ic("play")}${T("replay")}</button></div></div>
      <div class="p-group"><span class="p-label">${T("pCreds")}</span><div class="p-creds">
        <div class="pc-row"><span class="pc-k">${T("loginEmail")}</span><code dir="ltr">${DEMO.email}</code><button class="pc-copy" data-act="copyDemo" data-arg="email" aria-label="${T("copy")}">${ic("copy")}</button></div>
        <div class="pc-row"><span class="pc-k">${T("loginPass")}</span><code dir="ltr">${DEMO.pass}</code><button class="pc-copy" data-act="copyDemo" data-arg="pass" aria-label="${T("copy")}">${ic("copy")}</button></div>
        <button class="p-btn" data-act="fillDemo" style="justify-content:center">${ic("lock")}${T("pFill")}</button></div></div>
      <p style="font-size:12px;color:var(--ink-3)">${T("sample")}</p>`;
  }

  /* ---------- fit device to the window ---------- */
  function fit() {
    const d = $("#device"); if (!d) return;
    if (innerWidth <= 500) { d.style.zoom = ""; return; }
    const z = Math.min(1, (innerHeight - 40) / 866);
    d.style.zoom = z < 1 ? z.toFixed(3) : "";
  }
  addEventListener("resize", fit);

  function clock() { const d = new Date(); $("#sbTime").textContent = d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0"); }

  /* ---------- boot ---------- */
  const th0 = store.get("sa-theme");
  if (th0 === "dark" || th0 === "light") document.documentElement.dataset.theme = th0;
  document.documentElement.lang = LANG; document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => render());
  fit(); clock(); setInterval(clock, 20000);
  const start = location.hash.slice(1);
  if (start && SCR[start]) { if (start === "chat") S.chat = DATA.conversations[0].id; S.screen = start; render(true); } else playSplash();
})();
