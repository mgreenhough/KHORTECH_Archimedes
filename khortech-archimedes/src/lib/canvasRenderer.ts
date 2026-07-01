export interface CanvasPoint {
  x: number;
  y: number;
}

export interface CanvasLine {
  start: CanvasPoint;
  end: CanvasPoint;
  color?: string;
  width?: number;
}

export interface CanvasArrow {
  start: CanvasPoint;
  end: CanvasPoint;
  color?: string;
  width?: number;
  headLength?: number;
}

export function clearCanvas(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  ctx.clearRect(0, 0, width, height);
}

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  spacing: number = 50,
  color: string = 'rgba(255, 255, 255, 0.05)'
): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y < height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

export function drawLine(ctx: CanvasRenderingContext2D, line: CanvasLine): void {
  ctx.strokeStyle = line.color || '#fff';
  ctx.lineWidth = line.width || 2;
  ctx.beginPath();
  ctx.moveTo(line.start.x, line.start.y);
  ctx.lineTo(line.end.x, line.end.y);
  ctx.stroke();
}

export function drawArrow(ctx: CanvasRenderingContext2D, arrow: CanvasArrow): void {
  const { start, end } = arrow;
  const color = arrow.color || '#fff';
  const width = arrow.width || 2;
  const headLength = arrow.headLength || 10;

  const angle = Math.atan2(end.y - start.y, end.x - start.x);

  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(
    end.x - headLength * Math.cos(angle - Math.PI / 6),
    end.y - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    end.x - headLength * Math.cos(angle + Math.PI / 6),
    end.y - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
}

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  center: CanvasPoint,
  radius: number,
  options: {
    fill?: string;
    stroke?: string;
    lineWidth?: number;
  } = {}
): void {
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);

  if (options.fill) {
    ctx.fillStyle = options.fill;
    ctx.fill();
  }

  if (options.stroke) {
    ctx.strokeStyle = options.stroke;
    ctx.lineWidth = options.lineWidth || 2;
    ctx.stroke();
  }
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  position: CanvasPoint,
  options: {
    color?: string;
    font?: string;
    align?: CanvasTextAlign;
    baseline?: CanvasTextBaseline;
  } = {}
): void {
  ctx.fillStyle = options.color || '#fff';
  ctx.font = options.font || '14px Roboto Mono';
  ctx.textAlign = options.align || 'left';
  ctx.textBaseline = options.baseline || 'top';
  ctx.fillText(text, position.x, position.y);
}

export function worldToScreen(
  point: CanvasPoint,
  bounds: { minX: number; maxX: number; minY: number; maxY: number },
  canvasWidth: number,
  canvasHeight: number,
  padding: number = 0.1
): CanvasPoint {
  const paddedMinX = bounds.minX - (bounds.maxX - bounds.minX) * padding;
  const paddedMaxX = bounds.maxX + (bounds.maxX - bounds.minX) * padding;
  const paddedMinY = bounds.minY - (bounds.maxY - bounds.minY) * padding;
  const paddedMaxY = bounds.maxY + (bounds.maxY - bounds.minY) * padding;

  const worldWidth = paddedMaxX - paddedMinX;
  const worldHeight = paddedMaxY - paddedMinY;

  const scaleX = canvasWidth / worldWidth;
  const scaleY = canvasHeight / worldHeight;
  const scale = Math.min(scaleX, scaleY);

  const offsetX = (canvasWidth - worldWidth * scale) / 2;
  const offsetY = (canvasHeight - worldHeight * scale) / 2;

  return {
    x: offsetX + (point.x - paddedMinX) * scale,
    y: canvasHeight - (offsetY + (point.y - paddedMinY) * scale),
  };
}