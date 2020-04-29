import {trigger, state, style, transition, animate} from '@angular/animations';

export const menuButtonAnimations = trigger('menuToggle', [
  state(
    'true',
    style({
      transform: 'rotate(90deg)'
    })
  ),
  state(
    'false',
    style({
      transform: 'rotate(0deg)'
    })
  ),
  transition('* => *', [animate('0.1s ease-in-out')])
]);
