export interface People {
  id: string;
  status: number;
  created_at: any;
  updated_at: any;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  note: string;
  linkedin: string;
  other_profile: string;
  avatar: string;
  add_by: number;
  add_type: number;
  experiences: Experience[];
}

export interface Experience {
  from: string;
  to: string;
  job_title: string;
  company: {
    name: string;
    linkedin: string;
  };
}
