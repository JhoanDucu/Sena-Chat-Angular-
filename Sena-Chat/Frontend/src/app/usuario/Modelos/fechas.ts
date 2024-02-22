import {
    format,
    isSameMonth,
    isSameWeek,
    isYesterday,
    isToday,
    addDays, // usar para el futuro
    isWithinInterval,
    startOfToday,
    subDays
} from 'date-fns';

import { es } from 'date-fns/locale';

export class Fecha {
    private now = startOfToday();
    private sevenDaysAgo = subDays(this.now, 7);
    constructor(
        private date: Date,
    ){ }

    private monthWeek = () => isSameMonth(this.date, this.now) && isSameWeek(this.date, this.now);

    private week = () =>  isWithinInterval(this.date, { start: this.sevenDaysAgo, end: this.now });

    static fechaActual = () => `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`;

    static momentoAhora = () => `${format(new Date(), "EEEE, dd 'de' MMMM", { locale: es })}`;

    static horaActual = () => `${format(new Date(), 'hh:mm a')}`;

    static obtenerHora = (date: Date) => format(date, 'hh:mm a');

    private diaSemana = () => `${format(this.date, 'EEEE', { locale: es })}`;

    private fechaCompleta = () => `${format(this.date, 'dd/LLL/yyyy', { locale: es })}`;

    public retornar = () => `${
        isToday(this.date) ? Fecha.obtenerHora(this.date) : isYesterday(this.date) ? 
        'Ayer' : this.monthWeek() || this.week() ? this.diaSemana() : this.fechaCompleta()
    }`;
}