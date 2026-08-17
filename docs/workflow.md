# Workflow — School-Management (نسخة محدّثة بناءً على الـ Scope الفعلي)

هذا الملف بديل عن مسودة الـ Workflow الأولى، بعد ما اتحدد الـ Scope الحقيقي من الفيجما وخلص الـ PRD والـ Design System.

---

## 1. الوضع الحالي (Snapshot)

- ✅ Git + GitHub جاهزين ومربوطين (`Ziad-Sw/ERP-School-Management`)
- ✅ Next.js 16 + TypeScript + Tailwind v4 مثبتين
- ✅ كل المكتبات مثبتة (TanStack Query, Zustand, RHF+Zod, MSW, Recharts, Framer Motion)
- ✅ الربط بين بيئة التطوير وFigma شغال (عبر MCP، سيرفر محلي)
- ✅ اسم المشروع في الفيجما اتغيّر بالكامل → **School-Management**
- ✅ الـ Design System (Variables) اتغيّرت في فيجما → Brand: تيل `#0D9488` / Secondary: كورال `#FF6B4A`
- ✅ كل إشارة لفيتشر "الأسورة" اتشالت (من الفيجما ومن الملفات)
- ✅ `prd.md` كامل — 8 موديولات، 38 شاشة
- ✅ `design-system.md` كامل — الألوان، الخطوط، الكومبوننتات

---

## 2. Scope النهائي

**8 موديولات (38 شاشة):**

| # | الموديول | الشاشات | التعقيد التقني الأساسي |
|---|---|---|---|
| 1 | تسجيل الدخول | 8 | Auth flow + Multi-step recovery |
| 2 | وحدة التحكم | 6 (شاشة رئيسية معقدة + 5 فرعية) | Charts (Recharts) + KPIs |
| 3 | الطلاب | 8 | CRUD كامل + Workflow منفصل (Enrollment) |
| 4 | المدرسين | 6 | فورم 3 أقسام + رفع ملفات |
| 5 | الموظفين والصلاحيات | 7 | CRUD + **RBAC Permissions Matrix** |
| 6 | الجدول الدراسي | 1 (معقدة) | Schedule Grid + Calendar + Combobox filters |
| 7 | الامتحانات والمراجعات | 1 | نفس معمارية الجدول الدراسي (Shared Component) |
| 8 | الإعدادات | 1 (تاب واحد فقط) | فورم بسيط |

**مستبعد من الـ Scope:** المالية والحسابات، المواد الدراسية، رفع النتائج، إعداد هيكل المدرسة (موثقة في التصميم، غير منفذة).

---

## 3. القرارات التقنية المحسومة

| القرار | الحل |
|---|---|
| Rate limiting بعد محاولات دخول فاشلة | ✅ Frontend-side (عداد محاولات + قفل مؤقت في الـ State) |
| حفظ جزئي (Draft) للفورمات الطويلة | ✅ Zustand persist middleware |
| تعدد اللغات (i18n) | ✅ فعلي كامل على المشروع بالكامل (عربي/إنجليزي، RTL/LTR) |
| تابات "الأداء"/"الأمان" في الإعدادات | ❌ مستبعدة تمامًا من التنفيذ |
| **استراتيجية الوصول للديمو (Demo Access)** | ✅ انظر تفصيل كامل في القسم 3.1 أدناه |

### 3.1 استراتيجية الوصول للديمو (Demo Access Strategy)

بما إن المشروع بورتفوليو بدون Backend حقيقي، ولازم أي مراجع يقدر يدخل يجرب النظام فورًا بدون عوائق (زي ما هو موثق في مبادئنا: "Portfolio access friction = رفض فوري"):

1. **MSW تشتغل في الـ Production Build كمان** — قرار معماري واعي (مش بس Development). بما إن مفيش Backend حقيقي هيجي بعدين، الموقع المنشور (Vercel) لازم يفضل شغال بالـ Mock APIs دايمًا.
2. **Demo credentials ظاهرة بوضوح فوق فورم تسجيل الدخول مباشرة** — نص واضح زي: "للتجربة: ID: `admin` / كلمة السر: `demo1234`"
3. **زرار "دخول تجريبي سريع" (Quick Demo Login)** بجانب الفورم العادي — دوسة واحدة، بيملى الحقول تلقائيًا ويسجل الدخول فورًا من غير ما المستخدم يكتب أي حاجة.

