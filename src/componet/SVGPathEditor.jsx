import React, { useState, useEffect, useRef, useCallback } from 'react';

const SVGPathEditor = ({ isOpen, onClose, initialPath, onPathUpdate }) => {
  const [pathData, setPathData] = useState(initialPath || "M-10 0.5C319.5 171 -126.253 229.191 151.5 736.5C429.253 1243.81 151.5 1112 151.5 1273.5C151.5 1435 419.232 1590.14 185.5 1870C-48.2324 2149.86 170 2337 151.5 2665C133 2993 -56 3139.5 113.5 3385.5C283 3631.5 890.5 3283 1085 3359.5C1279.5 3436 931 3760.5 931 3760.5C931 3760.5 607.456 4013.09 662.5 4223C753.969 4571.81 1105.74 4449.2 1173.5 4806.5C1207.73 4987 985 5354 985 5354");
  const [controlPoints, setControlPoints] = useState([]);
  const [isDragging, setIsDragging] = useState(null);
  const [strokeWidth, setStrokeWidth] = useState(15);
  const svgRef = useRef(null);

  useEffect(() => {
    setPathData(initialPath);
    parsePathToPoints(initialPath);
  }, [initialPath]);

  useEffect(() => {
    // Notify parent component of path changes in real-time
    if (onPathUpdate && pathData !== initialPath) {
      onPathUpdate(pathData);
    }
  }, [pathData, onPathUpdate, initialPath]);

  const parsePathToPoints = (path) => {
    // Extract all coordinate pairs from the path
    const regex = /([A-Z])\s*([-\d.,\s]+)/gi;
    const points = [];
    let match;
    
    while ((match = regex.exec(path)) !== null) {
      const command = match[1];
      const coords = match[2].trim().split(/[\s,]+/).map(Number);
      
      for (let i = 0; i < coords.length; i += 2) {
        if (!isNaN(coords[i]) && !isNaN(coords[i + 1])) {
          points.push({
            x: coords[i],
            y: coords[i + 1],
            type: command
          });
        }
      }
    }
    
    console.log('Parsed points:', points);
    setControlPoints(points);
  };

  const handleMouseDown = useCallback((e, index) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Mouse down on point:', index);
    setIsDragging(index);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging !== null && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 1178;
      const y = ((e.clientY - rect.top) / rect.height) * 5355;
      
      console.log('Dragging point:', isDragging, 'to:', x, y);
      
      setControlPoints(prevPoints => {
        const newPoints = [...prevPoints];
        newPoints[isDragging] = {
          ...newPoints[isDragging],
          x: Math.max(0, Math.min(1178, x)),
          y: Math.max(0, Math.min(5355, y))
        };
        updatePathFromPoints(newPoints);
        return newPoints;
      });
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    console.log('Mouse up, stopping drag');
    setIsDragging(null);
  }, []);

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const updatePathFromPoints = (points) => {
    if (points.length === 0) return;
    
    let path = `M${points[0].x} ${points[0].y}`;
    
    // Build path maintaining the original structure
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      if (point.type === 'C') {
        // For cubic bezier curves, we need to group them properly
        if (i + 2 < points.length) {
          path += `C${point.x} ${point.y} ${points[i + 1].x} ${points[i + 1].y} ${points[i + 2].x} ${points[i + 2].y}`;
          i += 2; // Skip the next two points as they're part of this curve
        } else {
          path += `C${point.x} ${point.y}`;
        }
      } else if (point.type === 'M') {
        path += `M${point.x} ${point.y}`;
      } else {
        path += `L${point.x} ${point.y}`;
      }
    }
    
    setPathData(path);
  };

  const copyPath = () => {
    navigator.clipboard.writeText(pathData);
    alert('Path copied to clipboard!');
  };

  const exportSVG = () => {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="1178" height="5355" viewBox="0 0 1178 5355" fill="none">
  <path d="${pathData}" stroke="black" strokeWidth="${strokeWidth}" strokeLinecap="round" fill="none"/>
</svg>`;
    navigator.clipboard.writeText(svgString);
    alert('Full SVG copied to clipboard!');
  };

  const resetPath = () => {
    const defaultPath = "M1204.5 1C1271 432 134.5 433.5 623.5 1159.5C1112.5 1885.5 101.5 1685 8.50001 1809.5C-84.5 1934 698 2101 286.5 2501.5C-125 2902 839.5 2443 1261.5 2668.5C1683.5 2894 552 2916 1123.5 3709C1695 4502 623.5 4580.5 623.5 4580.5";
    setPathData(defaultPath);
    parsePathToPoints(defaultPath);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-2xl font-bold">🎨 SVG Path Editor</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:text-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-2xl font-bold transition-all"
          >
            ×
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 bg-gray-50 border-b flex flex-wrap gap-2">
          <button
            onClick={copyPath}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold shadow transition-all"
          >
            📋 Copy Path
          </button>
          <button
            onClick={exportSVG}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold shadow transition-all"
          >
            📦 Export SVG
          </button>
          <button
            onClick={resetPath}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-semibold shadow transition-all"
          >
            🔄 Reset
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm font-semibold">Stroke Width:</label>
            <input
              type="range"
              min="1"
              max="50"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-sm font-mono">{strokeWidth}px</span>
          </div>
        </div>

        {/* SVG Canvas */}
        <div className="p-6 bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-300">
            <svg 
              ref={svgRef}
              className="w-full h-[500px] cursor-crosshair"
              viewBox="0 0 1178 5355"
              preserveAspectRatio="xMidYMin meet"
            >
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="1359" height="4581" fill="url(#grid)" />
              
              {/* Main path */}
              <path
                d={pathData}
                stroke="#F97316"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />
              
              {/* Control lines */}
              {controlPoints.map((point, index) => {
                if (index > 0 && index < controlPoints.length - 1) {
                  const prev = controlPoints[index - 1];
                  return (
                    <line
                      key={`line-${index}`}
                      x1={prev.x}
                      y1={prev.y}
                      x2={point.x}
                      y2={point.y}
                      stroke="rgba(0,0,255,0.2)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  );
                }
                return null;
              })}
              
              {/* Control points */}
              {controlPoints.map((point, index) => (
                <g key={`point-${index}`}>
                  {/* Outer ring for better visibility */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isDragging === index ? "30" : "20"}
                    fill="rgba(255,255,255,0.3)"
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth="2"
                    className="pointer-events-none"
                  />
                  {/* Main draggable circle */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isDragging === index ? "25" : "15"}
                    fill={index === 0 ? "#22C55E" : "#3B82F6"}
                    stroke="white"
                    strokeWidth="3"
                    className="cursor-move hover:opacity-80 transition-all"
                    onMouseDown={(e) => handleMouseDown(e, index)}
                    style={{ pointerEvents: 'all' }}
                  />
                  <text
                    x={point.x}
                    y={point.y - 35}
                    textAnchor="middle"
                    className="text-xs fill-gray-700 font-bold pointer-events-none"
                    style={{ userSelect: 'none' }}
                  >
                    {index === 0 ? 'START' : index}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Path Data Display */}
        <div className="p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-2">Path Data:</h3>
          <textarea
            value={pathData}
            onChange={(e) => {
              setPathData(e.target.value);
              parsePathToPoints(e.target.value);
            }}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-gray-500 mt-2">
            💡 Tip: Drag the control points to reshape the path. Green point is the start, blue points are control points.
          </p>
        </div>

        {/* Control Points List */}
        <div className="p-4 border-t">
          <h3 className="text-lg font-bold mb-2">Control Points ({controlPoints.length}):</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
            {controlPoints.map((point, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded text-xs font-mono">
                <span className="font-bold text-orange-500">P{index}:</span> ({Math.round(point.x)}, {Math.round(point.y)})
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SVGPathEditor;
