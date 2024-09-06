import Notice from "../models/Notif.js";
import Task from "../models/task.js";
import User from "../models/User.js";

export const createTask = async (req, res) => {
  try {
    const { userId } = req.user;

    const { title, team, stage, date, priority, assets } = req.body;

    let text = "Une nouvelle tâche vous a été assignée";
if (team?.length > 1) {
  text = text + ` et à ${team?.length - 1} autres.`;
}

console.log(team)

text =
  text +
  ` La priorité de la tâche est fixée à ${priority}, alors vérifiez et agissez en conséquence. La date de la tâche est ${new Date(
    date
  ).toDateString()}. Merci!!!`;

    const activity = {
      type: "Affecte",
      activity: text,
      by: userId,
    };

    const task = await Task.create({
      title,
      team,
      stage: stage.toLowerCase(),
      date,
      priority: priority.toLowerCase(),
      assets,
      activities: activity,
    });

    await Notice.create({
      team,
      text,
      task: task._id,
    });

    res
      .status(200)
      .json({ status: true, task, message: "Tiket est cree avec succes." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const duplicateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    const newTask = await Task.create({
      ...task,
      title: task.title + " - Dupique",
    });

    newTask.team = task.team;
    newTask.subTasks = task.subTasks;
    newTask.assets = task.assets;
    newTask.priority = task.priority;
    newTask.stage = task.stage;

    await newTask.save();

    //alert users of the task
    let text = "Une nouvelle tâche vous a été assignée";
    if (team?.length > 1) {
      text = text + ` et à ${team?.length - 1} autres.`;
    }
    
    text =
      text +
      ` La priorité de la tâche est fixée à ${priority}, alors vérifiez et agissez en conséquence. La date de la tâche est ${new Date(
        date
      ).toDateString()}. Merci!!!`;

    await Notice.create({
      team: task.team,
      text,
      task: newTask._id,
    });

    res
      .status(200)
      .json({ status: true, message: "Tiket duplique avec succees." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const postTaskActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { type, activity } = req.body;

    const task = await Task.findById(id);

    const data = {
      type,
      activity,
      by: userId,
    };

    task.activities.push(data);

    await task.save();

    res
      .status(200)
      .json({ status: true, message: "Activite poste avec succes." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const dashboardStatistics = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;

    // Fetch tasks depending on user role (Admin or not)
    const allTasks = isAdmin
      ? await Task.find({
          isTrashed: false,
        })
          .populate({
            path: "team",
            select: "name role title email",
          })
          .sort({ _id: -1 })
      : await Task.find({
          isTrashed: false,
          team: { $all: [userId] },
        })
          .populate({
            path: "team",
            select: "name role title email",
          })
          .sort({ _id: -1 });

    // Fetch active users (if admin)
    const users = await User.find({ isActive: true })
      .select("name title role isAdmin createdAt isActive")
      .limit(10)
      .sort({ _id: -1 });

    // Group tasks by stage
    const groupTasks = allTasks.reduce((result, task) => {
      const stage = task.stage;
      result[stage] = (result[stage] || 0) + 1;
      return result;
    }, {});

    // Group tasks by priority
    const groupData = Object.entries(
      allTasks.reduce((result, task) => {
        const { priority } = task;
        result[priority] = (result[priority] || 0) + 1;
        return result;
      }, {})
    ).map(([name, total]) => ({ name, total }));

    // Group tasks by priority and month for line/area charts
    const tasksByMonthAndPriority = allTasks.reduce((result, task) => {
      const month = task.createdAt.toISOString().slice(0, 7); // Get 'YYYY-MM' format
      const { priority } = task;
      if (!result[month]) {
        result[month] = { faible: 0, moyen: 0, eleve: 0 };
      }
      result[month][priority] = (result[month][priority] || 0) + 1;
      return result;
    }, {});

    // Transform tasksByMonthAndPriority for recharts
    const tasksByMonthAndPriorityData = Object.entries(tasksByMonthAndPriority).map(
      ([month, priorities]) => ({
        month,
        ...priorities,
      })
    );

    // Calculate total tasks
    const totalTasks = allTasks?.length;
    const last10Task = allTasks?.slice(0, 10);

    // Summary object to send back to the frontend
    const summary = {
      totalTasks,
      last10Task,
      users: isAdmin ? users : [],
      tasks: groupTasks,
      graphData: groupData,
      monthlyPriorityData: tasksByMonthAndPriorityData,
    };

    res.status(200).json({
      status: true,
      message: "Successfully",
      ...summary,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { stage, isTrashed } = req.query;

    // Build the base query object
    const query = {
      isTrashed: Boolean(isTrashed),
    };

    // If the user is not an admin, only include tasks where the user is part of the team
    if (!isAdmin) {
      query.team = userId;
    }

    // Add stage filter if provided
    if (stage) {
      query.stage = stage;
    }

    // Execute the query with population and sorting
    const tasks = await Task.find(query)
      .populate({
        path: "team",
        select: "name title email",
      })
      .sort({ _id: -1 });

    // Calculate total tasks
    const totalTasks = tasks.length;

    res.status(200).json({
      status: true,
      totalTasks,  // Include the total number of tasks
      tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate({
        path: "team",
        select: "name title role email",
      })
      .populate({
        path: "activities.by",
        select: "name",
      });

    res.status(200).json({
      status: true,
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const createSubTask = async (req, res) => {
  try {
    const { title, tag, date } = req.body;

    const { id } = req.params;

    const newSubTask = {
      title,
      date,
      tag,
    };

    const task = await Task.findById(id);

    task.subTasks.push(newSubTask);

    await task.save();

    res
      .status(200)
      .json({ status: true, message: "Subticket inserer avec succes." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, team, stage, priority, assets } = req.body;

    const task = await Task.findById(id);

    task.title = title;
    task.date = date;
    task.priority = priority.toLowerCase();
    task.assets = assets;
    task.stage = stage.toLowerCase();
    task.team = team;

    await task.save();

    res
      .status(200)
      .json({ status: true, message: "Ticket est modifie avec succes." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const trashTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    task.isTrashed = true;

    await task.save();

    res.status(200).json({
      status: true,
      message: `Ticket est déplacé vers corbeille.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteRestoreTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { actionType } = req.query;

    if (actionType === "delete") {
      await Task.findByIdAndDelete(id);
    } else if (actionType === "deleteAll") {
      await Task.deleteMany({ isTrashed: true });
    } else if (actionType === "restore") {
      const resp = await Task.findById(id);

      resp.isTrashed = false;
      resp.save();
    } else if (actionType === "restoreAll") {
      await Task.updateMany(
        { isTrashed: true },
        { $set: { isTrashed: false } }
      );
    }

    res.status(200).json({
      status: true,
      message: `Operation performé avec succes.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
