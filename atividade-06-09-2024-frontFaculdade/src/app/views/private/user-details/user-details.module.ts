import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailsRoutingModule } from './user-details-routing.module';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [CommonModule, SharedModule, UserDetailsRoutingModule],
})
export class UserDetailsModule {}
