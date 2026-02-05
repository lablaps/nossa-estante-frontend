
import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ReferenceButtons from '../components/ReferenceButtons';

const Home: React.FC = () => {
  const books = dbService.getBooks();
  const [activeBook, setActiveBook] = useState(books[0]);

  return (
    <Layout>
      <ReferenceButtons pngUrl="https://picsum.photos/400/800" />
      
      <div className="flex flex-col md:flex-row h-full md:h-screen bg-background-light dark:bg-background-dark overflow-hidden">
        
        {/* Lado Esquerdo: Painel Desktop / Header Mobile */}
        <div className="w-full md:w-[400px] flex flex-col h-full bg-white dark:bg-surface-dark border-r border-black/5 dark:border-white/5 z-10 shrink-0">
          <header className="p-6 space-y-6">
            <div className="flex items-center justify-between md:hidden">
               <h1 className="text-2xl font-extrabold tracking-tight dark:text-white">Nossa Estante</h1>
               <span className="material-symbols-outlined text-primary text-3xl filled">account_circle</span>
            </div>

            <div className="space-y-1">
              <h1 className="hidden md:block text-2xl font-black dark:text-white tracking-tight">Explore a Comunidade</h1>
              <p className="text-sm text-text-muted font-medium">Encontre sua próxima leitura por perto.</p>
            </div>

            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">search</span>
              <input 
                type="text" 
                placeholder="Título, autor ou ISBN..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 ring-1 ring-black/5 dark:ring-white/10 bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary shadow-sm text-sm font-medium transition-all"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {['Distância', 'Ficção', 'História', 'Autoajuda'].map((cat, i) => (
                <button key={i} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${i === 0 ? 'bg-primary border-primary text-black' : 'bg-white dark:bg-background-dark border-black/5 dark:border-white/10 text-text-muted'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-6 pb-20 md:pb-6 space-y-4 no-scrollbar">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-text-muted">Disponíveis Agora</h2>
              <span className="text-xs font-bold text-primary">{books.length} Livros</span>
            </div>
            
            {books.map(book => (
              <Link 
                key={book.id} 
                to={`/livro/${book.id}`}
                onMouseEnter={() => setActiveBook(book)}
                className={`flex gap-4 p-3 rounded-2xl border transition-all group ${activeBook?.id === book.id ? 'bg-primary/5 border-primary shadow-sm' : 'bg-white dark:bg-background-dark border-black/5 dark:border-white/10 hover:border-black/10'}`}
              >
                <div className="size-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
                  <img src={book.photos[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h3 className="font-bold text-sm truncate dark:text-white group-hover:text-primary transition-colors">{book.title}</h3>
                  <p className="text-xs text-text-muted truncate mb-2">{book.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded-full text-text-muted">{book.distance}</span>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-sm filled">token</span>
                      <span className="text-xs font-black dark:text-white">{book.creditsCost}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Lado Direito: Mapa */}
        <div className="flex-1 relative bg-gray-100 dark:bg-background-dark overflow-hidden order-first md:order-last h-[300px] md:h-full">
          <div className="absolute inset-0 bg-[#E5E3DF] dark:bg-[#1B2721]">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000" 
              className="w-full h-full object-cover opacity-20 dark:opacity-10 mix-blend-multiply dark:mix-blend-overlay grayscale" 
              alt="" 
            />
          </div>

          {books.map((book, i) => (
            <button 
              key={book.id}
              className={`absolute transition-all duration-500 hover:scale-110 z-10 ${activeBook?.id === book.id ? 'scale-125 z-20' : 'opacity-80'}`}
              style={{ 
                left: `${20 + (i * 15) + (i % 2 === 0 ? 5 : -5)}%`, 
                top: `${30 + (i * 10) + (i % 3 === 0 ? 10 : -10)}%` 
              }}
              onClick={() => setActiveBook(book)}
            >
              <div className="relative group">
                <div className={`size-12 rounded-2xl border-4 border-white dark:border-surface-dark shadow-2xl overflow-hidden transition-all ${activeBook?.id === book.id ? 'ring-4 ring-primary' : ''}`}>
                  <img src={book.photos[0]} className="w-full h-full object-cover" alt="" />
                </div>
              </div>
            </button>
          ))}

          {/* Controles do Mapa */}
          <div className="absolute right-6 top-6 flex flex-col gap-2">
            <button className="size-12 bg-white dark:bg-surface-dark rounded-2xl shadow-xl flex items-center justify-center"><span className="material-symbols-outlined">add</span></button>
            <button className="size-12 bg-white dark:bg-surface-dark rounded-2xl shadow-xl flex items-center justify-center"><span className="material-symbols-outlined">remove</span></button>
          </div>

          {activeBook && (
            <div className="md:hidden absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-black/5 flex gap-4">
               <img src={activeBook.photos[0]} className="size-20 rounded-xl object-cover shadow-md" alt="" />
               <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="font-bold text-sm truncate dark:text-white">{activeBook.title}</h3>
                  <p className="text-xs text-text-muted truncate mb-2">{activeBook.author}</p>
                  <Link to={`/livro/${activeBook.id}`} className="bg-primary text-black text-center py-2 rounded-xl text-xs font-bold">Ver Detalhes</Link>
               </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
