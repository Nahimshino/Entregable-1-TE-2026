import { useState, type FormEvent } from 'react';

interface HabitosFormProps {
	onCrear: (name: string) => Promise<void>;
}

export function HabitosForm({ onCrear }: HabitosFormProps) {
	const [name, setName] = useState('');
	const [guardando, setGuardando] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!name.trim()) return;

		setGuardando(true);
		try {
			await onCrear(name.trim());
			setName('');
		} finally {
			setGuardando(false);
		}
	}

	return (
		<form className="habit-form" onSubmit={handleSubmit}>
			<label htmlFor="habit-name">Nuevo hábito</label>
			<div className="form-row">
				<input
					id="habit-name"
					value={name}
					onChange={(event) => setName(event.target.value)}
					placeholder="Ej. Leer 20 minutos"
					maxLength={120}
				/>
				<button type="submit" disabled={guardando || !name.trim()}>
					{guardando ? 'Guardando...' : 'Agregar'}
				</button>
			</div>
		</form>
	);
}
