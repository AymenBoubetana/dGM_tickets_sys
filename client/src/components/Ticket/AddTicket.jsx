import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import {getStorage,ref,getDownloadURL,uploadBytesResumable} from "firebase/storage";
import { app } from "../../utils/firebase";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices/api/ticketApiSlice";
import { toast } from "sonner";
import { dateFormatter } from "../../utils/Funcs";
import emailjs from 'emailjs-com';
import { useGetTeamListQuery } from "../../redux/slices/api/userApiSlice";


const LISTS = ["a faire", "en cours", "traite","Incomplet"];
const PRIORIRY = ["eleve", "moyen", "faible"];

const uploadedFileURLs = [];

const AddTask = ({ open, setOpen,task }) => {
  const defaultValues = {
    title: task?.title || "",
    date: dateFormatter(task?.date || new Date()),
    team:[],
    stage:"",
    priority:"",
    assets:[],
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues});
  const [team, setTeam] = useState(task?.team || []);
  console.log(team.length)
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [createTask,{isLoading}] = useCreateTaskMutation();
  const [updateTask,{isLoading:isUpdating}] = useUpdateTaskMutation();
  const URLS = task?.assets ? [...task.assets]:[];

  const {data} = useGetTeamListQuery();

  // emailjs func
   

  const sendEmail = (ticketData) => {
    let names = []
    for (let i = 0; i < ticketData.team.length; i++) {
      const memberId = ticketData.team[i];
      const member = data.find(user => user._id === memberId);
      if (member) {
        names.push(member.name);
      }
    }
    console.log(names);


    emailjs.send(
      "service_tryy3pl", // Replace with your EmailJS service ID
      "template_dg8u10c", // Replace with your EmailJS template ID
      {
        title: ticketData.title,
        date: ticketData.date,
        stage: ticketData.stage,
        priority: ticketData.priority,
        team: names.join(","),
        assets: ticketData.assets.join(", "),
      },
      "Mz7gh3mneZyBqamVO" // Replace with your EmailJS user ID
    ).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
        console.log("lalalala")
      }
    );
  };

  const submitHandler = async (data) => {
    console.log(stage)
    for (const file of assets) {
      setUploading(true);
      try {
        await uploadFiles(file)
      } catch (error) {
        console.error("Error upload",error.message);
        return;
      }finally{
        setUploading(false);
      }
    
  }

  try {
    const newData = {
      ...data,
      assets:[...URLS,...uploadedFileURLs],
      team,
      stage,
      priority,
     };

     const res = task?._id ? await updateTask({...newData,_id:task._id}).unwrap():await createTask(newData).unwrap(); 

     toast.success(res.message);
     sendEmail(newData);

     setTimeout(() => {
      setOpen(false);
      
     }, 300);


    } catch (error) {
       console.log(error);
       // toast.error(error?.data?.message || error.error)
  } 

  };  

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  // fonnction pour upload files.

  const uploadFiles = async (file) =>{
    const storage = getStorage(app);

    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage,name);

    const uploadTask = uploadBytesResumable(storageRef,file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot)=>{
          console.log("iploding.....")
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).
          then((downloadURL)=>{
            uploadedFileURLs.push(downloadURL);
            resolve();
          })
          .catch((error)=>{
            reject(error);
          });
        }
      )
    })
  }

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {task ? "MODIFIER TICKET" : "AJOUTER TICKET"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Titre Ticket'
              type='text'
              name='title'
              label='Titre Ticket '
              className='w-full rounded'
              register={register("title", { required: "Titre est obligatoire" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className='flex gap-4'>
              <SelectList
                label='Type Ticket'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='date'
                  label='Ticket Date'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Date obligatoire!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Priorité'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Ajouter Assets</span>
                </label>
              </div>
            </div>

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Ajout des assets
                </span>
              ) : (
                <Button
                  label='Confirmer'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Annuler'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;