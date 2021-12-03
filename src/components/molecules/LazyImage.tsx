import { useEffect, useRef } from "react";

interface LazyImageProps {
    observer: IntersectionObserver
    url: string
    alt: string
}

const LazyImage: React.FC<LazyImageProps> = (props) => {

    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const imageElem = imageRef.current as HTMLImageElement;

        if (props.observer === undefined) {
            console.log("observer: ", props.observer);
            return;
        }
        
        props.observer.observe(imageElem);

        return () => props.observer.unobserve(imageElem);
    }, [props.observer]);

    return (
        <img
            className="image"
            ref={imageRef}
            data-src={props.url}
            alt={props.alt}
        />
    )
}

export default LazyImage;
