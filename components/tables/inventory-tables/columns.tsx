/**model inventario {
  id_producto            Int                      @id @default(autoincrement())
  nombre_producto        String                   @db.VarChar(100)
  descripcion            String?
  cantidad               Int
  fecha_vencimiento      DateTime?                @db.Date
  precio_compra          Decimal?                 @db.Decimal(10, 2)
  precio_venta           Decimal?                 @db.Decimal(10, 2)
  proveedor              String?                  @db.VarChar(100)
  estado                 String?                  @default("activo") @db.VarChar(20)
  fecha_creacion         DateTime?                @default(now()) @db.Timestamp(6)
  fecha_actualizacion    DateTime?                @default(now()) @db.Timestamp(6)
  fecha_eliminacion      DateTime?                @db.Timestamp(6)
  movimientos_inventario movimientos_inventario[]
} */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { inventario } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '../employee-tables/cell-action';

export const columns: ColumnDef<inventario>[] = [
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
    accessorKey: 'id_producto',
    header: 'ID'
  },
  {
    accessorKey: 'nombre_producto',
    header: 'Nombre'
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripcion'
  },
  {
    accessorKey: 'cantidad',
    header: 'Cantidad'
  },
  {
    accessorKey: 'fecha_vencimiento',
    header: 'Fecha de Vencimiento'
  },
  {
    accessorKey: 'precio_compra',
    header: 'Precio de Compra'
  },
  {
    accessorKey: 'precio_venta',
    header: 'Precio de Venta'
  },
  {
    accessorKey: 'proveedor',
    header: 'Proveedor'
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
    accessorKey: 'movimientos_inventario',
    header: 'Movimientos de Inventario'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
