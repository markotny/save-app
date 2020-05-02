import {style, animate, animation} from '@angular/animations';

export interface FadeAnimationParams {
  duration: string | number;
  delay: string | number;
}
const defaultFadeOptions: FadeAnimationParams = {
  duration: '0.3s',
  delay: '0s'
};
const fadeIn = [animate('{{delay}}', style({display: '*'})), animate('{{duration}} ease-in', style({opacity: '1'}))];

const fadeOut = [animate(`{{duration}} {{delay}} ease-out`, style({opacity: 0})), style({display: 'none'})];

export const fadeInAnimation = animation(fadeIn, {
  params: defaultFadeOptions
});
export const fadeOutAnimation = animation(fadeOut, {
  params: defaultFadeOptions
});
export const fadeInAnimationFn = (params: FadeAnimationParams) => animation(fadeIn, {params});
export const fadeOutAnimationFn = (params: FadeAnimationParams) => animation(fadeOut, {params});
