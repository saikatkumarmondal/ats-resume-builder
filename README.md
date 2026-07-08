# 🤖 AI-Powered ATS Resume Builder

A modern, AI-powered resume builder that creates **ATS-friendly resumes** with real-time editing, intelligent AI assistance, drag-and-drop customization, autosave, and PDF export.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Prisma**, **PostgreSQL**, and the **Google GenAI SDK**.

---

## ✨ Features

- 🤖 AI-powered resume improvement using Google GenAI
- 📄 ATS-friendly resume templates
- ✍️ Real-time resume editing
- 💾 Automatic background autosave
- 📑 One-click PDF export
- 🎯 Resume scoring and optimization
- 🔀 Drag & Drop experience reordering
- 🔒 Secure authentication with NextAuth
- 📱 Fully responsive design
- 🌙 Modern UI with Tailwind CSS v4
- ⚡ Built using Next.js Server Actions
- ✅ Form validation using React Hook Form + Zod
- 🎨 Beautiful animations using Framer Motion

---

# 🚀 Tech Stack

| Category | Technologies |
|----------|--------------|
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | NextAuth.js |
| AI | Google GenAI SDK |
| Forms | React Hook Form |
| Validation | Zod |
| Animation | Framer Motion |
| PDF | @react-pdf/renderer |
| Drag & Drop | dnd-kit |
| Testing | Playwright |

---

# 📦 Installation

## 1. Clone the repository

```bash
git clone https://github.com/saikatkumarmondal/ats-resume-builder.git
cd ats-resume-builder
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL=your_postgresql_database_url

NEXTAUTH_SECRET=your_nextauth_secret

NEXTAUTH_URL=http://localhost:3000

GOOGLE_API_KEY=your_google_ai_api_key
```

---

## 4. Push the Prisma schema

```bash
npx prisma db push
```

(Optional)

Generate Prisma Client

```bash
npx prisma generate
```

---

## 5. Start the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

# 📁 Project Structure

```text
.
├── actions/
│   ├── AI server actions
│   └── Resume actions
│
├── app/
│   ├── Dashboard
│   ├── Authentication
│   └── API routes
│
├── components/
│   ├── resume-builder/
│   │   ├── ResumeEditor.tsx
│   │   ├── ResumePreview.tsx
│   │   ├── SkillsSectionForm.tsx
│   │   ├── SortableExperienceItem.tsx
│   │   └── SkillTagInput.tsx
│   │
│   └── UI Components
│
├── config/
│
├── hooks/
│
├── lib/
│
├── prisma/
│
├── public/
│
├── schemas/
│
├── types/
│
└── utils/
```

---

# 📜 Available Scripts

Start development server

```bash
npm run dev
```

Build production application

```bash
npm run build
```

Run production server

```bash
npm run start
```

Lint the project

```bash
npm run lint
```

Run Playwright tests

```bash
npm run test
```

---

# 🧠 AI Features

- ATS resume optimization
- AI-generated bullet point improvements
- Better action verbs
- Professional resume suggestions
- Resume content enhancement
- Context-aware editing
- No fake information generation

---

# 📄 PDF Export

Generate beautiful ATS-compatible PDF resumes directly in the browser using:

- `@react-pdf/renderer`

---

# 🔒 Authentication

Secure authentication powered by:

- NextAuth.js
- Prisma Adapter
- PostgreSQL

---

# 📱 Responsive Design

- Mobile-first layout
- Tablet optimized
- Desktop workspace
- Resizable editor panels
- Responsive resume preview

---

# ⚡ Performance

- Server Actions
- Optimized rendering
- Debounced autosave
- Lazy loading
- GPU-accelerated drag & drop
- Optimized React rendering

---

# 🛣️ Roadmap

- More resume templates
- Cover letter generator
- AI interview preparation
- Resume analytics
- Resume sharing
- Cloud storage
- Multi-language support

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Saikat Kumar Mondal**

GitHub

https://github.com/saikatkumarmondal

LinkedIn

https://www.linkedin.com/in/saikatkumar421/

---

⭐ If you found this project helpful, please consider giving it a **Star** on GitHub!