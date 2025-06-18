import { useEffect, useState } from "react";
import { signIn } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

function LoginPage(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const login = useAuthStore((state) => state.login);
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	useEffect(() => {
		if(isLoggedIn){
			navigate('/');
		}
	}, [isLoggedIn, navigate]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setMessage('');

		if(!email || !password){
			setMessage('이메일과 비밀번호를 모두 입력해주세요.');
			return;
		}

		try {
			const response = await signIn(email, password);

			console.log('로그인 성공', response);
			setMessage('로그인에 성공했습니다.');

			login(response.accessToken);

			navigate('/');
		} catch (error) {
			console.error('로그인 오류: ', error);
			setMessage('로그인 중 오류가 발생했습니다.');
		}
	};

	return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0 0 0 / 10%)' }}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em'
          }}
        >
          로그인
        </button>
      </form>
      {message && <p style={{ marginTop: '15px', color: message.includes('실패') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
}

export default LoginPage;