import HeroSection from '@/components/HeroSection';
import MenuGrid from '@/components/MenuGrid';
import OrderSection from '@/components/OrderSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import LoadingScreen from '@/components/LoadingScreen';
import ThreeBackground from '@/components/ThreeBackground';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ThreeBackground />
      <main className="relative">
        <Navbar />
        <HeroSection />
        <MenuGrid />
        <OrderSection />
        <AboutSection />
        <Footer />
      </main>
    </>
  );
}

