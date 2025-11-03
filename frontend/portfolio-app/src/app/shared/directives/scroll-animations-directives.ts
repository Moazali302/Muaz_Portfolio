import { Directive, ElementRef, OnInit } from '@angular/core';
import { AnimationBuilder, animate, style } from '@angular/animations';

@Directive({
  selector: '[scrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit {
  constructor(private el: ElementRef, private builder: AnimationBuilder) {}

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 🌟 Premium Smooth Animation
          const animation = this.builder.build([
            style({
              opacity: 0,
              transform: 'translateY(60px) scale(0.95)',
              filter: 'blur(6px)',
            }),
            animate(
              '1200ms cubic-bezier(0.16, 1, 0.3, 1)',
              style({
                opacity: 1,
                transform: 'translateY(0) scale(1)',
                filter: 'blur(0)',
              })
            ),
          ]);

          const player = animation.create(this.el.nativeElement);
          player.play();

          // Stop observing once animated
          observer.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of element visible
    );

    observer.observe(this.el.nativeElement);
  }
}
