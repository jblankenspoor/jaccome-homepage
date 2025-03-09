/**
 * Carousel Component for Jacco's Portfolio
 * @description A carousel component for displaying content in a slideshow
 * @version 3.0.1
 * @author Jacco
 */

/**
 * Carousel Component for Jacco's Portfolio
 * @description A carousel component for displaying content in a slideshow
 * @version 3.0.1
 * @author Jacco
 */

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * Carousel context for sharing state between carousel components
 * @type {React.Context<UseEmblaCarouselType[1] | null>}
 */
type CarouselApi = NonNullable<UseEmblaCarouselType[1]>
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

/**
 * Carousel context for sharing state between carousel components
 * @type {React.Context<CarouselApi | undefined>}
 */
const CarouselContext = React.createContext<CarouselApi | undefined>(undefined)

/**
 * Hook to access carousel context
 * @returns {CarouselApi | undefined} - The carousel API
 */
function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (context === undefined) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

/**
 * Carousel component props interface
 * @interface CarouselProps
 * @extends {React.HTMLAttributes<HTMLDivElement>} - HTML div element attributes
 * @property {CarouselOptions} [opts] - Carousel options
 * @property {CarouselPlugin[]} [plugins] - Carousel plugins
 * @property {React.ReactNode} [children] - Carousel children
 * @property {string} [orientation="horizontal"] - Carousel orientation
 */
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
}

/**
 * Carousel component for displaying content in a slideshow
 * @param {CarouselProps} props - Component props
 * @returns {JSX.Element} - Carousel component
 */
const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      opts,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback(() => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [api])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect()
      api.on("select", onSelect)
      api.on("reInit", onSelect)

      return () => {
        api.off("select", onSelect)
        api.off("reInit", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider value={api}>
        <div
          ref={ref}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          onKeyDownCapture={handleKeyDown}
          {...props}
        >
          <div
            ref={carouselRef}
            className="overflow-hidden"
            dir="ltr"
          >
            <div className="flex h-full transition-height">
              {children}
            </div>
          </div>
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

/**
 * CarouselContent component props interface
 * @interface CarouselContentProps
 * @extends {React.HTMLAttributes<HTMLDivElement>} - HTML div element attributes
 */
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex -ml-4", className)}
    {...props}
  />
))
CarouselContent.displayName = "CarouselContent"

/**
 * CarouselItem component props interface
 * @interface CarouselItemProps
 * @extends {React.HTMLAttributes<HTMLDivElement>} - HTML div element attributes
 */
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    aria-roledescription="slide"
    className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"

/**
 * CarouselPrevious component props interface
 * @interface CarouselPreviousProps
 * @extends {React.ComponentProps<typeof Button>} - Button component props
 */
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const carousel = useCarousel()
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)

  React.useEffect(() => {
    if (!carousel) {
      return
    }

    const onSelect = () => {
      setCanScrollPrev(carousel.canScrollPrev())
    }

    onSelect()
    carousel.on("select", onSelect)
    carousel.on("reInit", onSelect)

    return () => {
      carousel.off("select", onSelect)
      carousel.off("reInit", onSelect)
    }
  }, [carousel])

  return (
    <Button
      ref={ref}
      className={cn(
        "absolute h-8 w-8 rounded-full left-4 top-1/2 -translate-y-1/2",
        className
      )}
      disabled={!canScrollPrev}
      onClick={() => carousel?.scrollPrev()}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

/**
 * CarouselNext component props interface
 * @interface CarouselNextProps
 * @extends {React.ComponentProps<typeof Button>} - Button component props
 */
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const carousel = useCarousel()
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  React.useEffect(() => {
    if (!carousel) {
      return
    }

    const onSelect = () => {
      setCanScrollNext(carousel.canScrollNext())
    }

    onSelect()
    carousel.on("select", onSelect)
    carousel.on("reInit", onSelect)

    return () => {
      carousel.off("select", onSelect)
      carousel.off("reInit", onSelect)
    }
  }, [carousel])

  return (
    <Button
      ref={ref}
      className={cn(
        "absolute h-8 w-8 rounded-full right-4 top-1/2 -translate-y-1/2",
        className
      )}
      disabled={!canScrollNext}
      onClick={() => carousel?.scrollNext()}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
