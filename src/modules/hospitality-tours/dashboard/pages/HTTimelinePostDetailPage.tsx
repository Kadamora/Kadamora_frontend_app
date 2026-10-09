import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useBreadcrumbs } from '@shared/context/BreadcrumbContext';
import { timelinePosts } from '@modules/hospitality-tours/data/mock';
import HTTimelinePostDetailView from '@modules/hospitality-tours/components/timeline/HTTimelinePostDetailView';

export default function HTTimelinePostDetailPage() {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();

    const post = useMemo(() => {
        return (
            timelinePosts.find((p) => p.id === postId) ||
            timelinePosts[0] || {
                id: 'ojude-oba-2025-horses-display',
                title: 'Ojude Oba 2025 Horses Display',
                channel: 'Events TV',
                category: 'Festival',
                coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
                views: 2600,
                postedAgo: '5 days ago',
            }
        );
    }, [postId]);

    const relatedPosts = useMemo(() => {
        return timelinePosts.filter((p) => p.id !== post.id);
    }, [post.id]);

    // Set breadcrumbs — Timeline > Post Title
    useBreadcrumbs(
        useMemo(
            () => [
                { label: 'Timeline', path: '/hospitality-tours/dashboard/timeline' },
                { label: post.title.split(' ')[0] + ' ' + post.title.split(' ')[1] },
            ],
            [post.title],
        ),
    );

    const handleSelectPost = (targetId: string) => {
        navigate(`/hospitality-tours/dashboard/timeline/${targetId}`);
    };

    return (
        <HTTimelinePostDetailView
            post={post}
            relatedPosts={relatedPosts}
            onSelectPost={handleSelectPost}
        />
    );
}
