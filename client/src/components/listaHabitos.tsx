import type { Habito } from '../tipos';

interface ListaHabitosProps {
	habitos: Habito[];
	onCambiarEstado: (habito: Habito) => void;
	onEliminar: (id: string) => void;
}

export function ListaHabitos({ habitos, onCambiarEstado, onEliminar }: ListaHabitosProps) {
	if (habitos.length === 0) {
		return <p className="empty-state">Todavía no tienes hábitos registrados.</p>;
	}

	return (
		<ul className="habit-list">
			{habitos.map((habito) => (
				<li className={habito.completed ? 'habit completed' : 'habit'} key={habito.id}>
					<label>
						<input
							type="checkbox"
							checked={habito.completed}
							onChange={() => onCambiarEstado(habito)}
						/>
						<span>{habito.name}</span>
					</label>
					<button className="delete-button" type="button" onClick={() => onEliminar(habito.id)}>
						Eliminar
					</button>
				</li>
			))}
		</ul>
	);
}
