export function lockScroll() {
  const body = document.body;
  if (body.dataset.scrollLocked === '1') return;

  body.dataset.scrollLocked = '1';
  body.dataset.prevOverflow = body.style.overflow;
  body.style.overflow = 'hidden';
}

export function unlockScroll() {
  const body = document.body;
  if (body.dataset.scrollLocked !== '1') return;

  body.style.overflow = body.dataset.prevOverflow ?? '';
  delete body.dataset.prevOverflow;
  delete body.dataset.scrollLocked;
}
