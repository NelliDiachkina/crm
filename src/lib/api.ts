export interface SummaryStats {
  promotions: number;
  categories: number;
  newCompanies: number;
  activeCompanies: number;
}

export interface SummarySales {
  id: string;
  companyId: string;
  companyTitle: string;
  sold: number;
  income: number;
}

export interface Country {
  id: string;
  title: string;
}

export interface Category {
  id: string;
  title: string;
}

export enum CompanyStatus {
  Active = 'active',
  NotActive = 'notActive',
  Pending = 'pending',
  Suspended = 'suspended',
}

export interface Company {
  id: string;
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  hasPromotions: boolean;
  categoryId: string;
  categoryTitle: string;
  countryId: string;
  countryTitle: string;
  avatar?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  companyId: string;
  companyTitle: string;
  avatar?: string;
}

const PROJECT_TOKEN = process.env.NEXT_PUBLIC_PROJECT_TOKEN;

const buildUrl = (...paths: string[]) =>
  `https://${PROJECT_TOKEN}.mockapi.io/api/v1/${paths.join('/')}`;

const stringifyQueryParams = (params: Record<string, string>) =>
  new URLSearchParams(params).toString();

const validateItems = <T>(items: T[], requiredKeys: (keyof T)[]): T[] => {
  return items.filter((item) => {
    return requiredKeys.every(
      (key) => item[key] != null && typeof item[key] === 'string',
    );
  });
};

const sendRequest = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const controller = new AbortController();
  const signal = controller.signal;

  const res = await fetch(url, {
    ...init,
    signal,
  }).catch((error) => {
    if (error.name === 'AbortError') {
      console.error('Request was aborted');
    } else {
      throw error;
    }
  });

  if (res && res.status === 404) {
    return [] as T;
  }

  if (!res || !res.ok) {
    throw new Error((await res?.text()) || 'Request failed');
  }

  return (await res.json()) as T;
};

export const getSummaryStats = (init?: RequestInit) => {
  return sendRequest<SummaryStats>(buildUrl('summary-stats', '1'), init);
};

export const getSummarySales = (init?: RequestInit) => {
  return sendRequest<SummarySales[]>(buildUrl('summary-sales'), init);
};

export const getCountries = async (init?: RequestInit) => {
  try {
    const countries = await sendRequest<Country[]>(buildUrl('countries'), init);
    return validateItems(countries, ['id', 'title']);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export const getCategories = async (init?: RequestInit) => {
  try {
    const categories = await sendRequest<Category[]>(
      buildUrl('categories'),
      init,
    );
    return validateItems(categories, ['id', 'title']);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCompanies = async (init?: RequestInit) => {
  try {
    const companies = await sendRequest<Company[]>(buildUrl('companies'), init);
    return validateItems(companies, [
      'id',
      'title',
      'categoryId',
      'categoryTitle',
    ]);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
};

export const getCompany = async (id: string, init?: RequestInit) => {
  return sendRequest<Company>(buildUrl('companies', id), init);
};

export const getPromotions = async (
  params: Record<string, string> = {},
  init?: RequestInit,
) => {
  try {
    const promotions = await sendRequest<Promotion[]>(
      `${buildUrl('promotions')}?${stringifyQueryParams(params)}`,
      init,
    );
    return validateItems(promotions, ['id', 'title', 'companyId']);
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return [];
  }
};

export const createCompany = async (
  data: Omit<Company, 'id' | 'hasPromotions'>,
  init?: RequestInit,
) => {
  return sendRequest<Company>(buildUrl('companies'), {
    ...init,
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      ...(init && init.headers),
      'content-type': 'application/json',
    },
  });
};

export const createPromotion = async (
  data: Omit<Promotion, 'id'>,
  init?: RequestInit,
) => {
  return sendRequest<Promotion>(buildUrl('promotions'), {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      ...(init && init.headers),
      'content-type': 'application/json',
    },
  });
};
