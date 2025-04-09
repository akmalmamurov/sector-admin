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
  limitNumber?: number;
}
export interface UserLogin {
  username: string;
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
  catalog:{
    id: string;
    title: string
  }
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

export interface IPopularCategory {
  id: string;
  updatedAt: string;
  category: {
    id: string,
    title: string,
    path: string,
    slug: string
  }
}

export interface CategoryResponse {
  data: Category[];
  error: null | string;
  status: number;
}
export interface CategoryRequest {
  title: string;
  categoryImage: File | null;
  subCatalogId: string;
}

export interface BrandRequest {
  id: string;
  title: string;
  description?: string;
  logo: File | null;
}
export interface Brand {
  id: string;
  title: string;
  path: string;
  description?: string;
}

export interface IPopularBrand extends Brand {
  slug: string;
  popularBrand: {
    id: string;
  };
}

export interface IPopularBrands {
  id: string;
  updatedAt: string;
  brand: { id: string, title: string, path: string, slug: string, description: string, image: string }
}

export interface BrandResponse {
  data: {
    brands: Brand[] | IPopularBrand[];
    total: number;
    limitNumber: number;
    pageNumber: number;
  },
  error: string | null;
  status: number;
}

export interface IReply {
  id: string;
  message: string;
  adminId: string;
  createdAt: string;
}

export interface IComment {
  id: string;
  body: string;
  star: number;
  reply: IReply[];
  user: User;
  products: ProductData;
  createdAt: string;
}

export interface ICommentResponse {
  data: IComment[];
  error: string | null;
  status: number;
}

export interface IQuestion {
  id: string;
  body: string;
  reply: IReply[];
  user: User;
  products: ProductData;
  createdAt: string;
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
export interface FilterOptionRequest {
  name: string;
  options: { name: string }[];
}


export interface FilterOptionRequest {
  name: string;
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
  name: string;
  username: string;
  email?: string;
  phone: string;
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
export interface Condition {
  id: string;
  title: string;
}
export interface ConditionResponse {
  data: Condition[];
}
export interface ConditionRequest {
  title: string;
}
export interface Relevance {
  id: string;
  title: string;
}
export interface RelevanceResponse {
  data: Relevance[];
}
export interface RelevanceRequest {
  title: string;
}

export interface CharacterOption {
  name: string;
  value: string;
}
export interface ProductRequest {
  link?: string;
  catalogId: string;
  subcatalogId: string;
  categoryId?: string;
  title: string;
  articul: string;
  productCode: string;
  inStock: boolean | string;
  price: number;
  description: string;
  brandId?: string;
  fullDescription?: string;
  conditionId?: string;
  relevanceId?: string;
  characteristics?: { title: string; options: CharacterOption[] }[];
  productMainImage?: File;
  productImages?: File[];
  descriptionImage?: File[];
  garanteeIds?: string[];
  popularProduct: {
    id: string;
  };
  images?: string[] 
}
export interface ProductLinkProp {
  url: string;
}

export interface ProductData {
  id: string;
  title: string;
  articul: string;
  productCode: string;
  description: string;
  inStock: boolean;
  price: number;
  mainImage: string;
  images?: string[];
  recommended: boolean;
  fullDescription?: string;
  fullDescriptionImages?: string[];
  total: number;
  limitNumber: number;
}
export interface LinkOption {
  title: string;
  value: string;
}
export interface LinkProduct {
  id?: string;
  article: string;
  brand: string;
  articul: string;
  code: string;
  description: string;
  price?: string;
  stock?: string;
  title: string;
  images: string[]
  characteristics: { title: string; option: LinkOption[] }[];
}

export interface PopularProduct extends ProductData {
  popularProduct: {
    id: string;
  };
}

export interface ProductResponse {
  data: ProductData[];
  total: number;
  limitNumber: number;
}

export interface BannerRequest {
  routePath: string;
  redirectUrl: string;
  bannerImage: File;
}
export interface BannerData {
  id: string;
  routePath: string;
  redirectUrl: string;
  imagePath: string;
}

export interface GaranteeData {
  id: string;
  title: string;
  price: string | number;
}

export interface PromotionData {
  id: string;
  title: string;
  expireDate: string;
  coverImage: string;
  bannerImage?: string;
  fullDescription?: string;
  fullDescriptionImages?: string[];
}

export interface PromotionResponse {
  data: PromotionData[];
}

export interface PromotionRequest {
  id?: string;
  title: string;
  expireDate: string;
  expireTime: string;
  coverImage: File;
  fullDescription: string;
  promotionBannerImage: File;
  promotionFullDescription?: string;
  promotionDescriptionImages?: File[];
}

export interface PromotionDescriptionImage {
  url: string;
  name: string;
}

export interface ChangeOrderData {
  id: string;
  index: number;
  name: string;
}