import { Controller, Get, Post, Query, Session } from '@nestjs/common';
import { AppService, DogImageResponse } from './app.service';

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
  addImageToFav(@Session() session, @Query() query) {
    if (!session.favlist) {
      session.favlist = [];
    }
    session.favlist.push(query.image);
    return session.favlist;
  }
}
