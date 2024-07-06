export class SolicitudModel {
    constructor(
        public id: string,
        public curso_id: string,
        public estudiante_id: string,
        public estado: 'Pendiente' | 'Aprobado' | 'Rechazado'
    ) {}
}