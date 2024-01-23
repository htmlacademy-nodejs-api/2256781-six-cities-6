import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { TMockServerData, OfferType } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_PRICE = 50;
const MAX_PRICE = 2000;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ADULT_COUNT = 1;
const MAX_ADULT_COUNT = 5;

const MIN_REVIEW_COUNT = 0;
const MAX_REVIEW_COUNT = 4;


const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: TMockServerData) { }

  public generate(): string {
    let userNames: string;
    let userAvatars: string;
    let userEmails: string;
    let userReviews: string;
    const date = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const favorite = Boolean(getRandomItem<string>(this.mockData.favoriteTypes));
    const premium = Boolean(getRandomItem<string>(this.mockData.premiumTypes));
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const zoom = getRandomItem<string>(this.mockData.zooms);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const bedroom = getRandomItem<string>(this.mockData.bedrooms);
    const maxAdultCount = generateRandomValue(MIN_ADULT_COUNT, MAX_ADULT_COUNT).toString();
    const cityIndex = generateRandomValue(0, this.mockData.cities.length);
    const city = this.mockData.cities[cityIndex];
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const preview = getRandomItem<string>(this.mockData.previews);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const type = getRandomItem([OfferType.Apartment, OfferType.Hotel, OfferType.House, OfferType.Room]);
    const coords = this.mockData.coords[cityIndex];
    const hostName = getRandomItem(this.mockData.names);
    const hostPro = Boolean(getRandomItem<string>(this.mockData.hostProTypes));
    const hostType = getRandomItem(this.mockData.hostTypes);
    const hostAvatar = getRandomItem(this.mockData.hostAvatars);
    const reviewCount = generateRandomValue(MIN_REVIEW_COUNT, MAX_REVIEW_COUNT);
    if (reviewCount > 0) {
      userNames = getRandomItems<string>(this.mockData.names, reviewCount).join(';');
      userAvatars = getRandomItems<string>(this.mockData.userAvatars, reviewCount).join(';');
      userEmails = getRandomItems<string>(this.mockData.userEmails, reviewCount).join(';');
      userReviews = getRandomItems<string>(this.mockData.userReviews, reviewCount).join(';');
    } else {
      userNames = '';
      userAvatars = '';
      userEmails = '';
      userReviews = '';
    }

    return [
      date,
      favorite,
      premium,
      rating,
      zoom,
      price,
      bedroom,
      maxAdultCount,
      city,
      title,
      description,
      preview,
      goods,
      type,
      coords,
      hostName,
      hostPro,
      hostType,
      hostAvatar,
      userNames,
      userAvatars,
      userEmails,
      userReviews,
    ].join('\t');
  }
}
