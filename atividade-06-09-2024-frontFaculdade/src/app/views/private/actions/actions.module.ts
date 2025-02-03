import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsComponent } from './actions.component';
import { ActionsRoutingModule } from './actions-routing.module';

@NgModule({
  declarations: [ActionsComponent],
  imports: [CommonModule, SharedModule, ActionsRoutingModule],
})
export class ActionsModule {}
