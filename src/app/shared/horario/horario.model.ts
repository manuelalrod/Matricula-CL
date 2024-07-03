export class HorarioModel{
    constructor(
        public id: string,
        public curso_id: string,
        public dia: ('Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'),
        public hora_inicio: string,
        public hora_fin: string
    ) {}
}