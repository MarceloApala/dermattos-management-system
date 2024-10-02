/*model citas {
  id_cita             Int       @id @default(autoincrement())
  id_paciente         Int
  id_medico           Int
  fecha_cita          DateTime  @db.Date
  hora_cita           DateTime  @db.Time(6)
  estado              String?   @default("programada") @db.VarChar(20)
  fecha_creacion      DateTime? @default(now()) @db.Timestamp(6)
  fecha_actualizacion DateTime? @default(now()) @db.Timestamp(6)
  fecha_eliminacion   DateTime? @db.Timestamp(6)
  tipo_tratamiento    String?   @db.VarChar(100)
  comentarios         String?
  medicos             medicos   @relation(fields: [id_medico], references: [id_medico], onDelete: NoAction, onUpdate: NoAction)
  pacientes           pacientes @relation(fields: [id_paciente], references: [id_paciente], onDelete: NoAction, onUpdate: NoAction)
}
 */
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const quotes = await prisma.citas.findMany({
      include: {
        medicos: true,
        pacientes: true
      }
    });
    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
    const quote = await prisma.citas.create({
      data: body
    });
    return NextResponse.json(quote);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
    const { id } = req.query;
    const quote = await prisma.citas.update({
      where: {
        id_cita: Number(id)
      },
      data: body
    });
    return NextResponse.json(quote);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const quote = await prisma.citas.delete({
      where: {
        id_cita: Number(id)
      }
    });
    return NextResponse.json(quote);
  } catch (error) {
    return NextResponse.error();
  }
}
