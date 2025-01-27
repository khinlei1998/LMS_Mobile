export interface Course {
  id: number;
  title: string;
  url: string;
  is_paid: string;
  price: string;
  visible_instructors: Instructors[];
  image_480x270: string;
  image_125_H: string;
  image_240x135: string;
  is_practice_test_course: boolean;
  published_title: string;
  tracking_id: string;
  locale: {
    title: string;
    english_title: string;
    simple_english_title: string;
  };
  results: any;
  subtitle: string;
  num_reviews: number;
  image_240x13: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Instructors {
  id: number;
  title: string;
}

export interface CurriculumItem {
  _class: string;
  id: number;
  title: string;
  description?: string;
  content_summary?: string;
  is_free?: boolean;
  sort_order?: number;
}

export interface User {
  _class: string;
  title: string;
  name: string;
  display_name: string;
}

export interface Review {
  _class: string;
  id: number;
  content: string;
  rating : number;
  created: string;
  modified?: string;
  user_modified:string
  user?: User;
}
