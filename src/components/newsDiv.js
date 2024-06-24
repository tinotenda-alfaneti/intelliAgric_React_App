import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/newsDiv.css";
import { ENDPOINTS } from '../constants';

const NewsDiv = () => {
  const [newsData, setNewsData] = useState({ articles: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        const response = await fetch(ENDPOINTS.AGRI_NEWS_URL, { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("API Response:", data);
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
        Swal.fire('Error', 'Failed to fetch news data.', 'error');
      } finally {
        setLoading(false);
        Swal.close();
      }
    };

    fetchNewsData();
  }, []);

  const handleDivClick = (url) => {
    window.open(url, '_blank'); // Open link in a new tab
  };

  const renderNewsColumns = () => {
    // Split articles into chunks of 2 for each row
    const chunkedArticles = [];

    for (let i = 0; i < newsData.articles.length; i += 2) {
      chunkedArticles.push(newsData.articles.slice(i, i + 2));
    }

    return chunkedArticles.map((chunk, rowIndex) => (
      <Row key={rowIndex} className="mb-4">
        {chunk.map((newsItem, colIndex) => (
          <Col key={`${rowIndex}-${colIndex}`} xs={12} md={6} lg={6} xl={6} className="mb-4">
            <div
              className="news-item position-relative"
              onClick={() => handleDivClick(newsItem.url)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="img-fluid"
              />
              <div className="news-title">{newsItem.title}</div>
            </div>
          </Col>
        ))}
      </Row>
    ));
  };

  return (
    <Container className="container-small">
      {loading ? (
        <p></p>
      ) : (
        renderNewsColumns()
      )}
    </Container>
  );
};

export default NewsDiv;
