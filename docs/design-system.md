# Design System — School-Management

مرجع تقني للألوان، الخطوط، والكومبوننتات. يُستخدم مباشرة في `tailwind.config.ts` وكـ سياق مرجعي وقت تنفيذ أي شاشة.

---

## 1. الألوان (Color Tokens)

### Brand (Primary) — تيل
| Token | Hex |
|---|---|
| brand-100 | #E6F7F5 |
| brand-200 | #B8E8E1 |
| brand-300 | #7DD3C7 |
| brand-400 | #3DBBAA |
| brand-500 (Base) | #0D9488 |
| brand-600 | #0B7A70 |
| brand-700 | #096259 |
| brand-800 | #074A43 |

### Secondary — كورال
| Token | Hex |
|---|---|
| secondary-500 | #FF6B4A |
| secondary-600 | #E0552F |

### ألوان وظيفية (لم تتغيّر عن الأصل)
| Token | Hex | الاستخدام |
|---|---|---|
| error-500 | #FF3341 | أخطاء، حالات "معطلة" |
| finance-500 | #18CC5C | أرباح، نجاح مالي |

### ألوان مميزة إضافية (Category colors)
| Token | Hex | الاستخدام |
|---|---|---|
| blue-500 | #3B82F6 | (كان لون وظيفي عام، اتغيّر) |
| blue-600 | #2563EB | |
| some-parts-students | #FF8F73 | Tag مميز لبعض بيانات الطلاب |
| student-health | #38BDF8 | لون حالة عامة (Info/Active) |
| stroke | #7DD3C7 (Light) / #096259 (Dark) | حدود العناصر (Input fields, Cards) |

### محايدة (Neutral)
| Token | الاستخدام |
|---|---|
| text-color | `#220b3d` — النص الأساسي |
| text-color-a-button | أبيض — نص على خلفيات ملونة |
| gray | `#73717a` — نص ثانوي/placeholder |
| card-background | `#f2f0f7` |
| slide-bar | `#fafafa` — خلفية Sidebar/Cards فاتحة |
| input-field-fill | `#f6f5fa` |

### Alpha/Tint (شفافيات)
| Token | القيمة |
|---|---|
| alpha-color-brand-16 | rgba(13,148,136,0.16) |
| alpha-color-brand-32 | rgba(13,148,136,0.32) |
| opiste-secondary-16 | rgba(255,107,74,0.16) |

---

## 2. الخطوط (Typography)

| النمط | العائلة | الوزن | الاستخدام |
|---|---|---|---|
| Tajawal Bold | Tajawal | 700 | عناوين، أزرار |
| Tajawal Medium | Tajawal | 500 | نصوص فرعية، labels |
| Tajawal Regular | Tajawal | 400 | نص عادي |
| Tajawal Light | Tajawal | 300 | نص ثانوي خفيف |
| Poppins Medium | Poppins | 500 | **الأرقام الإنجليزية حصريًا** (KPIs, إحصائيات) |

**قاعدة مهمة من الفيجما:** أي رقم/إحصائية معروضة بالإنجليزي بيستخدم خط **Poppins**، مش Tajawal — لازم نلتزم بيها في الكود.

**أحجام النص المستخدمة:** 12, 14, 16, 20, 24, 32, 36, 40 (px)

---

## 3. Corner Radius (زوايا العناصر)

| Token | القيمة | الاستخدام |
|---|---|---|
| sm | 8px | عناصر صغيرة (روابط Sidebar) |
| md | 16px | Inputs, Cards |
| lg | 24px | Icon backgrounds |
| lg-2 | 32px | Containers كبيرة (Search bar, Sidebar sections) |

---

## 4. Components أساسية (من الفيجما)

### Button-ERP
Variants: `Primary` (خلفية brand-500) / `Outline` (حدود brand-500 + نص brand-500)
Sizes: `Large-login-only` (56px height) / `Small` (40px height)
بيقبل: `iconLeft`, `iconRight`, `text`

