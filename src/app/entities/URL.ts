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
}

export default URL;