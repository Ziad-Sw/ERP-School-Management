# Tech Instructions — School-Management

مرجع تقني موحّد لكل القرارات المعمارية والمعايير البرمجية في المشروع. الهدف: أي حد يفتح الملف ده يعرف يشتغل بنفس الطريقة بالظبط من غير لبس.

---

## 1. Tech Stack النهائي

| الطبقة | التقنية | ملاحظات |
|---|---|---|
| Framework | Next.js 16 (App Router) | بدون `src/` directory |
| Language | TypeScript (Strict mode) | |
| Styling | Tailwind CSS v4 | القيم من `design-system.md` فقط، ممنوع Hardcoded colors |
| Data Fetching | TanStack Query (React Query) | |
| Global State | Zustand + `persist` middleware | للـ Auth session والـ Draft forms |
| Forms | React Hook Form + Zod | |
| Mock API | MSW | شغالة في Development **و Production** (قرار متعمد، انظر `workflow.md` §3.1) |
| i18n | next-intl | عربي (افتراضي) + إنجليزي، RTL/LTR كامل |
| Charts | Recharts | |
| Animation | Framer Motion | |
| Fonts | Fontsource (`@fontsource/tajawal`, `@fontsource/poppins`) | Self-hosted، مش `next/font/google` — قرار اتخد بعد مشكلة تحميل الخط أونلاين |
| Class merging | `tailwind-merge` | لحل تعارض الكلاسات وقت الـ override من برة (زي العرض) |
| Icons | Lucide React | |

---

## 2. بنية الفولدرات (Feature-based Architecture)

القرار المعماري: كل موديول (Feature) بيجمع كومبوننتاته، الهوكس بتاعته، وطبقة الـ API الخاصة بيه في فولدر واحد مستقل تحت `/features`. الهدف: أي حد يفتح فولدر موديول معيّن يلاقي كل حاجة خاصة بيه في مكان واحد، وإضافة موديول جديد مستقبلًا ما تأثرش على الموديولات التانية.

```
/app
  /[locale]
    /(auth)
      /login/page.tsx
      /forgot-password/page.tsx
      /verify-code/page.tsx
      /reset-password/page.tsx
      /first-time-login/page.tsx
      /onboarding/page.tsx
      /offline/page.tsx
      /loading/page.tsx
    /(dashboard)
      layout.tsx
      /dashboard/page.tsx
      /students/page.tsx
      /students/[id]/page.tsx
      /teachers/page.tsx
      /employees/page.tsx
      /schedule/page.tsx
      /exams/page.tsx
      /settings/page.tsx
    page.tsx              ← Redirect لصفحة /login
    layout.tsx
  favicon.ico
  globals.css

/components
  /ui                     ← كومبوننتات عامة مشتركة بين كل الموديولات (Button, Input, Card)
  /shared                 ← كومبوننتات مشتركة بين موديولين أو أكتر (Sidebar, Header, ScheduleGrid)

/features                 ← كل موديول (Feature) في فولدر مستقل
  /login
    /components           ← كومبوننتات خاصة بموديول اللوجين بس
    /hooks                 ← useLogin.ts, useForgotPassword.ts, ...
    /api                    ← login.api.ts (دوال الطلب)
    /types.ts               ← LoginRequest, LoginResponse, ...
  /dashboard
    /components
    /hooks
    /api
    /types.ts
  /students
    /components
    /hooks
    /api
    /types.ts
  /teachers
    /components
    /hooks
    /api
    /types.ts
  /employees
    /components
    /hooks
    /api
    /types.ts
  /schedule
    /components
    /hooks
    /api
    /types.ts
  /exams
    /components
    /hooks
    /api
    /types.ts
  /settings
    /components
    /hooks
    /api
    /types.ts

/lib
  /api
    client.ts              ← fetch wrapper مشترك، كل الموديولات بتستخدمه
  /i18n
    routing.ts
    request.ts

/store
  authStore.ts              ← Zustand + persist (عبر كل الموديولات)
  draftStore.ts             ← Zustand + persist (عبر كل الموديولات)

/mocks
  handlers.ts                ← بيجمع الـ MSW handlers من كل features/[module]/api
  browser.ts
  server.ts

/messages
  ar.json
  en.json

/docs
  prd.md
  design-system.md
  workflow.md
  tech-instructions.md
  progress.md

middleware.ts (جذر المشروع)
```

### القاعدة الفاصلة بين `/components` و`/features/[module]/components`

