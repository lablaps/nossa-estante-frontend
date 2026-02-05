
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../services/dbService';
import { authService } from '../services/authService';
import Layout from '../components/Layout';
import { Book } from '../types';
import ReferenceButtons from '../components/ReferenceButtons';

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Finanças',
    language: 'Português',
    condition: 'New' as any,
    synopsis: '',
    isbn: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newBook: Book = {
      id: `book_${Date.now()}`,
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn || 'N/A',
      category: formData.category,
      language: formData.language,
      ownerId: user.id,
      status: 'Available',
      condition: formData.condition,
      creditsCost: 2,
      locationApprox: 'Minha Área',
      distance: '0.0km',
      photos: ['https://picsum.photos/seed/newbook/400/600'],
      synopsis: formData.synopsis
    };

    dbService.addBook(newBook);
    navigate('/minha-estante');
  };

  return (
    <Layout>
      <ReferenceButtons pngUrl="https://picsum.photos/400/800" />
      <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-8">
        <header className="sticky top-0 z-20 flex items-center bg-white dark:bg-surface-dark p-4 border-b">
          <button onClick={() => navigate(-1)} className="p-2"><span className="material-symbols-outlined">arrow_back</span></button>
          <h2 className="flex-1 text-center font-bold text-lg dark:text-white">Registrar Livro</h2>
        </header>

        <form onSubmit={handleSubmit} className="px-5 pt-6 space-y-6 max-w-2xl mx-auto w-full">
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-surface-dark relative flex items-center justify-center">
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="size-24 border-2 border-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-5xl">barcode_scanner</span>
              </div>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Escanear Código de Barras</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block space-y-1">
              <span className="text-sm font-bold dark:text-white">Título</span>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: A Psicologia do Financeiro"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark dark:text-white focus:ring-primary border-black/5"
                required
              />
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-bold dark:text-white">Autor</span>
              <input 
                type="text" 
                value={formData.author}
                onChange={e => setFormData({...formData, author: e.target.value})}
                placeholder="Ex: Morgan Housel"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark dark:text-white focus:ring-primary border-black/5"
                required
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block space-y-1">
                <span className="text-sm font-bold dark:text-white">Categoria</span>
                <select 
                   value={formData.category}
                   onChange={e => setFormData({...formData, category: e.target.value})}
                   className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark dark:text-white border-black/5"
                >
                  <option>Finanças</option>
                  <option>Ficção</option>
                  <option>Biografia</option>
                  <option>Sci-Fi</option>
                  <option>História</option>
                </select>
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-bold dark:text-white">Idioma</span>
                <select 
                  value={formData.language}
                  onChange={e => setFormData({...formData, language: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark dark:text-white border-black/5"
                >
                  <option>Português</option>
                  <option>Inglês</option>
                  <option>Espanhol</option>
                </select>
              </label>
            </div>

            <div className="space-y-1">
              <span className="text-sm font-bold dark:text-white">Sinopse</span>
              <textarea 
                value={formData.synopsis}
                onChange={e => setFormData({...formData, synopsis: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark dark:text-white focus:ring-primary min-h-[120px] border-black/5"
                placeholder="Descreva brevemente o livro..."
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-primary text-text-main font-extrabold rounded-2xl shadow-xl flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Adicionar à Minha Estante
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddBook;
