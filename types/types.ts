export interface Course {
    id: number;
    title: string;
    url:string;
    is_paid: string;
    price: string;
    visible_instructors: Instructors[];
    image_480x270:string
  }

  export interface Category {
    id: string;
    name: string;
    icon: string;
  }

  export interface Instructors{
    id:number;
    title:string
  }