import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Icon name="Sparkles" size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">AI Generator</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <Button variant="ghost" className="text-white hover:text-purple-300">
            <Icon name="Home" size={16} className="mr-2" />
            Главная
          </Button>
          <Button variant="ghost" className="text-white hover:text-purple-300">
            <Icon name="History" size={16} className="mr-2" />
            История
          </Button>
          <Button variant="ghost" className="text-white hover:text-purple-300">
            <Icon name="Settings" size={16} className="mr-2" />
            Настройки
          </Button>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            <Icon name="User" size={16} className="mr-2" />
            Профиль
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;