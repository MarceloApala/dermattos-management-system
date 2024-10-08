'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BreadCrumb from '@/components/breadcrumb';
import { BillsClient } from '@/components/tables/bill-tables/bill';
import PageContainer from '@/components/layout/page-container';
/**model gastos {
  id_gasto    Int      @id @default(autoincrement())
  descripcion String
  monto       Decimal  @db.Decimal(10, 2)
  fecha_gasto DateTime @db.Date
  categoria   String?  @db.VarChar(50)
  id_usuario  Int
  medicos     medicos  @relation(fields: [id_usuario], references: [id_medico], onDelete: NoAction, onUpdate: NoAction)
}
 */
interface Gastos {
  id_gasto: number;
  descripcion: string;
  monto: number;
  fecha_gasto: Date;
  categoria: string;
  id_usuario: number;
}

const breadcrumbItems = [{ title: 'Gastos', link: '/dashboard/bills' }];

export default function page() {
  const [gastos, setGastos] = useState<Gastos[]>([]);
  useEffect(() => {
    async function fetchGastos() {
      try {
        const response = await axios.get<Gastos[]>('/api/bills');
        setGastos(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchGastos();
  }, []);
  return (
    <>
      <PageContainer scrollable={true}>
        <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <BillsClient data={gastos} />
        </div>
      </PageContainer>
    </>
  );
}
