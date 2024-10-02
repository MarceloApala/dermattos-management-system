/**model pacientes {
  id_paciente         Int            @id @default(autoincrement())
  nombre              String         @db.VarChar(100)
  apellido            String         @db.VarChar(100)
  fecha_nacimiento    DateTime       @db.Date
  direccion           String?        @db.VarChar(255)
  telefono            String?        @db.VarChar(20)
  email               String?        @db.VarChar(100)
  genero              String?        @db.VarChar(20)
  estado              String?        @default("activo") @db.VarChar(20)
  fecha_creacion      DateTime?      @default(now()) @db.Timestamp(6)
  fecha_actualizacion DateTime?      @default(now()) @db.Timestamp(6)
  fecha_eliminacion   DateTime?      @db.Timestamp(6)
  fecha_registro      DateTime?      @default(now()) @db.Timestamp(6)
  citas               citas[]
  evaluaciones        evaluaciones[]
}
 */

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const patients = await prisma.pacientes.findMany({
      include: {
        citas: true,
        evaluaciones: true
      }
    });
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
    const patient = await prisma.pacientes.create({
      data: body
    });
    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
    const { id } = req.query;
    const patient = await prisma.pacientes.update({
      where: {
        id_paciente: Number(id)
      },
      data: body
    });
    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    await prisma.pacientes.delete({
      where: {
        id_paciente: Number(id)
      }
    });
    return NextResponse.json({ message: 'Patient deleted' });
  } catch (error) {
    return NextResponse.error();
  }
}
