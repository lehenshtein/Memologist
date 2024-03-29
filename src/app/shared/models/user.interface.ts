import { ID } from '@datorama/akita';
import { marks } from '@shared/models/post.interface';

export interface UserPostInterface {
  _id: string,
  name: string
}

export type roles = 'superAdmin' | 'admin' | 'moderator' | 'user';
export type statuses = 'default' | 'muted' | 'banned';

export interface UserInterface {
  _id: ID,
  name: string,
  email: string,
  role: roles,
  rate: number,
  points: number,
  status: statuses,
  statusTill: Date | null,
  options: UserOptionsInterface,
  createdPosts: ID[],
  markedPosts: { [key: string]: marks },
  markedComments: { [key: string]: marks },
  verified: boolean,
  verificationDate: Date,
  createdAt: Date
}

interface UserOptionsInterface {
  selectedLocale: 'en' | 'ua',
  locale: string,
  showContent: 'en' | 'ua' | 'all',
  nsfw: boolean
}

export interface UserLoginInterface {
  email: string,
  password: string
}

export interface UserRegisterInterface extends UserLoginInterface {
  name: string
}

export interface UserTokenInterface {
  name: string | null,
  email: string | null,
  expirationDate: Date | null,
  tokenExpired: boolean
}
