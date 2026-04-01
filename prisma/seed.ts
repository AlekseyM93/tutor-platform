import { LessonStatus, PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const db = new PrismaClient();

async function upsertUser({
  email,
  name,
  role,
  password
}: {
  email: string;
  name: string;
  role: Role;
  password: string;
}) {
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

  const tutor = await db.user.findUnique({ where: { email: 'tutor@tutor.local' } });
  const student = await db.user.findUnique({ where: { email: 'student@tutor.local' } });
  if (tutor && student) {
    const demoRoomName = 'demo-lesson-room';
    const lesson = await db.lesson.upsert({
      where: { roomName: demoRoomName },
      create: {
        title: 'Демонстрационный урок',
        description: 'Урок из seed: репетитор и ученик уже привязаны.',
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        durationMin: 60,
        status: LessonStatus.SCHEDULED,
        roomName: demoRoomName,
        tutorId: tutor.id
      },
      update: {
        title: 'Демонстрационный урок',
        tutorId: tutor.id
      }
    });

    await db.lessonStudent.upsert({
      where: {
        lessonId_studentId: { lessonId: lesson.id, studentId: student.id }
      },
      create: { lessonId: lesson.id, studentId: student.id },
      update: {}
    });
  }
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
