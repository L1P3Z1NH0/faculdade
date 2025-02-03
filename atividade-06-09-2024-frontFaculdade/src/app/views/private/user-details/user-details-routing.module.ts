import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [{ path: '', component: UserDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class UserDetailsRoutingModule {}
