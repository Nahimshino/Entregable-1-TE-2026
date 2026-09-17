import { useEffect, useState } from 'react';
import { HabitosForm } from './components/habitosFrom';
import { ListaHabitos } from './components/listaHabitos';
import { cambiarEstadoHabito, crearHabito, eliminarHabito, obtenerHabitos } from './services/habitosApi';
import type { Habito } from './tipos';

export default function App() {
	const [habitos, setHabitos] = useState<Habito[]>([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState('');
	const [exito, setExito] = useState('');

	useEffect(() => {
		obtenerHabitos()
			.then(setHabitos)
			.catch(() => setError('No se pudieron cargar los hábitos. Revisa que el servidor esté activo.'))
			.finally(() => setCargando(false));
	}, []);

	async function agregarHabito(name: string) {
		setError('');
		setExito('');
		try {
			const nuevoHabito = await crearHabito({ name });
			setHabitos((actuales) => [nuevoHabito, ...actuales]);
			setExito('Hábito creado correctamente.');
		} catch (error) {
			const mensaje = axiosErrorMessage(error, 'No se pudo crear el hábito.');
			setError(mensaje);
			throw new Error(mensaje);
		}
	}

	async function alternarHabito(habito: Habito) {
		setError('');
		setExito('');
		try {
			const actualizado = await cambiarEstadoHabito(habito.id, !habito.completed);
			setHabitos((actuales) => actuales.map((item) => item.id === actualizado.id ? actualizado : item));
			setExito(actualizado.completed ? 'Hábito completado.' : 'Hábito marcado como pendiente.');
		} catch {
			setError('No se pudo actualizar el hábito.');
		}
	}

	async function borrarHabito(id: string) {
		setError('');
		setExito('');
		try {
			await eliminarHabito(id);
			setHabitos((actuales) => actuales.filter((habito) => habito.id !== id));
			setExito('Hábito eliminado correctamente.');
		} catch {
			setError('No se pudo eliminar el hábito.');
		}
	}

	const completados = habitos.filter((habito) => habito.completed).length;

	return (
		<main className="app-shell">
			<section className="hero">
				<p className="eyebrow">MI RUTINA</p>
				<h1>Hábitos que sí caben en tu día.</h1>
				<p className="intro">Registra pequeñas acciones, márcalas al cumplirlas y observa tu constancia.</p>
			</section>
			<section className="panel">
				<div className="panel-heading">
					<div>
						<p className="eyebrow">HOY</p>
						<h2>Tu lista de hábitos</h2>
					</div>
					<span className="progress">{completados}/{habitos.length} completos</span>
				</div>
				<HabitosForm onCrear={agregarHabito} />
				{error && <p className="error-message">{error}</p>}
				{exito && <p className="success-message" role="status">{exito}</p>}
				{cargando ? <p className="empty-state">Cargando hábitos...</p> : <ListaHabitos habitos={habitos} onCambiarEstado={alternarHabito} onEliminar={borrarHabito} />}
			</section>
		</main>
	);
}

function axiosErrorMessage(error: unknown, fallback: string): string {
	if (error && typeof error === 'object' && 'response' in error) {
		const response = (error as { response?: { data?: { message?: string } } }).response;
		if (response?.data?.message) return response.data.message;
	}

	return fallback;
}
