'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { pacientes } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { format } from 'date-fns';

interface PatientClientProps {
  data: pacientes[];
}

export const PatientClient: React.FC<PatientClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Pacientes (${data.length})`}
          description="Gestionar pacientes"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/patients/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar Paciente
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="nombre" columns={columns} data={data} />
    </>
  );
};
