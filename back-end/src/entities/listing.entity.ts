import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity('listings')
class Listing {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, default: 'Venda' })
  listingType: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  year: number;

  @Column({ type: 'int', nullable: false })
  km: number;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: false, default: 'Car' })
  typeVehicle: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  coverImage: string;

  @ManyToOne(() => User, (user) => user.listings, {
     eager: true,
  })
  user: User;

  @OneToMany((type) => Comment, (comment) => comment.listing, {
    // eager: true,
  })
  comments: Comment[];

  // @OneToMany((type) => Images, image => image.listing, {
  //     eager: true
  // })
  // images: Images[]

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Listing };
