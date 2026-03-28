const { PrismaClient, Role } = require('@prisma/client');
const { hash } = require('bcryptjs');

const db = new PrismaClient();

async function upsertUser({ email, name, role, password }) {
  const passwordHash = await hash(password, 12);

  await db.user.upsert({
    where: { email },
    update: { name, role, passwordHash },
    create: { email, name, role, passwordHash }
  });
}

async function main() {
  await upsertUser({
    email: 'admin@tutor.local',
    name: 'Platform Admin',
    role: Role.ADMIN,
    password: 'AdminPass123'
  });

  await upsertUser({
    email: 'tutor@tutor.local',
    name: 'Demo Tutor',
    role: Role.TUTOR,
    password: 'TutorPass123'
  });

  await upsertUser({
    email: 'student@tutor.local',
    name: 'Demo Student',
    role: Role.STUDENT,
    password: 'StudentPass123'
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
