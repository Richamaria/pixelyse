import React, { useRef, useState, useEffect, useCallback } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [templateImage, setTemplateImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const canvasRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isTemplateReady, setIsTemplateReady] = useState(false);
    
    // ROI selection state
    const [isSelecting, setIsSelecting] = useState(false);
    const [startPoint, setStartPoint] = useState(null);
    const [currentPoint, setCurrentPoint] = useState(null);
    const [roiImage, setRoiImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (!isTemplateReady) {
                    setTemplateImage(reader.result);
                    setIsTemplateReady(true);
                } else {
                    setUploadedImage(reader.result);
                }
                setErrorMessage('');
            };
            reader.readAsDataURL(file);
        } else {
            setErrorMessage('Please upload a valid PNG, JPG, or JPEG image file.');
        }
    };

    // ✅ Fixed drawImages: Now inside useCallback to prevent useEffect issues
    const drawImages = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const frameWidth = 300;
        const frameHeight = 300;
        canvas.width = frameWidth;
        canvas.height = frameHeight;

        const template = new Image();
        const uploaded = new Image();

        template.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(template, 0, 0, frameWidth, frameHeight);

            uploaded.onload = () => {
                const scale = Math.max(frameWidth / uploaded.width, frameHeight / uploaded.height);
                const scaledWidth = uploaded.width * scale;
                const scaledHeight = uploaded.height * scale;
                const offsetX = (frameWidth - scaledWidth) / 2;
                const offsetY = (frameHeight - scaledHeight) / 2;
                
                ctx.drawImage(uploaded, offsetX, offsetY, scaledWidth, scaledHeight);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.strokeRect(0, 0, frameWidth, frameHeight);
            };
            uploaded.src = uploadedImage;
        };
        template.src = templateImage;
    }, [templateImage, uploadedImage]);

    useEffect(() => {
        if (templateImage && uploadedImage) {
            drawImages(); // ✅ Fixed: Now correctly calls drawImages
        }
    }, [templateImage, uploadedImage, drawImages]);

    // ROI selection handlers
    const startSelection = (e) => {
        setIsSelecting(true);
        const rect = canvasRef.current.getBoundingClientRect();
        setStartPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const updateSelection = (e) => {
        if (isSelecting) {
            const rect = canvasRef.current.getBoundingClientRect();
            setCurrentPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            drawROI();
        }
    };

    const endSelection = () => {
        setIsSelecting(false);
        cutROI();
    };

    const drawROI = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImages();

        if (startPoint && currentPoint) {
            const x = Math.min(startPoint.x, currentPoint.x);
            const y = Math.min(startPoint.y, currentPoint.y);
            const width = Math.abs(currentPoint.x - startPoint.x);
            const height = Math.abs(currentPoint.y - startPoint.y);

            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);
            ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
            ctx.fillRect(x, y, width, height);
        }
    };

    const cutROI = () => {
        const canvas = canvasRef.current;
        if (startPoint && currentPoint) {
            const x = Math.min(startPoint.x, currentPoint.x);
            const y = Math.min(startPoint.y, currentPoint.y);
            const width = Math.abs(currentPoint.x - startPoint.x);
            const height = Math.abs(currentPoint.y - startPoint.y);

            if (width > 0 && height > 0) {
                const roiCanvas = document.createElement('canvas');
                const roiCtx = roiCanvas.getContext('2d');
                roiCanvas.width = width;
                roiCanvas.height = height;
                roiCtx.drawImage(canvas, x, y, width, height, 0, 0, width, height);
                setRoiImage(roiCanvas.toDataURL());
            }
        }
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <img src={require('./logo.png')} alt="Pixelyse Logo" className="logo" />
            </div>
            <div className="content">
                <div className="upload-container">
                    <h2>Upload Template Image or Image to Align</h2>
                    <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageUpload} />
                    <button className="detect-forgery-button">Detect Forgery</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </div>
            <div className="align-images-container">
                <button onClick={drawImages} disabled={!templateImage || !uploadedImage} className="align-images-button">
                    Align Images
                </button>
                <canvas ref={canvasRef} style={{ border: '1px solid black', marginTop: '20px', cursor: 'crosshair' }}
                    onMouseDown={startSelection} onMouseMove={updateSelection} onMouseUp={endSelection} />
                {roiImage && (
                    <div className="roi-preview">
                        <h3>Selected Region of Interest</h3>
                        <img src={roiImage} alt="Selected ROI" style={{ border: '1px solid blue', marginTop: '10px' }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
