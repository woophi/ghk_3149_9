import { style } from '@vanilla-extract/css';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: 'calc(100% - 24px)',
  padding: '12px',
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const container = style({
  display: 'flex',
  padding: '21px',
  flexDirection: 'column',

  gap: '16px',
});

const btnContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'left',
  gap: '1rem',
});
const btn = style({
  borderRadius: '24px',
  padding: '1rem',
});

const slid = style({
  width: 'calc(100% - var(--slider-input-progress-margin-horizontal) * 2) !important',
});
const slider = style({
  borderRadius: '1rem !important',
});

const box = style({
  backgroundColor: '#F3F4F5',
  borderRadius: '1rem',
  padding: '12px 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
  marginTop: '.5rem',
});

export const appSt = {
  bottomBtn,
  container,
  btnContainer,
  btn,
  slid,
  slider,
  box,
};
