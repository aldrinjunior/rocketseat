import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// Quando utiliza o decorator, significa que ele pega todo o
// codigo e indica que essa classe precisa ser armazenada na tab de appointments
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;

// como falar para o Typescript que o contructor vai receber todas as variaveis, menos o id
