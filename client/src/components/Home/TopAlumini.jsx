import React, { useState, useEffect, useRef, useCallback } from 'react';
import './TopAlumini.css'


const Carousel = () => {
    const [progress, setProgress] = useState(50);
    const [active, setActive] = useState(0);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);

    const carouselRef = useRef(null);
    const itemsRef = useRef([]);
    const cursorsRef = useRef([]);

    const speedWheel = 0.02;
    const speedDrag = -0.1;

    const getZindex = (array, index) =>
        array.map((_, i) => (index === i ? array.length : array.length - Math.abs(index - i)));

    const displayItems = (item, index, active) => {
        const zIndex = getZindex([...itemsRef.current], active)[index];
        item.style.setProperty('--zIndex', zIndex);
        item.style.setProperty('--active', (index - active) / itemsRef.current.length);
    };

    const animate = useCallback(() => {
        setProgress((prev) => Math.max(0, Math.min(prev, 100)));
        setActive(Math.floor((progress / 100) * (itemsRef.current.length - 1)));

        itemsRef.current.forEach((item, index) => displayItems(item, index, active));
    }, [progress, active]);

    useEffect(() => {
        animate();
    }, [animate]);

    const handleWheel = useCallback((e) => {
        if (carouselRef.current && carouselRef.current.contains(e.target)) {
            e.preventDefault(); // Prevent default scroll behavior
            const wheelProgress = e.deltaY * speedWheel;
            setProgress((prev) => prev + wheelProgress);
        }
    }, []);

    const handleMouseMove = useCallback(
        (e) => {
            cursorsRef.current.forEach((cursor) => {
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });

            if (!isDown) return;
            const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            const mouseProgress = (x - startX) * speedDrag;
            setProgress((prev) => prev + mouseProgress);
            setStartX(x);
        },
        [isDown, startX]
    );

    const handleMouseDown = useCallback((e) => {
        setIsDown(true);
        setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsDown(false);
    }, []);

    useEffect(() => {
        // Add event listeners specifically for the Carousel component
        const carouselElement = carouselRef.current;
        if (!carouselElement) return;

        carouselElement.addEventListener('wheel', handleWheel, { passive: false });
        carouselElement.addEventListener('mousedown', handleMouseDown);
        carouselElement.addEventListener('mousemove', handleMouseMove);
        carouselElement.addEventListener('mouseup', handleMouseUp);
        carouselElement.addEventListener('touchstart', handleMouseDown);
        carouselElement.addEventListener('touchmove', handleMouseMove);
        carouselElement.addEventListener('touchend', handleMouseUp);

        return () => {
            carouselElement.removeEventListener('wheel', handleWheel);
            carouselElement.removeEventListener('mousedown', handleMouseDown);
            carouselElement.removeEventListener('mousemove', handleMouseMove);
            carouselElement.removeEventListener('mouseup', handleMouseUp);
            carouselElement.removeEventListener('touchstart', handleMouseDown);
            carouselElement.removeEventListener('touchmove', handleMouseMove);
            carouselElement.removeEventListener('touchend', handleMouseUp);
        };
    }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

    const items = [
        { title: 'Paris', num: '01', img: 'https://media.istockphoto.com/id/949299844/it/foto/vista-prospettica-dellesterno-delledificio-contemporaneo.jpg?s=612x612&w=0&k=20&c=_DR1aRHuTEV3EYBJo1ZXq1pF4SgwB9EVWQLaBj4sC5g=' },
        { title: 'Warsaw', num: '02', img: 'https://media.istockphoto.com/id/1150545984/it/foto/palazzo-moderno-di-lusso-con-piscina.jpg?s=612x612&w=0&k=20&c=Pbrai_VGc9tUviMCF1UaBErdS1YGyIVWsD29jzMZwTY=' },
        { title: 'Madrid', num: '03', img: 'https://media.istockphoto.com/id/1214351345/it/foto/guardando-direttamente-lo-skyline-del-quartiere-finanziario-nel-centro-di-londra-immagine-di.jpg?s=612x612&w=0&k=20&c=oNNbPzPvcQ-4RA6AeatNIxHQIafBiXmDRtUUY0Ska-I=' },
        { title: 'Sydney', num: '04', img: 'https://media.istockphoto.com/id/904390980/it/foto/foto-di-architettura-contemporanea-astratta.jpg?s=612x612&w=0&k=20&c=_P4Wmx5nq5MeDuimpNklKCBlrLovmCyd9lfiMKeJZDs=' },
        { title: 'Istanbul', num: '05', img: 'https://media.istockphoto.com/id/130408311/it/foto/piscina-allesterno-della-casa-moderna-al-crepuscolo.jpg?s=612x612&w=0&k=20&c=ZoVjx7uDjoHKmpM1ayW6UR1SQOoYh_xx-QMG_qeOYs0=' },
        { title: 'Prague', num: '06', img: 'https://media.istockphoto.com/id/1299954175/it/foto/villa-cubica-moderna.jpg?s=612x612&w=0&k=20&c=DhGhb3c1E3DW_fbrWJ_R_Zh0Lbwu6syFeRLsKlZ9no8=' },
        { title: 'Munich', num: '07', img: 'https://media.istockphoto.com/id/926689776/it/foto/vista-ad-angolo-basso-dei-grattacieli-di-new-york.jpg?s=612x612&w=0&k=20&c=DmEB0Ty7ZwDnBoU5SuA8FNevOp4G1UcECw5aS4vA9A8=' },
        { title: 'Venice', num: '08', img: 'https://media.istockphoto.com/id/1191376167/it/foto/villa-dellisola.jpg?s=612x612&w=0&k=20&c=PKslWo4FdbjinohKQlK_oWL34jqAsnzMTdy2bxEAf-I=' },
        { title: 'Oslo', num: '09', img: 'https://media.istockphoto.com/id/184316397/it/foto/londra-edifici-aziendali.jpg?s=612x612&w=0&k=20&c=XqrRxEPzFnwRFk7PQrCiu9-FPfCTPyMe5BKKaxYXCs8=' },
        { title: 'London', num: '10', img: 'https://media.istockphoto.com/id/184619832/it/foto/distretto-finanziario-al-crepuscolo-londra.jpg?s=612x612&w=0&k=20&c=RAThrJOBY6vhlT6-kQpu9-9jLEzWToYfdw46S8B0Mu0=' },
    ];

    return (
        <div className="top-alumini">
            <div className="carousels" ref={carouselRef}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="carousel-items"
                        ref={el => itemsRef.current[index] = el}
                        onClick={() => setProgress((index / items.length) * 100 + 10)}
                    >
                        <div className="carousel-boxs">
                            <div className="titles">{item.title}</div>
                            <div className="nums">{item.num}</div>
                            <img src={item.img || 'https://via.placeholder.com/300'} alt={item.title} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;