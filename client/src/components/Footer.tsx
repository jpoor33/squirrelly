const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-800 text-white py-6 mt-8 w-full">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Squirrelly. All rights reserved.
        </p>
        <div className="mt-2">
          <a href="/about" className="text-sm text-amber-100 hover:text-white mx-2">About</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