**التنفيذ التقني لزرار الدخول السريع:** زرار Outline بيستدعي نفس دالة الـ Login مباشرة بقيم الـ ID/Password الثابتة (Demo credentials)، من غير ما يمر بحقول الفورم أصلًا.

---

## 4. Tech Stack (بدون تغيير عن الاتفاق الأول)

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + TanStack Query + Zustand (+ persist) + React Hook Form + Zod + MSW + Recharts + Framer Motion + **next-intl** (إضافة جديدة بسبب قرار i18n الكامل)

---

## 5. معمارية طبقة الـ API (زي ما اتفقنا)
```
/lib/api/client.ts, /lib/api/modules/*.api.ts
/types/*.types.ts        ← مبني على "شكل البيانات المتوقع" الموجود في كل Feature بالـ PRD
/mocks/handlers.ts        ← MSW، بنفس شكل الـ Types بالظبط
/hooks/use*.ts             ← React Query hooks
/messages/ar.json, /messages/en.json   ← next-intl (جديد)
```

---

## 6. ترتيب التنفيذ المقترح (Milestones)

بناءً على التعقيد والاعتمادية المنطقية بين الموديولات:

1. **Setup أساسي إضافي:** إعداد next-intl + هيكلة `/lib`, `/types`, `/mocks` بناءً على الـ Design System
2. **Auth (تسجيل الدخول)** — أول موديول، لأن كل حاجة تانية محتاجة نظام دخول شغال
3. **Dashboard (وحدة التحكم)** — يوري القدرة على قراءة بيانات من كل الموديولات التانية (Landing page بعد تسجيل الدخول)
4. **الطلاب** — أكبر وأعقد موديول (CRUD + Enrollment) — بيرسخ الـ Pattern لباقي CRUD
5. **المدرسين** — نفس باترون الطلاب تقريبًا، تنفيذ أسرع
6. **الموظفين والصلاحيات** — بناء على نفس الباترون + شاشة الصلاحيات (RBAC) الجديدة
7. **الجدول الدراسي + الامتحانات والمراجعات معًا** — بما إنهم بيشاركوا نفس الـ Component (`ScheduleGrid`)، الأفضل تنفيذهم في نفس الـ Sprint
8. **الإعدادات** — آخر واحد، الأبسط

---

## 7. Git Workflow
- `main` (مستقر) + `feature/<module-name>` لكل موديول (مثال: `feature/auth`, `feature/students`)
- Conventional Commits: `feat(students): add student list table`
- Commit عند نهاية كل شاشة أو جزء منطقي، مش الموديول كله دفعة واحدة
- Merge لـ `main` بعد ما الموديول يخلص ويتراجع

---

## 8. دورة العمل بالـ AI (لكل موديول)
1. **مرحلة التخطيط:** مراجعة جزء الـ PRD + design-system.md الخاص بالموديول
2. **إنت بإيدك:** كتابة TS types النهائية (بناءً على "شكل البيانات المتوقع" في الـ PRD)
3. **مرحلة التخطيط:** تجهيز Prompt دقيق للتنفيذ + شرح عربي
4. **إنت بإيدك:** مراجعة الكود، ربط الـ API layer، كتابة MSW handler
5. **إنت بإيدك:** أي Business logic خاص (زي منطق الـ RBAC أو تعارض الجدول الدراسي)
6. Commit بمعنى واضح

---

## 9. الملفات المرجعية (كلها في `/docs` جوه المشروع)
- ✅ `prd.md`
- ✅ `design-system.md`
- ✅ `workflow.md` (هذا الملف)
- ⏳ `tech-instructions.md` — الخطوة الجاية
- ⏳ `progress.md` — يُنشأ عند بداية التنفيذ الفعلي

---

**الخطوة التالية:** `tech-instructions.md`
