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
import { ColumnDef } from '@tanstack/react-table';
import { pacientes } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '../employee-tables/cell-action';

export const columns: ColumnDef<pacientes>[] = [
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
    accessorKey: 'id_paciente',
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
    accessorKey: 'fecha_nacimiento',
    header: 'Fecha de Nacimiento'
  },
  {
    accessorKey: 'direccion',
    header: 'Direccion'
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
    accessorKey: 'genero',
    header: 'Genero'
  },
  {
    accessorKey: 'estado',
    header: 'Estado'
  },
  {
    accessorKey: 'fecha_creacion',
    header: 'Fecha de Creacion'
  },
  {
    accessorKey: 'fecha_actualizacion',
    header: 'Fecha de Actualizacion'
  },
  {
    accessorKey: 'fecha_eliminacion',
    header: 'Fecha de Eliminacion'
  },
  {
    accessorKey: 'fecha_registro',
    header: 'Fecha de Registro'
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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
