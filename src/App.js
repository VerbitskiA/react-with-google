import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log("Google JWT Token:", credentialResponse.credential);

    // Отправляем токен на ваш .NET-бэкенд
    try {
      const response = await fetch('http://104.131.97.189:3000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();
      console.log("Ответ от бэкенда:", data);

    } catch (error) {
      console.error("Ошибка при отправке токена:", error);
    }
  };

  return (
    <div className="App">
      <h1>Добро пожаловать!</h1>
      <GoogleOAuthProvider clientId="599742018161-14vtf8j5geal88nup3o69us7vu7qjd32.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => console.log("Ошибка входа через Google")}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
