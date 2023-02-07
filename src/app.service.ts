import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';

export type DogImageResponse = {
  status: string;
  message: string;
};

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async getRandomImages(): Promise<Array<DogImageResponse>> {
    const fetchImages = [];
    for (let i = 0; i < 5; i++) {
      fetchImages.push(
        this.httpService.axiosRef
          .get('https://dog.ceo/api/breeds/image/random')
          .then(({ data }) => data),
      );
    }

    return Promise.all(fetchImages);
  }
}
