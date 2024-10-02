/**model evaluaciones {
  id_evaluacion        Int       @id @default(autoincrement())
  id_paciente          Int
  id_medico            Int
  fecha_evaluacion     DateTime  @db.Date
  fototipo_piel        String?   @db.VarChar(50)
  biotipo_cutaneo      String?   @db.VarChar(50)
  sensibilidad         String?   @db.VarChar(50)
  alergias             String?
  medicamentos         String?
  antecedentes_medicos String?
  plan_tratamiento     String?
  estado               String?   @default("activo") @db.VarChar(20)
  fecha_creacion       DateTime? @default(now()) @db.Timestamp(6)
  fecha_actualizacion  DateTime? @default(now()) @db.Timestamp(6)
  fecha_eliminacion    DateTime? @db.Timestamp(6)
  medicos              medicos   @relation(fields: [id_medico], references: [id_medico], onDelete: NoAction, onUpdate: NoAction)
  pacientes            pacientes @relation(fields: [id_paciente], references: [id_paciente], onDelete: NoAction, onUpdate: NoAction)
} */
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const evaluations = await prisma.evaluaciones.findMany({
      include: {
        medicos: true,
        pacientes: true
      }
    });

    return NextResponse.json(evaluations);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      id_paciente,
      id_medico,
      fecha_evaluacion,
      fototipo_piel,
      biotipo_cutaneo,
      sensibilidad,
      alergias,
      medicamentos,
      antecedentes_medicos,
      plan_tratamiento
    } = body;

    // Validar que los campos requeridos están presentes
    if (!id_paciente || !id_medico || !fecha_evaluacion) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const newEvaluacion = await prisma.evaluaciones.create({
      data: {
        id_paciente,
        id_medico,
        fecha_evaluacion: new Date(fecha_evaluacion),
        fototipo_piel,
        biotipo_cutaneo,
        sensibilidad,
        alergias,
        medicamentos,
        antecedentes_medicos,
        plan_tratamiento
      }
    });

    return NextResponse.json(newEvaluacion, { status: 201 });
  } catch (error) {
    console.error('Error creating evaluation:', error);
    return NextResponse.error();
  }
}
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id_evaluacion,
      id_paciente,
      id_medico,
      fecha_evaluacion,
      fototipo_piel,
      biotipo_cutaneo,
      sensibilidad,
      alergias,
      medicamentos,
      antecedentes_medicos,
      plan_tratamiento
    } = body;

    if (!id_evaluacion || !id_paciente || !id_medico || !fecha_evaluacion) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const updatedEvaluacion = await prisma.evaluaciones.update({
      where: { id_evaluacion },
      data: {
        id_paciente,
        id_medico,
        fecha_evaluacion: new Date(fecha_evaluacion),
        fototipo_piel,
        biotipo_cutaneo,
        sensibilidad,
        alergias,
        medicamentos,
        antecedentes_medicos,
        plan_tratamiento
      }
    });

    return NextResponse.json(updatedEvaluacion);
  } catch (error) {
    console.error('Error updating evaluation:', error);
    return NextResponse.error();
  }
}
export async function DELETE(request: Request) {
  try {
    const { id_evaluacion } = await request.json();

    if (!id_evaluacion) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    await prisma.evaluaciones.delete({
      where: { id_evaluacion }
    });

    return NextResponse.json({ message: 'Evaluación eliminada correctamente' });
  } catch (error) {
    console.error('Error deleting evaluation:', error);
    return NextResponse.error();
  }
}
