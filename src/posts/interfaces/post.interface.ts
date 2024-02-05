import { User } from 'src/users/schemas/users.schema';

export interface Post {
  
  title: string;

  content: string;

  categories: string[];

  authorId: User;
}
