'use client';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import BreadCrumb from '@/components/breadcrumb';
import { QuotesClient } from '@/components/tables/quote-tables/quote';

/**model citas {
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
} */
interface Citas {
  id_cita: number;
  id_paciente: number;
  id_medico: number;
  fecha_cita: Date;
  hora_cita: Date;
  estado: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_eliminacion: Date;
  tipo_tratamiento: string;
  comentarios: string;
}
const breadcrumbItems = [{ title: 'Citas', link: '/dashboard/quotes' }];

export default function page() {
  const [citas, setCitas] = useState<Citas[]>([]);
  useEffect(() => {
    async function fetchCitas() {
      try {
        const response = await axios.get<Citas[]>('/api/quotes');
        setCitas(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchCitas();
  }, []);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <QuotesClient data={citas} />
      </div>
    </>
  );
}
