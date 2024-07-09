import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userRegSchema, UserRegType } from '../lib/schema';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorHandler, ErrorT, useAuthContext } from '../lib/utils';
import { toast } from 'react-toastify';
import { useRegisterUser } from '../actions/auth-actions';

function Register() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { registerUser, isPending } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserRegType>({
    resolver: zodResolver(userRegSchema),
  });

  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [navigate, user]);

  const formSubmit = async (formData: UserRegType) => {
    try {
      await registerUser(formData);
      navigate('/chat');
      reset();
      toast.success(`${formData.name} is Registered`);
    } catch (error) {
      toast.error(errorHandler(error as ErrorT));
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(formSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                {...register('name')}
              />
              <p className="text-sm text-red-500">{errors.name?.message}</p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register('email')}
              />
              <p className="text-sm text-red-500">{errors.email?.message}</p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register('password')}
              />
              <p className="text-sm text-red-500">{errors.password?.message}</p>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                {isPending ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
