import React, { useEffect, useRef } from 'react';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  progress: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: token.colorPrimary,
    transformOrigin: '0%',
    transform: 'scaleX(0)',
    transition: 'transform 0.4s ease',
    zIndex: 9999,
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      right: 0,
      width: '100px',
      height: '100%',
      boxShadow: `0 0 8px ${token.colorPrimary}, 0 0 4px ${token.colorPrimary}`,
      opacity: 1,
      transform: 'rotate(3deg) translate(0px, -2px)',
    },
  },
  loading: {
    transform: 'scaleX(1)',
    animation: '$loading 1.5s ease-in-out infinite',
  },
  '@keyframes loading': {
    '0%': {
      transform: 'scaleX(0)',
    },
    '20%': {
      transform: 'scaleX(0.2)',
    },
    '40%': {
      transform: 'scaleX(0.4)',
    },
    '60%': {
      transform: 'scaleX(0.6)',
    },
    '80%': {
      transform: 'scaleX(0.8)',
    },
    '100%': {
      transform: 'scaleX(1)',
    },
  },
}));

const PageLoading: React.FC = () => {
  const { styles } = useStyles();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    // 开始加载动画
    progress.classList.add(styles.loading);

    // 模拟加载完成
    const timer = setTimeout(() => {
      progress.classList.remove(styles.loading);
      progress.style.transform = 'scaleX(1)';
      
      // 淡出动画
      setTimeout(() => {
        if (progress) {
          progress.style.opacity = '0';
          progress.style.transition = 'opacity 0.4s ease';
        }
      }, 200);
    }, 800);

    return () => {
      clearTimeout(timer);
      if (progress) {
        progress.classList.remove(styles.loading);
        progress.style.transform = 'scaleX(0)';
        progress.style.opacity = '1';
        progress.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
      }
    };
  }, []);

  return <div ref={progressRef} className={styles.progress} />;
};

export default PageLoading; 