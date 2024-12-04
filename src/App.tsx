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

function App() {
	const [text, setText] = useState("");
	const [items, setItems] = useState<{ text: string; completed: boolean }[]>(
		[]
	);
	const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
		"all"
	);
	const [search, setSearch] = useState("");
	const [editText, setEditText] = useState("");
	const [editIndex, setEditIndex] = useState<number | null>(null);

	const handleAddItem = () => {
		if (text.trim() !== "") {
			setItems((prevItems) => [...prevItems, { text, completed: false }]);
			setText("");
		}
	};

	const handleToggleComplete = (index: number) => {
		setItems((prevItems) =>
			prevItems.map((item, i) =>
				i === index ? { ...item, completed: !item.completed } : item
			)
		);
	};

	const filteredItems = items
		.filter((item) => {
			if (filter === "completed") return item.completed;
			if (filter === "incomplete") return !item.completed;
			if (filter === "all") return item;
			return true;
		})
		.filter((item) => item.text.toLowerCase().includes(search.toLowerCase()));

	const handleSort = () => {
		setItems((prevItems) =>
			[...prevItems].sort((a, b) => {
				if (a.completed === b.completed) return 0;
				return a.completed ? 1 : -1;
			})
		);
	};

	const handleEdit = (index: number) => {
		setEditIndex(index);
		setEditText(items[index].text);

		const edit = true;
	};
	const handleSaveEdit = () => {
		if (editIndex != null) {
			setItems((prevItems) =>
				prevItems.map((item, index) =>
					index === editIndex ? { ...item, text: editText } : item
				)
			);
			setEditIndex(null);
			setEditText("");
		}
	};

	return (
		<>
			<Box
				component='form'
				sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
				noValidate
				autoComplete='off'
			>
				<TextField
					label='New Task'
					variant='outlined'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<Button variant='contained' onClick={handleAddItem}>
					Add Task
				</Button>
				<Button variant='contained' onClick={handleSort}>
					sort
				</Button>
			</Box>

			<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
				<FormControl>
					<InputLabel>Filter</InputLabel>
					<Select
						value={filter}
						onChange={(e) => setFilter(e.target.value as any)}
					>
						<MenuItem value='all'>All</MenuItem>
						<MenuItem value='completed'>Completed</MenuItem>
						<MenuItem value='incomplete'>Incomplete</MenuItem>
					</Select>
				</FormControl>

				<TextField
					label='Search'
					variant='outlined'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</Box>

			<List>
				{filteredItems.map((item, index) => (
					<ListItem key={index}>
						<Checkbox
							checked={item.completed}
							onChange={() => handleToggleComplete(index)}
						/>
						{editIndex === index ? (
							// TextField místo ListItemText během úprav
							<TextField
								value={editText}
								onChange={(e) => setEditText(e.target.value)}
								onBlur={handleSaveEdit} // Uloží při opuštění
								onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()} // Uloží při Enter
							/>
						) : (
							// Normální ListItemText
							<ListItemText
								primary={item.text}
								sx={
									item.completed
										? { textDecoration: "line-through", color: "gray" }
										: { color: "black" }
								}
							/>
						)}
						<Button variant='outlined' onClick={() => handleEdit(index)}>
							Edit
						</Button>
					</ListItem>
				))}
			</List>
		</>
	);
}

export default App;
