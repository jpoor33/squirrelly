import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@/components/ui/card';

interface Activity {
  _id: string;
  squirrel: string;
  type: string;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get('/api/squirrels/activities');
        setActivities(res.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/squirrels/search?activityType=${searchQuery}`);
      console.log('Search results:', res.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const addFavorite = async (squirrelId: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `/api/squirrels/${squirrelId}/favorite`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Squirrel added to favorites!');
    } catch (error) {
      console.error('Error favoriting squirrel:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">Recent Squirrel Activities</h2>
      <div className="space-y-4">
        {activities.map(activity => (
          <Card key={activity._id}>
            <CardHeader>
              <h3 className="text-xl">Activity: {activity.type}</h3>
            </CardHeader>
            <CardContent>
              <p>{new Date(activity.timestamp).toLocaleString()}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => addFavorite(activity.squirrel)}>Favorite</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <hr className="my-8" />
      <form onSubmit={handleSearch} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search by activity type"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};

export default Dashboard;
