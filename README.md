# Smile Media

Next.js website for Smile Media (Colombo digital marketing agency).

## Stack

- Next.js 16 + React 19
- Prisma + **MySQL**
- Framer Motion, Tailwind CSS 4

## Local setup (XAMPP MySQL)

1. Start **Apache** and **MySQL** in XAMPP.
2. Copy env file and edit if needed:

```bash
cp .env.example .env
```

Default local URL (XAMPP root, no password):

```env
DATABASE_URL="mysql://root:@127.0.0.1:3306/smilemedia"
ADMIN_PASSWORD="your-password"
ADMIN_SECRET="long-random-secret"
```

3. Create DB, push schema, seed:

```bash
# in MySQL / phpMyAdmin: CREATE DATABASE smilemedia;
npm run db:setup
npm run dev
```

## Hostinger deploy

1. In hPanel → **Databases**, create a MySQL database + user.
2. In Node.js app **Environment variables**, add:

| Key | Value |
|-----|--------|
| `DATABASE_URL` | `mysql://USER:PASSWORD@HOST:3306/DATABASE` |
| `ADMIN_PASSWORD` | `admin123` |
| `ADMIN_SECRET` | Long random secret |
| `NODE_ENV` | `production` |

3. Framework: Next.js · Branch: `main` · Node: 20.x or 22.x
4. After first deploy, run once (SSH / Hostinger terminal if available):

```bash
npx prisma db push
npx tsx prisma/seed.ts
```

Or use Hostinger’s one-off command / deploy hook if offered.

5. Open `/admin` and sign in with `ADMIN_PASSWORD`.
