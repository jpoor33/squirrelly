const AboutUs: React.FC = () => {
  return (
    <div className="container min-h-screen mx-auto p-8">
      <h1 
      style={{ fontFamily: "'Bagel Fat One', cursive", color: 'var(--primary)' }}
      className="text-4xl mb-4">About Us</h1>
      <p className="text-lg leading-relaxed">
        Welcome to Squirrelly! We are passionate about connecting squirrel lovers with the amazing wildlife in Central Park. Our mission is to help you find and learn about your favorite squirrels through real-time activity updates and community insights.
      </p>
      <p className="text-lg leading-relaxed mt-4">
        Whether you're a casual observer or a dedicated enthusiast, we hope our platform brings a little extra joy to your day as you explore the playful and dynamic world of squirrels.
      </p>
    </div>
  );
};

export default AboutUs;
