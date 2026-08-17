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

---

## 2. بنية الفولدرات

```
/app
  /[locale]                    ← next-intl routing
    /(auth)/login/page.tsx
    /(dashboard)/dashboard/page.tsx
    /(dashboard)/students/page.tsx
    /(dashboard)/students/[id]/page.tsx
    ...
/components
  /ui                          ← Button-ERP, Input, Card, إلخ (من design-system.md)
  /shared                      ← Sidebar, Header, ScheduleGrid (مشترك بين موديولين)
  /[module]                    ← كومبوننتات خاصة بموديول معيّن (زي /students, /teachers)
/lib
  /api
    client.ts
    /modules
      auth.api.ts
      students.api.ts
      teachers.api.ts
      employees.api.ts
      schedule.api.ts
      exams.api.ts
      settings.api.ts
/types
  auth.types.ts
  student.types.ts
  teacher.types.ts
  employee.types.ts
  schedule.types.ts
  ...
/mocks
  handlers.ts
  browser.ts
  server.ts                    ← لتشغيل MSW في Production (Node environment)
/hooks
  useAuth.ts
  useStudents.ts
  ...
/store
  authStore.ts                 ← Zustand + persist
  draftStore.ts                ← Zustand + persist (Draft forms)
/messages
  ar.json
  en.json
/docs
  prd.md
  design-system.md
  workflow.md
  tech-instructions.md
  progress.md
```

---

## 3. معمارية طبقة الـ API

كل Feature بيتبع نفس الـ Pattern:
1. `types/[module].types.ts` — الـ Interface (العقد المتوقع من الـ Backend)
2. `mocks/handlers.ts` — MSW handler بنفس شكل الـ Type بالظبط
3. `lib/api/modules/[module].api.ts` — دوال الطلب (`fetch` wrapper حول `client.ts`)
4. `hooks/use[Module].ts` — React Query hook (`useQuery`/`useMutation`) بيستخدم دالة الـ API

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
كل قيمة لونية أو Spacing في `tailwind.config.ts` لازم تيجي من `design-system.md` فقط. أي طلب تنفيذ لشاشة جديدة بيتضمن قسم الألوان المرتبط من design-system.md كـ Context.

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

**الخطوة التالية:** `progress.md` — يُنشأ عند بداية التنفيذ الفعلي (Phase 1: Auth).
