import { Button } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import ImageRenderer from "../molecules/ImageRenderer";
import LazyImage from "../molecules/LazyImage";
import ImageList from "../oragnisms/ImageList";

interface SidebarProps {
    className: string;
}

const emptyArr: object[] = [];

const Sidebar: React.FC<SidebarProps> = (props) => {

    const [ loaded, setLoaded ] = useState(false);
    const [ imageURLs, setIimageURLs ] = useState(emptyArr);

    const fetchImages = () => {
        fetch("https://api.unsplash.com/photos?page=1&per_page=10&client_id=84lVfuQm_ZYKDgMzQ3VEb2jomuId_5xXLKiuDD1BvSA")
            .then(response => response.json())
            .then(photos => {
                console.log(photos);
                setIimageURLs(photos.map((photo: any) => ({
                    url: photo.urls.regular,
                    id: photo.id,
                    alt: photo.user.name
                })));
                setLoaded(true);
            });
    }

    return (
        <div className={props.className}        >
            {!loaded && (
                <Button 
                    variant="contained" 
                    color="success"
                    onClick={fetchImages}
                    >
                    Load images
                </Button>
            )}
            <ImageList 
                imageURLs={imageURLs}
            />
        </div>
    );
}

export default Sidebar;