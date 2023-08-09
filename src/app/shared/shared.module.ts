import { NgModule } from '@angular/core';
import { NoImageDirective } from '../directives/no-image.directive';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NoImageDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    NoImageDirective,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    DatePipe,
    CurrencyPipe
  ]
})
export class SharedModule { }
