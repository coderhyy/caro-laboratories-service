import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DgSunrise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: 'simple-json' })
  zh: Record<string, unknown>;

  @Column({ type: 'simple-json' })
  en: Record<string, unknown>;
}
