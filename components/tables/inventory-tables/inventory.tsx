'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { inventario } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { format } from 'date-fns';

interface InventoryClientProps {
  data: inventario[];
}

export const InventoryClient: React.FC<InventoryClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Inventario (${data.length})`}
          description="Gestionar inventario"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/inventory/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar Producto
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="producto" columns={columns} data={data} />
    </>
  );
};
