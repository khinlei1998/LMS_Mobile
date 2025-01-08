import { create } from 'zustand'
import { Course } from '@/types/types'

interface WishListStore {
  wishList: Course[];
  addToWishList: (course: Course) => void;
  removeFromWishList: (courseId: number) => void;
  isInWishList: (courseId: number) => boolean;
}

export const useWishlistStore = create<WishListStore>((set,get) => ({
  wishList: [],
  addToWishList: (course) =>
    set((state) => ({ wishList: [...state.wishList, course] })),
  removeFromWishList: (courseId) =>
    set((state) => ({
      wishList: state.wishList.filter((course) => course.id !== courseId),
    })),
  isInWishList: (courseId) =>
    get().wishList.some((course) => course.id === courseId),
}))