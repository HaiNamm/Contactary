export interface Company {
  id: string;
  status: number;
  created_at: string;
  updated_at: string;
  name: string;
  size?: string;
  about?: string;
  address?: string;
  industry?: string;
  website?: string;
  image?: string;
  linkedin?: string;
}
