import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCredentials } from "../redux/slices/authSlice";
import Loading from "../components/Loader";

const Navbar = () => {
  return (
    <nav className='w-full flex justify-between items-center py-4 px-6 bg-blue-300 text-white h-20 mb-8 lg:mb-0 '>
      <div className='flex items-center space-x-4'>
        <img src="../../src/assets/images/dgm.jpeg" alt="logo" width="60px" />
      </div>
      <div className='flex items-center space-x-4'>
        <img src="../../src/assets/images/Mns.png" alt="logo" width="250px" />
      </div>
      <div className='flex items-center space-x-4'>
        <img src="../../src/assets/images/Maroc.png" alt="logo" width="70px" />
      </div>
    </nav>
  );
};

const Login = () => {
  const user = useSelector((state) => state.auth.user); // Assuming user is a property of auth slice
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      // console.log(result);
      dispatch(setCredentials(result));
      navigate("/"); // Navigate directly after successful login
    } catch (error) {
      // console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Navbar />
      <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
        <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
          {/* left side */}
          <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
            <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
              <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600'>
                ministère de l'equipement et l'eau  maroc 
              </span>
              <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-5xl 2xl:text-7xl font-black text-center text-blue-700'>
                <span>D-G-M</span>
                <span>Système des tickets</span>
              </p>

              <div className='cell'>
                {/* <div className='circle rotate-in-up-left'></div> */}
              </div>
            </div>
          </div>

          {/* right side */}
          <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
            >
              <div className=''>
                <p className='text-blue-600 text-2xl font-bold text-center'>
                  Bienvenue chez D-G-M!
                </p>
                <p className='text-center text-base text-gray-600 '>
                  Authentifiez-vous pour accéder.
                </p>
              </div>

              <div className='flex flex-col gap-y-5'>
                <Textbox
                  placeholder='email@exemple.com'
                  type='email'
                  name='email'
                  label='Email Addresse'
                  className='w-full rounded-full'
                  register={register("email", {
                    required: "Email Addresse obligatoire!",
                  })}
                  error={errors.email ? errors.email.message : ""}
                />
                <Textbox
                  placeholder='Votre mot-de-passe'
                  type='password'
                  name='password'
                  label='Mot-de-Passe'
                  className='w-full rounded-full'
                  register={register("password", {
                    required: "Mot de passe obligatoire!",
                  })}
                  error={errors.password ? errors.password.message : ""}
                />

                {/* <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>
                  Mot-de-Passe Oublié?
                </span> */}

              {isLoading? <Loading/> :
                <Button
                type='submit'
                label='Enregistrer'
                className='w-full h-10 bg-blue-700 text-white rounded-full'
              />
              }
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
