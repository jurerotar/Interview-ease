import React from 'react';

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const { children } = props;

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <aside className="scrollbar-hide hidden p-4 lg:flex fixed overflow-y-scroll lg:top-16 lg:h-[calc(100vh-4rem)] lg:w-[18rem]">
      {children}
    </aside>
  );
};

export default Sidebar;
