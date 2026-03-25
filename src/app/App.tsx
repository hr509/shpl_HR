import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { TaskManager } from './components/TaskManager';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';

type Screen = 'welcome' | 'tasks' | 'dashboard' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const renderScreen = () => {
    if (currentScreen === 'welcome') {
      return <WelcomeScreen onNavigate={(screen) => setCurrentScreen(screen as Screen)} />;
    }
    if (currentScreen === 'tasks') {
      return (
        <TaskManager
          onBack={() => setCurrentScreen('welcome')}
          onViewDashboard={() => setCurrentScreen('dashboard')}
        />
      );
    }
    if (currentScreen === 'dashboard') {
      return <Dashboard onBack={() => setCurrentScreen('welcome')} />;
    }
    if (currentScreen === 'settings') {
      return <Settings onBack={() => setCurrentScreen('welcome')} />;
    }
    return <WelcomeScreen onNavigate={(screen) => setCurrentScreen(screen as Screen)} />;
  };

  return <div className="size-full min-h-screen">{renderScreen()}</div>;
}
