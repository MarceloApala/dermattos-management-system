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
}
 */
'use client';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import BreadCrumb from '@/components/breadcrumb';
import { EvaluationsClient } from '@/components/tables/evaluation-tables/evaluation';

interface Evaluaciones {
  id_evaluacion: number;
  id_paciente: number;
  id_medico: number;
  fecha_evaluacion: Date;
  fototipo_piel: string;
  biotipo_cutaneo: string;
  sensibilidad: string;
  alergias: string;
  medicamentos: string;
  antecedentes_medicos: string;
  plan_tratamiento: string;
}

export default function page() {
  const [evaluations, setEvaluations] = useState<Evaluaciones[]>([]);
  useEffect(() => {
    async function fetchEvaluations() {
      try {
        const response = await axios.get<Evaluaciones[]>('/api/evaluations');
        setEvaluations(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchEvaluations();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb
          items={[{ title: 'Evaluaciones', link: '/dashboard/evaluations' }]}
        />
        <EvaluationsClient data={evaluations} />
      </div>
    </>
  );
}
