import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { HashLoader } from 'react-spinners';

export default function CircularDeterminate() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-cyan-50 overflow-hidden relative">

    <div className="login-ui-box right-10 -top-40 " />
    <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2" />
    {/* <Stack spacing={2} direction="row">
      <CircularProgress size="13rem"  value={progress} />
    </Stack> */}
  <HashLoader
  color="#0080d8"
  size={140}
/>
    </div>
  );
}
