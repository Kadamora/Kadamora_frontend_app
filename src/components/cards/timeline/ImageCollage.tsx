import React from 'react';

interface ImageCollageProps {
    images: string[];
    onImageClick?: (index: number) => void;
}

// const ImageCollage: React.FC<ImageCollageProps> = ({ images, onImageClick }) => {
//     if (!images || images.length === 0) return null;

//     const count = images.length;

//     // Helper to render an image with consistent styling and error handling
//     const renderImage = (src: string, index: number, className: string) => (
//         <img
//             key={index}
//             src={src}
//             alt={`Post content ${index + 1}`}
//             className={`object-cover object-center w-full h-full ${
//                 onImageClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
//             } ${className}`}
//             onClick={() => onImageClick?.(index)}
//             onError={(e) => {
//                 const target = e.target as HTMLImageElement;
//                 target.style.display = 'none';
//             }}
//         />
//     );

//     return (
//         <div className="w-full mb-4 overflow-hidden rounded-xl">
//             {/* 1 Image */}
//             {count === 1 && (
//                 <div className="w-full h-[400px]">
//                     {renderImage(images[0], 0, 'rounded-xl')}
//                 </div>
//             )}

//             {/* 2 Images */}
//             {count === 2 && (
//                 <div className="grid grid-cols-2 gap-1 h-[300px]">
//                     {images.map((img, idx) => renderImage(img, idx, ''))}
//                 </div>
//             )}

//             {/* 3 Images */}
//             {count === 3 && (
//                 <div className="grid grid-cols-2 gap-1 h-[400px]">
//                     <div className="h-full">
//                         {renderImage(images[0], 0, '')}
//                     </div>
//                     <div className="grid grid-rows-2 gap-1 h-full">
//                         {renderImage(images[1], 1, '')}
//                         {renderImage(images[2], 2, '')}
//                     </div>
//                 </div>
//             )}

//             {/* 4+ Images */}
//             {count >= 4 && (
//                 <div className="grid grid-cols-2 gap-1 h-[400px]">
//                     {/* First 3 images */}
//                     {images.slice(0, 3).map((img, idx) => {
//                         // First image spans 2 rows if we want a specific layout, 
//                         // but for a 2x2 grid (or 1 big 3 small) let's try a standard 2x2-ish or collage
//                         // The design usually favors:
//                         // 1 Big Left, 3 Small Right? OR 2x2.
//                         // Let's stick to a 2x2 grid for 4 images as it's cleaner, 
//                         // OR the implementation from the plan: 1 large, 3 small?
//                         // Let's go with the complex grid from previous PostBody logic which was:
//                         // index 0: row-span-2 (Left half), others right column.
                        
//                         // Wait, previous logic for > 3 was:
//                         // <div className="grid grid-cols-2 gap-1 h-[400px]">
//                         //     {post.images.slice(0, 3).map((img, index) => (
//                         //          className={`... ${index === 0 ? 'row-span-2' : ''}`} ...
//                         //     ))}
//                         // The previous logic for 4+ was effectively: Image 0 (Left, tall), Image 1 (Right Top), Image 2 (Right Middle/Bottom?), Wait.
//                         // If index 0 is row-span-2, it takes the whole left column.
//                         // Then we need 2 items in the right column to fill it.
//                         // So for 3 items total it works (1 left, 2 right).
//                         // For 4 items: 1 Left, and 3 on the right? That would be 3 rows on the right.
//                         // Let's do a uniform 2x2 grid for 4 images, it's often cleaner.
//                         // BUT, if we want to mimic the "Collage" feel:
//                         // Let's stick to the flexible "1 Big, rest stacked" or "2x2".
//                         // Let's prioritize the look from the screenshots if any (Screenshots show 1 image, and mockups typically show standard grids).
//                         // I will implement a standard 2x2 for 4 images, and for 5+ the last one has the overlay.
                        
