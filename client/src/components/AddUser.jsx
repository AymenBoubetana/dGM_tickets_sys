import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import SelectList from "./SelectList";

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const list =[true,false]
  



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const [addNewUser,{isLoading}] = useRegisterMutation();
  const [updateUser ,{isLoading:isUpdating}] = useUpdateUserMutation();
  const [addmin,setAdmin]=useState(userData?.isAdmin || list[0]);
  console.log(addmin);

  const dispatch = useDispatch();
  const handleOnSubmit = async (data) => {
    try {
      if(userData){
        const result = await updateUser(data).unwrap();

        toast.success("le profile est modifie avec succes");
        if(userData?._id === user._id){
          dispatch(setCredentials({...result.user}));
        }

      }else{
        await addNewUser({
          ...data,
          isAdmin:addmin,
          password:data.email,
        }).unwrap();

        toast.success("Nouveau utilisateur insere")
      }
      setTimeout(()=>{
        setOpen(false)
      },1500)
    } catch (error) {
      toast.error("un erreur s'est produit")
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {userData ? "MODIFIER PROFILE" : "AJOUTER NOUVEAU PROFILE"}
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Nom Complet'
              type='text'
              name='name'
              label='Nom Complet'
              className='w-full rounded'
              register={register("name", {
                required: "Nom Complet est obligatoire!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Titre'
              type='text'
              name='title'
              label='Titre'
              className='w-full rounded'
              register={register("title", {
                required: "Titre est obligatoire!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Addresse'
              className='w-full rounded'
              register={register("email", {
                required: "Email Addresse est obligatoire!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder='Role'
              type='text'
              name='role'
              label='Role'
              className='w-full rounded'
              register={register("role", {
                required: "Le role d'utilisateur est obligatoire!",
              })}
              error={errors.role ? errors.role.message : ""}
            />

               <SelectList
                label='Utilisateur Admin?'
                lists={list}
                selected={addmin}
                setSelected={setAdmin}
              />
          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                label='Enregistrer'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Annuler'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;