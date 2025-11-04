import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const ExperienceEditor = ({ isOpen, onClose, onUpdatePoints, currentPoints }) => {
  const [points, setPoints] = useState(currentPoints || []);
  const [isDragging, setIsDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPoints(currentPoints || []);
  }, [currentPoints]);

  const handleMouseDown = (e, index) => {
    e.preventDefault();
    setIsDragging(index);
    const rect = e.target.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging !== null) {
      const svg = document.querySelector('.experience-editor-svg');
      if (svg) {
        const rect = svg.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 1359;
        const y = ((e.clientY - rect.top) / rect.height) * 4581;
        
        const newPoints = [...points];
        newPoints[isDragging] = { x: Math.max(0, Math.min(1359, x)), y: Math.max(0, Math.min(4581, y)) };
        setPoints(newPoints);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging !== null) {
      onUpdatePoints(points);
      setIsDragging(null);
    }
  };

  const resetToDefault = () => {
    const defaultPoints = [
      { x: 1204.5, y: 1 },
      { x: 123.5, y: 1159.5 },
      { x: 8.5, y: 1809.5 },
      { x: 286.5, y: 2501.5 },
      { x: 1261.5, y: 2668.5 },
      { x: 1123.5, y: 3709 },
      { x: 623.5, y: 4580.5 }
    ];
    setPoints(defaultPoints);
    onUpdatePoints(defaultPoints);
  };

  const exportPoints = () => {
    const pointsString = points.map(p => `{ x: ${p.x}, y: ${p.y} }`).join(',\n      ');
    navigator.clipboard.writeText(`const pathPoints = [\n      ${pointsString}\n    ];`);
    alert('Points copied to clipboard!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Experience Points Editor</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="mb-4 flex gap-2">
          <button
            onClick={resetToDefault}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset to Default
          </button>
          <button
            onClick={exportPoints}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Export Points
          </button>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          <svg 
            className="experience-editor-svg w-full h-96 border border-gray-300"
            viewBox="0 0 1359 4581"
            preserveAspectRatio="xMidYMin meet"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Background path */}
            <path
              d="M1204.5 1C1271 432 134.5 433.5 623.5 1159.5C1112.5 1885.5 101.5 1685 8.50001 1809.5C-84.5 1934 698 2101 286.5 2501.5C-125 2902 839.5 2443 1261.5 2668.5C1683.5 2894 552 2916 1123.5 3709C1695 4502 623.5 4580.5 623.5 4580.5"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            
            {/* Draggable points */}
            {points.map((point, index) => (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="20"
                  fill="#F97316"
                  stroke="white"
                  strokeWidth="3"
                  className="cursor-move hover:r-6 transition-all"
                  onMouseDown={(e) => handleMouseDown(e, index)}
                />
                <text
                  x={point.x}
                  y={point.y - 30}
                  textAnchor="middle"
                  className="text-xs fill-gray-600 font-bold"
                >
                  {index + 1}
                </text>
                <text
                  x={point.x}
                  y={point.y + 40}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  ({Math.round(point.x)}, {Math.round(point.y)})
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Current Points:</h3>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono max-h-32 overflow-y-auto">
            {points.map((point, index) => (
              <div key={index} className="flex justify-between">
                <span>Point {index + 1}:</span>
                <span>x: {Math.round(point.x)}, y: {Math.round(point.y)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onUpdatePoints(points)}
            className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Apply Changes
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceEditor;

