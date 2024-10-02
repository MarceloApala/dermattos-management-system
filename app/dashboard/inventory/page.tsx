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
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import BreadCrumb from '@/components/breadcrumb';
import { InventoryClient } from '@/components/tables/inventory-tables/inventory';

interface Inventory {
  id_producto: number;
  nombre_producto: string;
  descripcion: string;
  cantidad: number;
  fecha_vencimiento: Date;
  precio_compra: number;
  precio_venta: number;
  proveedor: string;
  estado: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_eliminacion: Date;
}

const breadcrumbItems = [{ title: 'Inventario', link: '/dashboard/inventory' }];

export default function page() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await axios.get<Inventory[]>('/api/inventory');
        setInventory(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchInventory();
  }, []);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <InventoryClient data={inventory} />
      </div>
    </>
  );
}
