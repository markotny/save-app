import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeAppComponent, HomeHeaderComponent} from './index';
import { HomeMainSentenceComponent } from './home-main-sentence/home-main-sentence.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';

@NgModule({
  declarations: [HomeAppComponent, HomeHeaderComponent, HomeMainSentenceComponent, HomeFeaturesComponent, HomeFooterComponent],
  imports: [CommonModule]
})
export class HomeAppModule {}
