import { useState } from 'react';
import ActivityLogTimeline from '@shared/components/Settings/ActivityLogTimeline';
import { mockActivityLogs } from '../../data/settingsMock';
import type { ActivityLogEntry } from '../../types/settings';

export default function FMActivityLogTabView() {
    const [logs] = useState<ActivityLogEntry[]>(mockActivityLogs);

    return <ActivityLogTimeline logs={logs} />;
}
