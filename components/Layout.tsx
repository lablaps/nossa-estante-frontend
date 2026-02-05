
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { User } from '../types';

const Layout: React.FC<{ children: React.ReactNode; hideBottomNav?: boolean }> = ({ children, hideBottomNav }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Just sync the user state, don't perform navigation here.
    // Navigation is handled by PrivateRoute or specific page logic.
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/home', icon: 'dashboard', label: 'Explorar' },
    { path: '/minha-estante', icon: 'book_5', label: 'Minha Estante' },
    { path: '/chats', icon: 'forum', label: 'Mensagens' },
    { path: '/carteira', icon: 'account_balance_wallet', label: 'Carteira e Status' },
  ];

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#F8FAF9] dark:bg-background-dark text-text-main transition-colors duration-300">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-[280px] bg-white dark:bg-surface-dark border-r border-black/5 dark:border-white/5 shrink-0 sticky top-0 h-screen z-50">
        <div className="p-8">
          <Link to="/home" className="flex items-center gap-3 text-primary group">
            <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-2xl font-bold">auto_stories</span>
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-text-main dark:text-white">Nossa Estante</span>
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4 px-4">Menu</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all
                ${isActive 
                  ? 'bg-primary text-black shadow-lg shadow-primary/20' 
                  : 'text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main dark:hover:text-white'}
              `}
            >
              <span className={`material-symbols-outlined text-[22px] ${location.pathname === item.path ? 'filled' : ''}`}>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
          
          <div className="pt-8 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4 px-4">Ações</div>
          <Link
            to="/cadastrar-livro"
            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold bg-black text-white dark:bg-primary dark:text-black hover:opacity-90 transition-all shadow-xl"
          >
            <span className="material-symbols-outlined text-[22px]">add_circle</span>
            <span className="text-sm">Cadastrar Livro</span>
          </Link>
        </nav>

        <div className="p-6">
          <div className="bg-[#F3F6F4] dark:bg-white/5 rounded-3xl p-4 space-y-4">
            <div className="flex items-center gap-3">
              <img src={user.avatar} className="size-11 rounded-2xl object-cover border-2 border-white dark:border-white/10 shadow-sm" alt="" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate dark:text-white">{user.name}</p>
                <p className="text-xs text-text-muted font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] filled text-primary">token</span>
                  {user.credits} Créditos
                </p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full py-2.5 rounded-xl border border-black/5 dark:border-white/10 text-xs font-bold text-text-muted hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto no-scrollbar relative">
        <div className={`flex-1 ${!hideBottomNav ? 'pb-24 md:pb-0' : ''}`}>
          {children}
        </div>

        {/* Bottom Nav Mobile */}
        {!hideBottomNav && (
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-black/5 dark:border-white/10 px-6 py-4 flex justify-between items-center z-[100] safe-area-bottom">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex flex-col items-center gap-1 transition-all
                  ${isActive ? 'text-primary' : 'text-text-muted'}
                `}
              >
                <span className={`material-symbols-outlined text-[26px] ${location.pathname === item.path ? 'filled' : ''}`}>{item.icon}</span>
                <span className="text-[10px] font-extrabold uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
              </NavLink>
            ))}
            <NavLink to="/cadastrar-livro" className="flex flex-col items-center gap-1 -mt-12 group">
              <div className="size-16 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 active:scale-95 transition-transform border-[6px] border-[#F8FAF9] dark:border-background-dark">
                <span className="material-symbols-outlined text-black text-[32px] font-bold">add</span>
              </div>
            </NavLink>
          </nav>
        )}
      </main>
    </div>
  );
};

export default Layout;