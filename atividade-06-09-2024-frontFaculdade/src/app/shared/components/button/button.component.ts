import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() width: 'tw-w-fit' | 'tw-w-full' = 'tw-w-fit';
  @Input() disabled: boolean = false;
}
