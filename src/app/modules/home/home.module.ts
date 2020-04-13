import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';

import {HomeRoutingModule} from './home-routing.module';

import {
  HomeAppComponent,
  HomeHeaderComponent,
  HomeMainSentenceComponent,
  HomeFeaturesComponent,
  HomeFooterComponent
} from './index';
@NgModule({
  declarations: [
    HomeAppComponent,
    HomeHeaderComponent,
    HomeMainSentenceComponent,
    HomeFeaturesComponent,
    HomeFooterComponent
  ],
  imports: [SharedModule, HomeRoutingModule]
})
export class HomeModule {}
