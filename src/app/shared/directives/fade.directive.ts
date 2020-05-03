import {Directive, Input, ElementRef, OnDestroy, OnChanges, OnInit} from '@angular/core';
import {AnimationBuilder, AnimationMetadata, AnimationPlayer} from '@angular/animations';
import {FadeAnimationParams, fadeInAnimationFn, fadeOutAnimationFn} from '@shared/animations';
import {BreakpointObserver} from '@angular/cdk/layout';
import {BreakPointRegistry} from '@angular/flex-layout';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[appFade]'
})
export class FadeDirective implements OnChanges, OnInit, OnDestroy {
  @Input('appFade') mqAlias = 'xs';
  @Input() delay = '0s';
  @Input() duration = '0.3s';
  @Input() showDelay = this.delay;
  @Input() hideDelay = this.delay;
  @Input() showDuration = this.duration;
  @Input() hideDuration = this.duration;

  private watcher: Subscription;
  private displayStyle: string;
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
      breakpoint.matches ? this.animate(this.hideAnimation, 'none', 0) : this.animate(this.showAnimation, this.displayStyle, 1);
    });
  }

  ngOnInit(): void {
    this.displayStyle = this.el.nativeElement.style.display;
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  private animate(animation: AnimationMetadata, display: string, opacity: number) {
    const factory = this.builder.build(animation);
    this.player = factory.create(this.el.nativeElement);
    this.player.onDone(() => this.updateStyle(display, opacity));
    this.player.play();
  }

  private updateStyle(display: string, opacity: number) {
    this.el.nativeElement.style.display = display;
    this.el.nativeElement.style.opacity = opacity;
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
