import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SquirrelCardProps {
//props
}

const SquirrelCard: React.FC<SquirrelCardProps> = () => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <h2 className="text-xl font-bold "
        style={{ color: 'var(--primary)' }}>Squirrel Name</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          This is a squirrel card.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="default">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default SquirrelCard;
