import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Carousel Variants
// ============================================================================

const carouselVariants = cva(
  [
    "relative w-full overflow-hidden",
    "rounded-2xl",
    "bg-black/80",
    "border-2 border-cyber",
    // 3D cyberpunk shadow
    "shadow-cyber-border",
    "hover:shadow-cyber-border-lg",
  ],
  {
    variants: {
      variant: {
        default: "",
        elevated: ["shadow-cyber-border-lg", "hover:shadow-cyber-primary"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const carouselContentVariants = cva([
  "flex flex-row transition-transform duration-500 ease-in-out",
  "will-change-transform",
]);

const carouselItemVariants = cva(["shrink-0 w-full"]);

const carouselButtonVariants = cva(
  [
    "absolute top-1/2 -translate-y-1/2 z-10",
    "flex items-center justify-center",
    "w-12 h-12 rounded-full",
    "bg-black/80 backdrop-blur-sm",
    "border-2 border-cyber",
    "text-primary-500",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    // Cyberpunk glow effect
    "shadow-cyber-border",
    "opacity-60",
    // Hover state - brighter glow
    "hover:opacity-100",
    "hover:bg-primary-500/10",
    "hover:border-primary-500",
    "hover:shadow-cyber-primary",
    "hover:scale-110",
    // Active state - press effect
    "active:scale-95",
    "active:shadow-cyber-border",
  ],
  {
    variants: {
      side: {
        left: "left-4",
        right: "right-4",
        top: "top-4 left-1/2 -translate-x-1/2 -translate-y-0",
        bottom: "bottom-4 left-1/2 -translate-x-1/2 translate-y-0",
      },
    },
    defaultVariants: {
      side: "left",
    },
  }
);

const carouselDotsVariants = cva(
  [
    "absolute bottom-4 left-1/2 -translate-x-1/2 z-10",
    "flex items-center gap-2",
  ],
  {
    variants: {
      position: {
        bottom: "bottom-4",
        top: "top-4",
        outside: "bottom-[-2rem]",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
);

const carouselDotVariants = cva(
  [
    "w-2 h-2 rounded-full",
    "transition-all duration-300",
    "cursor-pointer",
    "bg-black/80",
    "border border-cyber",
    // Cyberpunk effect
    "shadow-cyber-border",
    "hover:bg-primary-500/20",
    "hover:border-primary-500",
    "hover:shadow-cyber-primary",
    "hover:scale-125",
  ],
  {
    variants: {
      active: {
        true: [
          "bg-primary-500",
          "border-primary-500",
          "w-6",
          "shadow-cyber-primary",
          "hover:shadow-cyber-glow-lg",
        ],
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

// ============================================================================
// Carousel Context
// ============================================================================

interface CarouselContextValue {
  currentIndex: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  loop: boolean;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

const useCarousel = () => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be used within Carousel");
  }
  return context;
};

// ============================================================================
// Carousel Component
// ============================================================================

export interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof carouselVariants> {
  /** Current slide index (controlled) */
  value?: number;
  /** Default slide index */
  defaultValue?: number;
  /** Callback when slide changes */
  onValueChange?: (index: number) => void;
  /** Auto-play interval in milliseconds (0 to disable) */
  autoPlay?: number;
  /** Loop back to first slide after last */
  loop?: boolean;
  /** Show navigation buttons */
  showNavigation?: boolean;
  /** Show dots indicator */
  showDots?: boolean;
  /** Touch/swipe enabled */
  swipeable?: boolean;
  /** Keyboard navigation enabled */
  keyboardNavigation?: boolean;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      variant,
      value: controlledValue,
      defaultValue = 0,
      onValueChange,
      autoPlay = 0,
      loop = true,
      showNavigation = true,
      showDots = true,
      swipeable = true,
      keyboardNavigation = true,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] =
      React.useState(defaultValue);
    const [isPaused, setIsPaused] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const touchStartX = React.useRef<number>(0);
    const touchStartY = React.useRef<number>(0);
    const autoPlayTimerRef = React.useRef<ReturnType<
      typeof setInterval
    > | null>(null);

    const isControlled = controlledValue !== undefined;
    const currentIndex = isControlled ? controlledValue : uncontrolledValue;

    const childrenArray = React.Children.toArray(children);
    const totalSlides = childrenArray.length;

    const updateIndex = React.useCallback(
      (newIndex: number) => {
        if (newIndex < 0) {
          newIndex = loop ? totalSlides - 1 : 0;
        } else if (newIndex >= totalSlides) {
          newIndex = loop ? 0 : totalSlides - 1;
        }

        if (!isControlled) {
          setUncontrolledValue(newIndex);
        }
        onValueChange?.(newIndex);
      },
      [isControlled, onValueChange, loop, totalSlides]
    );

    const goToSlide = React.useCallback(
      (index: number) => {
        if (index >= 0 && index < totalSlides) {
          updateIndex(index);
        }
      },
      [totalSlides, updateIndex]
    );

    const goNext = React.useCallback(() => {
      updateIndex(currentIndex + 1);
    }, [currentIndex, updateIndex]);

    const goPrev = React.useCallback(() => {
      updateIndex(currentIndex - 1);
    }, [currentIndex, updateIndex]);

    // Auto-play
    React.useEffect(() => {
      if (autoPlay > 0 && !isPaused && totalSlides > 1) {
        autoPlayTimerRef.current = setInterval(() => {
          goNext();
        }, autoPlay);

        return () => {
          if (autoPlayTimerRef.current) {
            clearInterval(autoPlayTimerRef.current);
          }
        };
      }
    }, [autoPlay, isPaused, goNext, totalSlides]);

    // Keyboard navigation
    React.useEffect(() => {
      if (!keyboardNavigation || !containerRef.current) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          e.target !== containerRef.current &&
          !containerRef.current?.contains(e.target as Node)
        ) {
          return;
        }

        if (e.key === "ArrowLeft") {
          e.preventDefault();
          goPrev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          goNext();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [keyboardNavigation, goNext, goPrev]);

    // Touch/swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
      if (!swipeable) return;
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      setIsPaused(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!swipeable) return;
      e.preventDefault();
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (!swipeable) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX.current - touchEndX;
      const diffY = touchStartY.current - touchEndY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          goNext();
        } else {
          goPrev();
        }
      }

      setIsPaused(false);
    };

    const contextValue: CarouselContextValue = {
      currentIndex,
      totalSlides,
      goToSlide,
      goNext,
      goPrev,
      loop,
    };

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
      []
    );

    return (
      <CarouselContext.Provider value={contextValue}>
        <div
          ref={containerRef}
          className={cn(carouselVariants({ variant }), className)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          tabIndex={keyboardNavigation ? 0 : -1}
          role="region"
          aria-label="Carousel"
          {...props}
        >
          <div
            className={cn(carouselContentVariants())}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {childrenArray.map((child, index) => (
              <div
                key={index}
                className={cn(carouselItemVariants())}
                aria-hidden={index !== currentIndex}
              >
                {child}
              </div>
            ))}
          </div>

          {showNavigation && totalSlides > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}

          {showDots && totalSlides > 1 && <CarouselDots />}
        </div>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = "Carousel";

// ============================================================================
// CarouselItem Component
// ============================================================================

export interface CarouselItemProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("w-full", className)} {...props} />;
  }
);

CarouselItem.displayName = "CarouselItem";

// ============================================================================
// CarouselPrevious Component
// ============================================================================

export interface CarouselPreviousProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof carouselButtonVariants> {}

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselPreviousProps
>(({ className, side, ...props }, ref) => {
  const { goPrev, currentIndex, loop } = useCarousel();
  const isDisabled = !loop && currentIndex === 0;

  const buttonSide = side || "left";

  return (
    <button
      ref={ref}
      type="button"
      onClick={goPrev}
      disabled={isDisabled}
      className={cn(carouselButtonVariants({ side: buttonSide }), className)}
      aria-label="Previous slide"
      {...props}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
});

CarouselPrevious.displayName = "CarouselPrevious";

// ============================================================================
// CarouselNext Component
// ============================================================================

export interface CarouselNextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof carouselButtonVariants> {}

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className, side, ...props }, ref) => {
    const { goNext, currentIndex, totalSlides, loop } = useCarousel();
    const isDisabled = !loop && currentIndex === totalSlides - 1;

    const buttonSide = side || "right";

    return (
      <button
        ref={ref}
        type="button"
        onClick={goNext}
        disabled={isDisabled}
        className={cn(carouselButtonVariants({ side: buttonSide }), className)}
        aria-label="Next slide"
        {...props}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    );
  }
);

CarouselNext.displayName = "CarouselNext";

// ============================================================================
// CarouselDots Component
// ============================================================================

export interface CarouselDotsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselDotsVariants> {}

const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, position, ...props }, ref) => {
    const { currentIndex, totalSlides, goToSlide } = useCarousel();

    return (
      <div
        ref={ref}
        className={cn(carouselDotsVariants({ position }), className)}
        role="tablist"
        aria-label="Slide indicators"
        {...props}
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={cn(
              carouselDotVariants({ active: index === currentIndex })
            )}
          />
        ))}
      </div>
    );
  }
);

CarouselDots.displayName = "CarouselDots";

export {
  Carousel,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  carouselVariants,
  carouselContentVariants,
  carouselItemVariants,
  carouselButtonVariants,
  carouselDotsVariants,
  carouselDotVariants,
  useCarousel,
};
