import 'dotenv/config';
import cors from 'cors';
import express, { type Request, type Response } from 'express';
import { supabase } from './supabaseClient.js';

interface HabitUpdate {
	name?: string;
	completed?: boolean;
}

const app = express();
const port = Number(process.env.PORT || 3000);
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
	.split(',')
	.map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/health', (_request: Request, response: Response) => {
	response.json({ status: 'ok' });
});

app.get('/api/habits', async (_request: Request, response: Response) => {
	const { data, error } = await supabase
		.from('habits')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		response.status(500).json({ message: error.message });
		return;
	}

	response.json(data);
});

app.post('/api/habits', async (request: Request, response: Response) => {
	const name = typeof request.body?.name === 'string' ? request.body.name.trim() : '';

	if (!name) {
		response.status(400).json({ message: 'El nombre del hábito es obligatorio.' });
		return;
	}

	const { data, error } = await supabase
		.from('habits')
		.insert({ name, completed: false })
		.select()
		.single();

	if (error) {
		response.status(500).json({ message: error.message });
		return;
	}

	response.status(201).json(data);
});

app.put('/api/habits/:id', async (request: Request<{ id: string }>, response: Response) => {
	const body = request.body as HabitUpdate | undefined;
	const updates: HabitUpdate = {};

	if (typeof body?.name === 'string') {
		const name = body.name.trim();
		if (!name) {
			response.status(400).json({ message: 'El nombre del hábito no puede estar vacío.' });
			return;
		}
		updates.name = name;
	}

	if (typeof body?.completed === 'boolean') {
		updates.completed = body.completed;
	}

	if (Object.keys(updates).length === 0) {
		response.status(400).json({ message: 'No hay cambios válidos para actualizar.' });
		return;
	}

	const { data, error } = await supabase
		.from('habits')
		.update(updates)
		.eq('id', request.params.id)
		.select()
		.single();

	if (error) {
		response.status(error.code === 'PGRST116' ? 404 : 500).json({ message: error.message });
		return;
	}

	response.json(data);
});

app.delete('/api/habits/:id', async (request: Request<{ id: string }>, response: Response) => {
	const { error } = await supabase.from('habits').delete().eq('id', request.params.id);

	if (error) {
		response.status(500).json({ message: error.message });
		return;
	}

	response.status(204).send();
});

app.listen(port, () => {
	console.log(`Servidor ejecutándose en http://localhost:${port}`);
});