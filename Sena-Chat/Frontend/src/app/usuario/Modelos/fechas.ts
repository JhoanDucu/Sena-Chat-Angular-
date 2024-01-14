import { format, isSameMonth, isSameWeek, isYesterday, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

export class Fecha {

    constructor(
        private date: Date,
        private now: Date,
    ){ }

    private monthWeek = () => isSameMonth(this.date, this.now) && isSameWeek(this.date, this.now)

    static fechaActual = () => `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`;

    static obtenerHora = (date: Date) => format(date, 'hh:mm a');

    private diaSemana = () => `${format(this.date, 'EEEE', { locale: es })}`;

    private fechaCompleta = () => `${format(this.date, 'dd/LLL/yyyy', { locale: es })}`;

    public retornar = () => `${
        isToday(this.date) ? Fecha.obtenerHora(this.date) : isYesterday(this.date) ? 
        'Ayer' : this.monthWeek() ? this.diaSemana() : this.fechaCompleta()
    }`;
}