| السؤال | لو الإجابة "أيوه" | لو الإجابة "لأ" |
|---|---|---|
| الكومبوننت ده هيتستخدم في **أكتر من موديول**؟ | `/components/ui` أو `/components/shared` | `/features/[module]/components` |
| الكومبوننت ده **خاص بمنطق موديول واحد بس**؟ | `/features/[module]/components` | راجع السؤال اللي فوق |

**مثال:** `Button.tsx` و`Input.tsx` عامين وبيتكرروا في كل موديول → `/components/ui`.
`ScheduleGrid.tsx` بيتشارك بين موديول الجدول الدراسي والامتحانات بس → `/components/shared`.
`StudentEnrollmentForm.tsx` خاص بموديول الطلاب بس → `/features/students/components`.

---

## 3. معمارية طبقة الـ API

كل Feature بيتبع نفس الـ Pattern:
1. `features/[module]/types.ts` — الـ Interface (العقد المتوقع من الـ Backend)
2. `mocks/handlers.ts` — MSW handler بنفس شكل الـ Type بالظبط (بيجمع الـ handlers من كل موديول)
3. `features/[module]/api/[module].api.ts` — دوال الطلب (`fetch` wrapper حول `lib/api/client.ts`)
4. `features/[module]/hooks/use[Module].ts` — React Query hook (`useQuery`/`useMutation`) بيستخدم دالة الـ API

**قاعدة صارمة:** الكومبوننتات ممنوع تستدعي `fetch` مباشرة أو تستورد من `mocks/` — لازم تمر بالـ Hook بس.

---

## 4. معايير الكود (Code Standards)

- **ESLint + Prettier**: إعدادات Next.js الافتراضية + قواعد إضافية لـ TypeScript strict
- **Conventional Commits**: `feat(students): ...`, `fix(auth): ...`, `chore: ...`
- **Husky + lint-staged**: فحص تلقائي قبل كل Commit (يُضاف عند بداية التنفيذ الفعلي)
- **GitHub Actions CI**: فحص Build + Lint على كل Push (يُضاف بعد أول موديول شغال)
- **Branch Protection**: `main` محمي، الشغل عبر `feature/*` branches فقط
- **`.nvmrc`**: تثبيت نسخة Node.js موحدة
- **`.env.example`**: قالب لأي متغيرات بيئة مستقبلية (حتى لو فاضي دلوقتي)

---

## 5. قواعد التسمية (Naming Conventions)

| النوع | الأسلوب | مثال |
|---|---|---|
| Components | PascalCase | `StudentCard.tsx` |
| Hooks | camelCase + `use` prefix | `useStudents.ts` |
| Types/Interfaces | PascalCase | `Student`, `LoginRequest` |
| API functions | camelCase + فعل | `getStudents()`, `createStudent()` |
| ملفات الـ Store | camelCase + `Store` suffix | `authStore.ts` |

---

## 6. قاعدة التوكنز والألوان
كل قيمة لونية أو Spacing في `tailwind.config.ts` / `globals.css` لازم تيجي من `design-system.md` فقط. أي طلب تنفيذ لشاشة جديدة بيتضمن قسم الألوان المرتبط من design-system.md كـ Context.

---

## 7. قاعدة إنهاء أي مهمة تنفيذ
**كل مهمة تعديل/تنفيذ كود لازم تنتهي بتشغيل الـ skills التالية بعد أي تعديل:**
```
Run the "clean-code-guard" and "test-guard" skills after making these changes.
```

---

## 8. i18n — قواعد التنفيذ
- كل نص في الواجهة لازم يمر من `messages/ar.json` أو `messages/en.json` — ممنوع نص Hardcoded داخل الكومبوننت
- الاتجاه (RTL/LTR) بيتغيّر تلقائيًا مع اللغة عبر `dir` attribute في الـ `<html>`
- الأرقام دايمًا بخط Poppins بغض النظر عن اللغة (قاعدة من design-system.md)

---

## 9. قاعدة التحكم في العرض (Width) للكومبوننتات المشتركة

- الكومبوننتات العامة (`Button`, `Input`) بتاخد عرض افتراضي ثابت جوه الملف نفسه (`sizeStyles` لكل Size)
- أي صفحة تقدر تلغي (Override) العرض الافتراضي عن طريق `className="w-[...]"` وقت الاستدعاء، وده بيتحل صح بفضل `tailwind-merge`
- ممنوع تكرار خصائص بصرية موحّدة (زي مقاس ولون الأيقونة جوه الـ Input) في كل صفحة — لو تكررت 3-4 مرات، تتنقل جوه الكومبوننت نفسه (عبر `cloneElement`) بدل التكرار

---

**الخطوة التالية:** `progress.md` — يُنشأ عند بداية التنفيذ الفعلي (Phase 1: Auth).
