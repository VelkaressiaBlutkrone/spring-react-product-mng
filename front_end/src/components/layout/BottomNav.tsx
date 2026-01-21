/**
 * 하단 네비게이션 컴포넌트 - 모바일용
 */
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const navItems = [
  { path: '/', label: '메인', icon: '🏠' },
  { path: '/products', label: '목록', icon: '📋' },
  { path: '/statistics', label: '통계', icon: '📊' },
  { path: '/about', label: 'About', icon: 'ℹ️' },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              'flex flex-col items-center justify-center py-2 px-4 flex-1 transition-colors',
              location.pathname === item.path
                ? 'text-blue-600'
                : 'text-gray-600'
            )}
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
