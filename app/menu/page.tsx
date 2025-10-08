import MenuGrid from '@/components/MenuGrid';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function MenuPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="pt-24">
        <MenuGrid />
      </div>
      <Footer />
    </main>
  );
}
