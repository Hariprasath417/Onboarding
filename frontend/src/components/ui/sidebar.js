import React from 'react';
import clsx from 'clsx';

export const SidebarProvider = ({ children }) => children;

export const Sidebar = ({ open, onOpenChange, className, children }) => {
  return (
    <aside
      className={clsx(
        'fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gray-50 shadow-sm flex flex-col transform transition-transform duration-300 ease-in-out',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        className
      )}
      aria-hidden={!open}
    >
      {children}
      <SidebarRail />
    </aside>
  );
};

export const SidebarHeader = ({ className, children }) => (
  <div className={clsx('h-16 flex items-center px-4', className)}>{children}</div>
);

export const SidebarContent = ({ className, children }) => (
  <nav className={clsx('flex-1 flex flex-col px-4 pt-6 pb-4', className)}>{children}</nav>
);

export const SidebarGroup = ({ className, children }) => (
  <div className={clsx('space-y-2', className)}>{children}</div>
);

export const SidebarGroupLabel = ({ className, children }) => (
  <h3 className={clsx('px-3 text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2', className)}>
    {children}
  </h3>
);

export const SidebarMenu = ({ className, children }) => (
  <ul className={clsx('space-y-1', className)}>{children}</ul>
);

export const SidebarMenuItem = ({ className, children }) => (
  <li className={clsx(className)}>{children}</li>
);

export const SidebarMenuButton = ({
  asChild,
  className,
  active = false,
  children,
  ...props
}) => {
  const Component = asChild ? 'span' : 'a';
  return (
    <Component
      className={clsx(
        'flex items-center px-3 py-2 rounded-lg',
        active ? 'text-orange-600 bg-orange-50 font-medium' : 'text-gray-700 hover:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const SidebarFooter = ({ className, children }) => (
  <div className={clsx(className)}>{children}</div>
);

export const SidebarRail = () => <div className="hidden lg:block" aria-hidden="true" />;

export const SidebarTrigger = ({ onClick, className }) => (
  <button onClick={onClick} className={clsx('lg:hidden text-gray-600 hover:text-gray-900', className)}>
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
);


