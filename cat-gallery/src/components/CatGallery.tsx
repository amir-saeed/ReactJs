import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, message } from 'antd';
import { HeartOutlined, HeartFilled, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { API_KEY } from '../config';
import { ICat, IVote, IFavorite } from '../types';

const CatGallery: React.FC = () => {
  const [cats, setCats] = useState<ICat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async (): Promise<void> => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10', {
        headers: { 'x-api-key': API_KEY }
      });
      const data = await response.json();
      
      const catsWithDetails: ICat[] = await Promise.all(
        data.map(async (cat: { id: string; url: string }) => {
          const [votes, favorites] = await Promise.all([
            fetchVotes(cat.id),
            checkFavorite(cat.id)
          ]);
          return {
            ...cat,
            score: calculateScore(votes),
            votes,
            favorite: favorites.length > 0
          };
        })
      );
      
      setCats(catsWithDetails);
    } catch (error) {
      message.error('Failed to fetch cats');
    } finally {
      setLoading(false);
    }
  };

  const fetchVotes = async (imageId: string): Promise<IVote[]> => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/votes?image_id=${imageId}`, {
        headers: { 'x-api-key': API_KEY }
      });
      return await response.json();
    } catch (error) {
      return [];
    }
  };

  const checkFavorite = async (imageId: string): Promise<IFavorite[]> => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/favourites?image_id=${imageId}`, {
        headers: { 'x-api-key': API_KEY }
      });
      return await response.json();
    } catch (error) {
      return [];
    }
  };

  const calculateScore = (votes: IVote[]): number => {
    return votes.reduce((acc, vote) => acc + (vote.value === 1 ? 1 : -1), 0);
  };

  const handleVote = async (imageId: string, value: number): Promise<void> => {
    try {
      await fetch('https://api.thecatapi.com/v1/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          image_id: imageId,
          value: value
        })
      });
      
      fetchCats();
    } catch (error) {
      message.error('Failed to vote');
    }
  };

  const handleFavorite = async (imageId: string, favorite: boolean): Promise<void> => {
    try {
      if (favorite) {
        const favorites = await checkFavorite(imageId);
        const favoriteId = favorites[0]?.id;
        
        if (favoriteId) {
          await fetch(`https://api.thecatapi.com/v1/favourites/${favoriteId}`, {
            method: 'DELETE',
            headers: { 'x-api-key': API_KEY }
          });
        }
      } else {
        await fetch('https://api.thecatapi.com/v1/favourites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
          },
          body: JSON.stringify({ image_id: imageId })
        });
      }
      
      fetchCats();
    } catch (error) {
      message.error('Failed to update favorite status');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gallery-container">
      <Row gutter={[16, 16]}>
        {cats.map((cat) => (
          <Col xs={24} sm={12} md={8} lg={6} key={cat.id}>
            <Card
              hoverable
              cover={<img alt="cat" src={cat.url} />}
              actions={[
                <Button
                  type="text"
                  icon={cat.favorite ? <HeartFilled /> : <HeartOutlined />}
                  onClick={() => handleFavorite(cat.id, cat.favorite)}
                />,
                <Button
                  type="text"
                  icon={<ArrowUpOutlined />}
                  onClick={() => handleVote(cat.id, 1)}
                />,
                <Button
                  type="text"
                  icon={<ArrowDownOutlined />}
                  onClick={() => handleVote(cat.id, -1)}
                />
              ]}
            >
              <Card.Meta 
                title={`Score: ${cat.score}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CatGallery;