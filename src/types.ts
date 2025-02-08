export interface ModalProps {
  isOpen: boolean;
  toggleOpen: (open: boolean) => void;
}
export interface ThemeProps {
  text: string;
  bg: string;
  sidebar: string;
  header: string;
  linkSideBar: string;
  mainColor: string;
  drawColor: string;
  switch: string;
  tabActive: string;
  tabBg: string;
}

export type ThemeMap = Record<string, ThemeProps>;

export interface UserLogin {
  email: string;
  password: string;
}
export interface Catalog {
  id: string;
  title: string;
  subcatalogs: Catalog[];
}

export interface PageInterface<T> {
  data: T;
  error: string | null;
  status: number;
}
