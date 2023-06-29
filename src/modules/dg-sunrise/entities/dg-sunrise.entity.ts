import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DgSunrise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  email: string;
}
