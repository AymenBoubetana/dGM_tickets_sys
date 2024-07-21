import React from 'react'
import { useForm } from 'react-hook-form'
import { useChangePasswordMutation } from '../redux/slices/api/userApiSlice';
import { toast } from 'sonner';
import ModalWrapper from './ModalWrapper';
import { Dialog } from '@headlessui/react';
import Textbox from './Textbox';
import Loading from './Loader';
import Button from './Button';

const ChangePassword = ({open , setOpen}) => {
  const {
    register,
    handleSubmit,
    formSubmit,
    formState:{errors},
  } = useForm();
  
  const [changeUserPassword,{isLoading}] = useChangePasswordMutation();

  const handleOnSubmit = async (data)=>{
    if(data.password !== data.cpass){
      toast.warning("le mot de passe ne correspond pas!!");
      return;
      
    }

    try {
      await changeUserPassword(data).unwrap();
      toast.success("nouveau utilisateur inserer en succes");

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <>
    <ModalWrapper open={open} setOpen={setOpen} >
      <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
        <Dialog.Title
        as='h2'
        className='text-base font-bold leading-6 text-gray-900 mb-4'
        >
         changer mot de passe
        </Dialog.Title>

        <div className='mt-2 flex flex-col gap-6'>
          <Textbox
          placeholder='Nouveau mot-de-passe'
          type='password'
          name='password'
          label='Nouveau mot-de-passe'
          className='w-full rounded'
          register={register("password",{
            required: "nouveau mot-de-passe demande"
          })}
          error={errors.cpass? errors.cpass.message:""}
          />

         <Textbox
          placeholder='Nouveau mot-de-passe'
          type='password'
          name='cpass'
          label='Confirme Nouveau mot-de-passe'
          className='w-full rounded'
          register={register("cpass",{
            required: "Confirmation nouveau mot-de-passe demande"
          })}
          error={errors.cpass? errors.cpass.message:""}
          />
        </div>

        {
          isLoading? (
            <div className='py-5'>
              <Loading/>

            </div>
          ):(
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
              type='submit'
              className='bg-blue-500 px-8 text-sm font-semibold text-white hover:bg-blue-300  sm:w-auto'
              label='Enregistrer'
              />
              <button
              type='button'
              className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto' 
              onClick={()=>setOpen(false)}
              >
               Annuler
              </button>

            </div>
          )
        }

      </form>

    </ModalWrapper>
    
    
    </>
  )
}

export default ChangePassword