
import { INITIAL_USERS, INITIAL_BOOKS, INITIAL_TRANSACTIONS, INITIAL_TRADES, INITIAL_CHATS } from '../mock/initialData';
import { User, Book, Transaction, Trade, Chat } from '../types';

const STORAGE_KEYS = {
  USERS: 'ns_users',
  BOOKS: 'ns_books',
  TRANSACTIONS: 'ns_transactions',
  TRADES: 'ns_trades',
  CHATS: 'ns_chats'
};

class DBService {
  private get<T>(key: string, initial: T): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initial;
  }

  private set<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Users
  getUsers(): User[] { return this.get(STORAGE_KEYS.USERS, INITIAL_USERS); }
  saveUsers(users: User[]) { this.set(STORAGE_KEYS.USERS, users); }
  
  // Books
  getBooks(): Book[] { return this.get(STORAGE_KEYS.BOOKS, INITIAL_BOOKS); }
  addBook(book: Book) {
    const books = this.getBooks();
    this.set(STORAGE_KEYS.BOOKS, [...books, book]);
  }

  // Trades
  getTrades(): Trade[] { return this.get(STORAGE_KEYS.TRADES, INITIAL_TRADES); }
  createTrade(trade: Trade) {
    const trades = this.getTrades();
    this.set(STORAGE_KEYS.TRADES, [...trades, trade]);
    
    // Create empty chat for trade
    const chats = this.getChats();
    const newChat: Chat = {
      tradeId: trade.id,
      participants: [trade.fromUserId, trade.toUserId],
      messages: []
    };
    this.set(STORAGE_KEYS.CHATS, [...chats, newChat]);
  }

  // Chats
  getChats(): Chat[] { return this.get(STORAGE_KEYS.CHATS, INITIAL_CHATS); }
  addMessage(tradeId: string, message: any) {
    const chats = this.getChats();
    const chatIndex = chats.findIndex(c => c.tradeId === tradeId);
    if (chatIndex !== -1) {
      chats[chatIndex].messages.push(message);
      this.set(STORAGE_KEYS.CHATS, chats);
    }
  }

  // Transactions
  getTransactions(userId: string): Transaction[] {
    return this.get(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS).filter(t => t.userId === userId);
  }
}

export const dbService = new DBService();
