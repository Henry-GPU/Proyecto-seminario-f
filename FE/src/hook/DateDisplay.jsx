import { format } from 'date-fns';

function DateDisplay({ dateString }) {
    // Convierte la cadena ISO 8601 a un objeto de fecha
    const date = new Date(dateString);

    // Formatea la fecha según tus necesidades (ejemplo: día/mes/año horas:minutos)
    const formattedDate = format(date, 'dd/MM/yyyy hh:mm a');

    return <span>{formattedDate}</span>;
}

export default DateDisplay;
