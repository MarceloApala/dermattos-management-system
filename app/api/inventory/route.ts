/**model inventario {
  id_producto            Int                      @id @default(autoincrement())
  nombre_producto        String                   @db.VarChar(100)
  descripcion            String?
  cantidad               Int
  fecha_vencimiento      DateTime?                @db.Date
  precio_compra          Decimal?                 @db.Decimal(10, 2)
  precio_venta           Decimal?                 @db.Decimal(10, 2)
  proveedor              String?                  @db.VarChar(100)
  estado                 String?                  @default("activo") @db.VarChar(20)
  fecha_creacion         DateTime?                @default(now()) @db.Timestamp(6)
  fecha_actualizacion    DateTime?                @default(now()) @db.Timestamp(6)
  fecha_eliminacion      DateTime?                @db.Timestamp(6)
  movimientos_inventario movimientos_inventario[]
} */

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const inventory = await prisma.inventario.findMany({
      include: {
        movimientos_inventario: true
      }
    });
    return NextResponse.json(inventory);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
    const product = await prisma.inventario.create({
      data: body
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
    const { id } = req.query;
    const product = await prisma.inventario.update({
      where: {
        id_producto: Number(id)
      },
      data: body
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    await prisma.inventario.delete({
      where: {
        id_producto: Number(id)
      }
    });
    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    return NextResponse.error();
  }
}
