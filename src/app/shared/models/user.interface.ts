import { ID } from '@datorama/akita';

export interface UserPostInterface {
  _id: string,
  name: string
}

export interface UserInterface {
  _id: ID,
  username: string,
  email: string,
  role: 'superAdmin' | 'admin' | 'moderator' | 'user',
  rate: number,
  points: number,
  status: 'default' | 'muted' | 'banned',
  statusTill: Date | null,
  options: UserOptionsInterface,
  createdPosts: ID[]
}

interface UserOptionsInterface {
  selectedLocale: 'en' | 'ua',
  locale: string,
  showContent: 'en' | 'ua' | 'all',
  nsfw: boolean
}
