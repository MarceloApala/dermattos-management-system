/**model gastos {
  id_gasto    Int      @id @default(autoincrement())
  descripcion String
  monto       Decimal  @db.Decimal(10, 2)
  fecha_gasto DateTime @db.Date
  categoria   String?  @db.VarChar(50)
  id_usuario  Int
  medicos     medicos  @relation(fields: [id_usuario], references: [id_medico], onDelete: NoAction, onUpdate: NoAction)
} */

'use client';
import { ColumnDef } from '@tanstack/react-table';
import { gastos } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '../employee-tables/cell-action';

export const columns: ColumnDef<gastos>[] = [
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
    accessorKey: 'id_gasto',
    header: 'ID'
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripcion'
  },
  {
    accessorKey: 'monto',
    header: 'Monto'
  },
  {
    accessorKey: 'fecha_gasto',
    header: 'Fecha de Gasto'
  },
  {
    accessorKey: 'categoria',
    header: 'Categoria'
  },
  {
    accessorKey: 'medicos.nombre',
    header: 'Medico'
  }
];
