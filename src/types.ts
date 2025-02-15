export interface ModalProps {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
  element: React.ReactNode;
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
export interface PageInterface<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
}
export interface UserLogin {
  email: string;
  password: string;
}
export interface CatalogResponse {
  data: Catalog[];
}
export interface Catalog {
  id: string;
  title: string;
  subcatalogs?: SubCatalog[];
}

export interface CatalogRequest {
  title: string;
}

export interface SubCatalog {
  id: string;
  title: string;
  catalogId: string;
  categories: Category[];
}

export interface SubCatalogResponse {
  data?: SubCatalog[];
  error: string | null;
  status: number;
}
export interface SubCatalogRequest {
  title: string;
  catalogId: string;
}
// category
export interface Category {
  id: string;
  path: string;
  subCatalogId: string;
  title: string;
}

export interface CategoryResponse {
  data: Category[];
  error: null | string;
  status: number;
}
export interface CategoryRequest {
  title: string;
  path: string;
  subCatalogId: string;
}

export interface BrandRequest {
  id: string;
  title: string;
  logo: File | null;
}
export interface Brand {
  id: string;
  title: string;
  path: string;
}

export interface FilterOption {
  name: string;
  title: string;
}

export interface FilterRequest {
  name: string;
  title: string;
  icon: string;
  withSearch: boolean;
  type: string;
  options: FilterOption[];
}

export interface FilterFormData {
  subcatalogId: string;
  categoryId?: string;
  data: FilterRequest[];
}

export interface FilterResponse {
  id: string;
  subcatalog: string;
  category: string | null;
  data: FilterRequest[];
}

export type UpdateFilterProps = {
  name: string;
  data: {
    name: string;
    title: string;
    icon: string;
    withSearch: boolean;
    type: string;
    options: { name: string; title: string }[];
  };
};
export interface User {
  id: string;
  username: string;
  role: string;
  status: string;
  password?: string;
}
export interface UsersProps {
  data: User[];
}

export interface UserRequest {
  username: string;
  role: string;
  status: string;
}

export interface UserCreateRequest {
  username: string;
  password: string;
}
