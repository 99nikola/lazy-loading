import { LegacyRef, RefObject, useRef, useState } from "react";
import { useIntersection } from "../../hooks/useIntersection";

interface ImageRendererProps {
    url: string
}

const ImageRenderer: React.FC<ImageRendererProps> = (props) => {
    
    const [ inView, setInView ] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);

    useIntersection(imgRef, () => {
        setInView(true);
    });

    return (
        <div
            className="image-container"
            ref={imgRef}
        >
            {inView && (
                <img
                    // className="image"
                    src={props.url}
                />
            )}
        </div>
    )
}

export default ImageRenderer
