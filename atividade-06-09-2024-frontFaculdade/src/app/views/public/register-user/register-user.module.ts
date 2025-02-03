import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterUserComponent } from './register-user.component';
import { RegisterUserRoutingModule } from './register-user-routing.module';

@NgModule({
  declarations: [RegisterUserComponent],
  imports: [CommonModule, SharedModule, RegisterUserRoutingModule],
})
export class RegisterUserModule {}
