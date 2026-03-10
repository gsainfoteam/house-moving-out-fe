import CameraIcon from '@/assets/icons/camera.svg?react';
import XCloseIcon from '@/assets/icons/x-close.svg?react';
import { overlay } from '@/common/lib';

function SampleImageOverlay({ close, image }: { close: () => void; image: string }) {
  return (
    <div className="fixed inset-0 p-4">
      <div className="bg-bg-white relative top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-2xl p-4 shadow-2xl">
        <button onClick={close} className="cursor-pointer self-end" aria-label="close">
          <XCloseIcon />
        </button>
        <img src={image} className="rounded-2xl" alt="sample image" />
      </div>
    </div>
  );
}

export function SampleImageButton({ image }: { image: string }) {
  return (
    <button
      className="cursor-pointer"
      onClick={() =>
        overlay.open(
          ({ close, isOpen }) => isOpen && <SampleImageOverlay close={close} image={image} />,
        )
      }
    >
      <CameraIcon />
    </button>
  );
}
