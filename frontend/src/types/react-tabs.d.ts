declare module 'react-tabs' {
  import type { ReactNode } from 'react';
import { Component } from 'react';

  interface TabsProps {
    children?: ReactNode;
    className?: string;
    defaultIndex?: number;
    selectedIndex?: number;
    onSelect?: (index: number, lastIndex: number, event: Event) => boolean | void;
  }

  interface TabListProps {
    children?: ReactNode;
    className?: string;
  }

  interface TabProps {
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
  }

  interface TabPanelProps {
    children?: ReactNode;
    className?: string;
  }

  export class Tabs extends Component<TabsProps> {}
  export class TabList extends Component<TabListProps> {}
  export class Tab extends Component<TabProps> {}
  export class TabPanel extends Component<TabPanelProps> {}
  export function resetIdCounter(): void;
}
