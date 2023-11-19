import { FormControl } from '@angular/forms'
export class Login {
    constructor(
        public numerodoc: FormControl<number | null>,
        public tipodoc: FormControl<string | null>,
        public contrasena: FormControl<string | null>
    ){}
}