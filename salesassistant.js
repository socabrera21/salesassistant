import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { List, ListItem } from "@/components/ui/list";
import { motion } from "framer-motion";

const SalesAssistant = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [prospectNotes, setProspectNotes] = useState("");
  const [prospects, setProspects] = useState([]);
  const [newProspect, setNewProspect] = useState({ name: "", company: "", contact: "" });

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, { task: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const addProspect = () => {
    if (newProspect.name && newProspect.company && newProspect.contact) {
      setProspects([...prospects, newProspect]);
      setNewProspect({ name: "", company: "", contact: "" });
    }
  };

  const removeProspect = (index) => {
    const updatedProspects = prospects.filter((_, i) => i !== index);
    setProspects(updatedProspects);
  };

  return (
    <div className="p-4 space-y-4">
      <motion.h1 
        className="text-2xl font-bold" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}>
        Sales Assistant
      </motion.h1>
      
      <Card className="p-4">
        <h2 className="text-lg font-semibold">Daily Task Manager</h2>
        <div className="flex items-center space-x-2 mt-2">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <Button onClick={addTask}>Add Task</Button>
        </div>
        <List className="mt-4 space-y-2">
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              className="flex items-center justify-between space-x-2 p-2 border rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                <span className={task.completed ? "line-through" : ""}>{task.task}</span>
              </div>
              <Button variant="destructive" onClick={() => removeTask(index)}>
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold">Prospect Manager</h2>
        <div className="space-y-2">
          <Input
            type="text"
            value={newProspect.name}
            onChange={(e) => setNewProspect({ ...newProspect, name: e.target.value })}
            placeholder="Prospect Name"
          />
          <Input
            type="text"
            value={newProspect.company}
            onChange={(e) => setNewProspect({ ...newProspect, company: e.target.value })}
            placeholder="Company Name"
          />
          <Input
            type="text"
            value={newProspect.contact}
            onChange={(e) => setNewProspect({ ...newProspect, contact: e.target.value })}
            placeholder="Contact Information"
          />
          <Button onClick={addProspect}>Add Prospect</Button>
        </div>
        <List className="mt-4 space-y-2">
          {prospects.map((prospect, index) => (
            <ListItem
              key={index}
              className="flex items-center justify-between space-x-2 p-2 border rounded-lg"
            >
              <div>
                <p className="font-semibold">{prospect.name}</p>
                <p>{prospect.company}</p>
                <p>{prospect.contact}</p>
              </div>
              <Button variant="destructive" onClick={() => removeProspect(index)}>
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold">Prospect Notes</h2>
        <Textarea
          value={prospectNotes}
          onChange={(e) => setProspectNotes(e.target.value)}
          placeholder="Add notes for a prospect (e.g., meeting takeaways, follow-up actions)"
          rows={6}
        />
        <Button className="mt-2">Save Notes</Button>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <div className="space-y-2">
          <Button className="w-full">Send Follow-Up Email</Button>
          <Button className="w-full">Schedule a Meeting</Button>
          <Button className="w-full">Log a Call</Button>
        </div>
      </Card>
    </div>
  );
};

export default SalesAssistant;
