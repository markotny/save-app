import {animate, style, transition, trigger, state, animation, useAnimation, group, query, animateChild} from '@angular/animations';
import {fadeInAnimation, fadeOutAnimation} from '@shared/animations';

export enum SidebarState {
  Docked = 'docked',
  Hidden = 'hidden',
  Over = 'over'
}

const slideDuration = '0.3s';

const slideIn = animation(animate(`${slideDuration} ease-out`));
const slideOut = animation(animate(`${slideDuration} ease-in`));

export const sidebarAnimations = trigger('sidebarToggle', [
  state(
    SidebarState.Docked,
    style({
      transform: 'translateX(0)',
      width: 'var(--sidebar-width-large)'
    })
  ),
  state(
    SidebarState.Over,
    style({
      transform: 'translateX(0)',
      width: 'var(--sidebar-width-small)'
    })
  ),
  state(
    SidebarState.Hidden,
    style({
      transform: 'translateX(-100%)',
      width: '*'
    })
  ),
  transition(`* => ${SidebarState.Hidden}`, useAnimation(slideOut)),
  transition(`* => *`, useAnimation(slideIn))
]);

export const mainContentAnimations = trigger('mainContentToggle', [
  state(
    SidebarState.Docked,
    style({
      marginLeft: 'var(--sidebar-width-large)'
    })
  ),
  state(
    `${SidebarState.Hidden}, ${SidebarState.Over}`,
    style({
      marginLeft: 0
    })
  ),
  transition(`${SidebarState.Docked} => *`, group([query('@headerToggle', animateChild()), useAnimation(slideOut)])),
  transition(`* => ${SidebarState.Docked}`, group([query('@headerToggle', animateChild()), useAnimation(slideIn)]))
]);

export const headerAnimations = trigger('headerToggle', [
  state(
    SidebarState.Docked,
    style({
      height: 'var(--header-height-large)'
    })
  ),
  state(
    `${SidebarState.Hidden}, ${SidebarState.Over}`,
    style({
      height: 'var(--header-height-small)'
    })
  ),
  transition('* => *', animate(`0.1s ${slideDuration} ease`))
]);

export const overlayAnimations = trigger('overlayToggle', [
  state(
    SidebarState.Over,
    style({
      opacity: '1',
      display: '*'
    })
  ),
  state(
    `${SidebarState.Hidden}, ${SidebarState.Docked}`,
    style({
      opacity: 0,
      display: 'none'
    })
  ),
  transition(`* => ${SidebarState.Over}`, useAnimation(fadeInAnimation)),
  transition(`${SidebarState.Over} => *`, useAnimation(fadeOutAnimation))
]);
