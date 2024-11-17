import EventList from '@/components/EventList';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl pt-6 font-bold text-center mb-12">
          Upcoming Events
        </h1>
        <EventList />
      </main>
    </div>
  );
}
