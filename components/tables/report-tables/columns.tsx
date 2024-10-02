/**model reportes {
  id_reporte       Int       @id @default(autoincrement())
  tipo_reporte     String    @db.VarChar(20)
  fecha_generacion DateTime? @default(now()) @db.Timestamp(6)
  generado_por     Int
  medicos          medicos   @relation(fields: [generado_por], references: [id_medico], onDelete: NoAction, onUpdate: NoAction)
} */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { reportes } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '../employee-tables/cell-action';

export const columns: ColumnDef<reportes>[] = [
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
    accessorKey: 'id_reporte',
    header: 'ID'
  },
  {
    accessorKey: 'tipo_reporte',
    header: 'Tipo de Reporte'
  },
  {
    accessorKey: 'medicos.nombre',
    header: 'Medico'
  },
  {
    accessorKey: 'fecha_generacion',
    header: 'Fecha de Generacion'
  },
  {
    accessorKey: 'fecha_generacion',
    header: 'Hora de Generacion'
  },
  {
    accessorKey: 'fecha_generacion',
    header: 'Fecha y Hora de Generacion'
  },
  {
    accessorKey: 'fecha_generacion',
    header: 'Fecha y Hora de Generacion'
  },
  {
    accessorKey: 'fecha_generacion',
    header: 'Fecha y Hora de Generacion'
  },
  {
    accessorKey: 'fecha_generacion',
    header: 'Fecha y Hora de Generacion'
  },
  {
    accessorKey: 'fecha_generacion',
    header: 'Fecha y Hora de Generacion'
  },
  {
    accessorKey: 'fecha_generacion',
    header: 'Fecha y Hora de Generacion'
  },
  {
    accessorKey: 'fecha_generacion',
    header: 'Fecha y Hora de Generacion'
  },
  {
    accessorKey: 'fecha_generacion',
    header: 'Fecha y Hora de Generacion'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
