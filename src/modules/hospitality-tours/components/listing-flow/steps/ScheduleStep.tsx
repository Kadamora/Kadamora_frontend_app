import { useState } from 'react';
import { useHTListingForm } from '../useHTListingForm';
import { FiPlus, FiTrash2, FiClock } from 'react-icons/fi';

const DAYS_OF_WEEK = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

/**
 * Schedule step — used exclusively by Events & Festivals
 * Lets user add timed activities per day of the event
 */
export default function ScheduleStep() {
    const { state, addScheduleItem, removeScheduleItem } = useHTListingForm();

    const [newItem, setNewItem] = useState({
        time: '',
        activity: '',
        day: 'Day 1',
    });
    const [error, setError] = useState('');

    const handleAdd = () => {
        if (!newItem.time.trim() || !newItem.activity.trim()) {
            setError('Please fill in both time and activity.');
            return;
        }
        setError('');
        addScheduleItem(newItem);
        setNewItem({ time: '', activity: '', day: newItem.day });
    };

    // Group schedule items by day
    const groupedItems = DAYS_OF_WEEK.reduce<Record<string, typeof state.scheduleItems>>(
        (acc, day) => {
            acc[day] = state.scheduleItems.filter((s) => s.day === day);
            return acc;
        },
        {},
    );

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-[18px] font-semibold text-[#002E62]">Event Schedule</h2>
                <p className="text-sm text-[#71717A] mt-1">
                    Add activities and timings for each day of your event.
                </p>
            </div>

            {/* Add new schedule item */}
            <div className="bg-[#F7F7FD] border border-[#E0DEF7] rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-semibold text-[#002E62]">Add Activity</h3>

                {/* Day selector */}
                <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map((day) => (
                        <button
                            key={day}
                            type="button"
                            onClick={() => setNewItem((prev) => ({ ...prev, day }))}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                                newItem.day === day
                                    ? 'bg-[#002E62] text-white border-[#002E62]'
                                    : 'bg-white text-[#52525B] border-[#E0DEF7] hover:border-[#002E62]'
                            }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-[#002E62] mb-1">Time</label>
                        <input
                            type="time"
                            value={newItem.time}
                            onChange={(e) => setNewItem((prev) => ({ ...prev, time: e.target.value }))}
                            className="w-full py-2.5 px-3 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-white text-[14px] font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-[#002E62] mb-1">Activity</label>
                        <input
                            type="text"
                            placeholder="e.g. Opening Ceremony"
                            value={newItem.activity}
                            onChange={(e) => setNewItem((prev) => ({ ...prev, activity: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
                            className="w-full py-2.5 px-3 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-white placeholder-[#94A3B8] text-[14px] font-medium"
                        />
                    </div>
                </div>

                {error && <p className="text-xs text-red-500">{error}</p>}

                <button
                    type="button"
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-[#002E62] hover:bg-[#072440] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                    <FiPlus className="h-4 w-4" />
                    Add to Schedule
                </button>
            </div>

            {/* Scheduled items grouped by day */}
            {DAYS_OF_WEEK.some((day) => groupedItems[day].length > 0) && (
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-[#002E62]">Schedule</h3>
                    {DAYS_OF_WEEK.map((day) => {
                        const items = groupedItems[day];
                        if (items.length === 0) return null;
                        return (
                            <div key={day} className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                                <div className="px-4 py-2 bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                    <span className="text-xs font-bold text-[#002E62] uppercase tracking-wide">
                                        {day}
                                    </span>
                                </div>
                                <div className="divide-y divide-[#F1F5F9]">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between px-4 py-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FiClock className="h-4 w-4 text-[#359F6A] shrink-0" />
                                                <span className="text-sm font-semibold text-[#4A5565]">
                                                    {item.time}
                                                </span>
                                                <span className="text-sm text-[#52525B]">{item.activity}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeScheduleItem(item.id)}
                                                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                                aria-label="Remove schedule item"
                                            >
                                                <FiTrash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {state.scheduleItems.length === 0 && (
                <div className="text-center py-8 text-[#94A3B8] text-sm">
                    No activities added yet. Use the form above to build your event schedule.
                </div>
            )}
        </div>
    );
}
