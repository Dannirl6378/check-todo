import React, { useState } from "react";
import {
	Box,
	Button,
	TextField,
	List,
	ListItem,
	ListItemText,
	Checkbox,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material";

type Task = {
	text: string;
	category: string;
	completed: boolean;
};
console.log("testGit")

const App = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [filter, setFilter] = useState<string>("All");
	const [newTask, setNewTask] = useState<string>("");
	const [newCategory, setNewCategory] = useState<string>("Práce");

	const categories = ["Práce", "Domov", "Osobní"];

	// Přidej funkce pro přidání, úpravu, mazání, filtrování
	return (
		<Box>
			<Box>
				<TextField
					label='New Task'
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<FormControl>
					<InputLabel>Category</InputLabel>
					<Select
						value={newCategory}
						onChange={(e) => setNewCategory(e.target.value)}
					>
						{categories.map((cat, idx) => (
							<MenuItem key={idx} value={cat}>
								{cat}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button
					variant='contained'
					// Přidej onClick pro přidání nového úkolu
				>
					Add Task
				</Button>
			</Box>

			<FormControl>
				<InputLabel>Filter</InputLabel>
				<Select value={filter} onChange={(e) => setFilter(e.target.value)}>
					<MenuItem value='All'>All</MenuItem>
					{categories.map((cat, idx) => (
						<MenuItem key={idx} value={cat}>
							{cat}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<List>
				{tasks
					.filter
					// Filtruj podle kategorie
					()
					.map((task, index) => (
						<ListItem key={index}>
							<Checkbox
								checked={task.completed}
								// Přidej onChange pro označení dokončeného úkolu
							/>
							<ListItemText
								primary={task.text}
								// Změň styl na přeškrtnutý, pokud je úkol dokončen
							/>
							<Button
								variant='outlined'
								// Přidej funkci pro mazání úkolu
							>
								Delete
							</Button>
						</ListItem>
					))}
			</List>
		</Box>
	);
};

export default App;
