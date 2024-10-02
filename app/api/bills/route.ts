import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

/**model gastos {
  id_gasto    Int      @id @default(autoincrement())
  descripcion String
  monto       Decimal  @db.Decimal(10, 2)
  fecha_gasto DateTime @db.Date
  categoria   String?  @db.VarChar(50)
  id_usuario  Int
  medicos     medicos  @relation(fields: [id_usuario], references: [id_medico], onDelete: NoAction, onUpdate: NoAction)
}
 */

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bills = await prisma.gastos.findMany({
      include: {
        medicos: true
      }
    });
    return NextResponse.json(bills);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { descripcion, monto, fecha_gasto, categoria, id_usuario } = body;

    // Validar que los campos requeridos están presentes
    if (!descripcion || !monto || !fecha_gasto || !id_usuario) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const newGasto = await prisma.gastos.create({
      data: {
        descripcion,
        monto,
        fecha_gasto: new Date(fecha_gasto),
        categoria,
        id_usuario
      }
    });

    return NextResponse.json(newGasto, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id_gasto, descripcion, monto, fecha_gasto, categoria } = body;

    if (!id_gasto || !descripcion || !monto || !fecha_gasto) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const updatedGasto = await prisma.gastos.update({
      where: { id_gasto },
      data: {
        descripcion,
        monto,
        fecha_gasto: new Date(fecha_gasto),
        categoria
      }
    });

    return NextResponse.json(updatedGasto);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function DELETE(request: Request) {
  try {
    const { id_gasto } = await request.json();

    if (!id_gasto) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    await prisma.gastos.delete({
      where: { id_gasto }
    });

    return NextResponse.json({ message: 'Gasto eliminado correctamente' });
  } catch (error) {
    return NextResponse.error();
  }
}
