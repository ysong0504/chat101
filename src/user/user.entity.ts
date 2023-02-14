import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 30 })
    email: string;

    @Column()
    name: string;

    // @Column({ default: true })
    // isActive: boolean;
    @Column()
    password: string;
}
