import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Helper function to safely import optional dependencies
const safeImport = async (moduleName: string): Promise<any> => {
  try {
    // Use Function constructor to avoid Vite resolving during build
    const importFunc = new Function("return (specifier) => import(specifier)");
    return await importFunc()(moduleName);
  } catch (error) {
    return null;
  }
};

// ============================================================================
// Video Variants
// ============================================================================

const videoVariants = cva(
  [
    "relative w-full",
    "rounded-2xl overflow-hidden",
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

const videoControlsVariants = cva(
  [
    "absolute bottom-0 left-0 right-0",
    "bg-gradient-to-t from-black/95 via-black/80 to-transparent",
    "p-4",
    "transition-opacity duration-300",
    "backdrop-blur-sm",
  ],
  {
    variants: {
      visible: {
        true: "opacity-100",
        false: "opacity-0 pointer-events-none",
      },
    },
    defaultVariants: {
      visible: true,
    },
  }
);

const videoButtonVariants = cva([
  "flex items-center justify-center",
  "w-10 h-10 rounded-lg",
  "bg-black/80 backdrop-blur-sm",
  "border-2 border-cyber",
  "text-primary-500",
  "transition-all duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  // Cyberpunk glow effect
  "shadow-cyber-border",
  "hover:bg-primary-500/10",
  "hover:border-primary-500",
  "hover:shadow-cyber-primary",
  "hover:scale-110",
  // Active state - press effect
  "active:scale-95",
  "active:shadow-cyber-border",
]);

const videoProgressVariants = cva(
  [
    "relative w-full rounded-full",
    "bg-black/50",
    "border border-cyber/30",
    "cursor-pointer",
    "transition-all duration-200",
    "shadow-cyber-border",
    "hover:bg-black/60",
    "hover:border-cyber/50",
    "hover:shadow-cyber-border-lg",
  ],
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-1.5",
        lg: "h-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const videoProgressBarVariants = cva([
  "absolute h-full rounded-full",
  "bg-gradient-to-r from-primary-500 via-primary-500 to-primary-600",
  "transition-all duration-150",
  "shadow-cyber-primary",
  "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-200",
  "group-hover:shadow-cyber-glow-lg",
  "group-hover:before:opacity-100",
]);

// ============================================================================
// Video Component
// ============================================================================

export interface VideoChapter {
  /** Start time in seconds */
  startTime: number;
  /** End time in seconds (-1 to extend to end of video) */
  endTime: number;
  /** Chapter label */
  label?: string;
  /** Chapter color (default: white) */
  color?: string;
}

export interface VideoProps
  extends Omit<
      React.VideoHTMLAttributes<HTMLVideoElement>,
      "onTimeUpdate" | "onLoadedMetadata"
    >,
    VariantProps<typeof videoVariants> {
  /** Show controls */
  showControls?: boolean;
  /** Auto-hide controls after inactivity (ms) */
  autoHideControls?: number;
  /** Show loading spinner */
  showLoading?: boolean;
  /** Custom controls */
  customControls?: boolean;
  /** Video chapters/markers for skipping */
  chapters?: VideoChapter[];
  /** Callback when time updates */
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  /** Callback when video is ready */
  onReady?: (duration: number) => void;
  /** Callback when chapter is clicked */
  onChapterClick?: (chapter: VideoChapter) => void;
}

const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
  (
    {
      className,
      variant,
      showControls = true,
      autoHideControls = 3000,
      showLoading = true,
      customControls = true,
      chapters = [],
      onTimeUpdate,
      onReady,
      onChapterClick,
      src,
      ...props
    },
    ref
  ) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [isMuted, setIsMuted] = React.useState(false);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [controlsVisible, setControlsVisible] = React.useState(true);
    const [showVolumeIndicator, setShowVolumeIndicator] = React.useState(false);
    const [showSkipIndicator, setShowSkipIndicator] = React.useState(false);
    const [skipDirection, setSkipDirection] = React.useState<
      "forward" | "backward"
    >("forward");
    const hideControlsTimerRef = React.useRef<ReturnType<
      typeof setTimeout
    > | null>(null);
    const volumeIndicatorTimerRef = React.useRef<ReturnType<
      typeof setTimeout
    > | null>(null);
    const skipIndicatorTimerRef = React.useRef<ReturnType<
      typeof setTimeout
    > | null>(null);
    const progressRef = React.useRef<HTMLDivElement>(null);
    const hlsRef = React.useRef<any>(null);

    // Combine refs
    React.useImperativeHandle(
      ref,
      () => videoRef.current as HTMLVideoElement,
      []
    );

    // Detect streaming format
    const isHLS = React.useMemo(() => {
      if (!src) return false;
      return (
        typeof src === "string" &&
        (src.includes(".m3u8") || src.endsWith(".m3u8"))
      );
    }, [src]);

    // Initialize HLS
    React.useEffect(() => {
      if (!isHLS || !videoRef.current || !src) return;

      const initHLS = async () => {
        const video = videoRef.current;
        if (!video) return;

        // Check for native HLS support first (Safari)
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = src as string;
          return;
        }

        // Try to load hls.js
        try {
          // @ts-ignore - hls.js is optional peer dependency
          const hlsModule = await safeImport("hls.js");

          if (!hlsModule) {
            video.src = src as string;
            return;
          }

          const Hls = hlsModule.default || hlsModule;

          if (Hls && Hls.isSupported && Hls.isSupported()) {
            const hls = new Hls({
              enableWorker: true,
              lowLatencyMode: false,
            });

            hls.loadSource(src as string);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              if (videoRef.current) {
                videoRef.current.play().catch(() => {
                  // Autoplay was prevented
                });
              }
            });

            hlsRef.current = hls;
          } else {
            // Fallback to native if hls.js is not supported
            video.src = src as string;
          }
        } catch (error) {
          // Silent fallback - hls.js is optional
          if (video) {
            video.src = src as string;
          }
        }
      };

      initHLS();

      return () => {
        if (hlsRef.current && typeof hlsRef.current.destroy === "function") {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    }, [isHLS, src]);

    // Format time
    const formatTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      if (h > 0) {
        return `${h}:${m.toString().padStart(2, "0")}:${s
          .toString()
          .padStart(2, "0")}`;
      }
      return `${m}:${s.toString().padStart(2, "0")}`;
    };

    // Play/Pause
    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
    };

    // Volume
    const handleVolumeChange = (newVolume: number) => {
      if (videoRef.current) {
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        videoRef.current.volume = clampedVolume;
        setVolume(clampedVolume);
        setIsMuted(clampedVolume === 0);
        setShowVolumeIndicator(true);
        if (volumeIndicatorTimerRef.current) {
          clearTimeout(volumeIndicatorTimerRef.current);
        }
        volumeIndicatorTimerRef.current = setTimeout(() => {
          setShowVolumeIndicator(false);
        }, 1000);
      }
    };

    const toggleMute = () => {
      if (videoRef.current) {
        if (isMuted) {
          videoRef.current.volume = volume || 0.5;
          setIsMuted(false);
        } else {
          videoRef.current.volume = 0;
          setIsMuted(true);
        }
      }
    };

    const skipForward = () => {
      if (videoRef.current) {
        const newTime = Math.min(duration, currentTime + 5);
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        setSkipDirection("forward");
        setShowSkipIndicator(true);
        if (skipIndicatorTimerRef.current) {
          clearTimeout(skipIndicatorTimerRef.current);
        }
        skipIndicatorTimerRef.current = setTimeout(() => {
          setShowSkipIndicator(false);
        }, 1000);
      }
    };

    const skipBackward = () => {
      if (videoRef.current) {
        const newTime = Math.max(0, currentTime - 5);
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        setSkipDirection("backward");
        setShowSkipIndicator(true);
        if (skipIndicatorTimerRef.current) {
          clearTimeout(skipIndicatorTimerRef.current);
        }
        skipIndicatorTimerRef.current = setTimeout(() => {
          setShowSkipIndicator(false);
        }, 1000);
      }
    };

    // Progress
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !videoRef.current) return;
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;

      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    };

    // Fullscreen
    const toggleFullscreen = () => {
      if (!containerRef.current) return;

      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    // Event handlers
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const time = videoRef.current.currentTime;
        setCurrentTime(time);
        onTimeUpdate?.(time, duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        const dur = videoRef.current.duration;
        setDuration(dur);
        setIsLoading(false);
        onReady?.(dur);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    // Auto-hide controls
    const resetHideControlsTimer = () => {
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }
      if (autoHideControls > 0 && isPlaying) {
        setControlsVisible(true);
        hideControlsTimerRef.current = setTimeout(() => {
          setControlsVisible(false);
        }, autoHideControls);
      }
    };

    React.useEffect(() => {
      if (isPlaying && autoHideControls > 0) {
        resetHideControlsTimer();
      }
      return () => {
        if (hideControlsTimerRef.current) {
          clearTimeout(hideControlsTimerRef.current);
        }
        if (volumeIndicatorTimerRef.current) {
          clearTimeout(volumeIndicatorTimerRef.current);
        }
        if (skipIndicatorTimerRef.current) {
          clearTimeout(skipIndicatorTimerRef.current);
        }
      };
    }, [isPlaying, autoHideControls]);

    // Fullscreen change listener
    React.useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () =>
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
    }, []);

    // Volume sync
    React.useEffect(() => {
      if (videoRef.current) {
        videoRef.current.volume = volume;
      }
    }, [volume]);

    // Keyboard navigation
    React.useEffect(() => {
      if (!containerRef.current) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          e.target !== containerRef.current &&
          !containerRef.current?.contains(e.target as Node)
        ) {
          return;
        }

        if (!videoRef.current) return;

        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            skipBackward();
            break;
          case "ArrowRight":
            e.preventDefault();
            skipForward();
            break;
          case "ArrowUp":
            e.preventDefault();
            const newVolumeUp = Math.min(1, volume + 0.1);
            handleVolumeChange(newVolumeUp);
            break;
          case "ArrowDown":
            e.preventDefault();
            const newVolumeDown = Math.max(0, volume - 0.1);
            handleVolumeChange(newVolumeDown);
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [volume, skipBackward, skipForward, handleVolumeChange]);

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
      <div
        ref={containerRef}
        className={cn(videoVariants({ variant }), className)}
        onMouseMove={resetHideControlsTimer}
        onMouseLeave={() => {
          if (autoHideControls > 0 && isPlaying) {
            setControlsVisible(false);
          }
        }}
        onMouseEnter={() => {
          if (autoHideControls > 0) {
            setControlsVisible(true);
          }
        }}
      >
        <video
          ref={videoRef}
          src={!isHLS ? src : undefined}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={handlePlay}
          onPause={handlePause}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
          {...props}
        />

        {showLoading && isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin shadow-cyber-primary" />
          </div>
        )}

        {/* Volume Indicator - Bottom */}
        {showVolumeIndicator && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none z-20">
            <div className="bg-black/90 backdrop-blur-sm border-2 border-cyber rounded-2xl px-6 py-4 shadow-cyber-border-lg">
              <div className="flex items-center gap-3">
                {isMuted || volume === 0 ? (
                  <svg
                    className="w-6 h-6 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg
                    className="w-6 h-6 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-black/50 border border-cyber/30 rounded-full overflow-hidden shadow-cyber-border">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all duration-200 shadow-cyber-primary"
                      style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                    />
                  </div>
                  <span className="text-primary-500 font-semibold text-sm min-w-[3rem] text-right font-mono">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skip Indicator - Left/Right */}
        {showSkipIndicator && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 pointer-events-none z-20 ${
              skipDirection === "forward" ? "right-8" : "left-8"
            }`}
          >
            <div className="bg-black/90 backdrop-blur-sm border-2 border-cyber rounded-2xl px-6 py-4 shadow-cyber-border-lg">
              <div className="flex items-center gap-3">
                {skipDirection === "forward" ? (
                  <svg
                    className="w-6 h-6 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                  </svg>
                )}
                <span className="text-primary-500 font-semibold text-sm font-mono">
                  {skipDirection === "forward" ? "+5s" : "-5s"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Center Play Button */}
        {!isPlaying && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="pointer-events-auto w-20 h-20 rounded-full bg-black/90 backdrop-blur-sm border-2 border-cyber flex items-center justify-center transition-all duration-200 shadow-cyber-border-lg hover:bg-primary-500/10 hover:border-primary-500 hover:shadow-cyber-primary hover:scale-110 active:scale-95 active:shadow-cyber-border"
              aria-label="Play"
            >
              <svg
                className="w-10 h-10 text-primary-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}

        {showControls && customControls && (
          <div
            className={cn(videoControlsVariants({ visible: controlsVisible }))}
          >
            {/* Progress bar */}
            <div
              ref={progressRef}
              className={cn(videoProgressVariants(), "group")}
              onClick={handleProgressClick}
            >
              {/* Chapter segments với gap transparent */}
              {chapters.length > 0 && duration > 0 && (
                <>
                  {chapters.map((chapter, index) => {
                    const chapterEndTime =
                      chapter.endTime === -1 ? duration : chapter.endTime;
                    const startPercent = (chapter.startTime / duration) * 100;
                    const endPercent = (chapterEndTime / duration) * 100;

                    const gapSize = 0.1;
                    const segmentStartPercent =
                      startPercent + (index > 0 ? gapSize : 0);
                    const segmentEndPercent =
                      endPercent - (index < chapters.length - 1 ? gapSize : 0);
                    const widthPercent =
                      segmentEndPercent - segmentStartPercent;

                    const color = chapter.color || "rgb(255, 255, 255)";

                    return (
                      <div
                        key={index}
                        className="absolute h-full rounded-full transition-opacity duration-200"
                        style={{
                          left: `${segmentStartPercent}%`,
                          width: `${widthPercent}%`,
                          backgroundColor: color,
                          opacity: 0.3,
                          zIndex: 1,
                        }}
                        title={chapter.label || `Chapter ${index + 1}`}
                      />
                    );
                  })}

                  {chapters.length > 1 &&
                    chapters.map((chapter, index) => {
                      if (index === 0) return null;
                      const prevChapterEndTime =
                        chapters[index - 1].endTime === -1
                          ? duration
                          : chapters[index - 1].endTime;
                      const prevEndPercent =
                        (prevChapterEndTime / duration) * 100;
                      const currentStartPercent =
                        (chapter.startTime / duration) * 100;
                      const gapSize = 0.5;

                      return (
                        <div
                          key={`gap-${index}`}
                          className="absolute h-full"
                          style={{
                            left: `${prevEndPercent - gapSize}%`,
                            width: `${
                              currentStartPercent - prevEndPercent + gapSize * 2
                            }%`,
                            backgroundColor: "transparent",
                            zIndex: 0,
                          }}
                        />
                      );
                    })}
                </>
              )}

              {/* Progress fill */}
              <div
                className={cn(videoProgressBarVariants())}
                style={{ width: `${progressPercent}%`, zIndex: 2 }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-3">
              {/* Skip Backward */}
              <button
                type="button"
                onClick={skipBackward}
                className={cn(videoButtonVariants())}
                aria-label="Skip backward 5 seconds"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                </svg>
              </button>

              {/* Play/Pause */}
              <button
                type="button"
                onClick={togglePlay}
                className={cn(videoButtonVariants())}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Skip Forward */}
              <button
                type="button"
                onClick={skipForward}
                className={cn(videoButtonVariants())}
                aria-label="Skip forward 5 seconds"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
                </svg>
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className={cn(videoButtonVariants(), "w-10 h-10")}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  )}
                </button>
                <div className="w-20 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) =>
                      handleVolumeChange(parseFloat(e.target.value))
                    }
                    className="w-full h-1 bg-black/50 border border-cyber/30 rounded-full appearance-none cursor-pointer accent-primary-500 shadow-cyber-border"
                  />
                </div>
              </div>

              {/* Time */}
              <div className="text-primary-500 text-sm font-mono ml-auto">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* Fullscreen */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className={cn(videoButtonVariants())}
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                {isFullscreen ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}

        {showControls && !customControls && (
          <video
            ref={videoRef}
            src={src}
            controls
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            {...props}
          />
        )}
      </div>
    );
  }
);

Video.displayName = "Video";

export { Video, videoVariants, videoControlsVariants, videoButtonVariants };
