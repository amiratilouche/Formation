import { Node } from 'src/communs/models/node.model';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo extends Node {
  

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;
 
}