//                         return (
//                              <div key={idx} className="relative w-full h-full">
//                                 {renderImage(img, idx, '')}
//                              </div>
//                         );
//                     })}
                    
//                     {/* Actually, let's refine this loop. We can't just map blindly for a custom grid. */}
                     
//                      {/* 2x2 Grid for 4 items specifically */}
//                      {/* Row 1 */}
//                      <div className="grid grid-rows-2 gap-1 h-full w-full">
//                         {renderImage(images[0], 0, '')}
//                         {renderImage(images[2], 2, '')}
//                      </div>
//                      <div className="grid grid-rows-2 gap-1 h-full w-full">
//                          {renderImage(images[1], 1, '')}
                         
//                          {/* Last Image handled below */}
//                          <div className="relative w-full h-full">
//                             {renderImage(images[3], 3, '')}
//                             {count > 4 && (
//                                 <div
//                                     className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors"
//                                     onClick={() => onImageClick?.(3)}
//                                 >
//                                     <span className="text-white text-2xl font-bold">+{count - 4}</span>
//                                 </div>
//                             )}
//                          </div>
//                      </div>
//                 </div>
//             )}
            
//             {/* 
//                 Refined 4+ Layout:
//                 The previous logic was a bit mixed. Let's do a reliable "Mosaic"
//                 If 4 images: 
//                 Grid 2x2.
//             */}
//         </div>
//     );
    
//     // Let's rewrite the render for 4+ to be strictly 2x2 because the previous map logic above was a bit loose.
// };

// Re-implementing the component body for clarity before writing.
const ImageCollageFinal: React.FC<ImageCollageProps> = ({ images, onImageClick }) => {
    if (!images || images.length === 0) return null;

    const count = images.length;
    
    const renderImage = (src: string, index: number, className: string = '') => (
        <img
            src={src}
            alt={`Post content ${index + 1}`}
            className={`w-full h-full object-cover ${onImageClick ? 'cursor-pointer hover:opacity-95 transition-opacity' : ''} ${className}`}
            onClick={() => onImageClick?.(index)}
            onError={(e) => {
               (e.target as HTMLImageElement).style.display = 'none';
            }}
        />
    );

    return (
        <div className="w-full mb-3 rounded-xl overflow-hidden border border-gray-100">
            {/* 1 Image */}
            {count === 1 && (
                <div className="h-[350px] sm:h-[450px] w-full">
                    {renderImage(images[0], 0)}
                </div>
            )}

            {/* 2 Images - Side by Side */}
            {count === 2 && (
                <div className="grid grid-cols-2 gap-0.5 h-[300px]">
                    {renderImage(images[0], 0)}
                    {renderImage(images[1], 1)}
                </div>
            )}

             {/* 3 Images - 1 Big Left, 2 Small Right */}
            {count === 3 && (
                <div className="grid grid-cols-2 gap-0.5 h-[380px]">
                    <div className="h-full">
                        {renderImage(images[0], 0)}
                    </div>
                    <div className="grid grid-rows-2 gap-0.5 h-full">
                         {renderImage(images[1], 1)}
                         {renderImage(images[2], 2)}
                    </div>
                </div>
            )}

            {/* 4+ Images - 1 Big Top, 3 Small Bottom (Pinterest/FB style) OR 2x2 */}
            {/* Let's go with 2x2 variant which is very standard */}
             {count >= 4 && (
                <div className="grid grid-cols-2 gap-0.5 h-[380px]">
                    <div className="grid grid-rows-2 gap-0.5">
                         {renderImage(images[0], 0)}
                         {renderImage(images[2], 2)}
                    </div>
                    <div className="grid grid-rows-2 gap-0.5">
                         {renderImage(images[1], 1)}
                         <div className="relative w-full h-full">
                             {renderImage(images[3], 3)}
                             {count > 4 && (
                                <div 
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onImageClick?.(3);
                                    }}
                                >
                                    <span className="text-white font-bold text-xl">+{count - 4}</span>
                                </div>
                             )}
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageCollageFinal;
