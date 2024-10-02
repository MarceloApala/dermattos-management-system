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
import { ColumnDef } from '@tanstack/react-table';
import { medicos } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '../employee-tables/cell-action';

export const columns: ColumnDef<medicos>[] = [
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
    accessorKey: 'id_medico',
    header: 'ID'
  },
  {
    accessorKey: 'nombre',
    header: 'Nombre'
  },
  {
    accessorKey: 'apellido',
    header: 'Apellido'
  },
  {
    accessorKey: 'especialidad',
    header: 'Especialidad'
  },
  {
    accessorKey: 'telefono',
    header: 'Telefono'
  },
  {
    accessorKey: 'email',
    header: 'Email'
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
    accessorKey: 'fecha_contratacion',
    header: 'Fecha Contratacion'
  },
  {
    accessorKey: 'citas',
    header: 'Citas'
  },
  {
    accessorKey: 'evaluaciones',
    header: 'Evaluaciones'
  },
  {
    accessorKey: 'gastos',
    header: 'Gastos'
  },
  {
    accessorKey: 'reportes',
    header: 'Reportes'
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
