
import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { authService } from '../services/authService';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import ReferenceButtons from '../components/ReferenceButtons';

const MyShelf: React.FC = () => {
  const user = authService.getCurrentUser();
  const allBooks = dbService.getBooks();
  const myBooks = allBooks.filter(b => b.ownerId === user?.id);
  const [filter, setFilter] = useState('Todos');

  const filteredBooks = filter === 'Todos' ? myBooks : myBooks.filter(b => b.status === (filter === 'Disponíveis' ? 'Available' : 'In Exchange'));

  return (
    <Layout>
      <ReferenceButtons pngUrl="https://picsum.photos/400/800" />
      <div className="p-6 md:p-12 space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight dark:text-white">Minha Estante</h1>
            <p className="text-text-muted font-medium">Gerencie sua coleção e acompanhe suas trocas ativas.</p>
          </div>
          <Link to="/cadastrar-livro" className="px-8 py-4 bg-black dark:bg-primary text-white dark:text-black font-bold rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:-translate-y-1 transition-all">
            <span className="material-symbols-outlined font-bold">add</span>
            Cadastrar Novo Livro
          </Link>
        </header>

        {/* Dashboard Mini Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total de Livros', val: myBooks.length, icon: 'auto_stories', color: 'bg-blue-500' },
            { label: 'Disponíveis', val: myBooks.filter(b => b.status === 'Available').length, icon: 'check_circle', color: 'bg-primary' },
            { label: 'Em Troca', val: myBooks.filter(b => b.status === 'In Exchange').length, icon: 'swap_horiz', color: 'bg-amber-500' },
            { label: 'Créditos Ganhos', val: 12, icon: 'token', color: 'bg-emerald-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm flex items-center gap-5">
              <div className={`size-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <span className="material-symbols-outlined filled">{stat.icon}</span>
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black dark:text-white">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Grid */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-black/5 dark:border-white/5 pb-1 overflow-x-auto no-scrollbar">
            {['Todos', 'Disponíveis', 'Em Troca'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`pb-4 px-2 text-sm font-bold transition-all relative ${filter === f ? 'text-primary' : 'text-text-muted hover:text-text-main dark:hover:text-white'}`}
              >
                {f}
                {filter === f && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"></div>}
              </button>
            ))}
          </div>

          {filteredBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-surface-dark rounded-[40px] border-2 border-dashed border-black/5 dark:border-white/10">
              <span className="material-symbols-outlined text-6xl text-text-muted/30 mb-4">import_contacts</span>
              <p className="text-text-muted font-bold">Nenhum livro encontrado nesta categoria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {filteredBooks.map(book => (
                <div key={book.id} className="group cursor-pointer">
                  <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-xl mb-4 group-hover:-translate-y-2 transition-all duration-500 ring-1 ring-black/5">
                    <img src={book.photos[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                    <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg ${
                      book.status === 'Available' ? 'bg-primary text-black' : 'bg-amber-400 text-amber-950'
                    }`}>
                      {book.status === 'Available' ? 'Disponível' : 'Em Troca'}
                    </div>
                  </div>
                  <div className="px-2">
                    <h3 className="font-bold text-base dark:text-white truncate">{book.title}</h3>
                    <p className="text-sm text-text-muted font-medium mb-3">{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyShelf;
