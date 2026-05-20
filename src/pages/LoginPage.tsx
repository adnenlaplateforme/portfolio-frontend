import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { apiFetch } from '../hooks/useFetch';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>();

  async function onSubmit(data: LoginForm) {
    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      auth?.login(res.token);
      navigate('/admin');
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Erreur de connexion',
      });
    }
  }

  return (
    <main>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email requis',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Email invalide' },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Mot de passe requis' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {errors.root && <p>{errors.root.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </main>
  );
}
