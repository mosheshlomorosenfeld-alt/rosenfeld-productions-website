import './globals.css';
import { AudioPlayer } from '../components/AudioPlayer';

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}<AudioPlayer /></body></html>;
}