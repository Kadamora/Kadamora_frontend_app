import { useState, useEffect, useRef, useMemo } from 'react';
import {
    FiMaximize2,
    FiMinimize2,
    FiX,
    FiMic,
    FiMicOff,
    FiVideo,
    FiVideoOff,
    FiMonitor,
    FiMoreHorizontal,
    FiPlus,
    FiPhone,
    FiSearch,
    FiCheck,
} from 'react-icons/fi';
import { showSuccessToast } from '../Toast/Toast';
import LeaveMeetingConfirmModal from './LeaveMeetingConfirmModal';

export interface WorkspaceMember {
    id: string;
    name: string;
    roleOrUnit: string;
    category: 'Vendors' | 'Tenants';
    avatar: string;
}

const defaultWorkspaceMembers: WorkspaceMember[] = [
    {
        id: 'v-1',
        name: 'Felix Jones',
        roleOrUnit: 'Plumber',
        category: 'Vendors',
        avatar: '/assets/images/avatar_felix_jones.jpg',
    },
    {
        id: 'v-2',
        name: 'Serah Ibrahim',
        roleOrUnit: 'Electrician',
        category: 'Vendors',
        avatar: '/assets/images/avatar_serah_ibrahim.jpg',
    },
    {
        id: 'v-3',
        name: 'Henry Banjo',
        roleOrUnit: 'Plumber',
        category: 'Vendors',
        avatar: '/assets/images/avatar_henry_banjo.jpg',
    },
    {
        id: 't-1',
        name: 'Charles James',
        roleOrUnit: 'Diamond Unit C',
        category: 'Tenants',
        avatar: '/assets/images/avatar_charles_james.jpg',
    },
    {
        id: 't-2',
        name: 'Kunle Dauda',
        roleOrUnit: 'Hillcrest Unit A',
        category: 'Tenants',
        avatar: '/assets/images/avatar_kunle_dauda.jpg',
    },
    {
        id: 't-3',
        name: 'Akin Henry',
        roleOrUnit: 'Evergreen Unit 4B',
        category: 'Tenants',
        avatar: '/assets/images/avatar_akin_henry.jpg',
    },
];

export interface CallParticipant {
    id: string;
    name: string;
    roleOrUnit?: string;
    avatar: string;
    hasAudio?: boolean;
}

const initialCallParticipants: CallParticipant[] = [
    {
        id: 'p-charles',
        name: 'Charles John',
        avatar: '/assets/images/speaker_woman.jpg',
        hasAudio: true,
    },
    {
        id: 'p-speaker-man',
        name: 'Felix Jones',
        avatar: '/assets/images/speaker_man.jpg',
        hasAudio: false,
    },
    {
        id: 'p-woman-patterned',
        name: 'Serah Ibrahim',
        avatar: '/assets/images/speaker_woman_patterned.jpg',
        hasAudio: false,
    },
    {
        id: 'p-man-cap',
        name: 'Henry Banjo',
        avatar: '/assets/images/speaker_man_cap.jpg',
        hasAudio: false,
    },
];

export interface VideoMeetingRoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    workspaceName?: string;
    initialExpanded?: boolean;
}

export default function VideoMeetingRoomModal(props: VideoMeetingRoomModalProps) {
    if (!props.isOpen) return null;
    return <VideoMeetingRoomModalContent {...props} />;
}

