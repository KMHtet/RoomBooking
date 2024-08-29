export interface HeaderProps {
  isIconLeft?: boolean;
  onPressIconLeft?: (data?: any) => void | Promise<void>;
  isIconRight?: boolean;
  onPressIconRight?: (data?: any) => void | Promise<void>;
  title?: string;
}
