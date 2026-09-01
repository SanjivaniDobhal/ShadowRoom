import React from 'react';

import {
  Home,
  Bookmark,
  User,
  Shield,
  MessageCircle
} from 'lucide-react';

import {
  Link,
  useLocation
} from 'react-router-dom';

export const Sidebar = () => {

  const location = useLocation();

  const links = [

    {
      name: 'Home',
      icon: Home,
      path: '/dashboard'
    },

    {
      name: 'Bookmarks',
      icon: Bookmark,
      path: '/bookmarks'
    },

    {
      name: 'Profile',
      icon: User,
      path: '/profile'
    },

    {
      name: 'Admin',
      icon: Shield,
      path: '/admin'
    },

  ];

  const rooms = [

    'Angry',
    'Sad',
    'Happy',
    'Confused'

  ];

  return (

    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-5 overflow-y-auto">

      <h1 className="text-3xl font-bold text-white mb-10">

        ShadowRoom

      </h1>

      {/* MAIN LINKS */}

      <div className="space-y-3 mb-10">

        {links.map((link) => {

          const Icon = link.icon;

          return (

            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === link.path
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-secondary'
              }`}
            >

              <Icon size={20} />

              <span>
                {link.name}
              </span>

            </Link>
          );
        })}

      </div>

      {/* CHAT ROOMS */}

      <div>

        <h2 className="text-gray-400 text-sm uppercase mb-4">

          Support Rooms

        </h2>

        <div className="space-y-3">

          {rooms.map((room) => (

            <Link
              key={room}
              to={`/chatroom/${room}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-secondary transition-all"
            >

              <MessageCircle size={18} />

              <span>
                {room} Room
              </span>

            </Link>

          ))}

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;