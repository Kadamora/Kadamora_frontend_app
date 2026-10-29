import { useState, useEffect, useRef } from 'react';
import {
    FiX,
    FiPlay,
    FiPause,
    FiVolume2,
    FiVolumeX,
    FiMaximize2,
    FiMinimize2,
    FiTv,
} from 'react-icons/fi';
import type { SecuritySystem } from '../../../types/commercialFacilities';

interface VideoPlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
    system: SecuritySystem | null;
    videoTitle?: string;
    videoDuration?: string;
}

export default function VideoPlayerModal({
    isOpen,
    onClose,
    system,
    videoTitle,
    videoDuration = '15:28',
}: VideoPlayerModalProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTimeSeconds, setCurrentTimeSeconds] = useState(307); // 5:07
    const totalDurationSeconds = 928; // 15:28
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [ccActive, setCcActive] = useState(false);

    const videoContainerRef = useRef<HTMLDivElement>(null);

    // Escape listener
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isFullscreen) {
                    setIsFullscreen(false);
                } else {
                    onClose();
                }
            } else if (e.key === ' ') {
                e.preventDefault();
                setIsPlaying((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isFullscreen, onClose]);

    // Simulate play scrubber increment
    useEffect(() => {
        if (!isOpen || !isPlaying) return;

        const interval = setInterval(() => {
            setCurrentTimeSeconds((prev) => {
                if (prev >= totalDurationSeconds) return 0;
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen, isPlaying, totalDurationSeconds]);

    if (!isOpen || !system) return null;

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const progressPercent = (currentTimeSeconds / totalDurationSeconds) * 100;

    const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newPercent = Math.max(0, Math.min(1, clickX / rect.width));
        setCurrentTimeSeconds(Math.floor(newPercent * totalDurationSeconds));
    };

    const toggleFullscreen = () => {
        if (!videoContainerRef.current) return;
        if (!document.fullscreenElement) {
            videoContainerRef.current.requestFullscreen().catch(() => {});
            setIsFullscreen(true);
        } else {
            document.exitFullscreen().catch(() => {});
            setIsFullscreen(false);
        }
    };

    const displayTitle = videoTitle || `${system.id} - 2025-10-05_08-00-00.mp4`;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-[fadeIn_.2s_ease-out]"
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={videoContainerRef}
                className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-[fadeScale_.2s_ease-out]"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-[#F0F2F5] z-10">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-bold text-[#002E62] truncate">
                            {displayTitle}
                        </span>
                        <span className="text-[11px] font-medium text-[#71717A] hidden sm:inline">
                            • {system.name}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="h-8 w-8 rounded-full bg-[#F2F5F8] text-[#71717A] hover:bg-[#E4E9EF] hover:text-[#002E62] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close video player"
                    >
                        <FiX className="w-4 h-4" />
                    </button>
                </div>

                {/* Video Playback Screen */}
                <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group select-none">
                    <img
                        src={system.imageUrl}
                        alt={system.name}
                        className="w-full h-full object-cover"
                    />

                    {/* Live dot top-left overlay */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-xs">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12B76A] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#12B76A]" />
                        </span>
                        <span className="text-[11px] font-semibold tracking-wider">LIVE</span>
                    </div>

                    {/* System info top-right overlay */}
                    <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md text-white text-[11px] font-mono">
                        {system.resolution.toUpperCase()} | 30 FPS
                    </div>

                    {/* Center Play/Pause button on screen click */}
                    <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all cursor-pointer ${
                            isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                        }`}
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                        <div className="h-16 w-16 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/20 transform hover:scale-105 transition-transform">
                            {isPlaying ? (
                                <FiPause className="w-8 h-8 fill-white" />
                            ) : (
                                <FiPlay className="w-8 h-8 ml-1 fill-white" />
                            )}
                        </div>
                    </button>

                    {/* Bottom Video Controls Bar (matching Image 5) */}
                    <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/90 via-black/60 to-transparent pt-8 pb-3 px-4 flex flex-col gap-2 z-20">
                        {/* Red Scrubber Bar */}
                        <div
                            onClick={handleScrubberClick}
                            className="relative w-full h-2 bg-white/30 rounded-full cursor-pointer group/scrub flex items-center"
                        >
                            <div
                                className="h-full bg-red-600 rounded-full relative"
                                style={{ width: `${progressPercent}%` }}
                            >
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-red-600 border-2 border-white rounded-full shadow-md scale-0 group-hover/scrub:scale-100 transition-transform" />
                            </div>
                        </div>

                        {/* Controls Toolbar */}
                        <div className="flex items-center justify-between text-white text-xs">
                            <div className="flex items-center gap-3">
                                {/* Play / Pause */}
                                <button
                                    type="button"
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="p-1 hover:text-red-400 transition-colors cursor-pointer"
                                    aria-label={isPlaying ? 'Pause' : 'Play'}
                                >
                                    {isPlaying ? (
                                        <FiPause className="w-4 h-4" />
                                    ) : (
                                        <FiPlay className="w-4 h-4 ml-0.5 fill-current" />
                                    )}
                                </button>

                                {/* Volume / Mute */}
                                <button
                                    type="button"
                                    onClick={() => setIsMuted(!isMuted)}
                                    className="p-1 hover:text-red-400 transition-colors cursor-pointer"
                                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                                >
                                    {isMuted ? (
                                        <FiVolumeX className="w-4 h-4" />
                                    ) : (
                                        <FiVolume2 className="w-4 h-4" />
                                    )}
                                </button>

                                {/* Time display */}
                                <span className="font-mono text-[11px] text-white/90">
                                    {formatTime(currentTimeSeconds)} / {videoDuration}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* CC Badge */}
                                <button
                                    type="button"
                                    onClick={() => setCcActive(!ccActive)}
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                                        ccActive
                                            ? 'bg-white text-black border-white'
                                            : 'border-white/60 text-white/80 hover:text-white'
                                    }`}
                                >
                                    CC
                                </button>

                                {/* HD Badge */}
                                <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider shadow-xs">
                                    HD
                                </span>

                                {/* Picture in Picture */}
                                <button
                                    type="button"
                                    onClick={() => {}}
                                    className="p-1 hover:text-red-400 transition-colors cursor-pointer"
                                    title="Picture in Picture"
                                >
                                    <FiTv className="w-3.5 h-3.5" />
                                </button>

                                {/* Fullscreen */}
                                <button
                                    type="button"
                                    onClick={toggleFullscreen}
                                    className="p-1 hover:text-red-400 transition-colors cursor-pointer"
                                    aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                                >
                                    {isFullscreen ? (
                                        <FiMinimize2 className="w-4 h-4" />
                                    ) : (
                                        <FiMaximize2 className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
