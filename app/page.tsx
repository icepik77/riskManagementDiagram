'use client'
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const router = useRouter(); // Инициализация useRouter

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    // Проверка наличия символа @ в почте
    if (email.includes('@')) {
      console.log('Email:', email);
    } else {
      console.log('Некорректный формат почты');
      return;
    }

    // Проверка минимальной длины пароля
    if (password.length >= 8) {
      console.log('Password:', password);
      // Дополнительные шаги для входа
      router.push('/projectMenu');
    } else {
      setPasswordError('Пароль должен содержать не менее 8 символов');
      return;
    }

    // Сброс ошибки при успешном вводе
    setPasswordError(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md p-24 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-semibold mb-4">Вход в приложение</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-7">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Электронная почта
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 border rounded-md w-full"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-7">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`mt-1 p-2 border rounded-md w-full ${passwordError ? 'border-red-500' : ''}`}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(null); // Сброс ошибки при изменении пароля
                }}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
