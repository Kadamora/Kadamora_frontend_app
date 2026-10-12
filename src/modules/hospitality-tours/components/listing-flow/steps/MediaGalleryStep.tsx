import { useHTListingForm } from '../useHTListingForm';
import { FiX } from 'react-icons/fi';
import FileDropzone from '@shared/components/Forms/FileDropzone';

export default function MediaGalleryStep() {
    const { state, setCoverPhoto, addGalleryPhotos, removeGalleryPhoto, setPromotionalVideo } =
        useHTListingForm();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-[18px] font-semibold text-[#002E62]">Media & Gallery</h2>
            </div>

            {/* Cover Photo */}
            <div>
                <p className="block mb-1 text-[#002E62] font-semibold text-[15px]">Cover Photo</p>
                {state.coverPhotoPreview ? (
                    <div className="relative rounded-xl overflow-hidden border border-[#E0DEF7] h-48">
                        <img
                            src={state.coverPhotoPreview}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => setCoverPhoto(null)}
                            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                            aria-label="Remove cover photo"
                        >
                            <FiX className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <FileDropzone
                        accept="image/png,image/jpeg,image/webp"
                        onFiles={(files) => setCoverPhoto(files[0])}
                    />
                )}
            </div>

            {/* Photo Gallery */}
            <div>
                <p className="block mb-1 text-[#002E62] font-semibold text-[15px]">Photo Gallery</p>
                {/* Grid of existing uploads */}
                {state.galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                        {state.galleryPreviews.map((item) => (
                            <div
                                key={item.id}
                                className="relative rounded-lg overflow-hidden border border-[#E0DEF7] aspect-square"
                            >
                                <img
                                    src={item.previewUrl}
                                    alt="Gallery"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeGalleryPhoto(item.id)}
                                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                                    aria-label="Remove photo"
                                >
                                    <FiX className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <FileDropzone
                    subtitle="PNG, JPG up to 5MB each (minimum 15 photos)"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    onFiles={addGalleryPhotos}
                />
                {state.galleryPreviews.length > 0 && (
                    <p className="text-xs text-[#71717A] mt-1">
                        {state.galleryPreviews.length} photo{state.galleryPreviews.length !== 1 ? 's' : ''} added
                        {state.galleryPreviews.length < 15 && (
                            <span className="text-amber-600">
                                {' '}— minimum 15 required ({15 - state.galleryPreviews.length} more needed)
                            </span>
                        )}
                    </p>
                )}
            </div>

            {/* Promotional Video */}
            <div>
                <p className="block mb-1 text-[#002E62] font-semibold text-[15px]">Promotional Video</p>
                {state.videoPreview ? (
                    <div className="relative rounded-xl overflow-hidden border border-[#E0DEF7]">
                        <video
                            src={state.videoPreview}
                            controls
                            className="w-full rounded-xl max-h-48 object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => setPromotionalVideo(null)}
                            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                            aria-label="Remove video"
                        >
                            <FiX className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <FileDropzone
                        subtitle="MP4 up to 100MB"
                        accept="video/mp4,video/mov,video/avi"
                        onFiles={(files) => setPromotionalVideo(files[0])}
                    />
                )}
            </div>
        </div>
    );
}
