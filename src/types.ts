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
}

export type ThemeMap = Record<string, ThemeProps>;
