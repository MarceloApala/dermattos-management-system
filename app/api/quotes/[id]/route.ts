import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // Obtener el ID desde los parámetros
    const quote = await prisma.citas.findUnique({
      where: {
        id_cita: Number(id) // Asegúrate de que el ID sea un número
      },
      include: {
        medicos: true,
        pacientes: true
      }
    });

    // Verificar si la cita fue encontrada
    if (!quote) {
      return NextResponse.json(
        { error: 'Cita no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al obtener la cita' },
      { status: 500 }
    );
  }
}
export async function PUT(
  req: NextApiRequest,
  { params, body }: { params: { id: string }; body: any }
) {
  try {
    const { id } = params;
    const quote = await prisma.citas.update({
      where: {
        id_cita: Number(id)
      },
      data: body
    });
    return NextResponse.json(quote);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al actualizar la cita' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const quote = await prisma.citas.delete({
      where: {
        id_cita: Number(id)
      }
    });
    return NextResponse.json(quote);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al eliminar la cita' },
      { status: 500 }
    );
  }
}
