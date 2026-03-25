import { CheckSquare, Settings, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/8113f6c1564868dbfa9f674791c4117a9fe875f2.png';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        {/* Logo */}
        <div className="mb-8">
          <ImageWithFallback 
            src={logo} 
            alt="Sanpras Healthcare Logo" 
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#C9A36B] to-[#283845] bg-clip-text text-transparent tracking-[0.15em] uppercase">
            SANPRAS HR TASK
          </h1>
        </div>

        {/* Main Card */}
        <div className="relative group">
          {/* Shimmer Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C9A36B] via-[#283845] to-[#C9A36B] rounded-2xl opacity-30 group-hover:opacity-60 blur transition duration-1000 group-hover:duration-200 animate-pulse" />
          
          <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-2xl p-8 backdrop-blur-xl border border-[#C9A36B]/20">
            <div className="grid md:grid-cols-1 gap-6">
              {/* Tasks Card */}
              <button
                onClick={() => onNavigate('tasks')}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#283845]/40 to-[#1A1A1A]/40 p-8 border border-[#C9A36B]/30 hover:border-[#C9A36B]/60 transition-all duration-300 group/card hover:scale-[1.02] hover:-translate-y-1"
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#C9A36B]/10 to-transparent" />
                
                <div className="relative flex items-center gap-6">
                  <div className="bg-gradient-to-br from-[#C9A36B] to-[#283845] p-4 rounded-xl">
                    <CheckSquare className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h2 className="text-2xl font-bold text-[#C9A36B] mb-2">Task Manager</h2>
                    <p className="text-gray-400">
                      Manage your personal and official tasks with ease
                    </p>
                  </div>
                  <div className="text-[#C9A36B] text-2xl">
                    →
                  </div>
                </div>
              </button>
            </div>

            {/* Quick Access Buttons */}
            <div className="mt-8 flex gap-4 justify-end">
              <Button
                onClick={() => onNavigate('dashboard')}
                variant="outline"
                className="border-[#283845] bg-[#283845]/20 hover:bg-[#283845]/40 text-[#C9A36B] hover:text-[#C9A36B]"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                onClick={() => onNavigate('settings')}
                variant="outline"
                className="border-[#C9A36B] bg-[#C9A36B]/20 hover:bg-[#C9A36B]/40 text-white"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Stay organized, stay productive
        </div>
      </div>
    </div>
  );
}