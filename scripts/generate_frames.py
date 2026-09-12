"""
Generate intermediate frames between 1.jpg and 2.jpg using
DIS optical flow + warp + cross-dissolve blend.

This is real motion interpolation (not just crossfade):
- Optical flow gives per-pixel motion vector from image 1 → image 2
- Each intermediate frame warps image 1 toward image 2 by fraction t
- Then cross-dissolves with image 2 at (1-t) ratio to fill any holes

Output naming: frame_0000.jpg ... frame_NNNN.jpg (continuous sequence).
"""
import cv2
import numpy as np
import os
import sys

INPUT_1  = r'D:\mpi-unit1\public\images\3d\1.jpg'
INPUT_2  = r'D:\mpi-unit1\public\images\3d\2.jpg'
OUTPUT   = r'D:\mpi-unit1\public\images\3d\seq'
N_INTER  = 60   # intermediate frames (total = N_INTER + 2 including endpoints)
QUALITY  = 85   # JPEG quality

def main():
    if not os.path.exists(INPUT_1):
        sys.exit(f'Input not found: {INPUT_1}')
    if not os.path.exists(INPUT_2):
        sys.exit(f'Input not found: {INPUT_2}')

    img1 = cv2.imread(INPUT_1)
    img2 = cv2.imread(INPUT_2)
    if img1 is None or img2 is None:
        sys.exit('Failed to read inputs')

    # Force common size
    h = min(img1.shape[0], img2.shape[0])
    w = min(img1.shape[1], img2.shape[1])
    img1 = cv2.resize(img1, (w, h))
    img2 = cv2.resize(img2, (w, h))
    print(f'[OK] Common size: {w}x{h}')

    os.makedirs(OUTPUT, exist_ok=True)

    # Frame 0 = img1
    cv2.imwrite(
        os.path.join(OUTPUT, 'frame_0000.jpg'),
        img1, [cv2.IMWRITE_JPEG_QUALITY, QUALITY],
    )
    print('[OK] Saved frame_0000.jpg')

    # Optical flow: img1 → img2
    gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

    print('[..] Computing DIS optical flow (GPU-accelerated if available)...')
    dis = cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
    flow = dis.calc(gray1, gray2, None)
    print(f'[OK] Flow shape: {flow.shape}')

    # Smooth flow with median filter to reduce noise
    flow_x = cv2.medianBlur(flow[:, :, 0], 5)
    flow_y = cv2.medianBlur(flow[:, :, 1], 5)
    flow = np.dstack([flow_x, flow_y])

    # Pre-compute sampling grid
    grid_x, grid_y = np.meshgrid(np.arange(w, dtype=np.float32),
                                  np.arange(h, dtype=np.float32))

    print(f'[..] Generating {N_INTER} intermediate frames...')
    for i in range(1, N_INTER + 1):
        t = i / (N_INTER + 1)
        # Warp img1 toward img2 by fraction t of the flow
        map_x = (grid_x + flow[:, :, 0] * t).astype(np.float32)
        map_y = (grid_y + flow[:, :, 1] * t).astype(np.float32)
        warped = cv2.remap(
            img1, map_x, map_y, cv2.INTER_LINEAR,
            borderMode=cv2.BORDER_REFLECT_101,
        )
        # Cross-dissolve: as t→1, blend shifts toward img2 to cover warp holes
        alpha = 1.0 - t
        blended = cv2.addWeighted(warped, alpha, img2, 1 - alpha, 0)
        path = os.path.join(OUTPUT, f'frame_{i:04d}.jpg')
        cv2.imwrite(path, blended, [cv2.IMWRITE_JPEG_QUALITY, QUALITY])
        if i % 10 == 0 or i == 1:
            print(f'   - frame_{i:04d}.jpg  (t={t:.3f})')

    # Last frame = img2
    cv2.imwrite(
        os.path.join(OUTPUT, f'frame_{N_INTER + 1:04d}.jpg'),
        img2, [cv2.IMWRITE_JPEG_QUALITY, QUALITY],
    )
    total = N_INTER + 2
    print(f'[OK] Saved frame_{N_INTER + 1:04d}.jpg')
    print(f'[DONE] {total} frames total in {OUTPUT}')

if __name__ == '__main__':
    main()
