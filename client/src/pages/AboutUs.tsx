import squirrelGif from "@/assets/funny-squirrel.gif"; 

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-8 min-h-screen flex flex-col items-center ">
      <h1 className="text-4xl font-bold text-amber-800 mb-8">About Us</h1>
      <img
        src={squirrelGif}
        alt="Funny Squirrel"
        className="max-w-full h-auto mb-8"
      />
      <p className="text-xl text-gray-700 text-center max-w-3xl">
        Welcome to Squirrelly! We’re passionate about squirrels and everything
        that makes them adorable and fascinating. Our mission is to help you
        find and track your favorite squirrels in Central Park. Join us on this
        wild adventure as we celebrate the quirky, nimble, and sometimes downright
        hilarious world of squirrels!
      </p>
    </div>
  );
};

export default About;