import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  get phone() {
    return this.form.get('phone') as FormControl;
  }

  form: FormGroup;
  alerts: {
    icon: 'fire' | 'wind' | 'person-falling-burst';
    title: string;
    message: string;
    action: 'fireMessage' | 'gasMessage' | 'fallMessage';
  }[] = [
    {
      icon: 'fire',
      title: 'Fire Alert',
      message: 'Instant notification for fire',
      action: 'fireMessage',
    },
    {
      icon: 'wind',
      title: 'Gas Leak Detection',
      message: 'Early gas leak warnings',
      action: 'gasMessage',
    },
    {
      icon: 'person-falling-burst',
      title: 'Fall Detection',
      message: 'Instant alerts for falls',
      action: 'fallMessage',
    },
  ];

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      phone: new FormControl(null, [
        Validators.minLength(11),
        Validators.required,
      ]),
    });
  }

  async teste() {
    try {
      if (!this.form.valid) {
        return;
      }
      const res = await this.notificationService.teste();
      alert(res.message);
    } catch (error) {
      alert('ERRO !');
    }
  }

  async notify(action: 'fireMessage' | 'gasMessage' | 'fallMessage') {
    try {
      if (!this.form.valid) {
        this.phone.markAsTouched();
        return;
      }
      const res = await this.notificationService.add({
        action,
        ...this.form.value,
      });
      alert(res.message);
    } catch (error) {
      alert('ERRO !');
    }
  }
}