### Input Field
خلفية `input-field-fill` + حدود `stroke` + Radius `md` (16px)، ارتفاع ثابت 56px

### Card (Data Card)
خلفية `card-background`، حدود `stroke`، Radius `md`، Shadow: `0px 1px 8px rgba(29,9,51,0.16)`

### Sidebar
خلفية `slide-bar`، حدود يسار `stroke`، عرض 248px، ثابت (Fixed)

---

### Sidebar (تفصيل كامل)
عرض 248px، خلفية `slide-bar`، مقسّم لقسمين:
- **"القائمة الرئيسية"**: لوحة التحكم، الطلاب، المدرسين، الموظفين، الجدول الدراسي، الامتحانات والمراجعات، المواد الدراسية، النتائج
- **"اخرى"**: المالية والحسابات، إعداد هيكل المدرسة، طلبات التقديم، الإعدادات، الخصوصية والمساعدة، تسجيل الخروج (لون `error-500`)

العنصر النشط (Active state): خلفية `alpha-color-brand-32` + نص `brand-500` + Bold + Shadow خفيف

### Checkbox (Checkmark Square)
32×32px، حالتين: Default (فاضي) / Checked (تيك بلون brand-500)

### Theme Toggle (Dark/Light Switch)
Switch بعرض 64px، دايرة بيضاء متحركة، خلفية `card-background`، أيقونة شمس/قمر

### Profile Dropdown (أعلى كل شاشة)
صورة + اسم (Poppins) + المسمى الوظيفي (Tajawal Light) + سهم Dropdown

---

## 5. مكتبة الكومبوننتات الكاملة (من ملف Design System)

### Button-ERP (الأساسي)
**Props:** `Icon Left` (bool)، `Icon Right` (bool)، `Text` (string)
**Variants:**
- `Type`: Primary / Success / Info / Outline / Danger
- `Size`: Large-login-only (56px) / Medium (48px) / Small (40px)
- `Status`: Default / Hover

30 كومبوننت (5 Type × 3 Size × 2 Status) — في الكود، ده component واحد بـ Props مش 30 عنصر منفصل.

### Input Field (تسجيل الدخول)
**Variants (Type):** default / Enable / Error / Click
نفس الباترون متوقع في باقي حقول الإدخال بالنظام (بيانات الطالب، المدرس، إلخ).

### Cards
| الكومبوننت | الوصف |
|---|---|
| كارد الموظفين | كارد ملخص بيانات موظف |
| كارد المدرسين | كارد ملخص بيانات مدرس |
| اشعار طلبات الاجتماعات | كارد إشعار خاص |
| بيانات الأوراق | كارد مستندات |
| تحديد الكاش / تحديد الفيزة | كروت اختيار طريقة دفع (خاصة بموديول المالية — خارج الـ Scope الحالي) |
| تحديد المديرين/الشؤون/HR/المحاسبين | كروت اختيار فئة موظف (خاصة بالصلاحيات على الأرجح) |

### Sidebar (Slide Bar) — كل عناصر التنقل كـ Components منفصلة
لوحة التحكم، الطلاب، المدرسين، الموظفين، الجدول الدراسي، الامتحانات والمراجعات، المواد الدراسية، النتائج، المالية والحسابات، إعداد هيكل المدارس، الإعدادات، الخصوصية والمساعدة، طلبات التقديم — كل عنصر Component مستقل (مش نص عادي)، غالبًا بحالتين (Active/Inactive).

### Dropdown (dropdwon section)
موجود كفئة منفصلة في الـ Design System — يحتاج فحص تفصيلي وقت تنفيذ أول Dropdown في الكود.

### Loading & Icons
فئة منفصلة لحالات التحميل والأيقونات العامة المستخدمة في النظام كله.

---

*(هيتضاف المزيد من الكومبوننتات هنا كل ما نستعرض موديول جديد في الفيجما)*
