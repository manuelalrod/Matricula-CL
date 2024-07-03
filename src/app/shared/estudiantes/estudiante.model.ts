export class EstudianteModel {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public dni: string,
    public edad: number,
    public prueba: 'Si' | 'No',
    public email: string
  ) {}
}

  