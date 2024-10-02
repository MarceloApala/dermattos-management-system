'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { evaluaciones } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { format } from 'date-fns';

interface EvaluationsClientProps {
  data: evaluaciones[];
}

export const EvaluationsClient: React.FC<EvaluationsClientProps> = ({
  data
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Citas (${data.length})`}
          description="Gestionar citas"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/appointments/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar Cita
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="evaluacion" columns={columns} data={data} />
    </>
  );
};
