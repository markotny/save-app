import {Directive, Input, ElementRef, OnDestroy, OnChanges} from '@angular/core';
import {AnimationPlayer, AnimationBuilder, AnimationMetadata} from '@angular/animations';
import {FadeAnimationParams, fadeInAnimationFn, fadeOutAnimationFn} from '@shared/animations';
import {BreakpointObserver} from '@angular/cdk/layout';
import {BreakPointRegistry} from '@angular/flex-layout';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[appFade]'
})
export class FadeDirective implements OnChanges, OnDestroy {
  @Input('appFade') mqAlias = 'xs';
  @Input() delay = '0s';
  @Input() duration = '0.3s';
  @Input() showDelay = this.delay;
  @Input() hideDelay = this.delay;
  @Input() showDuration = this.duration;
  @Input() hideDuration = this.duration;

  private watcher: Subscription;
  private player: AnimationPlayer;

  constructor(
    private el: ElementRef,
    private builder: AnimationBuilder,
    private registry: BreakPointRegistry,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnChanges(): void {
    const query = this.registry.findByAlias(this.mqAlias).mediaQuery;
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
    this.watcher = this.breakpointObserver.observe(query).subscribe(breakpoint => {
      if (this.player) {
        this.player.destroy();
      }
      breakpoint.matches ? this.animate(this.hideAnimation) : this.animate(this.showAnimation);
    });
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  private animate(animationMetadata: AnimationMetadata) {
    const factory = this.builder.build(animationMetadata);
    const player = factory.create(this.el.nativeElement);
    player.play();
  }

  private get showAnimation(): AnimationMetadata {
    const params: FadeAnimationParams = {
      delay: this.showDelay,
      duration: this.showDuration
    };
    return fadeInAnimationFn(params);
  }

  private get hideAnimation(): AnimationMetadata {
    const params: FadeAnimationParams = {
      delay: this.hideDelay,
      duration: this.hideDuration
    };
    return fadeOutAnimationFn(params);
  }
}
