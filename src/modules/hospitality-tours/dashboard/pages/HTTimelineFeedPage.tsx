import { useNavigate } from 'react-router';
import { timelinePosts } from '@modules/hospitality-tours/data/mock';
import HTTimelineFeedView from '@modules/hospitality-tours/components/timeline/HTTimelineFeedView';

export default function HTTimelineFeedPage() {
    const navigate = useNavigate();


    const handleSelectPost = (postId: string) => {
        navigate(`/hospitality-tours/dashboard/timeline/${postId}`);
    };

    return (
        <HTTimelineFeedView
            posts={timelinePosts}
            onSelectPost={handleSelectPost}
        />
    );
}
