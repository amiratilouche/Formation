import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class Node extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;
}