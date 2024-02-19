import dayjs from 'dayjs';
import { OfferGenerator } from '../index.js';
import { TMockServerData, OfferType } from '../../types/index.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';
import { GENERATOR_CONFIG } from '../index.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: TMockServerData) { }

  public generate(): string {
    const date = dayjs()
      .subtract(generateRandomValue(GENERATOR_CONFIG.FIRST_WEEK_DAY, GENERATOR_CONFIG.LAST_WEEK_DAY), 'day')
      .toISOString();
    const favorite = Boolean(getRandomItem<string>(this.mockData.favoriteTypes));
    const premium = Boolean(getRandomItem<string>(this.mockData.premiumTypes));
    const rating = generateRandomValue(GENERATOR_CONFIG.MIN_RATING, GENERATOR_CONFIG.MAX_RATING).toString();
    const price = generateRandomValue(GENERATOR_CONFIG.MIN_PRICE, GENERATOR_CONFIG.MAX_PRICE).toString();
    const bedrooms = getRandomItem<string>(this.mockData.bedrooms);
    const maxAdults = generateRandomValue(GENERATOR_CONFIG.MIN_ADULT_COUNT, GENERATOR_CONFIG.MAX_ADULT_COUNT).toString();
    const cityIndex = generateRandomValue(0, this.mockData.cities.length - 1);
    const city = this.mockData.cities[cityIndex];
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const previewImage = getRandomItem<string>(this.mockData.images);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const type = getRandomItem([OfferType.Apartment, OfferType.Hotel, OfferType.House, OfferType.Room]);
    const user = `${getRandomItem(this.mockData.userNames)};${getRandomItem<string>(this.mockData.userTypes)};${getRandomItem(this.mockData.userAvatars)};${getRandomItem(this.mockData.userEmails)};${getRandomItem(this.mockData.userPasswords)}`;
    const commentCount = generateRandomValue(GENERATOR_CONFIG.MIN_REVIEW_COUNT, GENERATOR_CONFIG.MAX_REVIEW_COUNT);
    const location = this.mockData.locations[cityIndex];
    const comments = getRandomItems<string>(this.mockData.userReviews, commentCount).join(';');

    return [
      date,
      title,
      description,
      city,
      previewImage,
      images,
      premium,
      favorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      user,
      commentCount,
      location,
      comments,
    ].join('\t');
  }
}
