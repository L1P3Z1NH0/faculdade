import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BodyComponent } from './components/body/body.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    HeaderComponent,
    BodyComponent,
    ButtonComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 2000,
      extendedTimeOut: 2000,
    }),
  ],
  exports: [
    HeaderComponent,
    FontAwesomeModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    ReactiveFormsModule,
    BodyComponent,
    ButtonComponent,
    InputComponent,
    ToastrModule,
    NgSelectModule,
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {}
