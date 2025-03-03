import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-3xl font-bold">Welcome to Central Park Squirrel Finder</h1>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed">
            Find your favorite squirrels and check out their latest activities!
          </p>
          <Button className="mt-4">
            Explore Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
