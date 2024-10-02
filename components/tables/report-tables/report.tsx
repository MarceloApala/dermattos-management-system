'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { reportes } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { format } from 'date-fns';

interface ReportsClientProps {
  data: reportes[];
}

export const ReportsClient: React.FC<ReportsClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Reportes (${data.length})`}
          description="Gestionar reportes"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/reports/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar Reporte
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="reporte" columns={columns} data={data} />
    </>
  );
};
