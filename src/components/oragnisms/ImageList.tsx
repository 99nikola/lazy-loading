import React, { memo, useEffect, useState } from "react";
import LazyImage from "../molecules/LazyImage";

const createObserver = (inViewCallback: IntersectionObserverCallback, options = {}) => {
	const defualtOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.3
	}
	return new IntersectionObserver(inViewCallback, Object.assign(defualtOptions, options));
}


const onImageView = (entries: any[],  observer: any) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const imageSrc = element.getAttribute("data-src");
            
            element.removeAttribute('data-src');
            element.setAttribute('src', imageSrc);

            observer.unobserve(element);
        }
    });
}

interface ImageListProps {
    imageURLs: object[]
}

const ImageList: React.FC<ImageListProps> = (props) => {

    const [ imageObserver ] = useState<IntersectionObserver>(createObserver(onImageView));

    useEffect(() => {
        // const imageObserver = createObserver(onImageView);
        // setImageObserver(imageObserver);

        return () => imageObserver.disconnect();
    }, []);


    return (
    <>
        {props.imageURLs.map((image: any) => (
            <LazyImage 
                key={image.id}
                url={image.url}
                alt={image.alt}
                observer={imageObserver}
                width={image.width}
                height={image.height}
            />
        ))}
    </>
    );
}

export default memo(ImageList);
