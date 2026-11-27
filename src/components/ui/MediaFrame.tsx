import { useCallback, useEffect, useState, type WheelEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type { ProjectMedia } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';

interface MediaFrameProps {
  media: ProjectMedia;
  index: number;
  total: number;
  onOpen?: () => void;
  onMediaError?: () => void;
}

export function MediaFrame({
  media,
  index,
  total,
  onOpen,
  onMediaError,
}: MediaFrameProps) {
  const { lang, pick } = useLanguage();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [media.src]);

  const indexLabel = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  const altText = pick(media.alt);
  const captionText = pick(media.caption);

  const handleError = () => {
    setHasError(true);
    onMediaError?.();
  };

  return (
    <figure className="group flex flex-col">
      {hasError ? (
        <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 border border-border bg-surface px-6 text-center">
          <ImageOff
            className="h-6 w-6 text-fg-muted"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="font-mono-metric text-xs tracking-[0.12em] text-fg uppercase">
            {lang === 'fr'
              ? 'Capture disponible en exécution locale'
              : 'Capture available in local runtime'}
          </p>
          <p className="max-w-md text-xs leading-relaxed text-fg-muted">
            {captionText}
          </p>
        </div>
      ) : media.type === 'video' ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-surface">
          <video
            src={media.src}
            controls
            playsInline
            muted
            loop
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={onOpen}
          aria-label={
            lang === 'fr'
              ? `Agrandir la capture : ${captionText}`
              : `Enlarge capture: ${captionText}`
          }
          className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden border border-border bg-surface text-left transition-colors hover:border-accent"
        >
          <img
            src={media.src}
            alt={altText}
            width={1440}
            height={900}
            loading="lazy"
            decoding="async"
            onError={handleError}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
          <span
            aria-hidden="true"
            className="font-mono-metric absolute top-3 right-3 inline-flex items-center gap-1.5 border border-border bg-bg/92 px-2.5 py-1 text-[10px] tracking-[0.12em] text-fg uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <ZoomIn className="h-3 w-3" strokeWidth={1.5} />
            <span>{lang === 'fr' ? 'Agrandir' : 'Zoom'}</span>
          </span>
        </button>
      )}

      <figcaption className="font-mono-metric mt-3 flex items-baseline justify-between gap-4 text-[11px] leading-relaxed text-fg-muted">
        <span>{captionText}</span>
        <span className="shrink-0 uppercase">{indexLabel}</span>
      </figcaption>
    </figure>
  );
}

