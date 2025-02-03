import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/shared/services/users.service';

type Fields = {
  label: string;
  value: string;
  placeholder: string;
  type: 'text' | 'number' | 'email';
  options?: { label: string; value: string }[];
}[];

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  form: FormGroup;

  fields: Fields = [
    {
      label: 'Primeiro nome',
      value: 'firstName',
      type: 'text',
      placeholder: 'Luara',
    },
    {
      label: 'Sobrenome',
      value: 'lastName',
      type: 'text',
      placeholder: 'Seib',
    },
    {
      label: 'Idade',
      value: 'age',
      type: 'number',
      placeholder: '36',
    },
    {
      label: 'Gênero',
      value: 'gender',
      type: 'text',
      placeholder: 'Feminino',
      options: [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
        { label: 'Outro', value: 'other' },
      ],
    },
    {
      label: 'Tipo de usuário',
      value: 'userType',
      type: 'text',
      placeholder: 'Cuidador',
      options: [
        { label: 'Cuidador', value: 'caregiver' },
        { label: 'Idoso', value: 'oldPerson' },
      ],
    },
    {
      label: 'E-mail',
      value: 'email',
      type: 'email',
      placeholder: 'email@example',
    },
    {
      label: 'Telefone',
      value: 'phone',
      type: 'text',
      placeholder: '(12)34567-8910',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private usersService: UsersService,
    private toastrService: ToastrService
  ) {
    this.router = inject(Router);
    this.form = this.formBuilder.group(
      this.fields.reduce((acc, field) => {
        return {
          ...acc,
          [field.value]: new FormControl(null, [
            // Validators.minLength(11),
            Validators.required,
          ]),
        };
      }, {})
    );
  }

  ngOnInit() {
    const currentUser = this.usersService.getUserFromLocalStorage();
    if (currentUser?.firstName)
      (this.form.get('firstName') as FormControl).setValue(
        currentUser?.firstName
      );
    if (currentUser?.lastName)
      (this.form.get('lastName') as FormControl).setValue(
        currentUser?.lastName
      );
    if (currentUser?.age)
      (this.form.get('age') as FormControl).setValue(currentUser?.age);
    if (currentUser?.gender)
      (this.form.get('gender') as FormControl).setValue(currentUser?.gender);
    if (currentUser?.userType)
      (this.form.get('userType') as FormControl).setValue(
        currentUser?.userType
      );
    if (currentUser?.email)
      (this.form.get('email') as FormControl).setValue(currentUser?.email);
    if (currentUser?.phone)
      (this.form.get('phone') as FormControl).setValue(currentUser?.phone);
  }

  async save() {
    try {
      if (!this.form.valid) {
        return;
      }

      const currentUser = this.usersService.getUserFromLocalStorage();

      const res = (await this.usersService.updateUser(
        currentUser._id,
        this.form.value
      )) as any;
      this.usersService.setUserOnLocalStorage(res.user);

      this.toastrService.success('Atualizado com sucesso');
      this.router.navigateByUrl('/actions');
    } catch (error: any) {
      this.toastrService.error(error?.error?.message || 'Erro');
    }
  }
}