function VideoMeetingRoomModalContent({
    isOpen,
    onClose,
    workspaceName = "Charles John's Workspace",
    initialExpanded = false,
}: VideoMeetingRoomModalProps) {
    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(true);

    // Call participants & Spotlight main view (Image 1)
    const [participants, setParticipants] = useState<CallParticipant[]>(initialCallParticipants);
    const [spotlightParticipantId, setSpotlightParticipantId] = useState<string>('p-charles');

    // Add Members Sidebar Drawer
    const [isAddMembersOpen, setIsAddMembersOpen] = useState(false);
    const [memberSearch, setMemberSearch] = useState('');
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

    // Three dots popup menu (Image 5)
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const moreMenuRef = useRef<HTMLDivElement>(null);

    // Leave Meeting Confirmation Dialog (Image 2)
    const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = useState(false);

    // Handle escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isLeaveConfirmOpen) {
                    setIsLeaveConfirmOpen(false);
                } else if (isAddMembersOpen) {
                    setIsAddMembersOpen(false);
                } else if (isMoreMenuOpen) {
                    setIsMoreMenuOpen(false);
                } else if (isExpanded) {
                    setIsExpanded(false);
                } else {
                    setIsLeaveConfirmOpen(true);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isExpanded, isAddMembersOpen, isMoreMenuOpen, isLeaveConfirmOpen]);

    // Close more menu on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                moreMenuRef.current &&
                !moreMenuRef.current.contains(e.target as Node)
            ) {
                setIsMoreMenuOpen(false);
            }
        };
        if (isMoreMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMoreMenuOpen]);

    const filteredMembers = useMemo(() => {
        if (!memberSearch.trim()) return defaultWorkspaceMembers;
        const q = memberSearch.toLowerCase();
        return defaultWorkspaceMembers.filter(
            (m) =>
                m.name.toLowerCase().includes(q) ||
                m.roleOrUnit.toLowerCase().includes(q)
        );
    }, [memberSearch]);

    const vendors = useMemo(
        () => filteredMembers.filter((m) => m.category === 'Vendors'),
        [filteredMembers]
    );

    const tenants = useMemo(
        () => filteredMembers.filter((m) => m.category === 'Tenants'),
        [filteredMembers]
    );

    // Main spotlight participant and other attendees
    const spotlightParticipant = useMemo(() => {
        return (
            participants.find((p) => p.id === spotlightParticipantId) ||
            participants[0]
        );
    }, [participants, spotlightParticipantId]);

    const otherParticipants = useMemo(() => {
        return participants.filter((p) => p.id !== spotlightParticipant.id);
    }, [participants, spotlightParticipant]);

    const toggleMember = (id: string) => {
        setSelectedMemberIds((prev) =>
            prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
        );
    };

    const toggleGroup = (groupMembers: WorkspaceMember[]) => {
        const groupIds = groupMembers.map((m) => m.id);
        const allGroupSelected = groupIds.every((id) =>
            selectedMemberIds.includes(id)
        );

        if (allGroupSelected) {
            setSelectedMemberIds((prev) =>
                prev.filter((id) => !groupIds.includes(id))
            );
        } else {
            setSelectedMemberIds((prev) =>
                Array.from(new Set([...prev, ...groupIds]))
            );
        }
    };

    if (!isOpen) return null;

    const handleLeaveClick = () => {
        setIsLeaveConfirmOpen(true);
    };

    const handleConfirmLeave = () => {
        setIsLeaveConfirmOpen(false);
        showSuccessToast('Meeting Ended', 'You have left the video meeting.');
        onClose();
    };

    const toggleMic = () => {
        setIsMuted((prev) => {
            const next = !prev;
            showSuccessToast('Audio', next ? 'Microphone muted.' : 'Microphone unmuted.');
            return next;
        });
    };

    const toggleVideo = () => {
        setIsVideoOff((prev) => {
            const next = !prev;
            showSuccessToast('Camera', next ? 'Camera turned off.' : 'Camera turned on.');
            return next;
        });
    };

    const handleScreenShare = () => {
        showSuccessToast('Screen Share', 'Screen sharing window requested.');
    };

    const handleAddAttendee = () => {
        showSuccessToast('Invite Link', 'Meeting link copied to clipboard.');
    };

    const handleDoneAddingMembers = () => {
        if (selectedMemberIds.length > 0) {
            const newParticipantsToAdd: CallParticipant[] = selectedMemberIds
                .map((id) => {
                    const member = defaultWorkspaceMembers.find((m) => m.id === id);
                    if (!member) return null;
                    if (participants.some((p) => p.name === member.name)) return null;
                    return {
                        id: `p-${member.id}`,
                        name: member.name,
                        roleOrUnit: member.roleOrUnit,
                        avatar: member.avatar,
                        hasAudio: false,
                    };
                })
                .filter(Boolean) as CallParticipant[];

            if (newParticipantsToAdd.length > 0) {
                setParticipants((prev) => [...prev, ...newParticipantsToAdd]);
                showSuccessToast(
                    'Members Added',
                    `${newParticipantsToAdd.length} member(s) joined the call.`
                );
            }
        }
        setIsAddMembersOpen(false);
    };

    // ==========================================
    // FULLSCREEN / EXPANDED MODE (IMAGES 1, 4 & 5)
    // ==========================================
    if (isExpanded) {
        return (
            <div className="fixed inset-0 z-50 bg-[#E5EBE6] flex flex-col animate-fade-in select-none">
                {/* Top Bar */}
                <div className="w-full px-6 py-4 flex items-center justify-between border-b border-[#D5DDD6]/60 bg-[#E5EBE6]">
                    {/* Left: Green call icon */}
                    <div className="w-9 h-9 rounded-full bg-[#12B76A] text-white flex items-center justify-center shadow-xs">
                        <FiPhone className="h-4 w-4" />
                    </div>

                    {/* Center: Title */}
                    <h3 className="text-sm sm:text-base font-bold text-[#002E62]">
                        {workspaceName}
                    </h3>

                    {/* Right: Window Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="p-2 rounded-xl text-slate-600 hover:text-[#002E62] hover:bg-white/80 transition-colors cursor-pointer"
                            title="Compact View"
                        >
                            <FiMinimize2 className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={handleLeaveClick}
                            className="p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-white/80 transition-colors cursor-pointer"
                            title="Leave Meeting"
                        >
                            <FiX className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Main Content Area: Stage + Optional Add Members Sidebar */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Video Stage Area (Image 1: Big Spotlight Video with Dynamic Thumbnails Row) */}
                    <div className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
                        <div
                            className={`relative w-full max-w-5xl aspect-[16/10] sm:aspect-[16/9] max-h-[76vh] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border-2 border-[#12B76A] ring-4 ring-[#12B76A]/20 transition-all ${
                                isAddMembersOpen ? 'scale-[0.98]' : ''
                            }`}
                        >
                            {/* Main Big Spotlight Video Feed (Image 1) */}
                            <img
                                src={spotlightParticipant.avatar}
                                alt={spotlightParticipant.name}
                                className="w-full h-full object-cover transition-opacity duration-300"
                            />

                            {/* Floating Name Badge with Animated Sound Wave (Bottom-Left) */}
                            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-2.5 z-20">
                                <span className="text-xs sm:text-sm font-semibold text-[#002E62]">
                                    {spotlightParticipant.name}
                                </span>
                                {spotlightParticipant.hasAudio !== false && (
                                    <div className="flex items-end gap-0.5 h-3.5">
                                        <span className="w-1 bg-[#12B76A] rounded-full animate-bounce h-2" />
                                        <span className="w-1 bg-[#12B76A] rounded-full animate-pulse h-3.5" />
                                        <span className="w-1 bg-[#12B76A] rounded-full animate-bounce h-2.5" />
                                    </div>
                                )}
                            </div>

                            {/* Top-Left Floating Attendee Thumbnails Strip (Image 1) */}
                            {/* Number of images shown is dynamic based on all users in the call */}
                            <div className="absolute top-4 left-4 flex items-center gap-2.5 sm:gap-3.5 z-20 overflow-x-auto max-w-[calc(100%-2rem)] pb-2 scrollbar-none">
                                {otherParticipants.map((p) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setSpotlightParticipantId(p.id)}
                                        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-white/90 shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all shrink-0 bg-slate-800 group"
                                        title={`Click to enlarge ${p.name}`}
                                    >
                                        <img
                                            src={p.avatar}
                                            alt={p.name}
                                            className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                        <span className="absolute bottom-1 right-1.5 text-[10px] text-white/90 bg-black/50 backdrop-blur-xs px-1.5 py-0.5 rounded-md font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            {p.name.split(' ')[0]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar: "Add Members" Panel (Image 4) */}
                    {isAddMembersOpen && (
                        <div className="w-80 sm:w-96 bg-white border-l border-[#E2E8F0] p-6 flex flex-col justify-between shrink-0 shadow-xl animate-fade-in z-20">
                            <div className="space-y-5 overflow-y-auto pr-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm sm:text-base font-bold text-[#002E62]">
                                        Add Members
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddMembersOpen(false)}
                                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        <FiX className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Search by name or property + Add button */}
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                                        <input
                                            type="text"
                                            placeholder="Search by name or property"
                                            value={memberSearch}
                                            onChange={(e) => setMemberSearch(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-xl text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:border-[#12B76A]"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (memberSearch.trim()) {
                                                showSuccessToast('Member Invited', `Invite sent to ${memberSearch}`);
                                                setMemberSearch('');
                                            }
                                        }}
                                        className="p-2.5 rounded-xl bg-[#12B76A] hover:bg-[#0EA25B] text-white transition-colors cursor-pointer shadow-xs"
                                        title="Add"
                                    >
                                        <FiPlus className="h-4 w-4 stroke-[2.5]" />
                                    </button>
                                </div>

                                {/* Vendors Section */}
                                {vendors.length > 0 && (
                                    <div className="space-y-3 pt-1">
                                        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                                            <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                                                Vendors
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => toggleGroup(vendors)}
                                                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                                                    vendors.every((v) =>
                                                        selectedMemberIds.includes(v.id)
                                                    )
                                                        ? 'bg-[#12B76A] border-[#12B76A] text-white'
                                                        : 'border-[#CBD5E1] bg-white hover:border-[#94A3B8]'
                                                }`}
                                            >
                                                {vendors.every((v) =>
                                                    selectedMemberIds.includes(v.id)
                                                ) && <FiCheck className="h-3 w-3 stroke-[3]" />}
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            {vendors.map((vendor) => {
                                                const isChecked = selectedMemberIds.includes(vendor.id);
                                                return (
                                                    <div
                                                        key={vendor.id}
                                                        onClick={() => toggleMember(vendor.id)}
                                                        className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={vendor.avatar}
                                                                alt={vendor.name}
                                                                className="w-9 h-9 rounded-full object-cover border border-[#E2E8F0]"
                                                            />
                                                            <div>
                                                                <h5 className="text-xs sm:text-sm font-bold text-[#002E62] leading-tight">
                                                                    {vendor.name}
                                                                </h5>
                                                                <p className="text-[11px] text-[#64748B]">
                                                                    {vendor.roleOrUnit}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                                                isChecked
                                                                    ? 'bg-[#12B76A] border-[#12B76A] text-white'
                                                                    : 'border-[#CBD5E1] bg-white'
                                                            }`}
                                                        >
                                                            {isChecked && (
                                                                <FiCheck className="h-3 w-3 stroke-[3]" />
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Tenants Section */}
                                {tenants.length > 0 && (
                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                                            <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                                                Tenants
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => toggleGroup(tenants)}
                                                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                                                    tenants.every((t) =>
                                                        selectedMemberIds.includes(t.id)
                                                    )
                                                        ? 'bg-[#12B76A] border-[#12B76A] text-white'
                                                        : 'border-[#CBD5E1] bg-white hover:border-[#94A3B8]'
                                                }`}
                                            >
                                                {tenants.every((t) =>
                                                    selectedMemberIds.includes(t.id)
                                                ) && <FiCheck className="h-3 w-3 stroke-[3]" />}
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            {tenants.map((tenant) => {
                                                const isChecked = selectedMemberIds.includes(tenant.id);
                                                return (
                                                    <div
                                                        key={tenant.id}
                                                        onClick={() => toggleMember(tenant.id)}
                                                        className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={tenant.avatar}
                                                                alt={tenant.name}
                                                                className="w-9 h-9 rounded-full object-cover border border-[#E2E8F0]"
                                                            />
                                                            <div>
                                                                <h5 className="text-xs sm:text-sm font-bold text-[#002E62] leading-tight">
                                                                    {tenant.name}
                                                                </h5>
                                                                <p className="text-[11px] text-[#64748B]">
                                                                    {tenant.roleOrUnit}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                                                isChecked
                                                                    ? 'bg-[#12B76A] border-[#12B76A] text-white'
                                                                    : 'border-[#CBD5E1] bg-white'
                                                            }`}
                                                        >
                                                            {isChecked && (
                                                                <FiCheck className="h-3 w-3 stroke-[3]" />
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Done Button */}
                            <div className="pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={handleDoneAddingMembers}
                                    className="w-full sm:w-auto px-8 py-2.5 bg-[#12B76A] hover:bg-[#0EA25B] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Control Dock (Image 1, 4 & 5) */}
                <div className="w-full flex items-center justify-center pb-8 pt-2">
                    <div className="relative flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 px-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/80">
                        {/* Mic Button */}
                        <button
                            type="button"
                            onClick={toggleMic}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                                isMuted
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-[#12B76A] hover:bg-[#0EA25B] text-white shadow-xs'
                            }`}
                            title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
                        >
                            {isMuted ? (
                                <FiMicOff className="h-5 w-5" />
                            ) : (
                                <FiMic className="h-5 w-5" />
                            )}
                        </button>

                        {/* Camera Button */}
                        <button
                            type="button"
                            onClick={toggleVideo}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                                isVideoOff
                                    ? 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#94A3B8]'
                                    : 'bg-[#12B76A] text-white'
                            }`}
                            title={isVideoOff ? 'Start Video' : 'Stop Video'}
                        >
                            {isVideoOff ? (
                                <FiVideoOff className="h-5 w-5" />
                            ) : (
                                <FiVideo className="h-5 w-5" />
                            )}
                        </button>

                        {/* Screen Share */}
                        <button
                            type="button"
                            onClick={handleScreenShare}
                            className="w-10 h-10 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#002E62] flex items-center justify-center transition-colors cursor-pointer"
                            title="Share Screen"
                        >
                            <FiMonitor className="h-5 w-5" />
                        </button>

                        {/* Plus (+) Button: opens Add Members Sidebar */}
                        <button
                            type="button"
                            onClick={() => setIsAddMembersOpen(!isAddMembersOpen)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                                isAddMembersOpen
                                    ? 'bg-[#12B76A] text-white shadow-xs'
                                    : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#002E62]'
                            }`}
                            title="Add Members"
                        >
                            <FiPlus className="h-5 w-5" />
                        </button>

                        {/* More Options (...) Button (Image 5): opens popup context menu */}
                        <div className="relative" ref={moreMenuRef}>
                            <button
                                type="button"
                                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                                    isMoreMenuOpen
                                        ? 'bg-slate-200 text-[#002E62]'
                                        : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#002E62]'
                                }`}
                                title="More Options"
                            >
                                <FiMoreHorizontal className="h-5 w-5" />
                            </button>

                            {/* Popup context menu when three dots clicked (Image 5) */}
                            {isMoreMenuOpen && (
                                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] py-2 z-50 animate-scale-in">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsMoreMenuOpen(false);
                                            setIsAddMembersOpen(true);
                                        }}
                                        className="w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium text-[#1E293B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                                    >
                                        Add New Member
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsMoreMenuOpen(false);
                                            handleScreenShare();
                                        }}
                                        className="w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium text-[#1E293B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                                    >
                                        Share Screen
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsMoreMenuOpen(false);
                                            handleAddAttendee();
                                        }}
                                        className="w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium text-[#1E293B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                                    >
                                        Share Link
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsMoreMenuOpen(false);
                                            showSuccessToast('Recording', 'Meeting recording started.');
                                        }}
                                        className="w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium text-[#1E293B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                                    >
                                        Record
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Leave Button */}
                        <button
                            type="button"
                            onClick={handleLeaveClick}
                            className="px-6 py-2.5 bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs ml-1"
                        >
                            Leave
                        </button>
                    </div>
                </div>

                {/* Leave Meeting Confirmation Dialog (Image 2) */}
                <LeaveMeetingConfirmModal
                    isOpen={isLeaveConfirmOpen}
                    onClose={() => setIsLeaveConfirmOpen(false)}
                    onConfirmLeave={handleConfirmLeave}
                />
            </div>
        );
    }

    // ==========================================
    // WINDOWED / COMPACT MODE (OM & CJ)
    // ==========================================
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-fade-in"
                onClick={handleLeaveClick}
                aria-hidden="true"
            />

            {/* Compact Modal Box */}
            <div className="relative w-full max-w-[500px] bg-white rounded-[24px] z-10 shadow-2xl overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-[#F0F2F5] bg-white">
                    <h3 className="text-sm sm:text-base font-bold text-[#002E62]">
                        {workspaceName}
                    </h3>

                    {/* Maximize Button ⤢ */}
                    <button
                        type="button"
                        onClick={() => setIsExpanded(true)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#002E62] hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Maximize"
                    >
                        <FiMaximize2 className="h-4 w-4 stroke-[2.2]" />
                    </button>
                </div>

                {/* Mint Green Body Canvas with OM & CJ */}
                <div className="bg-[#EEFAF4] py-10 px-6 sm:px-12 flex items-center justify-center gap-6">
                    {/* Attendee 1: OM */}
                    <div
                        onClick={() => {
                            setIsExpanded(true);
                            setSpotlightParticipantId('p-speaker-man');
                        }}
                        className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-2xl shadow-xs border border-emerald-100 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                        title="Click to spotlight"
                    >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#12B76A] text-white font-bold text-lg sm:text-xl flex items-center justify-center tracking-wider shadow-xs">
                            OM
                        </div>
                    </div>

                    {/* Attendee 2: CJ (Active Speaker Outline) */}
                    <div
                        onClick={() => {
                            setIsExpanded(true);
                            setSpotlightParticipantId('p-charles');
                        }}
                        className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-2xl shadow-xs border-2 border-[#12B76A] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                        title="Click to spotlight"
                    >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#12B76A] text-white font-bold text-lg sm:text-xl flex items-center justify-center tracking-wider shadow-xs">
                            CJ
                        </div>
                    </div>
                </div>

                {/* Bottom Control Bar */}
                <div className="px-5 sm:px-6 py-4 bg-white flex items-center justify-between border-t border-[#F0F2F5]">
                    {/* Left Controls */}
                    <div className="flex items-center gap-2">
                        {/* Mic */}
                        <button
                            type="button"
                            onClick={toggleMic}
                            className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                                isMuted
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-[#12B76A] hover:bg-[#0EA25B] text-white shadow-xs'
                            }`}
                            title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
                        >
                            {isMuted ? (
                                <FiMicOff className="h-4 w-4" />
                            ) : (
                                <FiMic className="h-4 w-4" />
                            )}
                        </button>

                        {/* Camera */}
                        <button
                            type="button"
                            onClick={toggleVideo}
                            className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                                isVideoOff
                                    ? 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#94A3B8]'
                                    : 'bg-[#12B76A] text-white'
                            }`}
                            title={isVideoOff ? 'Start Video' : 'Stop Video'}
                        >
                            {isVideoOff ? (
                                <FiVideoOff className="h-4 w-4" />
                            ) : (
                                <FiVideo className="h-4 w-4" />
                            )}
                        </button>

                        {/* Screen Share */}
                        <button
                            type="button"
                            onClick={handleScreenShare}
                            className="p-2.5 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#002E62] transition-colors cursor-pointer"
                            title="Share Screen"
                        >
                            <FiMonitor className="h-4 w-4" />
                        </button>

                        {/* More Options */}
                        <button
                            type="button"
                            onClick={() => {
                                setIsExpanded(true);
                                setIsMoreMenuOpen(true);
                            }}
                            className="p-2.5 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#002E62] transition-colors cursor-pointer"
                            title="More Options"
                        >
                            <FiMoreHorizontal className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Right: Leave Button */}
                    <button
                        type="button"
                        onClick={handleLeaveClick}
                        className="px-5 py-2.5 bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                        Leave
                    </button>
                </div>
            </div>

            {/* Leave Meeting Confirmation Dialog (Image 2) */}
            <LeaveMeetingConfirmModal
                isOpen={isLeaveConfirmOpen}
                onClose={() => setIsLeaveConfirmOpen(false)}
                onConfirmLeave={handleConfirmLeave}
            />
        </div>
    );
}
