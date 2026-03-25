import { Home, User, Bell, Lock, Palette, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { useState } from 'react';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-[#C9A36B] text-[#C9A36B] hover:bg-[#C9A36B]/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C9A36B] to-[#283845] bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#C9A36B]/20 p-3 rounded-lg">
                <User className="w-5 h-5 text-[#C9A36B]" />
              </div>
              <h2 className="text-xl font-semibold text-white">Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-[#0A0A0A] border border-[#C9A36B]/30 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:border-[#C9A36B] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-[#0A0A0A] border border-[#C9A36B]/30 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:border-[#C9A36B] focus:outline-none"
                />
              </div>
            </div>
          </Card>

          {/* Appearance */}
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#283845]/20 p-3 rounded-lg">
                <Palette className="w-5 h-5 text-[#283845]" />
              </div>
              <h2 className="text-xl font-semibold text-white">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? (
                    <Moon className="w-5 h-5 text-[#C9A36B]" />
                  ) : (
                    <Sun className="w-5 h-5 text-[#C9A36B]" />
                  )}
                  <div>
                    <div className="text-white font-medium">Dark Mode</div>
                    <div className="text-sm text-gray-400">
                      Use dark theme across the app
                    </div>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#C9A36B]/20 p-3 rounded-lg">
                <Bell className="w-5 h-5 text-[#C9A36B]" />
              </div>
              <h2 className="text-xl font-semibold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Push Notifications</div>
                  <div className="text-sm text-gray-400">
                    Receive notifications about task updates
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A36B]/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#283845]/20 p-3 rounded-lg">
                <Lock className="w-5 h-5 text-[#283845]" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Privacy & Security
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Auto-Save</div>
                  <div className="text-sm text-gray-400">
                    Automatically save changes
                  </div>
                </div>
                <Switch checked={autoSave} onCheckedChange={setAutoSave} />
              </div>
              <Button
                variant="outline"
                className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10"
              >
                Change Password
              </Button>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-gradient-to-r from-[#C9A36B] to-[#283845] hover:opacity-90">
              Save Changes
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
              onClick={onBack}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
