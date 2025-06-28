import { Copyright, Logo } from '@dreckly/ui-kit';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Logo textColor="white" />
            <p className="text-gray-400 mt-4 mb-4">
              Cornwall&apos;s favorite food delivery platform, bringing the best
              local cuisine directly to your door.
            </p>
          </div>
        </div>
        <Copyright />
      </div>
    </footer>
  );
};
