# BLOG APP:

## technology used:
- Neon 

### 2️⃣ Drizzle ORM kya hai?
- Drizzle = Modern TypeScript ORM
- Serverless-friendly, lightweight, type-safe
- Next.js 15/Edge functions me better
- Prisma ke jaise hi kaam karta hai: JS/TS objects ↔ SQL database

### 🔑 TL;DR – Prisma Flow
- Install → Use karne ke liye
- Init → Project me setup
- Schema → DB ka design
- Migrate → Tables create / update
- Client → Code se DB interact
- Studio → Visual DB editor
- Ek line me: Prisma = Translator + Bridge between JS/TS code & SQL database ✅

**schema-prisma jo generate hota after init prisma karne pe**
- Generator → Prisma Client code generate karta hai → JS/TS code ko DB queries me convert karega
- Datasource → Database connection setup karta hai → Prisma Client queries run karne ke liye ready
- Tumhare Next.js code me Prisma Client use karke CRUD karte ho