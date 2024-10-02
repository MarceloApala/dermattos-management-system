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
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { evaluaciones } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '../employee-tables/cell-action';

export const columns: ColumnDef<evaluaciones>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id_evaluacion',
    header: 'ID'
  },
  {
    accessorKey: 'pacientes.nombre',
    header: 'Paciente'
  },
  {
    accessorKey: 'medicos.nombre',
    header: 'Medico'
  },
  {
    accessorKey: 'fecha_evaluacion',
    header: 'Fecha',
    cell: ({ row }) =>
      new Date(row.original.fecha_evaluacion).toLocaleDateString()
  },
  {
    accessorKey: 'fototipo_piel',
    header: 'Fototipo Piel'
  },
  {
    accessorKey: 'biotipo_cutaneo',
    header: 'Biotipo Cutaneo'
  },
  {
    accessorKey: 'sensibilidad',
    header: 'Sensibilidad'
  },
  {
    accessorKey: 'alergias',
    header: 'Alergias'
  },
  {
    accessorKey: 'medicamentos',
    header: 'Medicamentos'
  },
  {
    accessorKey: 'antecedentes_medicos',
    header: 'Antecedentes Medicos'
  },
  {
    accessorKey: 'plan_tratamiento',
    header: 'Plan Tratamiento'
  },
  {
    accessorKey: 'estado',
    header: 'Estado'
  },
  {
    accessorKey: 'fecha_creacion',
    header: 'Fecha Creacion'
  },
  {
    accessorKey: 'fecha_actualizacion',
    header: 'Fecha Actualizacion'
  },
  {
    accessorKey: 'fecha_eliminacion',
    header: 'Fecha Eliminacion'
  },
  {
    accessorKey: 'medicos.fecha_contratacion',
    header: 'Fecha Contratacion'
  },
  {
    accessorKey: 'medicos.fecha_creacion',
    header: 'Fecha Creacion Medico'
  },
  {
    accessorKey: 'medicos.fecha_actualizacion',
    header: 'Fecha Actualizacion Medico'
  },
  {
    accessorKey: 'medicos.fecha_eliminacion',
    header: 'Fecha Eliminacion Medico'
  },
  {
    accessorKey: 'medicos.citas',
    header: 'Citas'
  },
  {
    accessorKey: 'medicos.evaluaciones',
    header: 'Evaluaciones'
  },
  {
    accessorKey: 'medicos.gastos',
    header: 'Gastos'
  },
  {
    accessorKey: 'medicos.reportes',
    header: 'Reportes'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
