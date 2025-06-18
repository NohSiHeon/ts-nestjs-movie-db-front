import React from "react";
import { Link } from "react-router-dom";
import '../../styles/Header.css';
import { useAuthStore } from "../../stores/authStore";

function Header() {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const logout = useAuthStore((state) => state.logout);

	const handleLogout = () => {
		logout();
		alert('로그아웃되었습니다.');
	};

	return (
		<header className="header">
			<Link to="/" className="header-link"><h1>영화 찾자</h1></Link>
			<nav className="header-nav">
				<Link to="/movies" className="header-link">영화 목록</Link>
				<Link to="/reviews" className="header-link">리뷰 목록</Link>
				{isLoggedIn ? (
					<button onClick={handleLogout} className="header-auth-button">로그아웃</button>
				) : (
					<>
						<Link to="/auth/sign-in" className="header-auth-button">로그인</Link>
						<Link to="/auth/sign-up" className="header-auth-button">회원가입</Link>
					</>
				)}
			</nav>
		</header>
	);
}

export default Header;