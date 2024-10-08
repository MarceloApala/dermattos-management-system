'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { citas } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { format } from 'date-fns';

interface QuotesClientProps {
  data: citas[];
}
export const QuotesClient: React.FC<QuotesClientProps> = ({ data }) => {
  const router = useRouter();

  const today = format(new Date(), 'yyyy-MM-dd');
  const totalQuotes = data.filter(
    (quote) => format(new Date(quote.fecha_cita), 'yyyy-MM-dd') === today
  ).length;
  const scheduledQuotes = data.filter(
    (quote) =>
      quote.estado === 'programada' &&
      format(new Date(quote.fecha_cita), 'yyyy-MM-dd') === today
  ).length;
  const attendedQuotes = data.filter(
    (quote) =>
      quote.estado === 'atendida' &&
      format(new Date(quote.fecha_cita), 'yyyy-MM-dd') === today
  ).length;
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Citas (${data.length})`}
          description="Gestionar citas"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/quotes/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar Cita
        </Button>
      </div>
      <Separator />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium tracking-tight">Total</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{totalQuotes}</div>
            <p className="text-xs text-muted-foreground"> Total de Citas Hoy</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium tracking-tight">Programadas</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{scheduledQuotes}</div>
            <p className="text-xs text-muted-foreground">
              Citas Programadas Hoy
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium tracking-tight">Atendidos</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{attendedQuotes}</div>
            <p className="text-xs text-muted-foreground">Citas Atendidas Hoy</p>
          </div>
        </div>
      </div>
      <DataTable searchKey="cita" columns={columns} data={data} />
    </>
  );
};
