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
'use client';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import BreadCrumb from '@/components/breadcrumb';
import { DoctorsClient } from '@/components/tables/doctor-tables/doctor';

interface Doctors {
  id_medico: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: string;
  email: string;
  estado: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_eliminacion: Date;
  fecha_contratacion: Date;
}

const breadcrumbItems = [{ title: 'Doctores', link: '/dashboard/doctors' }];
export default function page() {
  const [doctors, setDoctors] = useState<Doctors[]>([]);
  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await axios.get<Doctors[]>('/api/doctors');
        setDoctors(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchDoctors();
  }, []);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <DoctorsClient data={doctors} />
      </div>
    </>
  );
}
