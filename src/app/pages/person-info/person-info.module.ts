import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonInfoPageRoutingModule } from './person-info-routing.module';

import { PersonInfoPage } from './person-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonInfoPageRoutingModule
  ],
  declarations: [PersonInfoPage]
})
export class PersonInfoPageModule {}
