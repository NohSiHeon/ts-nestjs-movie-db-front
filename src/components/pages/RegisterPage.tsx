import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../apis/auth";

function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async(event: React.FormEvent) => {
		event.preventDefault();
		setMessage('');

		if(!email || !password || !passwordConfirm || !name){
			setMessage('모든 필드를 입력해주세요.');
			return;
		} else if(password !== passwordConfirm){
			setMessage('입력한 두 비밀번호가 일치하지 않습니다.');
			return;
		}

		try {
			const response = await signUp(email, password, passwordConfirm, name);

			setMessage('회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동합니다.');
			navigate('/sign-in');
		} catch (error) {
			console.error('회원가입 오류', error);
			setMessage('회원가입 실패');
		}
	};

	return (
		<div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0 0 0 / 10%)' }}>
      <h2>회원가입</h2>
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
        <div>
          <label htmlFor="passwordConfirm" style={{ display: 'block', marginBottom: '5px' }}>비밀번호 확인:</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 15px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em'
          }}
        >
          회원가입 완료
        </button>
      </form>
      {message && <p style={{ marginTop: '15px', color: message.includes('실패') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );

}

export default RegisterPage;