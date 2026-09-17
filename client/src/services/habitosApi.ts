import axios from 'axios';
import type { CrearHabito, Habito } from '../tipos';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export async function obtenerHabitos(): Promise<Habito[]> {
	const response = await api.get<Habito[]>('/habits');
	return response.data;
}

export async function crearHabito(habito: CrearHabito): Promise<Habito> {
	const response = await api.post<Habito>('/habits', habito);
	return response.data;
}

export async function cambiarEstadoHabito(id: string, completed: boolean): Promise<Habito> {
	const response = await api.put<Habito>(`/habits/${id}`, { completed });
	return response.data;
}

export async function eliminarHabito(id: string): Promise<void> {
	await api.delete(`/habits/${id}`);
}