interface MediaLightboxProps {
  items: ProjectMedia[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

export function MediaLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: MediaLightboxProps) {
  const { lang, pick } = useLanguage();
  const [zoom, setZoom] = useState(1);
  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;
  const activeItem = isOpen ? items[activeIndex] : null;
  const hasMultiple = items.length > 1;

  const clampZoom = useCallback(
    (next: number) =>
      Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(next * 100) / 100)),
    [],
  );

  const zoomIn = useCallback(
    () => setZoom((z) => clampZoom(z + ZOOM_STEP)),
    [clampZoom],
  );
  const zoomOut = useCallback(
    () => setZoom((z) => clampZoom(z - ZOOM_STEP)),
    [clampZoom],
  );
  const resetZoom = useCallback(() => setZoom(1), []);
  const toggleImageZoom = useCallback(
    () => setZoom((z) => (z > 1 ? 1 : 2)),
    [],
  );

  useEffect(() => {
    setZoom(1);
  }, [activeIndex, isOpen]);

  useEffect(() => {
    if (!isOpen || activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        zoomIn();
      } else if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        zoomOut();
      } else if (event.key === '0') {
        event.preventDefault();
        resetZoom();
      } else if (hasMultiple && event.key === 'ArrowRight') {
        onNavigate((activeIndex + 1) % items.length);
      } else if (hasMultiple && event.key === 'ArrowLeft') {
        onNavigate((activeIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    isOpen,
    activeIndex,
    hasMultiple,
    items.length,
    onClose,
    onNavigate,
    zoomIn,
    zoomOut,
    resetZoom,
  ]);

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.deltaY < 0) {
      zoomIn();
    } else if (event.deltaY > 0) {
      zoomOut();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && activeItem && activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={pick(activeItem.caption)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111110]/94 p-4 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col border border-[#2b2a27] bg-[#1a1a18] text-[#f2efe9]"
          >
            {/* Top editorial bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2b2a27] px-4 py-3 sm:px-6">
              <p className="font-mono-metric min-w-0 flex-1 truncate text-xs text-[#9e9a90]">
                <span className="mr-3 text-[#d96045]">
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(items.length).padStart(2, '0')}
                </span>
                <span>{pick(activeItem.caption)}</span>
              </p>

              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                {/* Zoom controls */}
                <div
                  role="group"
                  aria-label={lang === 'fr' ? 'Contrôles de zoom' : 'Zoom controls'}
                  className="flex items-center border border-[#2b2a27]"
                >
                  <button
                    type="button"
                    onClick={zoomOut}
                    disabled={zoom <= MIN_ZOOM}
                    aria-label={lang === 'fr' ? 'Dézoomer' : 'Zoom out'}
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center text-[#f2efe9] transition-colors hover:text-[#d96045] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ZoomOut className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={resetZoom}
                    aria-label={
                      lang === 'fr'
                        ? `Niveau de zoom ${Math.round(zoom * 100)}%, cliquer pour réinitialiser`
                        : `Zoom level ${Math.round(zoom * 100)}%, click to reset`
                    }
                    className="font-mono-metric inline-flex h-8 min-w-[3.25rem] cursor-pointer items-center justify-center border-x border-[#2b2a27] px-2 text-[11px] text-[#f2efe9] transition-colors hover:text-[#d96045]"
                  >
                    {Math.round(zoom * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={zoomIn}
                    disabled={zoom >= MAX_ZOOM}
                    aria-label={lang === 'fr' ? 'Zoomer' : 'Zoom in'}
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center text-[#f2efe9] transition-colors hover:text-[#d96045] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ZoomIn className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={resetZoom}
                  disabled={zoom === 1}
                  aria-label={
                    lang === 'fr' ? 'Réinitialiser le zoom' : 'Reset zoom'
                  }
                  className="font-mono-metric hidden h-8 cursor-pointer items-center gap-1.5 border border-[#2b2a27] px-2.5 text-[10px] tracking-[0.1em] text-[#f2efe9] uppercase transition-colors hover:border-[#d96045] hover:text-[#d96045] disabled:cursor-not-allowed disabled:opacity-35 sm:inline-flex"
                >
                  <RotateCcw className="h-3 w-3" strokeWidth={1.5} />
                  <span>Reset</span>
                </button>

                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate(
                          (activeIndex - 1 + items.length) % items.length,
                        )
                      }
                      aria-label={
                        lang === 'fr' ? 'Capture précédente' : 'Previous capture'
                      }
                      className="inline-flex h-8 w-8 cursor-pointer items-center justify-center border border-[#2b2a27] text-[#f2efe9] transition-colors hover:border-[#d96045] hover:text-[#d96045]"
                    >
                      <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate((activeIndex + 1) % items.length)
                      }
                      aria-label={
                        lang === 'fr' ? 'Capture suivante' : 'Next capture'
                      }
                      className="inline-flex h-8 w-8 cursor-pointer items-center justify-center border border-[#2b2a27] text-[#f2efe9] transition-colors hover:border-[#d96045] hover:text-[#d96045]"
                    >
                      <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  aria-label={
                    lang === 'fr' ? 'Fermer la lightbox' : 'Close lightbox'
                  }
                  className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 border border-[#2b2a27] px-2.5 text-[#f2efe9] transition-colors hover:border-[#d96045] hover:text-[#d96045]"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                  <span className="font-mono-metric hidden text-[10px] tracking-[0.1em] uppercase sm:inline">
                    {lang === 'fr' ? 'Fermer' : 'Close'}
                  </span>
                </button>
              </div>
            </div>

            {/* Image viewport */}
            <div
              onWheel={handleWheel}
              className="flex flex-1 overflow-auto bg-[#111110] p-3 sm:p-6"
            >
              <img
                src={activeItem.src}
                alt={pick(activeItem.alt)}
                onClick={toggleImageZoom}
                style={
                  zoom === 1
                    ? undefined
                    : {
                        width: `${zoom * 100}%`,
                        maxWidth: 'none',
                        maxHeight: 'none',
                      }
                }
                className={
                  zoom === 1
                    ? 'm-auto max-h-[76vh] w-auto max-w-full cursor-zoom-in object-contain transition-all duration-200 ease-out'
                    : 'm-auto cursor-zoom-out object-contain transition-all duration-200 ease-out'
                }
              />
            </div>

            {/* Footer hint */}
            <div className="font-mono-metric flex items-center justify-between gap-4 border-t border-[#2b2a27] px-4 py-2 text-[10px] tracking-[0.12em] text-[#9e9a90] uppercase sm:px-6">
              <span className="truncate">{pick(activeItem.alt)}</span>
              <span className="hidden shrink-0 sm:inline">
                {lang === 'fr'
                  ? 'Clic ou molette pour zoomer · + / - / 0 · ESC'
                  : 'Click or scroll to zoom · + / - / 0 · ESC'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
