import React from 'react';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  MoreVertical 
} from 'lucide-react';

interface HeaderProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab = 'Patients', onSelectTab }) => {
  const navItems = [
    { id: 'Overview', label: 'Overview', icon: Home },
    { id: 'Patients', label: 'Patients', icon: Users },
    { id: 'Schedule', label: 'Schedule', icon: Calendar },
    { id: 'Message', label: 'Message', icon: MessageSquare },
    { id: 'Transactions', label: 'Transactions', icon: CreditCard },
  ];

  return (
    <header className="bg-white rounded-full my-4 mx-4 px-6 py-3 shadow-xs flex items-center justify-between border border-gray-100 min-h-[72px]">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 flex items-center justify-center">
          {/* TechCare Logo SVG matching Adobe XD */}
          <svg width="156" height="40" viewBox="0 0 156 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="156" height="40" rx="20" fill="transparent"/>
            <path d="M14.5 9.5C11.7386 9.5 9.5 11.7386 9.5 14.5C9.5 17.2614 11.7386 19.5 14.5 19.5C17.2614 19.5 19.5 17.2614 19.5 14.5C19.5 11.7386 17.2614 9.5 14.5 9.5Z" fill="#01F0D0"/>
            <path d="M25.5 15.5C22.7386 15.5 20.5 17.7386 20.5 20.5C20.5 23.2614 22.7386 25.5 25.5 25.5C28.2614 25.5 30.5 23.2614 30.5 20.5C30.5 17.7386 28.2614 15.5 25.5 15.5Z" fill="#072635"/>
            <path d="M14.5 21.5C11.7386 21.5 9.5 23.7386 9.5 26.5C9.5 29.2614 11.7386 31.5 14.5 31.5C17.2614 31.5 19.5 29.2614 19.5 26.5C19.5 23.7386 17.2614 21.5 14.5 21.5Z" fill="#01F0D0"/>
          </svg>
        </div>
        <span className="text-xl font-extrabold tracking-tight text-[#072635]">TechCare</span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center gap-1 bg-transparent">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab && onSelectTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                isActive
                  ? 'bg-[#01F0D0] text-[#072635] shadow-xs'
                  : 'text-[#072635] hover:bg-gray-100/80'
              }`}
            >
              <Icon className="w-4 h-4 stroke-[2.2]" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Doctor Profile & Controls */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-3 pr-3 border-r border-gray-200">
          <img
            src="https://fedskillstest.ct.digital/senior-woman-doctor.png"
            alt="Dr. Steven Simmons"
            className="w-11 h-11 rounded-full object-cover border border-gray-200"
            onError={(e) => {
              // Graceful fallback avatar if image fails to load
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150';
            }}
          />
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-sm font-bold text-[#072635] leading-tight">Dr. Steven Simmons</span>
            <span className="text-xs text-[#707070] font-medium leading-tight">General Practitioner</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#072635]">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#072635]"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#072635]"
            title="More Options"
            aria-label="More Options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
