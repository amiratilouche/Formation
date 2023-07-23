import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';

  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ default: '' })
    name: string;
    @Column({ default: '' })
    email: string;
    @Column({ default: '' })
    password: string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    async checkPassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  }
  