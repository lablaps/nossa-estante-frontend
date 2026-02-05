
import { User, Book, Transaction, Trade, Chat } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_1',
    name: 'Sara Jenkins',
    email: 'sarah@example.com',
    reputation: 4.8,
    credits: 12,
    avatar: 'https://picsum.photos/seed/sarah/200'
  },
  {
    id: 'user_2',
    name: 'Maria Silva',
    email: 'maria@example.com',
    reputation: 4.9,
    credits: 250,
    avatar: 'https://picsum.photos/seed/maria/200'
  }
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'book_1',
    title: 'O Alquimista',
    author: 'Paulo Coelho',
    isbn: '978-0062315007',
    category: 'Ficção',
    language: 'Português',
    ownerId: 'user_2',
    status: 'Available',
    condition: 'Very Good',
    creditsCost: 2,
    locationApprox: 'Lisboa, PT',
    distance: '0.5km',
    photos: ['https://picsum.photos/seed/alchemist/400/600'],
    synopsis: 'Uma fábula sobre seguir seus sonhos.'
  },
  {
    id: 'book_2',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    isbn: '978-0062316097',
    category: 'História',
    language: 'Português',
    ownerId: 'user_2',
    status: 'In Exchange',
    condition: 'Good',
    creditsCost: 3,
    locationApprox: 'Lisboa, PT',
    distance: '1.2km',
    photos: ['https://picsum.photos/seed/sapiens/400/600'],
    synopsis: 'Uma breve história da humanidade.'
  },
  {
    id: 'book_3',
    title: 'Hábitos Atômicos',
    author: 'James Clear',
    isbn: '978-0735211292',
    category: 'Autoajuda',
    language: 'Português',
    ownerId: 'user_2',
    status: 'Available',
    condition: 'New',
    creditsCost: 2,
    locationApprox: 'Lisboa, PT',
    distance: '2.0km',
    photos: ['https://picsum.photos/seed/habits/400/600'],
    synopsis: 'Um método fácil e comprovado de criar bons hábitos.'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_1',
    userId: 'user_1',
    type: 'earn',
    amount: 1,
    date: '24/10/2023',
    description: 'Enviou: O Hobbit'
  },
  {
    id: 'tx_2',
    userId: 'user_1',
    type: 'spend',
    amount: 1,
    date: '20/10/2023',
    description: 'Recebeu: Duna'
  }
];

export const INITIAL_TRADES: Trade[] = [];
export const INITIAL_CHATS: Chat[] = [];
