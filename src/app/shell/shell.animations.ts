import {animate, style, transition, trigger, state, animation, useAnimation} from '@angular/animations';
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
    `${SidebarState.Docked}, ${SidebarState.Over}`,
    style({
      transform: 'translateX(0)'
    })
  ),
  state(
    SidebarState.Hidden,
    style({
      transform: 'translateX(-100%)'
    })
  ),
  transition(`* => ${SidebarState.Hidden}`, useAnimation(slideOut)),
  transition(`${SidebarState.Hidden} => *`, useAnimation(slideIn))
]);

export const mainContentAnimations = trigger('mainContentToggle', [
  state(
    SidebarState.Docked,
    style({
      marginLeft: 'var(--sidebar-width)'
    })
  ),
  state(
    `${SidebarState.Hidden}, ${SidebarState.Over}`,
    style({
      marginLeft: 0
    })
  ),
  transition(`${SidebarState.Docked} => *`, useAnimation(slideOut)),
  transition(`* => ${SidebarState.Docked}`, useAnimation(slideIn))
]);

export const headerAnimations = trigger('headerToggle', [
  state(
    'true',
    style({
      height: 'var(--header-height-small)'
    })
  ),
  state(
    'false',
    style({
      height: 'var(--header-height-large)'
    })
  ),
  transition('* => *', animate(`0.1s ${slideDuration} ease`))
]);

export const overlayAnimations = trigger('overlayToggle', [
  state(
    'true',
    style({
      opacity: '1',
      display: '*'
    })
  ),
  state(
    'false',
    style({
      opacity: 0,
      display: 'none'
    })
  ),
  transition('false => true', useAnimation(fadeInAnimation)),
  transition('true => false', useAnimation(fadeOutAnimation))
]);
