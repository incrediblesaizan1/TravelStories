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
    <div className='bg-zinc-800 flex justify-center items-center h-screen'>
    {/* <Stack spacing={2} direction="row">
      <CircularProgress size="13rem"  value={progress} />
    </Stack> */}
  <HashLoader
  color="#0080d8"
  size={100}
/>
    </div>
  );
}
