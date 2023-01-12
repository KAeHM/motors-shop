import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user.entity";
import { Listing } from "./listing.entity";

@Entity("comments")
class Comment {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "text", nullable: false })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments, {
    // eager: true,
  })
  user: User;

  @ManyToOne(() => Listing, (listing) => listing.comments, {
    onDelete: "CASCADE",
  })
  listing: Listing;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Comment };
