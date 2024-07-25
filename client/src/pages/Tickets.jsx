import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TicketTitle";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/Ticket/Table";
import AddTask from "../components/Ticket/AddTicket";
import { useGetAllTaskQuery } from "../redux/slices/api/ticketApiSlice";

const TABS = [
  { title: "Vue en tableau", icon: <MdGridView /> },
  { title: "Vue en liste", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
  Incomplet: "bg-red-600",
};

const Tickets = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const status = params?.status || "";
  console.log(status)
  const {data, isLoading} = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  })
  return isLoading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `Tickets ${status} ` : "Tickets"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Créer un ticket'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            <TaskTitle label='A Faire' className={TASK_TYPE.todo} />
            <TaskTitle
              label='En Cours'
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label='Traite' className={TASK_TYPE.completed} />
            <TaskTitle label='Incomplet' className={TASK_TYPE.Incomplet} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={data?.tasks} />
        ) : (
          <div className='w-full'>
            <Table tasks={data?.tasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
}

export default Tickets