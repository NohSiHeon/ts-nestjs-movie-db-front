import { create } from "zustand";

// 스토어의 상태(state)와 액션(action)에 대한 타입(Type) 정의
interface AuthState {
  isLoggedIn: boolean; // 로그인 여부 (true/false)
  accessToken: string | null; // 액세스 토큰 값 (문자열이거나 없을 경우 null)
  login: (token: string) => void; // 로그인 액션: 토큰 값만 인자로 받습니다.
  logout: () => void; // 로그아웃 액션
  checkAuth: () => void; // 앱 초기 로드 시 로그인 상태 확인 액션
}

export const useAuthStore = create<AuthState>((set) => ({
  // --- 초기 상태(Initial State) 설정 ---
  // 앱이 처음 로드될 때 로컬 스토리지에 accessToken이 있는지 확인하여 isLoggedIn과 accessToken을 설정합니다.
  isLoggedIn: (() => {
    const storedToken = localStorage.getItem('accessToken');
    return !!storedToken; // accessToken이 로컬 스토리지에 있으면 true, 없으면 false
  })(),
  accessToken: localStorage.getItem('accessToken') || null, // 로컬 스토리지에서 accessToken을 가져와 초기화

  // --- 액션(Actions) 정의 ---

  // 'login' 액션 함수: 사용자가 로그인에 성공했을 때 호출됩니다.
  // 백엔드로부터 받은 'token' 값만 인자로 받습니다.
  login: (token) => {
    // 'set' 함수를 사용하여 'isLoggedIn'을 true로, 'accessToken'을 전달받은 'token'으로 업데이트합니다.
    set({ isLoggedIn: true, accessToken: token });
    // 사용자가 페이지를 새로고침해도 로그인 상태가 유지되도록 로컬 스토리지에 accessToken을 저장합니다.
    localStorage.setItem('accessToken', token);
    console.log("로그인 성공: 토큰 저장 및 상태 업데이트");
  },

  // 'logout' 액션 함수: 사용자가 로그아웃 버튼을 눌렀을 때 호출됩니다.
  logout: () => {
    // 'set' 함수를 사용하여 'isLoggedIn'을 false로, 'accessToken'을 null로 초기화합니다.
    set({ isLoggedIn: false, accessToken: null });
    // 로컬 스토리지에 저장된 accessToken을 제거하여 로그인 상태를 해제합니다.
    localStorage.removeItem('accessToken');
    console.log("로그아웃 성공: 토큰 및 상태 초기화");
  },

  // 'checkAuth' 액션 함수: 앱 초기 로드 시 accessToken 존재 여부만 확인합니다.
  // 이 함수는 단순히 로컬 스토리지에 accessToken이 있는지 확인하여 스토어의 isLoggedIn 상태를 설정합니다.
  checkAuth: () => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      // 토큰이 있다면 로그인 상태로 간주
      set({ isLoggedIn: true, accessToken: storedToken });
      console.log('초기 앱 로드: accessToken 존재, 로그인 상태 유지.');
    } else {
      // 토큰이 없다면 로그아웃 상태로 간주
      set({ isLoggedIn: false, accessToken: null });
      console.log('초기 앱 로드: accessToken 없음, 로그아웃 상태.');
    }
  },
}));
