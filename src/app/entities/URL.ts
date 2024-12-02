import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('urls')
class URL {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', {nullable: false})
    original_url: string;

    @Column('varchar', {nullable: false, unique: true})
    alias: string;

    @Column('varchar', {nullable: false})
    shortened_url: string;

    @Column('int', { default: 0 }) 
    access_count: number; // Contador de acessos
}

export default URL;