import './logo.styl';

export const Logo = props => {
  return (
    <span className="v-logo" {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 84 40">
        <path fill="#F83338" d="M83.79,21.76c-0.14-0.23-0.34-0.34-0.59-0.34c-0.29,0-0.54,0.14-0.77,0.43c-0.67,0.86-1.25,1.47-1.76,1.84  c-0.5,0.36-1.15,0.54-1.93,0.54c-1.09,0-1.86-0.44-2.32-1.32c2.27-0.55,3.87-1.3,4.82-2.25s1.42-2.08,1.42-3.4  c0-1.13-0.33-2.02-1-2.68c-0.67-0.66-1.55-0.99-2.66-0.99c-1.24,0-2.35,0.33-3.33,1c-0.98,0.67-1.75,1.57-2.3,2.71  c-0.55,1.14-0.83,2.37-0.83,3.68c0,0.38,0.04,0.74,0.08,1.09c-0.54,0.47-1.11,0.89-1.75,1.24c-1.1,0.6-2.07,0.9-2.93,0.9  c-1.33,0-2.24-0.44-2.72-1.32c2.25-0.55,3.85-1.3,4.79-2.25c0.94-0.95,1.42-2.08,1.42-3.4c0-1.13-0.33-2.02-1-2.68  c-0.67-0.66-1.55-0.99-2.66-0.99c-1.24,0-2.35,0.33-3.33,1c-0.98,0.67-1.75,1.57-2.3,2.71c-0.55,1.14-0.83,2.37-0.83,3.68  c0,0.42,0.04,0.81,0.09,1.19c-0.9,0.53-1.79,1.15-2.4,1.71c0.09-0.61,0.19-1.19,0.27-1.73c0.09-0.54,0.17-1.05,0.24-1.51  c0.4-2.41,0.64-3.91,0.71-4.5c0.02-0.13,0.03-0.32,0.03-0.54c0-0.42-0.1-0.7-0.3-0.85c-0.2-0.14-0.54-0.21-1.01-0.21  c-0.48,0-0.9,0.04-1.26,0.11c-0.1-0.42-0.21-0.71-0.36-0.87c-0.14-0.16-0.42-0.24-0.84-0.24c-1.32,0-2.56,0.42-3.73,1.25  c-1.17,0.83-2.11,1.93-2.82,3.3c-0.7,1.37-1.06,2.82-1.06,4.34c0,0.14,0.02,0.26,0.03,0.4c-0.17,0.16-0.32,0.31-0.46,0.43  c-0.53,0.46-1.06,0.69-1.57,0.69c-0.4,0-0.73-0.24-0.99-0.72c-0.26-0.48-0.42-1.27-0.5-2.38c1.75-3.02,3.15-5.96,4.2-8.83  c1.05-2.87,1.57-5.37,1.57-7.51c0-1.51-0.27-2.64-0.82-3.38C49.79,0.37,49.11,0,48.29,0c-1.66,0-3,1.31-4.02,3.94  c-1.02,2.63-1.71,5.8-2.07,9.51c-1.41,0.15-2.68,0.65-3.82,1.48c-1.13,0.83-2.03,1.9-2.67,3.21c-0.62,1.26-0.94,2.63-0.96,4.09  c-0.49,0.42-1.02,0.79-1.6,1.1c-1.1,0.6-2.07,0.9-2.93,0.9c-1.33,0-2.24-0.44-2.72-1.32c2.25-0.55,3.85-1.3,4.79-2.25  s1.42-2.08,1.42-3.4c0-1.13-0.33-2.02-1-2.68c-0.67-0.66-1.55-0.99-2.66-0.99c-1.24,0-2.35,0.33-3.33,1  c-0.98,0.67-1.75,1.57-2.3,2.71c-0.55,1.14-0.83,2.37-0.83,3.68c0,0.38,0.04,0.74,0.08,1.09c-0.54,0.48-1.12,0.9-1.76,1.25  c-1.1,0.6-2.07,0.9-2.93,0.9c-1.33,0-2.24-0.44-2.72-1.32c2.25-0.55,3.85-1.3,4.79-2.25c0.94-0.95,1.42-2.08,1.42-3.4  c0-1.13-0.33-2.02-1-2.68c-0.67-0.66-1.55-0.99-2.66-0.99c-1.24,0-2.35,0.33-3.33,1c-0.98,0.67-1.75,1.57-2.3,2.71  c-0.19,0.39-0.33,0.78-0.45,1.19c-0.85,0.15-1.56,0.24-2.12,0.27c0.46-1.11,0.7-2.09,0.7-2.95c0-0.75-0.16-1.31-0.51-1.71  c-0.34-0.39-0.79-0.59-1.34-0.6c-0.63,0-1.19,0.18-1.69,0.56c-0.5,0.38-0.89,0.87-1.18,1.48c-0.29,0.61-0.44,1.24-0.44,1.89  c0,0.69,0.14,1.37,0.43,1.97c0.18,0.36,0.41,0.7,0.7,1c-1.28,1.71-2.65,3.12-3.45,3.81c-0.64-3.64-0.37-4.28-0.36-6.48  c0-0.52-0.11-0.88-0.35-1.11c-0.24-0.22-0.6-0.33-1.1-0.34c-0.65,0-1.13,0.12-1.46,0.36c-0.33,0.25-0.5,0.69-0.52,1.32  c0,0-0.4,5.56,1.15,8.21c0.4,0.69,1.33,0.95,2.07,0.9c0.61-0.04,1.31-0.21,1.81-0.58c1.1-0.81,2.68-2.65,4.09-5  c0.67,0.19,1.38,0.26,2.08,0.26c0.4,0,0.78-0.04,1.16-0.08c0.13,1.55,0.64,2.82,1.6,3.76c1.11,1.09,2.66,1.63,4.66,1.63  c1.47,0,2.84-0.36,4.13-1.09c0.71-0.4,1.32-0.83,1.86-1.27c0.18,0.25,0.36,0.5,0.59,0.72c1.1,1.09,2.66,1.63,4.66,1.63  c1.47,0,2.84-0.36,4.13-1.09c0.5-0.28,0.95-0.58,1.36-0.88c0.14,0.24,0.29,0.46,0.47,0.67c0.75,0.87,1.71,1.3,2.87,1.3  c0.8,0,1.5-0.17,2.1-0.52c0.6-0.34,1.3-1.02,2.1-2.04c0.76,1.7,1.87,2.55,3.32,2.55c0.91,0,1.84-0.34,2.77-1.02  c0.24-0.17,0.46-0.38,0.69-0.58c0.07,0.1,0.13,0.21,0.2,0.31c0.71,0.86,1.65,1.29,2.83,1.29c0.51,0,1.03-0.14,1.56-0.42  c0.52-0.28,0.95-0.67,1.27-1.19l-0.17,1.12c-2.94,2.27-4.94,4.19-6,5.75c-1.07,1.56-1.6,3.02-1.6,4.37c0,0.97,0.3,1.76,0.91,2.37  c0.61,0.6,1.4,0.9,2.37,0.9c1.81,0,3.3-1.13,4.47-3.4c1.17-2.27,2.12-5.38,2.85-9.33c0,0,1.33-1.3,3.73-2.86  c0.23,0.38,0.49,0.74,0.81,1.06c1.11,1.09,2.66,1.63,4.66,1.63c1.47,0,2.84-0.36,4.13-1.09c0.69-0.39,1.29-0.8,1.81-1.23  c0.15,0.23,0.3,0.46,0.49,0.67c1.01,1.1,2.43,1.65,4.26,1.65c1.2,0,2.23-0.23,3.1-0.69c0.87-0.46,1.57-1.1,2.1-1.92  c0.32-0.5,0.49-1.09,0.49-1.78C84,22.31,83.93,21.99,83.79,21.76z M45.96,9.81c0.26-2.08,0.57-3.77,0.93-5.06  c0.36-1.29,0.72-1.94,1.09-1.94c0.17,0,0.32,0.2,0.44,0.6c0.12,0.4,0.19,0.97,0.19,1.69c0,2.83-1.07,6.58-3.2,11.24  C45.52,14.07,45.7,11.89,45.96,9.81z M8.38,18.75c-0.32-0.01-0.58-0.12-0.77-0.33c-0.2-0.22-0.3-0.51-0.3-0.88  c0-0.43,0.13-0.83,0.37-1.2c0.32,0.01,0.58,0.12,0.77,0.33c0.2,0.22,0.3,0.51,0.3,0.88C8.75,17.98,8.62,18.38,8.38,18.75z   M15.81,20.62c0-1.17,0.24-2.16,0.73-2.98c0.49-0.82,1.08-1.23,1.79-1.23c0.34,0,0.61,0.11,0.81,0.33c0.2,0.22,0.3,0.51,0.3,0.87  c0,0.71-0.32,1.33-0.97,1.86c-0.65,0.54-1.53,0.94-2.66,1.2V20.62z M27.05,20.62c0-1.17,0.24-2.16,0.73-2.98  c0.49-0.82,1.08-1.23,1.79-1.23c0.34,0,0.61,0.11,0.81,0.33c0.2,0.22,0.3,0.51,0.3,0.87c0,0.71-0.32,1.33-0.97,1.86  c-0.65,0.54-1.53,0.94-2.66,1.2V20.62z M40.83,23.76c-0.36,0.3-0.72,0.44-1.09,0.44c-0.95,0-1.43-0.7-1.43-2.09  c0-1.32,0.35-2.52,1.04-3.6c0.7-1.08,1.57-1.78,2.62-2.11c-0.04,1.03-0.06,1.78-0.06,2.24c0,1.28,0.09,2.44,0.29,3.47  C41.65,22.91,41.19,23.46,40.83,23.76z M53.03,35.5c-0.6,1.15-1.14,1.72-1.62,1.72c-0.29,0-0.49-0.11-0.61-0.32  c-0.12-0.21-0.19-0.48-0.19-0.8c0-0.76,0.32-1.65,0.97-2.67c0.65-1.01,1.71-2.15,3.17-3.41C54.21,32.53,53.63,34.35,53.03,35.5z   M55.9,21.1c-0.17,0.99-0.46,1.76-0.86,2.29c-0.4,0.54-0.82,0.8-1.26,0.8c-0.42,0-0.75-0.14-0.99-0.43  c-0.24-0.29-0.36-0.73-0.36-1.32c0-1.07,0.2-2.08,0.6-3.04c0.4-0.96,0.93-1.72,1.6-2.31c0.67-0.58,1.39-0.88,2.17-0.9L55.9,21.1z   M64.76,20.62c0-1.17,0.24-2.16,0.73-2.98c0.49-0.82,1.08-1.23,1.79-1.23c0.34,0,0.61,0.11,0.81,0.33c0.2,0.22,0.3,0.51,0.3,0.87  c0,0.71-0.32,1.33-0.97,1.86c-0.65,0.54-1.53,0.94-2.66,1.2V20.62z M76,20.62c0-1.17,0.24-2.16,0.73-2.98  c0.49-0.82,1.08-1.23,1.79-1.23c0.34,0,0.61,0.11,0.81,0.33c0.2,0.22,0.3,0.51,0.3,0.87c0,0.71-0.32,1.33-0.97,1.86c-0.65,0.54-1.53,0.94-2.66,1.2V20.62z"/>
      </svg>
    </span>
  );
};
