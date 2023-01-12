import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Listing } from "./listing.entity";
import { Comment } from "./comment.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", nullable: false, length: 25 })
  name: string;

  @Column({ type: "varchar", nullable: false, unique: true, length: 50 })
  email: string;

  @Exclude()
  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "bool", nullable: false })
  isSeller: boolean;

  @Column({ type: "varchar", length: 11, nullable: false, unique: true })
  cpf: string;

  @Column({ type: "varchar", length: 14, nullable: false })
  phone: string;

  @Column({ type: "date", nullable: false })
  birthdate: Date;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar", nullable: false, length: 10 })
  cep: string;

  @Column({ type: "varchar", nullable: false, length: 25 })
  state: string;

  @Column({ type: "varchar", nullable: false, length: 25 })
  city: string;

  @Column({ type: "varchar", nullable: false, length: 25 })
  street: string;

  @Column({ type: "varchar", length: 5, nullable: false })
  number: string;

  @Column({ type: "text", nullable: true })
  complement: string;

  @OneToMany((type) => Listing, (listing) => listing.user)
  listings: Listing[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
