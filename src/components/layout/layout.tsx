import React from 'react';
import TopBar from '@components/layout/components/top-bar/top-bar';
import Sidebar from '@components/layout/components/sidebar/sidebar';
import Navigation from '@components/layout/components/navigation/navigation';
import { LayoutProvider } from '@providers/layout-provider';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <LayoutProvider>
    <TopBar />
    <div className="flex 3xl:container 3xl:mx-auto">
      <Sidebar>
        <Navigation />
      </Sidebar>
      <main className="mt-16 flex w-full justify-center p-4 lg:ml-[18rem] lg:max-w-[calc(100%-18rem)] xl:mx-[18rem] xl:max-w-[calc(100%-36rem)] 3xl:mx-0 3xl:max-w-full">
        <div className="flex w-full max-w-[800px] rounded-md p-4 dark:bg-[#292D32]">{children}</div>
      </main>
    </div>
  </LayoutProvider>
);

export default Layout;
