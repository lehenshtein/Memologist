import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';

const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSliderModule,
  MatCardModule,
  MatFormFieldModule,
  MatSidenavModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    ...material
  ],
  exports: [
    TranslateModule,
    ...material
  ]
})
export class SharedModule { }
