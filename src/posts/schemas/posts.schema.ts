import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/users/schemas/users.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: String, required: true, index: 'text' })
  title: string;

  @Prop({ type: String, required: true, index: 'text' })
  content: string;

  @Prop({ type: [String], required: true })
  categories: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
