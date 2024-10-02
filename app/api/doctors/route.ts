/**model medicos {
  id_medico           Int            @id @default(autoincrement())
  nombre              String         @db.VarChar(100)
  apellido            String         @db.VarChar(100)
  especialidad        String?        @db.VarChar(100)
  telefono            String?        @db.VarChar(20)
  email               String?        @db.VarChar(100)
  estado              String?        @default("activo") @db.VarChar(20)
  fecha_creacion      DateTime?      @default(now()) @db.Timestamp(6)
  fecha_actualizacion DateTime?      @default(now()) @db.Timestamp(6)
  fecha_eliminacion   DateTime?      @db.Timestamp(6)
  fecha_contratacion  DateTime?      @db.Date
  citas               citas[]
  evaluaciones        evaluaciones[]
  gastos              gastos[]
  reportes            reportes[]
}
 */
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const doctors = await prisma.medicos.findMany({
      include: {
        citas: true,
        evaluaciones: true,
        gastos: true,
        reportes: true
      }
    });
    return NextResponse.json(doctors);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
    const doctor = await prisma.medicos.create({
      data: body
    });
    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
    const { id } = req.query;
    const doctor = await prisma.medicos.update({
      where: {
        id_medico: Number(id)
      },
      data: body
    });
    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    await prisma.medicos.delete({
      where: {
        id_medico: Number(id)
      }
    });
    return NextResponse.json({ message: 'Doctor deleted' });
  } catch (error) {
    return NextResponse.error();
  }
}
// Compare this snippet from app/api/doctors/route.ts:
