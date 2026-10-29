import { useState, type FormEvent } from 'react';
import Modal from '@shared/components/Modal/Modal';
import Input from '@shared/components/Forms/Input';
import Button from '@shared/components/Button/Button';
import FileDropzone from '@shared/components/Forms/FileDropzone';

export interface FMCreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    postType: 'Activity Feed' | 'Announcements' | 'Events';
    onSubmitPost: (data: { title: string; content: string; image?: string }) => void;
}

export default function FMCreatePostModal({
    isOpen,
    onClose,
    postType,
    onSubmitPost,
}: FMCreatePostModalProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState<File[]>([]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        let image: string | undefined;
        if (files.length > 0) {
            image = URL.createObjectURL(files[0]);
        }

        onSubmitPost({
            title: title.trim(),
            content: content.trim(),
            image,
        });

        setTitle('');
        setContent('');
        setFiles([]);
        onClose();
    };

    const modalTitle =
        postType === 'Announcements'
            ? 'New Announcement'
            : postType === 'Events'
            ? 'Create Event'
            : 'Create Post';

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={modalTitle} maxWidth="max-w-[540px]">
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                <Input
                    title="Title (Optional)"
                    placeholder="Enter heading..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#091E42]">Content</label>
                    <textarea
                        rows={4}
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What would you like to share with the community?"
                        className="w-full rounded-xl border border-[#E2E8F0] p-3 text-xs text-[#091E42] placeholder-slate-400 focus:outline-none focus:border-[#002E62] transition"
                    />
                </div>

                <div>
                    <FileDropzone
                        label="Attach Photo"
                        onFiles={(uploaded) => setFiles((prev) => [...prev, ...uploaded])}
                    />
                    {files.length > 0 && (
                        <div className="mt-1 text-[11px] text-slate-500">
                            {files.length} file selected: {files.map((f) => f.name).join(', ')}
                        </div>
                    )}
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-xs font-semibold"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className="rounded-lg px-6 py-2 text-xs font-semibold"
                    >
                        Publish
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
