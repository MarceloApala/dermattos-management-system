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
} */
'use client';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import BreadCrumb from '@/components/breadcrumb';
import { PatientClient } from '@/components/tables/patient-tables/patient';

interface Pacientes {
  id_paciente: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  direccion: string;
  telefono: string;
  email: string;
  genero: string;
  estado: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_eliminacion: Date;
  fecha_registro: Date;
}

const breadcrumbItems = [{ title: 'Pacientes', link: '/dashboard/patients' }];

export default function page() {
  const [patients, setPatients] = useState<Pacientes[]>([]);
  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await axios.get<Pacientes[]>('/api/patients');
        setPatients(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchPatients();
  }, []);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <PatientClient data={patients} />
      </div>
    </>
  );
}
