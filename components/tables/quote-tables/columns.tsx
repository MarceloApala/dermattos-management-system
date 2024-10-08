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
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { citas } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '../employee-tables/cell-action';
export const columns: ColumnDef<citas>[] = [
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
    accessorKey: 'id_cita',
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
    accessorKey: 'fecha_cita',
    header: 'Fecha',
    cell: ({ row }) => new Date(row.original.fecha_cita).toLocaleDateString()
  },
  {
    accessorKey: 'hora_cita',
    header: 'Hora',
    cell: ({ row }) => new Date(row.original.hora_cita).toLocaleTimeString()
  },
  {
    accessorKey: 'estado',
    header: 'Estado'
  },
  {
    accessorKey: 'tipo_tratamiento',
    header: 'Tratamiento'
  },
  {
    accessorKey: 'comentarios',
    header: 'Comentarios'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  },
  {
    accessorKey: 'cita',
    header: 'Citas',
    cell: ({ row }) => row.original.comentarios
  }
];
