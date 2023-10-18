import { create } from 'zustand';
import { ProfileInfoType } from './types';

interface ProfileInfoState {
    profileInfo: ProfileInfoType | null,
    setProfileInfo: (info: ProfileInfoType) => void
}

const useStore = create<ProfileInfoState>((set) => ({
    profileInfo: null,
    setProfileInfo: (info) => set(() => ({ profileInfo: info })),
}))

export default useStore;