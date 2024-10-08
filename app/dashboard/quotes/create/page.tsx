/**model citas {
  id_cita             Int       @id @default(autoincrement())
  id_paciente         Int
  id_medico           Int
  fecha_cita          DateTime  @db.Date
  hora_cita           DateTime  @db.Time(6)
  estado              String?   @default("programada") @db.VarChar(20)
  fecha_creacion      DateTime? @default(now()) @db.Timestamp(6)
  fecha_actualizacion DateTime? @default(now()) @db.Timestamp(6)
  fecha_eliminacion   DateTime? @db.Timestamp(6)
  tipo_tratamiento    String?   @db.VarChar(100)
  comentarios         String?
  medicos             medicos   @relation(fields: [id_medico], references: [id_medico], onDelete: NoAction, onUpdate: NoAction)
  pacientes           pacientes @relation(fields: [id_paciente], references: [id_paciente], onDelete: NoAction, onUpdate: NoAction)
} */
'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import * as z from 'zod';
import BreadCrumb from '@/components/breadcrumb';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { id } from 'date-fns/locale';

const QuoteSchema = z.object({
  id_paciente: z.string(),
  id_medico: z.string(),
  fecha_cita: z.string(),
  hora_cita: z.string(),
  estado: z.string(),
  tipo_tratamiento: z.string(),
  comentarios: z.string()
});

type QuoteFormValues = z.infer<typeof QuoteSchema>;

interface QuoteFormProps {
  initialValues?: any | null;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ initialValues }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(QuoteSchema),
    defaultValues: initialValues || {
      id_paciente: 0,
      id_medico: 0,
      fecha_cita: '',
      hora_cita: '',
      estado: '',
      tipo_tratamiento: '',
      comentarios: ''
    }
  });
  const {
    handleSubmit,
    formState: { errors },
    control
  } = form;

  const onSubmit = async (data: QuoteFormValues) => {
    setLoading(true);
    const formattedHoraCita = new Date(
      `1970-01-01T${data.hora_cita}:00`
    ).toISOString();
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          id_paciente: Number(data.id_paciente),
          id_medico: Number(data.id_medico),
          fecha_cita: new Date(data.fecha_cita).toISOString(),
          hora_cita: formattedHoraCita,
          estado: data.estado,
          tipo_tratamiento: data.tipo_tratamiento,
          comentarios: data.comentarios
        })
      });
      if (response.ok) {
        router.push('/dashboard/quotes');
      } else {
        console.error('Error al guardar la cita');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const breadCrumbItems = [{ title: 'Citas', link: '/dashboard/quotes' }];
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadCrumbItems} />
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="id_paciente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paciente</FormLabel>
                <Input {...field} />
                <FormMessage>{errors.id_paciente?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="id_medico"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Médico</FormLabel>
                <Input {...field} />
                <FormMessage>{errors.id_medico?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="fecha_cita"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de la cita</FormLabel>
                <Input type="date" {...field} />
                <FormMessage>{errors.fecha_cita?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="hora_cita"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora de la cita</FormLabel>
                <Input type="time" {...field} />
                <FormMessage>{errors.hora_cita?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Input {...field} />
                <FormMessage>{errors.estado?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="tipo_tratamiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de tratamiento</FormLabel>
                <Input {...field} />
                <FormMessage>{errors.tipo_tratamiento?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="comentarios"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentarios</FormLabel>
                <Input {...field} />
                <FormMessage>{errors.comentarios?.message}</FormMessage>
              </FormItem>
            )}
          />
          <br />
          <Button
            className="w-20 text-xs md:text-sm"
            type="submit"
            disabled={loading}
          >
            Guardar
          </Button>
          <span className="mx-2"></span>
          <Button
            className="w-20 text-xs md:text-sm"
            type="button"
            onClick={() => router.push('/dashboard/quotes')}
            disabled={loading}
          >
            Cancelar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuoteForm;
