import { IFileReader } from '../index.js';
import { readFileSync } from 'node:fs';
import { OfferType, TCity, TOffers, TUserType } from '../../types/index.js';
import { OfferGood } from '../../types/offer-good.enum.js';

export class TSVFileReader implements IFileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) { }

  public read(): void {
    if (!this.filename) {
      throw new Error('The file name is not specified');
    }

    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): TOffers {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([id, date, title, description, city, previewImage, images, isPremium, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, comments, location]) => ({
        id,
        date: new Date(date),
        title,
        description,
        city: city as TCity,
        previewImage,
        images: images.split(';'),
        isPremium: Boolean(isPremium),
        isFavorite: Boolean(isFavorite),
        rating: parseFloat(rating),
        type: OfferType[type as OfferType],
        bedrooms: parseInt(bedrooms, 10),
        maxAdults: parseInt(maxAdults, 10),
        price: parseInt(price, 10),
        goods: goods.split(';') as OfferGood[],
        host: {
          name: host.split(';')[0],
          type: host.split(';')[1] as TUserType,
          avatarUrl: host.split(';')[2],
          email: host.split(';')[3],
          password: host.split(';')[4],
        },
        comments: parseInt(comments, 10),
        location: {
          latitude: parseFloat(location.split(';')[0]),
          longitude: parseFloat(location.split(';')[1])
        },
      }));
  }
}
