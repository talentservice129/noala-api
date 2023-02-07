import { Controller, Get, Post, Query, Session } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger/dist';
import { AppService, DogImageResponse } from './app.service';

class AddToFavQueryDto {
  @ApiProperty({
    description: 'URL of the image to add to list',
  })
  image: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getImages(@Session() session) {
    const images = await this.appService.getRandomImages();
    // console.log(session.favlist);
    return images.map((image: DogImageResponse) => {
      return {
        url: image.message,
        addedToFav: session.favlist?.includes(image.message),
      };
    });
  }

  @Post()
  addImageToFav(@Session() session, @Query() query: AddToFavQueryDto) {
    if (!session.favlist) {
      session.favlist = [];
    }
    session.favlist.push(query.image);
    return session.favlist;
  }
}
