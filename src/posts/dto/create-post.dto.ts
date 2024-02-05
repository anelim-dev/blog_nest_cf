import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';


export class CreatePostDto {


  @ApiProperty({
    example: 'Perspiration and its importance in yoga.',
    description: 'Title of the blog post.',
    required: true,
 })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'Lorem impsun dolor sit amet, consectetur adipiscing elit. Nulla nec purus ut nunc.',
    description: 'Content of the blog post.',
    required: true,
  })
  @IsString()
  readonly content: string;

  @ApiProperty({
    example: 'Yoga, Health, Fitness',
    description: 'Categories of the blog post.',
    required: true,
    type: [String] 
  })
  @IsString({ each: true })
  readonly categories: string[];

  @ApiProperty({
    example: '65bfdfd03fe499054b5d8025',
    description: 'Mongo Id of the author of the blog post.',
    required: true,
  })
  @IsString()
  readonly authorId: ObjectId;
}
