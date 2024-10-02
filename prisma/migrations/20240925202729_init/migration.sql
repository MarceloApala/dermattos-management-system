-- CreateTable
CREATE TABLE "citas" (
    "id_cita" SERIAL NOT NULL,
    "id_paciente" INTEGER NOT NULL,
    "id_medico" INTEGER NOT NULL,
    "fecha_cita" DATE NOT NULL,
    "hora_cita" TIME(6) NOT NULL,
    "estado" VARCHAR(20) DEFAULT 'programada',
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_eliminacion" TIMESTAMP(6),
    "tipo_tratamiento" VARCHAR(100),
    "comentarios" TEXT,

    CONSTRAINT "citas_pkey" PRIMARY KEY ("id_cita")
);

-- CreateTable
CREATE TABLE "evaluaciones" (
    "id_evaluacion" SERIAL NOT NULL,
    "id_paciente" INTEGER NOT NULL,
    "id_medico" INTEGER NOT NULL,
    "fecha_evaluacion" DATE NOT NULL,
    "fototipo_piel" VARCHAR(50),
    "biotipo_cutaneo" VARCHAR(50),
    "sensibilidad" VARCHAR(50),
    "alergias" TEXT,
    "medicamentos" TEXT,
    "antecedentes_medicos" TEXT,
    "plan_tratamiento" TEXT,
    "estado" VARCHAR(20) DEFAULT 'activo',
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_eliminacion" TIMESTAMP(6),

    CONSTRAINT "evaluaciones_pkey" PRIMARY KEY ("id_evaluacion")
);

-- CreateTable
CREATE TABLE "gastos" (
    "id_gasto" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "fecha_gasto" DATE NOT NULL,
    "categoria" VARCHAR(50),
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "gastos_pkey" PRIMARY KEY ("id_gasto")
);

-- CreateTable
CREATE TABLE "inventario" (
    "id_producto" SERIAL NOT NULL,
    "nombre_producto" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "cantidad" INTEGER NOT NULL,
    "fecha_vencimiento" DATE,
    "precio_compra" DECIMAL(10,2),
    "precio_venta" DECIMAL(10,2),
    "proveedor" VARCHAR(100),
    "estado" VARCHAR(20) DEFAULT 'activo',
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_eliminacion" TIMESTAMP(6),

    CONSTRAINT "inventario_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "medicos" (
    "id_medico" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "especialidad" VARCHAR(100),
    "telefono" VARCHAR(20),
    "email" VARCHAR(100),
    "estado" VARCHAR(20) DEFAULT 'activo',
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_eliminacion" TIMESTAMP(6),
    "fecha_contratacion" DATE,

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("id_medico")
);

-- CreateTable
CREATE TABLE "movimientos_inventario" (
    "id_movimiento" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "fecha_movimiento" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "tipo_movimiento" VARCHAR(20) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "comentarios" TEXT,

    CONSTRAINT "movimientos_inventario_pkey" PRIMARY KEY ("id_movimiento")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id_paciente" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "direccion" VARCHAR(255),
    "telefono" VARCHAR(20),
    "email" VARCHAR(100),
    "genero" VARCHAR(20),
    "estado" VARCHAR(20) DEFAULT 'activo',
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_eliminacion" TIMESTAMP(6),
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id_paciente")
);

-- CreateTable
CREATE TABLE "reportes" (
    "id_reporte" SERIAL NOT NULL,
    "tipo_reporte" VARCHAR(20) NOT NULL,
    "fecha_generacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "generado_por" INTEGER NOT NULL,

    CONSTRAINT "reportes_pkey" PRIMARY KEY ("id_reporte")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "nombre_usuario" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "rol" VARCHAR(20) NOT NULL,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "medicos"("id_medico") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes"("id_paciente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evaluaciones" ADD CONSTRAINT "evaluaciones_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "medicos"("id_medico") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evaluaciones" ADD CONSTRAINT "evaluaciones_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes"("id_paciente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gastos" ADD CONSTRAINT "gastos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "medicos"("id_medico") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movimientos_inventario" ADD CONSTRAINT "movimientos_inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "inventario"("id_producto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_generado_por_fkey" FOREIGN KEY ("generado_por") REFERENCES "medicos"("id_medico") ON DELETE NO ACTION ON UPDATE NO ACTION;
