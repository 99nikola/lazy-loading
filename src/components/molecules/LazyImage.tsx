import { useEffect, useMemo, useRef } from "react";

interface LazyImageProps {
    observer: IntersectionObserver,
    url: string,
    alt: string,
    width: number,
    height: number
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

    const containerStyle = useMemo(() => ({
        width: props.width / 10,
        height: props.height / 10
    }), [props.width, props.height]);

    return (
        <div style={containerStyle}>
            <img
                className="image"
                ref={imageRef}
                data-src={props.url}
                alt={props.alt}
                width="100%"
                height="100%"
            />
        </div>
    )
}

export default LazyImage;
