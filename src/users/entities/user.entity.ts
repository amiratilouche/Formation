import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
import { Node } from 'src/communs/models/node.model';

  @Entity()
  export class User extends Node{
  
    @Column({ default: '' })
    name: string;
    @Column({ default: '' })
    email: string;
    @Column({ default: '' })
    password: string;

  
    async checkPassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  }
  