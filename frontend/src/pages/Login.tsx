import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userLogSchema, UserLogType } from '../lib/schema';
import { useLoginUser } from '../actions/auth-actions';
import { toast } from 'react-toastify';

function Login() {
  const { loginUser, isPending } = useLoginUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserLogType>({
    resolver: zodResolver(userLogSchema),
  });

  const formSubmit = async (formData: UserLogType) => {
    await loginUser(formData);
    // toast.success(`${}`)
    reset();
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
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
                  'Login'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
