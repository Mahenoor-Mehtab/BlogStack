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

**schema-prisma file jo generate hota after init prisma karne pe**
- Generator → Prisma Client code generate karta hai → JS/TS code ko DB queries me convert karega
- Datasource → Database connection setup karta hai → Prisma Client queries run karne ke liye ready
- Tumhare Next.js code me Prisma Client use karke CRUD karte ho
- @ = ek field ki properties
- @@ = puri table ki properties

model User {
  id String @id @default(cuid())        // @ for field
  email String @unique                   // @ for field
  name String?                           // ? = optional
  articles Articles[]                    // [] = many
  
  @@index([email])                       // @@ for model
  @@map("users")                         // @@ for model
}

## relation in model:
- ONE-TO-MANY relation me relation ka actual code
hamesha MANY wali table me likhte hain.

-  articles Articles[]   // sirf batata hai: "mere bohot articles hain"

- author User @relation(fields: [authorId], references: [id]) // Article table ka authorId User table ke id ko point karega
  authorId String  ka mtlb =>
==> author User Prisma me ek object / relation field hota hai, jo ye batata hai ki Article ka author ek User hai. Iska matlab ye ID store karne ke liye nahi hota, balki ye define karta hai ki Article aur User ke beech relation exist karta hai—specifically, kis user ne ye article likha hai. Actual me User ki ID database me authorId field me store hoti hai, jo ek foreign key hoti hai. author User sirf Prisma ko ye samjhata hai ki jab bhi article ka author chahiye ho, to User table se data laakar dikhaya ja sake, jabki authorId ke through ye confirm hota hai ki ye article kis specific user (User.id) se linked hai.

- user User @relation(fields: [userId], references: [id]) ==> user User Prisma ke liye ek virtual field hai, 👉 Ye sirf ye batata hai: "Is comment ka user ek User hai”


## 📌 Zod – Short Notes (Today Revision)
- Zod is a runtime validation library for JavaScript & TypeScript.
- It creates schemas (rules) to validate data.
- Schemas run at runtime, unlike TypeScript types (compile-time only).

- ➡️ Use z.object() whenever data is an object {}, even if it has one field.
z.object({
  name: z.string(),
  age: z.number(),
})


- ➡️ One schema = validation + TypeScript type.
type User = z.infer<typeof UserSchema>;


## useFormState now due to version change useFormAction come:
useFormState ek React hook hai jo:Server Action ka response state client component me manage karta hai
- Form submit ke baad errors / success / messages dikhane ke kaam aata hai
👉 Basically:
Server → jo data return kare → Client ko mil jata hai


**const [state, formAction, isPending] = useActionState(fn, initialState);**
- toh behind the scenes React aur Next.js mil-kar ek poora mechanism set up kar dete hain. fn tumhara server action hota hai, jo sirf server par chal sakta hai. Browser is function ka code kabhi nahi dekhta. useActionState is server function ka ek safe reference bana deta hai aur us reference ko client ke liye usable form me convert karta hai. Isi process ke dauran React client side par ek state container bhi bana leta hai, jiska initial value initialState hota hai, taaki pehle render par UI ko kuch default data mil sake.

- Is hook ke result me pehli value state hoti hai, jo hamesha server se return hua latest result hota hai. Jab form submit nahi hua hota, tab state exactly initialState ke barabar hota hai. Jaise hi user form submit karta hai, React browser ke native form submit ko intercept karta hai, page reload hone nahi deta, aur automatically FormData banata hai. Us waqt jo second value milti hai, formAction, wahi ek wrapper function hota hai jo client par safe rehta hai aur internally server par fn(prevState, formData) ko call kar deta hai.

- Server par fn execute hota hai, jahan React automatically pichla state (prevState) aur naya formData pass kar deta hai. Server action jo bhi object return karta hai, React usko wapas client me laakar state ko update kar deta hai. Isi beech jab tak server action chal raha hota hai, React third value isPending ko true kar deta hai, jisse UI me loading ya button disable jaise effects dikhaye ja sakein. Jaise hi server ka response aa jata hai, isPending phir false ho jata hai aur React UI ko naye state ke saath re-render kar deta hai.

- Short me, is ek line ka matlab ye hai ki React automatically server action ko client se connect karta hai, uska result client state me store karta hai, aur saath hi saath loading status ko track karta hai—bina manually API call, fetch, ya useState likhe.




